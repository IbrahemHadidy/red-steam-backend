// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DropboxService", {
    enumerable: true,
    get: function() {
        return DropboxService;
    }
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _dropbox = require("dropbox");
const _dropboxtokensservice = require("../../repositories/mongo/dropbox-tokens/dropbox-tokens.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let DropboxService = class DropboxService {
    constructor(config, logger, tokenService){
        this.config = config;
        this.logger = logger;
        this.tokenService = tokenService;
        this.lastUpdated = 0;
        this.retryUpdateCount = 0;
        this.MAX_UPDATE_RETRIES = 3;
        this.TOKEN_REFRESH_INTERVAL = 60 * 60 * 1000;
        this.clientId = this.config.get('DROPBOX_CLIENT_ID');
        this.clientSecret = this.config.get('DROPBOX_CLIENT_SECRET');
        this.refreshToken = this.config.get('DROPBOX_REFRESH_TOKEN');
    }
    /**
   * Called when the module is initialized.
   */ async onModuleInit() {
        await this.initializeDropboxClient();
    }
    /**
   * Checks if the mime type is valid based on allowed mime types.
   * @param mimeType The mime type of the file
   * @param allowedMimeTypes The allowed mime types
   * @returns True if the mime type is valid, else false
   */ isValidMimeType(mimeType, allowedMimeTypes) {
        return allowedMimeTypes.some((pattern)=>{
            // Handle exact matches
            if (pattern === mimeType) return true;
            // Handle wildcard patterns
            const regex = new RegExp('^' + pattern.replace('*', '.*') + '$');
            return regex.test(mimeType);
        });
    }
    /**
   * Ensures that the access token is valid and refreshes it if needed.
   */ async ensureValidAccessToken() {
        const currentTime = Date.now();
        if (currentTime - this.lastUpdated < this.TOKEN_REFRESH_INTERVAL) return;
        try {
            await this.updateTokens();
            this.lastUpdated = currentTime;
        } catch (error) {
            this.logger.error('Failed to refresh token', error);
            throw error;
        }
    }
    /**
   * Initializes the Dropbox client and checks if the access token is valid.
   */ async initializeDropboxClient() {
        this.logger.log('Initializing Dropbox client...');
        // Get the tokens from the database
        this.token = await this.tokenService.getToken();
        if (this.token) {
            // Ensure the access token is valid
            await this.ensureValidAccessToken();
            // Create the Dropbox client with the access token
            this.dropboxClient = new _dropbox.Dropbox({
                accessToken: this.token.accessToken
            });
            this.logger.log('Dropbox client initialized');
        } else {
            this.logger.warn('No access token found. Attempting to refresh token...');
            // If no access token is found, attempt to refresh it
            while(this.retryUpdateCount < this.MAX_UPDATE_RETRIES){
                await this.updateTokens();
                if (this.token) {
                    await this.initializeDropboxClient(); // Re-initialize the client if the token refresh was successful
                    this.retryUpdateCount = 0; // Reset retry count
                    break;
                }
                this.retryUpdateCount++;
            }
            throw new _common.InternalServerErrorException('Failed to initialize Dropbox client after multiple attempts.');
        }
    }
    /**
   * Updates the Dropbox tokens by refreshing the access token using the refresh token.
   */ async updateTokens() {
        this.logger.log('Updating access token...');
        try {
            // Make a request to the Dropbox API to refresh the access token
            const url = 'https://api.dropbox.com/oauth2/token';
            const params = new URLSearchParams({
                refresh_token: this.refreshToken,
                grant_type: 'refresh_token',
                client_id: this.clientId,
                client_secret: this.clientSecret
            });
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
            };
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: params.toString()
            });
            // Extract the access token and refresh token from the response
            const { access_token, expires_in } = await response.json();
            // Create a new Dropbox client with the new access token
            this.dropboxClient = new _dropbox.Dropbox({
                accessToken: access_token
            });
            // Create expiration date
            const expirationDate = new Date(Date.now() + expires_in * 1000).getTime();
            // Save the new tokens in the database
            await this.tokenService.saveToken({
                accessToken: access_token,
                expirationTime: expirationDate
            });
            this.logger.log('Tokens updated.');
        } catch (error) {
            // Log an error if the token refresh fails
            if (error instanceof _common.HttpException) {
                throw new _common.InternalServerErrorException('Failed to refresh Dropbox token', error.message);
            } else {
                throw new _common.InternalServerErrorException('Failed to refresh Dropbox token', error);
            }
        }
    }
};
DropboxService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _config.ConfigService === "undefined" ? Object : _config.ConfigService,
        typeof _common.Logger === "undefined" ? Object : _common.Logger,
        typeof _dropboxtokensservice.DropboxTokensService === "undefined" ? Object : _dropboxtokensservice.DropboxTokensService
    ])
], DropboxService);

//# sourceMappingURL=dropbox.service.js.map