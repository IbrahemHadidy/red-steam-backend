// NodeJS path
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdminService", {
    enumerable: true,
    get: function() {
        return AdminService;
    }
});
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _common = require("@nestjs/common");
const _gamesservice = require("../../../repositories/sql/games/games.service");
const _gamestorageservice = require("../../../services/dropbox/game-storage.service");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AdminService = class AdminService {
    constructor(logger, game, storage){
        this.logger = logger;
        this.game = game;
        this.storage = storage;
    }
    /**
   * Create a new game
   * @param data An object containing the game data
   * @returns A success message
   */ async createGame(data) {
        this.logger.log(`Creating game`);
        try {
            // Upload thumbnail images sequentially
            const thumbnailEntries = {
                mainImage: await this.uploadFile(data.thumbnailEntries.mainImage, data.name, `thumbnails/mainImage${_path.default.extname(data.thumbnailEntries.mainImage.originalname)}`, [
                    'image/jpeg'
                ]),
                backgroundImage: await this.uploadFile(data.thumbnailEntries.backgroundImage, data.name, `thumbnails/backgroundImage${_path.default.extname(data.thumbnailEntries.backgroundImage.originalname)}`, [
                    'image/jpeg'
                ]),
                menuImg: await this.uploadFile(data.thumbnailEntries.menuImg, data.name, `thumbnails/menuImg${_path.default.extname(data.thumbnailEntries.menuImg.originalname)}`, [
                    'image/jpeg'
                ]),
                horizontalHeaderImage: await this.uploadFile(data.thumbnailEntries.horizontalHeaderImage, data.name, `thumbnails/horizontalHeaderImage${_path.default.extname(data.thumbnailEntries.horizontalHeaderImage.originalname)}`, [
                    'image/jpeg'
                ]),
                verticalHeaderImage: await this.uploadFile(data.thumbnailEntries.verticalHeaderImage, data.name, `thumbnails/verticalHeaderImage${_path.default.extname(data.thumbnailEntries.verticalHeaderImage.originalname)}`, [
                    'image/jpeg'
                ]),
                smallHeaderImage: await this.uploadFile(data.thumbnailEntries.smallHeaderImage, data.name, `thumbnails/smallHeaderImage${_path.default.extname(data.thumbnailEntries.smallHeaderImage.originalname)}`, [
                    'image/jpeg'
                ]),
                searchImage: await this.uploadFile(data.thumbnailEntries.searchImage, data.name, `thumbnails/searchImage${_path.default.extname(data.thumbnailEntries.searchImage.originalname)}`, [
                    'image/jpeg'
                ]),
                tabImage: await this.uploadFile(data.thumbnailEntries.tabImage, data.name, `thumbnails/tabImage${_path.default.extname(data.thumbnailEntries.tabImage.originalname)}`, [
                    'image/jpeg'
                ])
            };
            // Upload image entries sequentially
            const imageEntries = [];
            for (const imageEntry of data.imageEntries){
                const link = await this.uploadFile(imageEntry.image, data.name, `images/${imageEntry.order}${_path.default.extname(imageEntry.image.originalname)}`, [
                    'image/jpeg'
                ]);
                imageEntries.push({
                    featured: imageEntry.featured,
                    order: imageEntry.order,
                    link
                });
            }
            // Upload video entries sequentially
            const videoEntries = [];
            for (const videoEntry of data.videoEntries){
                const link = await this.uploadFile(videoEntry.video, data.name, `videos/${videoEntry.order}${_path.default.extname(videoEntry.video.originalname)}`, [
                    'video/webm'
                ]);
                const posterLink = await this.uploadFile(videoEntry.poster, data.name, `videos/${videoEntry.order}-poster${_path.default.extname(videoEntry.poster.originalname)}`, [
                    'image/jpeg'
                ]);
                videoEntries.push({
                    order: videoEntry.order,
                    link,
                    posterLink
                });
            }
            // Construct game data
            const gameData = {
                name: data.name,
                category: data.category,
                description: data.description,
                releaseDate: data.releaseDate,
                featured: data.featured,
                publishers: data.publishers,
                developers: data.developers,
                thumbnailEntries,
                imageEntries,
                videoEntries,
                pricing: data.pricing,
                tags: data.tags,
                features: data.features,
                languages: data.languages,
                platformEntries: data.platformEntries,
                link: data.link,
                about: data.about,
                mature: data.mature,
                matureDescription: data.matureDescription,
                systemRequirements: data.systemRequirements,
                legal: data.legal
            };
            // Create game
            const { id } = await this.game.create(gameData);
            // Return success message
            return {
                message: 'Game created successfully',
                id
            };
        } catch (e) {
            if (e instanceof Error) {
                this.logger.error(`Failed to create game: ${e.message}`, e.stack);
            }
            try {
                await this.storage.deleteGame(data.name);
                this.logger.log(`Game ${data.name} deleted from storage after failed creation.`);
            } catch (deleteError) {
                if (deleteError instanceof Error) {
                    this.logger.error(`Failed to delete game after creation error: ${deleteError.message}`, deleteError.stack);
                }
            }
            throw new _common.InternalServerErrorException('Failed to create game');
        }
    }
    /**
   * Update game by ID
   * @param data An object containing the updated game data and the ID of the game to update
   * @returns A message indicating the success of the operation
   */ async updateGame(data) {
        this.logger.log(`Updating game with ID: ${data.id}`);
        this.logger.verbose(`Updating game with data: ${JSON.stringify({
            ...data,
            addedVideos: data.addedVideos.map((v)=>v.order),
            addedScreenshots: data.addedScreenshots.map((s)=>s.order)
        })}`);
        // Get storage name
        const { storageName } = await this.game.getById(data.id);
        // Change the updated thumbnails
        const changedThumbnails = {
            mainImage: data.changedThumbnails.mainImage ? await this.uploadFile(data.changedThumbnails.mainImage, storageName, `thumbnails/mainImage${_path.default.extname(data.changedThumbnails.mainImage.originalname)}`, [
                'image/jpeg'
            ], true) : undefined,
            backgroundImage: data.changedThumbnails.backgroundImage ? await this.uploadFile(data.changedThumbnails.backgroundImage, storageName, `thumbnails/backgroundImage${_path.default.extname(data.changedThumbnails.backgroundImage.originalname)}`, [
                'image/jpeg'
            ], true) : undefined,
            menuImg: data.changedThumbnails.menuImg ? await this.uploadFile(data.changedThumbnails.menuImg, storageName, `thumbnails/menuImg${_path.default.extname(data.changedThumbnails.menuImg.originalname)}`, [
                'image/jpeg'
            ], true) : undefined,
            horizontalHeaderImage: data.changedThumbnails.horizontalHeaderImage ? await this.uploadFile(data.changedThumbnails.horizontalHeaderImage, storageName, `thumbnails/horizontalHeaderImage${_path.default.extname(data.changedThumbnails.horizontalHeaderImage.originalname)}`, [
                'image/jpeg'
            ], true) : undefined,
            verticalHeaderImage: data.changedThumbnails.verticalHeaderImage ? await this.uploadFile(data.changedThumbnails.verticalHeaderImage, storageName, `thumbnails/verticalHeaderImage${_path.default.extname(data.changedThumbnails.verticalHeaderImage.originalname)}`, [
                'image/jpeg'
            ], true) : undefined,
            smallHeaderImage: data.changedThumbnails.smallHeaderImage ? await this.uploadFile(data.changedThumbnails.smallHeaderImage, storageName, `thumbnails/smallHeaderImage${_path.default.extname(data.changedThumbnails.smallHeaderImage.originalname)}`, [
                'image/jpeg'
            ], true) : undefined,
            searchImage: data.changedThumbnails.searchImage ? await this.uploadFile(data.changedThumbnails.searchImage, storageName, `thumbnails/searchImage${_path.default.extname(data.changedThumbnails.searchImage.originalname)}`, [
                'image/jpeg'
            ], true) : undefined,
            tabImage: data.changedThumbnails.tabImage ? await this.uploadFile(data.changedThumbnails.tabImage, storageName, `thumbnails/tabImage${_path.default.extname(data.changedThumbnails.tabImage.originalname)}`, [
                'image/jpeg'
            ], true) : undefined
        };
        // Delete the deleted screenshots from storage
        if (data.deletedScreenshots) {
            for (const screenshot of data.deletedScreenshots){
                await this.deleteFile(storageName, `images/${screenshot.toString()}.jpg`);
            }
        }
        // Delete the deleted videos from storage
        if (data.deletedVideos) {
            for (const video of data.deletedVideos){
                await this.deleteFile(storageName, `videos/${video.toString()}.webm`);
                await this.deleteFile(storageName, `videos/${video.toString()}-poster.jpg`);
            }
        }
        // Rename the changed screenshots to their new orders
        const renamedScreenshots = [];
        if (data.changedScreenshots) {
            for (const entry of data.changedScreenshots){
                const screenshot = await this.renameFile(storageName, `images/${entry.oldOrder}.jpg`, `images/${entry.newOrder}.jpg`);
                renamedScreenshots.push({
                    oldOrder: entry.oldOrder,
                    newOrder: entry.newOrder,
                    link: screenshot
                });
            }
        }
        // Rename the changed videos to their new orders
        const renamedVideos = [];
        if (data.changedVideos) {
            for (const entry of data.changedVideos){
                const video = await this.renameFile(storageName, `videos/${entry.oldOrder}.webm`, `videos/${entry.newOrder}.webm`);
                const poster = await this.renameFile(storageName, `videos/${entry.oldOrder}-poster.jpg`, `videos/${entry.newOrder}-poster.jpg`);
                renamedVideos.push({
                    oldOrder: entry.oldOrder,
                    newOrder: entry.newOrder,
                    videoLink: video,
                    posterLink: poster
                });
            }
        }
        // Add the new screenshots to storage
        const newScreenshots = [];
        if (data.addedScreenshots) {
            for (const entry of data.addedScreenshots){
                const screenshot = await this.storage.uploadFile(entry.image, storageName, `images/${entry.image.originalname}`, [
                    'image/jpeg'
                ]);
                newScreenshots.push({
                    featured: entry.featured,
                    order: entry.order,
                    link: screenshot.sharedLink
                });
            }
        }
        // Add the new videos to storage
        const newVideos = [];
        if (data.addedVideos) {
            for (const entry of data.addedVideos){
                const video = await this.storage.uploadFile(entry.video, storageName, `videos/${entry.order}${_path.default.extname(entry.video.originalname)}`, [
                    'video/webm'
                ]);
                const poster = await this.storage.uploadFile(entry.poster, storageName, `videos/${entry.order}-poster${_path.default.extname(entry.poster.originalname)}`, [
                    'image/jpeg'
                ]);
                newVideos.push({
                    order: entry.order,
                    link: video.sharedLink,
                    posterLink: poster.sharedLink
                });
            }
        }
        const gameData = {
            name: data.name,
            category: data.category,
            description: data.description,
            releaseDate: data.releaseDate,
            publishers: data.publishers,
            developers: data.developers,
            changedThumbnails,
            deletedScreenshots: data.deletedScreenshots,
            deletedVideos: data.deletedVideos,
            renamedScreenshots,
            renamedVideos,
            addedScreenshots: newScreenshots,
            addedVideos: newVideos,
            featuredOrders: data.featuredOrders,
            tags: data.tags,
            pricing: data.pricing,
            features: data.features,
            languages: data.languages,
            featured: data.featured,
            platformEntries: data.platformEntries,
            link: data.link,
            about: data.about,
            mature: data.mature,
            matureDescription: data.matureDescription,
            systemRequirements: data.systemRequirements,
            legal: data.legal
        };
        // Create game
        await this.game.update(data.id, gameData);
        // Return success message
        return {
            message: 'Game updated successfully'
        };
    }
    /**
   * Delete game by ID
   * @param id The ID of the game
   * @returns A message indicating the success of the operation
   */ async delete(id) {
        this.logger.log(`Deleting game with ID: ${id}`);
        // Get game data
        const game = await this.game.getById(id);
        // Delete game files
        await this.storage.deleteGame(game.name);
        // Delete game
        await this.game.remove(id);
        // Return success message
        return {
            message: 'Game deleted successfully'
        };
    }
    /**
   * Upload a file to the storage
   * @param file The file to upload
   * @param name The name of the file
   * @param filePath The path of the file
   * @returns The shared link of the file
   */ async uploadFile(file, name, filePath, allowedMimeTypes, overwrite) {
        const result = await this.storage.uploadFile(file, name, filePath, allowedMimeTypes, overwrite);
        return result.sharedLink;
    }
    /**
   * Rename a file in the storage
   * @param file The file to rename
   * @param name The new name of the file
   * @param filePath The path of the file
   * @returns The shared link of the file
   */ async renameFile(gameName, oldName, newName) {
        const result = await this.storage.renameFile(gameName, oldName, newName);
        return result.sharedLink;
    }
    /**
   * Delete a file from the storage
   * @param file The file to delete
   * @param name The name of the file
   * @param filePath The path of the file
   */ async deleteFile(gameName, filePath) {
        await this.storage.deleteFile(gameName, filePath);
    }
};
AdminService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _common.Logger === "undefined" ? Object : _common.Logger,
        typeof _gamesservice.GamesService === "undefined" ? Object : _gamesservice.GamesService,
        typeof _gamestorageservice.GameStorageService === "undefined" ? Object : _gamestorageservice.GameStorageService
    ])
], AdminService);

//# sourceMappingURL=admin.service.js.map