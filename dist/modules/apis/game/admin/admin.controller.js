// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdminController", {
    enumerable: true,
    get: function() {
        return AdminController;
    }
});
const _common = require("@nestjs/common");
const _fastifymulter = require("@nest-lab/fastify-multer");
const _swagger = require("@nestjs/swagger");
const _apidescriptordecorator = require("../../../../common/decorators/api-descriptor.decorator");
const _parsejsonpipe = require("../../../../common/pipes/parse-json.pipe");
const _adminguard = require("../../../../common/guards/admin.guard");
const _jwtaccessauthguard = require("../../../../common/guards/jwt-access-auth.guard");
const _adminservice = require("./admin.service");
const _creategamedto = require("./dtos/create-game.dto");
const _updategamedto = require("./dtos/update-game.dto");
const _creategamedescriptor = require("./api-descriptors/create-game.descriptor");
const _updategamedescriptor = require("./api-descriptors/update-game.descriptor");
const _deletegamedescriptor = require("./api-descriptors/delete-game.descriptor");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let AdminController = class AdminController {
    constructor(adminService){
        this.adminService = adminService;
    }
    async create(media, bodyData) {
        // Process files and map them to the appropriate fields
        const filesMap = media.reduce((acc, file)=>{
            acc[file.fieldname] = file;
            return acc;
        }, {});
        // Type the body after validating using ParseJsonPipe to prevent validating the stringified body (which will fail)
        const body = bodyData;
        // Map the files to the DTO structure
        const data = {
            ...body,
            thumbnailEntries: {
                mainImage: filesMap['mainImage'],
                backgroundImage: filesMap['backgroundImage'],
                menuImg: filesMap['menuImg'],
                horizontalHeaderImage: filesMap['horizontalHeaderImage'],
                verticalHeaderImage: filesMap['verticalHeaderImage'],
                smallHeaderImage: filesMap['smallHeaderImage'],
                searchImage: filesMap['searchImage'],
                tabImage: filesMap['tabImage']
            },
            imageEntries: body.imageEntries.map((imageEntry)=>({
                    ...imageEntry,
                    image: filesMap[imageEntry.order.toString()]
                })),
            videoEntries: body.videoEntries ? body.videoEntries.map((videoEntry)=>({
                    ...videoEntry,
                    video: filesMap[videoEntry.order.toString()],
                    poster: filesMap[`${videoEntry.order.toString()}-poster`]
                })) : []
        };
        // Pass the constructed data object to the service
        const result = await this.adminService.createGame(data);
        // Return the result
        return result;
    }
    async updateGame(id, media, bodyData) {
        // Process files and map them to the appropriate fields
        const filesMap = media.reduce((acc, file)=>{
            acc[file.fieldname] = file;
            return acc;
        }, {});
        // Type the body after validating using ParseJsonPipe to prevent validating the stringified body (which will fail)
        const body = bodyData;
        // Map the files to the DTO structure
        const data = {
            ...body,
            id,
            changedThumbnails: {
                mainImage: filesMap['mainImage'],
                backgroundImage: filesMap['backgroundImage'],
                menuImg: filesMap['menuImg'],
                horizontalHeaderImage: filesMap['horizontalHeaderImage'],
                verticalHeaderImage: filesMap['verticalHeaderImage'],
                smallHeaderImage: filesMap['smallHeaderImage'],
                searchImage: filesMap['searchImage'],
                tabImage: filesMap['tabImage']
            },
            addedScreenshots: body.addedScreenshots && body.addedScreenshots.map((imageEntry)=>({
                    ...imageEntry,
                    image: filesMap[imageEntry.order.toString()]
                })),
            addedVideos: body.addedVideos && body.addedVideos.map((videoEntry)=>({
                    ...videoEntry,
                    video: filesMap[videoEntry.order.toString()],
                    poster: filesMap[`${videoEntry.order.toString()}-poster`]
                }))
        };
        // Pass the constructed data object to the service
        const result = await this.adminService.updateGame(data);
        // Return the result
        return result;
    }
    async deleteGame(id) {
        const result = await this.adminService.delete(id);
        // Send the response
        return result;
    }
};
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_creategamedescriptor.createGameDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard, _adminguard.AdminGuard),
    (0, _common.UseInterceptors)((0, _fastifymulter.AnyFilesInterceptor)()),
    (0, _common.Post)(),
    (0, _common.HttpCode)(201),
    _ts_param(0, (0, _common.UploadedFiles)()),
    _ts_param(1, (0, _common.Body)('body', new _parsejsonpipe.ParseJsonPipe(_creategamedto.CreateGameDto, {
        validate: true,
        excludeExtraneousValues: false
    }))),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Array,
        void 0
    ]),
    _ts_metadata("design:returntype", Promise)
], AdminController.prototype, "create", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_updategamedescriptor.updateGameDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard, _adminguard.AdminGuard),
    (0, _common.UseInterceptors)((0, _fastifymulter.AnyFilesInterceptor)()),
    (0, _common.Patch)('/:id'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_param(1, (0, _common.UploadedFiles)()),
    _ts_param(2, (0, _common.Body)('body', new _parsejsonpipe.ParseJsonPipe(_updategamedto.UpdateGameDto, {
        validate: true,
        excludeExtraneousValues: false
    }))),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number,
        Array,
        void 0
    ]),
    _ts_metadata("design:returntype", Promise)
], AdminController.prototype, "updateGame", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_deletegamedescriptor.deleteGameDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard, _adminguard.AdminGuard),
    (0, _common.Delete)('/:id'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", Promise)
], AdminController.prototype, "deleteGame", null);
AdminController = _ts_decorate([
    (0, _swagger.ApiTags)('Game Admin'),
    (0, _common.Controller)('game/admin'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _adminservice.AdminService === "undefined" ? Object : _adminservice.AdminService
    ])
], AdminController);

//# sourceMappingURL=admin.controller.js.map