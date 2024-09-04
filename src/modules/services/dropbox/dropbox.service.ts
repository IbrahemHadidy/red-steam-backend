// NestJS
import { Injectable, Logger } from '@nestjs/common';
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
  private token: Partial<DropboxToken>;
  private isInitialized: boolean = false;
  private lastTokenCheck: number = 0; // Timestamp of the last token check
  private readonly TOKEN_CHECK_INTERVAL = 15 * 60 * 1000; // 15 minutes
  private readonly NEAR_EXPIRATION_THRESHOLD = 5 * 60 * 1000; // 5 minutes

  constructor(
    protected readonly config: ConfigService,
    protected readonly logger: Logger,
    private readonly tokenService: DropboxTokensService,
  ) {
    this.clientId = this.config.get<string>('DROPBOX_CLIENT_ID');
    this.clientSecret = this.config.get<string>('DROPBOX_CLIENT_SECRET');
    this.initializeDropboxClient();
  }

  private async initializeDropboxClient(): Promise<void> {
    this.logger.log('Initializing Dropbox client...');

    // Check if the client has already been initialized
    if (this.isInitialized) {
      // Skip initialization if already done
      return;
    } else {
      // Set the initialized flag to true to prevent re-initialization
      this.isInitialized = true;
    }

    // Get the tokens from the database
    this.token = await this.tokenService.getToken();

    if (this.token) {
      // Ensure the access token is valid
      await this.ensureValidAccessToken();

      // If the access token is valid, create the Dropbox client
      this.dropbox = new Dropbox({ accessToken: this.token.accessToken });
    } else {
      // Log a warning if no tokens are found
      this.logger.warn('No tokens found. Please make sure you have created a token in your database.');
    }
  }

  private async updateTokens(): Promise<void> {
    this.logger.log('Updating tokens...');

    // Get the tokens from the database
    const token = await this.tokenService.getToken();

    // Make a request to the Dropbox API to refresh the access token
    const response = await axios.post('https://api.dropbox.com/oauth2/token', null, {
      params: {
        refresh_token: token.refreshToken,
        grant_type: 'refresh_token',
        client_id: this.clientId,
        client_secret: this.clientSecret,
      },
    });

    // Extract the access token and refresh token from the response
    const { access_token, refresh_token, expires_in } = response.data;

    // Create a new Dropbox client with the new access token
    this.dropbox = new Dropbox({ accessToken: access_token });

    // Update the refresh token if a new one is provided
    const newRefreshToken = refresh_token || token.refreshToken;
    const newTokenExpirationTime = Date.now() + expires_in * 1000;

    // Save the new tokens in the database
    await this.tokenService.saveToken({
      accessToken: access_token,
      refreshToken: newRefreshToken,
      tokenExpirationTime: newTokenExpirationTime,
    });

    this.logger.log('Tokens updated.');
  }

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

    // If tokens are found, check if the access token is expired
    if (token) {
      const isTokenNearExpiration = Date.now() >= token.tokenExpirationTime - this.NEAR_EXPIRATION_THRESHOLD;
      if (isTokenNearExpiration) {
        // If the access token is near expiration, refresh the access token
        await this.updateTokens();
        this.logger.log('Access token refreshed.');
      } else {
        // If the access token is valid, do nothing
        this.logger.log('Access token is valid.');
      }
    } else {
      // If no tokens are found, refresh the access token
      await this.updateTokens();
      this.logger.log('Access token refreshed.');
    }

    // Update the timestamp after checking
    this.lastTokenCheck = Date.now();
  }

  /**
   * Checks if the mime type is valid
   * @param mimeType the mime type of the file
   * @param allowedMimeTypes the allowed mime types
   * @returns true if the mime type is valid else false
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
