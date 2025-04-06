// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GameStorageService", {
    enumerable: true,
    get: function() {
        return GameStorageService;
    }
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _invalidfileexception = require("../../../common/exceptions/invalid-file.exception");
const _dropboxservice = require("./dropbox.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let GameStorageService = class GameStorageService {
    constructor(dbx, config, logger){
        this.dbx = dbx;
        this.config = config;
        this.logger = logger;
        // Read game folder path from environment variable
        this.gameFolderPath = this.config.get('DROPBOX_GAME_FOLDER_PATH');
    }
    /**
   * Uploads a media file to Dropbox
   * @param file - The media file to upload
   * @param gameName - The name of the game
   * @param fileName - The name of the file
   * @param overwrite - Whether to overwrite the existing file
   * @returns The upload response data
   * @throws `BadRequestException` - If the input parameters are invalid
   * @throws `InvalidFileException` - If the file type is not allowed
   * @throws `InternalServerErrorException` - If there was an error uploading the media file
   */ async uploadFile(file, gameName, fileName, allowedMimeTypes, overwrite = false) {
        // Ensure valid access token
        await this.dbx.ensureValidAccessToken();
        // Validate input parameters
        if (!gameName || !fileName) {
            throw new _common.BadRequestException('Invalid parameters: gameName and fileName are required');
        }
        // Validate file type (adapt based on your requirements)
        if (!this.dbx.isValidMimeType(file.mimetype, allowedMimeTypes)) {
            throw new _invalidfileexception.InvalidFileException('Invalid file type.');
        }
        // Validate file isn't empty
        if (file.size === 0) {
            throw new _invalidfileexception.InvalidFileException('File is empty');
        }
        // Validate video file size (adapt based on your requirements)
        const MAXIMUM_SIZE = 150; // MBs
        if (file.size > MAXIMUM_SIZE * 1024 * 1024) {
            throw new _invalidfileexception.InvalidFileException(`File is too large. Maximum size allowed is ${MAXIMUM_SIZE}MB`);
        }
        // Log the upload message
        this.logger.log(`File ${file.originalname} uploaded to ${this.gameFolderPath}/${gameName}`);
        // Prepare the file to be uploaded
        const uploadPath = `${this.gameFolderPath}/${gameName}/${fileName}`;
        // Upload the file to Dropbox
        const uploadResponse = await this.dbx.dropboxClient.filesUpload({
            path: uploadPath,
            contents: file.buffer,
            mode: {
                '.tag': overwrite ? 'overwrite' : 'add'
            }
        });
        // Create a shared link for the uploaded file
        const sharedLinkResponse = await this.getSharedLink(uploadResponse.result.path_display);
        // Log the success message
        this.logger.log(`File ${uploadResponse.result.id} uploaded successfully`);
        // Return the upload response data
        return {
            ...uploadResponse.result,
            sharedLink: sharedLinkResponse
        };
    }
    /**
   * Renames a game directory in Dropbox
   * @param oldName - The name of the game to rename
   * @param newName - The new name of the game
   * @throws `BadRequestException` - If the input parameters are invalid
   */ async renameDirectory(gameName, oldName, newName) {
        // Ensure valid access token
        await this.dbx.ensureValidAccessToken();
        // Validate input parameters
        if (!gameName || !oldName || !newName) {
            throw new _common.BadRequestException('Invalid parameters: gameName, oldName, and newName are required.');
        }
        // Construct the path of the directory to rename
        const oldPath = `${this.gameFolderPath}/${gameName}`;
        const newPath = `${this.gameFolderPath}/${newName}`;
        // Log the renaming message
        this.logger.log(`Renaming game: ${oldPath} to ${newPath}`);
        // Rename the directory in Dropbox
        await this.dbx.dropboxClient.filesMoveV2({
            from_path: oldPath,
            to_path: newPath
        });
        // Log the success message
        this.logger.log(`Game directory ${oldPath} renamed successfully to ${newPath}`);
    }
    /**
   * Renames a file in Dropbox
   * @param gameName - The name of the game
   * @param oldName - The name of the file to rename
   * @param newName - The new name of the file
   */ async renameFile(gameName, oldName, newName) {
        // Ensure valid access token
        await this.dbx.ensureValidAccessToken();
        // Validate input parameters
        if (!gameName || !oldName || !newName) {
            throw new _common.BadRequestException('Invalid parameters: gameName, oldName, and newName are required.');
        }
        // Construct the path of the file to rename
        const oldPath = `${this.gameFolderPath}/${gameName}/${oldName}`;
        const newPath = `${this.gameFolderPath}/${gameName}/${newName}`;
        // Log the renaming message
        this.logger.log(`Renaming file: ${oldPath} to ${newPath}`);
        // Rename the file in Dropbox
        const remameResponse = await this.dbx.dropboxClient.filesMoveV2({
            from_path: oldPath,
            to_path: newPath
        });
        // Log the success message
        this.logger.log(`File ${oldPath} renamed to ${newPath} successfully`);
        // Create a shared link for the uploaded file
        const sharedLinkResponse = await this.getSharedLink(remameResponse.result.metadata.path_display);
        return {
            ...remameResponse.result.metadata,
            sharedLink: sharedLinkResponse
        };
    }
    /**
   * Deletes a directory from Dropbox
   * @param gameName - The name of the game to delete
   * @returns A promise that resolves when the directory is deleted
   * @throws `BadRequestException` - If the input parameters are invalid
   */ async deleteGame(gameName) {
        // Ensure valid access token
        await this.dbx.ensureValidAccessToken();
        // Validate input parameters
        if (!gameName) {
            throw new _common.BadRequestException('Invalid parameters: gameName is required');
        }
        // Construct the path of the directory to delete
        const directoryPath = `${this.gameFolderPath}/${gameName}`;
        // Log the deletion message
        this.logger.log(`Deleting directory: ${directoryPath}`);
        // Delete the directory from Dropbox
        await this.dbx.dropboxClient.filesDeleteV2({
            path: directoryPath
        });
        // Log the success message
        this.logger.log(`Directory ${directoryPath} deleted successfully`);
    }
    /**
   * Deletes a file from Game Storage
   * @param gameName - The name of the game
   * @param filePath - The path of the file to delete
   * @returns A promise that resolves when the file is deleted
   * @throws `BadRequestException` - If the input parameters are invalid
   */ async deleteFile(gameName, filePath) {
        // Ensure valid access token
        await this.dbx.ensureValidAccessToken();
        // Validate input parameters
        if (!gameName || !filePath) {
            throw new _common.BadRequestException('Invalid parameters: gameName and filePath are required');
        }
        // Construct the path of the file to delete
        const filePathToDelete = `${this.gameFolderPath}/${gameName}/${filePath}`;
        // Log the deletion message
        this.logger.log(`Deleting file: ${filePathToDelete}`);
        // Delete the file from Dropbox
        await this.dbx.dropboxClient.filesDeleteV2({
            path: filePathToDelete
        });
        // Log the success message
        this.logger.log(`File ${filePath} deleted successfully`);
    }
    /**
   * Creates a shared link for a file in Dropbox
   * @param path - The path of the file
   * @returns A promise that resolves with the shared link
   */ async getSharedLink(path) {
        let sharedLinkResponse;
        // Try to list existing shared links
        const existingLinks = await this.dbx.dropboxClient.sharingListSharedLinks({
            path
        });
        if (existingLinks.result.links.length > 0) {
            // If a shared link exists, use the first one
            sharedLinkResponse = existingLinks.result.links[0].url;
        } else {
            // If no shared link exists, create a new one
            sharedLinkResponse = (await this.dbx.dropboxClient.sharingCreateSharedLinkWithSettings({
                path
            })).result.url;
        }
        // Return the shared link with the raw=1 query parameter
        return sharedLinkResponse.replace('dl=0', 'raw=1');
    }
};
GameStorageService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _dropboxservice.DropboxService === "undefined" ? Object : _dropboxservice.DropboxService,
        typeof _config.ConfigService === "undefined" ? Object : _config.ConfigService,
        typeof _common.Logger === "undefined" ? Object : _common.Logger
    ])
], GameStorageService);

//# sourceMappingURL=game-storage.service.js.map