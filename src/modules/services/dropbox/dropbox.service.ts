// NestJS
import { HttpException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Axios (for making requests to the Dropbox API)
import axios from 'axios';

// Dropbox
import { Dropbox } from 'dropbox';

// Services
import { DropboxTokensService } from '@repositories/mongo/dropbox-tokens/dropbox-tokens.service';

// Types
import type { DropboxToken } from '@repositories/mongo/dropbox-tokens/dropbox-token.entity';
import type { Dropbox as DropboxType } from 'dropbox';

@Injectable()
export class DropboxService {
  protected dropbox: DropboxType;
  private clientId: string;
  private clientSecret: string;
  private refreshToken: string;
  private token: DropboxToken;
  private lastTokenCheck: number = 0; // Timestamp of the last token check
  private retryUpdateCount: number = 0; // Number of retries for updating the access token
  private readonly MAX_UPDATE_RETRIES: number = 3; // Maximum number of retries for updating the access token
  private readonly TOKEN_CHECK_INTERVAL: number = 10 * 60 * 1000; // 10 minutes
  private readonly NEAR_EXPIRATION_THRESHOLD: number = 15 * 60 * 1000; // 15 minutes

  constructor(
    protected readonly config?: ConfigService,
    protected readonly logger?: Logger,
    private readonly tokenService?: DropboxTokensService,
  ) {
    this.clientId = this.config.get<string>('DROPBOX_CLIENT_ID');
    this.clientSecret = this.config.get<string>('DROPBOX_CLIENT_SECRET');
    this.refreshToken = this.config.get<string>('DROPBOX_REFRESH_TOKEN');
  }

  /**
   * Initializes the Dropbox client and checks if the access token is valid.
   */
  public async initializeDropboxClient(): Promise<void> {
    this.logger.log('Initializing Dropbox client...');

    // Get the tokens from the database
    this.token = await this.tokenService.getToken();

    if (this.token) {
      // Ensure the access token is valid
      await this.ensureValidAccessToken();

      // Create the Dropbox client with the access token
      this.dropbox = new Dropbox({ accessToken: this.token.accessToken });
    } else {
      // If no access token is found, attempt to refresh it
      this.logger.warn('No access token found. Attempting to refresh token...');

      while (this.retryUpdateCount < this.MAX_UPDATE_RETRIES) {
        await this.updateTokens();

        if (this.token) {
          await this.initializeDropboxClient(); // Re-initialize the client if the token refresh was successful
          this.retryUpdateCount = 0; // Reset retry count
          break;
        }

        this.retryUpdateCount++;
      }

      throw new InternalServerErrorException('Failed to initialize Dropbox client after multiple attempts.');
    }
  }

  /**
   * Updates the Dropbox tokens by refreshing the access token using the refresh token.
   */
  private async updateTokens(): Promise<void> {
    this.logger.log('Updating tokens...');

    try {
      // Make a request to the Dropbox API to refresh the access token
      const response = await axios.post('https://api.dropbox.com/oauth2/token', null, {
        params: {
          refresh_token: this.refreshToken,
          grant_type: 'refresh_token',
          client_id: this.clientId,
          client_secret: this.clientSecret,
        },
      });

      // Extract the access token and refresh token from the response
      const { access_token, expires_in } = response.data;

      // Create a new Dropbox client with the new access token
      this.dropbox = new Dropbox({ accessToken: access_token });

      // Update the refresh token if a new one is provided
      const newTokenExpirationTime = Date.now() + expires_in * 1000;

      // Save the new tokens in the database
      await this.tokenService.saveToken({
        accessToken: access_token,
        expirationTime: newTokenExpirationTime,
      });

      this.logger.log('Tokens updated.');
    } catch (error) {
      // Log an error if the token refresh fails
      if (error instanceof HttpException) {
        throw new InternalServerErrorException('Failed to refresh Dropbox token', error.message);
      } else {
        throw new InternalServerErrorException('Failed to refresh Dropbox token', error);
      }
    }
  }

  /**
   * Ensures that the access token is valid and refreshes it if needed.
   */
  protected async ensureValidAccessToken(): Promise<void> {
    this.logger.log('Ensuring access token is valid...');

    // Get the current timestamp
    const now = Date.now();

    // Skip token validation if within the interval
    if (now - this.lastTokenCheck < this.TOKEN_CHECK_INTERVAL) {
      this.logger.log('Access token check skipped due to interval');
      return;
    }

    // Get the tokens from the database
    const token = await this.tokenService.getToken();

    if (token !== null) {
      // Check if the access token is near expiration
      const isTokenNearExpiration = Date.now() >= token.expirationTime - this.NEAR_EXPIRATION_THRESHOLD;
      if (isTokenNearExpiration) {
        // If the access token is near expiration or expired, refresh it
        this.logger.warn('Access token is either near expiration or has expired. Refreshing...');
        await this.updateTokens();
        this.logger.log('Access token refreshed.');
      } else {
        // If the access token is valid, do nothing
        this.logger.log('Access token is valid.');
      }
    } else {
      // If no tokens are found, attempt to refresh the token
      this.logger.warn('No access token found. Attempting to refresh token...');
      await this.updateTokens();
    }

    // Update the timestamp after checking
    this.lastTokenCheck = Date.now();
  }

  /**
   * Checks if the mime type is valid based on allowed mime types.
   * @param mimeType The mime type of the file
   * @param allowedMimeTypes The allowed mime types
   * @returns True if the mime type is valid, else false
   */
  protected isValidMimeType(mimeType: string, allowedMimeTypes: string[]): boolean {
    return allowedMimeTypes.some((pattern) => {
      // Handle exact matches
      if (pattern === mimeType) {
        return true;
      }
      // Handle wildcard patterns
      const regex = new RegExp('^' + pattern.replace('*', '.*') + '$');
      return regex.test(mimeType);
    });
  }
}
