// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AvatarStorageService", {
    enumerable: true,
    get: function() {
        return AvatarStorageService;
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
let AvatarStorageService = class AvatarStorageService {
    constructor(dbx, config, logger){
        this.dbx = dbx;
        this.config = config;
        this.logger = logger;
        // Read avatar folder path from environment variable
        this.avatarFolderPath = this.config.get('DROPBOX_AVATAR_FOLDER_PATH');
    }
    /**
   * Uploads an avatar to Dropbox
   * @param avatar - The avatar file to upload
   * @returns The upload response data
   * @throws `InvalidFileException` - If the file type is not allowed
   * @throws `InternalServerErrorException` - If there was an error uploading the avatar
   */ async uploadAvatar(avatar) {
        // Ensure valid access token
        await this.dbx.ensureValidAccessToken();
        // Validate file type (adapt based on your requirements)
        const allowedMimeTypes = [
            'image/jpeg',
            'image/png',
            'image/webp'
        ];
        if (!this.dbx.isValidMimeType(avatar.mimetype, allowedMimeTypes)) {
            throw new _invalidfileexception.InvalidFileException('Invalid file type. Only JPEG and PNG images allowed.');
        }
        // Validate file isn't empty
        if (avatar.size === 0) {
            throw new _invalidfileexception.InvalidFileException('File is empty');
        }
        // Validate file size (adapt based on your requirements)
        if (avatar.size > 5 * 1024 * 1024) {
            throw new _invalidfileexception.InvalidFileException('File is too large. Maximum size allowed is 5MB.');
        }
        // Prepare the file to be uploaded
        const fileName = `avatar-${Date.now()}-${avatar.originalname}`;
        const uploadPath = `${this.avatarFolderPath}/${fileName}`;
        // Upload the file to Dropbox
        const uploadResponse = await this.dbx.dropboxClient.filesUpload({
            path: uploadPath,
            contents: avatar.buffer,
            mode: {
                '.tag': 'add'
            }
        });
        // Create a shared link for the uploaded file
        const sharedLinkResponse = await this.dbx.dropboxClient.sharingCreateSharedLinkWithSettings({
            path: uploadResponse.result.path_display
        });
        // Log the success message
        this.logger.log(`Avatar ${uploadResponse.result.id} uploaded successfully`);
        // Return the upload response data
        return {
            ...uploadResponse.result,
            sharedLink: sharedLinkResponse.result.url.replace('dl=0', 'raw=1')
        };
    }
    /**
   * Deletes an avatar from Dropbox
   * @param filePath - The path of the avatar file to delete
   * @returns A promise that resolves when the avatar is deleted
   */ async deleteAvatar(filePath) {
        // Ensure valid access token
        await this.dbx.ensureValidAccessToken();
        // Log the deletion message
        this.logger.log(`Deleting avatar file: ${filePath}`);
        // Delete the avatar file from Dropbox
        await this.dbx.dropboxClient.filesDeleteV2({
            path: filePath
        });
        // Log the success message
        this.logger.log(`Avatar ${filePath} deleted successfully`);
    }
};
AvatarStorageService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _dropboxservice.DropboxService === "undefined" ? Object : _dropboxservice.DropboxService,
        typeof _config.ConfigService === "undefined" ? Object : _config.ConfigService,
        typeof _common.Logger === "undefined" ? Object : _common.Logger
    ])
], AvatarStorageService);

//# sourceMappingURL=avatar-storage.service.js.map