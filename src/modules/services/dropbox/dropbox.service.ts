// NestJS
import { HttpException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Dropbox
import { Dropbox } from 'dropbox';

// Services
import { DropboxTokensService } from '@repositories/mongo/dropbox-tokens/dropbox-tokens.service';

// Types
import type { OnModuleInit } from '@nestjs/common';
import type { DropboxToken } from '@repositories/mongo/dropbox-tokens/dropbox-token.entity';

@Injectable()
export class DropboxService implements OnModuleInit {
  private token: DropboxToken;
  private lastUpdated: number = 0; // Last time the access token was updated
  private retryUpdateCount: number = 0; // Number of retries for updating the access token
  private readonly MAX_UPDATE_RETRIES: number = 3; // Maximum number of retries for updating the access token
  private readonly TOKEN_REFRESH_INTERVAL: number = 60 * 60 * 1000; // Token refresh interval in milliseconds
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly refreshToken: string;
  public dropboxClient: Dropbox;

  constructor(
    private readonly config: ConfigService,
    private readonly logger: Logger,
    private readonly tokenService: DropboxTokensService,
  ) {
    this.clientId = this.config.get<string>('DROPBOX_CLIENT_ID');
    this.clientSecret = this.config.get<string>('DROPBOX_CLIENT_SECRET');
    this.refreshToken = this.config.get<string>('DROPBOX_REFRESH_TOKEN');
  }

  /**
   * Called when the module is initialized.
   */
  public async onModuleInit(): Promise<void> {
    await this.initializeDropboxClient();
  }

  /**
   * Checks if the mime type is valid based on allowed mime types.
   * @param mimeType The mime type of the file
   * @param allowedMimeTypes The allowed mime types
   * @returns True if the mime type is valid, else false
   */
  public isValidMimeType(mimeType: string, allowedMimeTypes: string[]): boolean {
    return allowedMimeTypes.some((pattern) => {
      // Handle exact matches
      if (pattern === mimeType) return true;

      // Handle wildcard patterns
      const regex = new RegExp('^' + pattern.replace('*', '.*') + '$');
      return regex.test(mimeType);
    });
  }

  /**
   * Ensures that the access token is valid and refreshes it if needed.
   */
  public async ensureValidAccessToken(): Promise<void> {
    const currentTime = Date.now();
    if (currentTime - this.lastUpdated < this.TOKEN_REFRESH_INTERVAL) return;
    
    try {
      this.logger.log('Updating access token...');
      await this.updateTokens();
      this.lastUpdated = currentTime;
    } catch (error) {
      this.logger.error('Failed to refresh token', error);
      throw error;
    }
  }

  /**
   * Initializes the Dropbox client and checks if the access token is valid.
   */
  private async initializeDropboxClient(): Promise<void> {
    this.logger.log('Initializing Dropbox client...');

    // Get the tokens from the database
    this.token = await this.tokenService.getToken();

    if (this.token) {
      // Ensure the access token is valid
      await this.ensureValidAccessToken();

      // Create the Dropbox client with the access token
      this.dropboxClient = new Dropbox({
        accessToken: this.token.accessToken,
      });

      this.logger.log('Dropbox client initialized');
    } else {
      this.logger.warn('No access token found. Attempting to refresh token...');

      // If no access token is found, attempt to refresh it
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
      const url = 'https://api.dropbox.com/oauth2/token';
      const params = new URLSearchParams({
        refresh_token: this.refreshToken,
        grant_type: 'refresh_token',
        client_id: this.clientId,
        client_secret: this.clientSecret,
      });
      
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };
      
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: params.toString(),
      });

      // Extract the access token and refresh token from the response
      const { access_token, expires_in } = await response.json();

      // Create a new Dropbox client with the new access token
      this.dropboxClient = new Dropbox({ accessToken: access_token });

      // Create expiration date
      const expirationDate = new Date(Date.now() + expires_in * 1000).getTime();

      // Save the new tokens in the database
      await this.tokenService.saveToken({
        accessToken: access_token,
        expirationTime: expirationDate,
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
}
