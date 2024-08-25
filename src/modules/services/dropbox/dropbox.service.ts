import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Dropbox } from 'dropbox';
import fetch from 'node-fetch';
import axios from 'axios';
import { DropboxTokensService } from '@repositories/mongo/dropbox-tokens/dropbox-tokens.service';

@Injectable()
export class DropboxService {
  protected dropbox: Dropbox;
  private clientId: string;
  private clientSecret: string;

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
    const token = await this.tokenService.getToken();
    if (token) {
      this.dropbox = new Dropbox({ accessToken: token.accessToken });
    } else {
      await this.ensureValidAccessToken();
      this.dropbox = new Dropbox({ accessToken: token.accessToken, fetch });
    }
  }

  private async updateTokens(): Promise<void> {
    this.logger.log('Updating tokens...');
    const token = await this.tokenService.getToken();
    const response = await axios.post('https://api.dropbox.com/oauth2/token', null, {
      params: {
        refresh_token: token.refreshToken,
        grant_type: 'refresh_token',
        client_id: this.clientId,
        client_secret: this.clientSecret,
      },
    });

    const { access_token, refresh_token, expires_in } = response.data;
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
    const token = await this.tokenService.getToken();
    if (token) {
      if (Date.now() >= token.tokenExpirationTime) {
        await this.updateTokens();
        this.logger.log('Access token refreshed.');
      } else {
        this.logger.log('Access token is valid.');
      }
    } else {
      await this.updateTokens();
      this.logger.log('Access token refreshed.');
    }
  }
}
