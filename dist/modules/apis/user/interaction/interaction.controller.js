// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "InteractionController", {
    enumerable: true,
    get: function() {
        return InteractionController;
    }
});
const _common = require("@nestjs/common");
const _fastify = require("fastify");
const _apidescriptordecorator = require("../../../../common/decorators/api-descriptor.decorator");
const _swagger = require("@nestjs/swagger");
const _jwtaccessauthguard = require("../../../../common/guards/jwt-access-auth.guard");
const _interactionservice = require("./interaction.service");
const _addtocartdto = require("./dtos/add-to-cart.dto");
const _addtolibrarydto = require("./dtos/add-to-library.dto");
const _addtowishlistdto = require("./dtos/add-to-wishlist.dto");
const _changetagsdto = require("./dtos/change-tags.dto");
const _removefromcartdto = require("./dtos/remove-from-cart.dto");
const _removefromlibrarydto = require("./dtos/remove-from-library.dto");
const _removefromwishlistdto = require("./dtos/remove-from-wishlist.dto");
const _reviewgamedto = require("./dtos/review-game.dto");
const _updatereviewdto = require("./dtos/update-review.dto");
const _addtocartdescriptor = require("./api-descriptors/add-to-cart.descriptor");
const _addtolibrarydescriptor = require("./api-descriptors/add-to-library.descriptor");
const _addtowishlistdescriptor = require("./api-descriptors/add-to-wishlist.descriptor");
const _changetagsdescriptor = require("./api-descriptors/change-tags.descriptor");
const _checkreviewdescriptor = require("./api-descriptors/check-review.descriptor");
const _getcartdescriptor = require("./api-descriptors/get-cart.descriptor");
const _getlibrarydescriptor = require("./api-descriptors/get-library.descriptor");
const _getreviewsdescriptor = require("./api-descriptors/get-reviews.descriptor");
const _gettagsdescriptor = require("./api-descriptors/get-tags.descriptor");
const _getwishlistdescriptor = require("./api-descriptors/get-wishlist.descriptor");
const _removefromcartdescriptor = require("./api-descriptors/remove-from-cart.descriptor");
const _removefromlibrarydescriptor = require("./api-descriptors/remove-from-library.descriptor");
const _removefromwishlistdescriptor = require("./api-descriptors/remove-from-wishlist.descriptor");
const _reviewgamedescriptor = require("./api-descriptors/review-game.descriptor");
const _updatereviewdescriptor = require("./api-descriptors/update-review.descriptor");
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
let InteractionController = class InteractionController {
    constructor(interactionService){
        this.interactionService = interactionService;
    }
    async changeTags(request, bodyData) {
        const data = {
            ...bodyData,
            userId: request['userId']
        };
        const result = await this.interactionService.changeTags(data);
        // Send the response
        return result;
    }
    async getTags(request) {
        const data = {
            userId: request['userId']
        };
        const result = await this.interactionService.getTags(data);
        // Send the response
        return result;
    }
    async addToLibrary(request, bodyData) {
        const data = {
            ...bodyData,
            userId: request['userId']
        };
        const result = await this.interactionService.addToLibrary(data);
        // Send the response
        return result;
    }
    async removeFromLibrary(request, bodyData) {
        const userId = request['userId'];
        let result;
        if (bodyData && bodyData.itemsIds) {
            const data = {
                userId,
                itemsIds: bodyData.itemsIds
            };
            result = await this.interactionService.removeFromLibrary(data);
        } else {
            const data = {
                userId
            };
            result = await this.interactionService.clearLibrary(data);
        }
        // Send the response
        return result;
    }
    async addToWishlist(request, bodyData) {
        const data = {
            ...bodyData,
            userId: request['userId']
        };
        const result = await this.interactionService.addToWishlist(data);
        // Send the response
        return result;
    }
    async removeFromWishlist(request, bodyData) {
        const userId = request['userId'];
        let result;
        if (bodyData && bodyData.itemsIds) {
            const data = {
                userId,
                itemsIds: bodyData.itemsIds
            };
            result = await this.interactionService.removeFromWishlist(data);
        } else {
            const data = {
                userId
            };
            result = await this.interactionService.clearWishlist(data);
        }
        // Send the response
        return result;
    }
    async addToCart(request, bodyData) {
        const data = {
            ...bodyData,
            userId: request['userId']
        };
        const result = await this.interactionService.addToCart(data);
        // Send the response
        return result;
    }
    async removeFromCart(request, bodyData) {
        const userId = request['userId'];
        let result;
        if (bodyData && bodyData.itemsIds) {
            const data = {
                userId,
                itemsIds: bodyData.itemsIds
            };
            result = await this.interactionService.removeFromCart(data);
        } else {
            const data = {
                userId
            };
            result = await this.interactionService.clearCart(data);
        }
        // Send the response
        return result;
    }
    async getLibrary(request) {
        const data = {
            userId: request['userId']
        };
        const result = await this.interactionService.getLibrary(data);
        // Send the response
        return result;
    }
    async getCart(request) {
        const data = {
            userId: request['userId']
        };
        const result = await this.interactionService.getCart(data);
        // Send the response
        return result;
    }
    async getWishlist(request) {
        const data = {
            userId: request['userId']
        };
        const result = await this.interactionService.getWishlist(data);
        // Send the response
        return result;
    }
    async reviewGame(request, bodyData) {
        const data = {
            ...bodyData,
            userId: request['userId']
        };
        const result = await this.interactionService.reviewGame(data);
        // Send the response
        return result;
    }
    async updateReview(bodyData) {
        const result = await this.interactionService.updateReview(bodyData);
        // Send the response
        return result;
    }
    async checkReview(request, gameId) {
        const data = {
            userId: request['userId'],
            gameId
        };
        const result = await this.interactionService.hasReviewedGame(data);
        // Send the response
        return result;
    }
    async getReviews(request) {
        const data = {
            userId: request['userId']
        };
        const result = await this.interactionService.getReviews(data);
        // Send the response
        return result;
    }
};
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_changetagsdescriptor.changeTagsDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard),
    (0, _common.Put)('tags'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _fastify.FastifyRequest === "undefined" ? Object : _fastify.FastifyRequest,
        typeof _changetagsdto.ChangeTagsDto === "undefined" ? Object : _changetagsdto.ChangeTagsDto
    ]),
    _ts_metadata("design:returntype", Promise)
], InteractionController.prototype, "changeTags", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_gettagsdescriptor.getTagsDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard),
    (0, _common.Get)('tags'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Req)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _fastify.FastifyRequest === "undefined" ? Object : _fastify.FastifyRequest
    ]),
    _ts_metadata("design:returntype", Promise)
], InteractionController.prototype, "getTags", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_addtolibrarydescriptor.addToLibraryDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard),
    (0, _common.Post)('library'),
    (0, _common.HttpCode)(201),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _fastify.FastifyRequest === "undefined" ? Object : _fastify.FastifyRequest,
        typeof _addtolibrarydto.AddToLibraryDto === "undefined" ? Object : _addtolibrarydto.AddToLibraryDto
    ]),
    _ts_metadata("design:returntype", Promise)
], InteractionController.prototype, "addToLibrary", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_removefromlibrarydescriptor.removeFromLibraryDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard),
    (0, _common.Delete)('library'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _fastify.FastifyRequest === "undefined" ? Object : _fastify.FastifyRequest,
        typeof _removefromlibrarydto.RemoveFromLibraryDto === "undefined" ? Object : _removefromlibrarydto.RemoveFromLibraryDto
    ]),
    _ts_metadata("design:returntype", Promise)
], InteractionController.prototype, "removeFromLibrary", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_addtowishlistdescriptor.addToWishlistDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard),
    (0, _common.Post)('wishlist'),
    (0, _common.HttpCode)(201),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _fastify.FastifyRequest === "undefined" ? Object : _fastify.FastifyRequest,
        typeof _addtowishlistdto.AddToWishlistDto === "undefined" ? Object : _addtowishlistdto.AddToWishlistDto
    ]),
    _ts_metadata("design:returntype", Promise)
], InteractionController.prototype, "addToWishlist", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_removefromwishlistdescriptor.removeFromWishlistDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard),
    (0, _common.Delete)('wishlist'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _fastify.FastifyRequest === "undefined" ? Object : _fastify.FastifyRequest,
        typeof _removefromwishlistdto.RemoveFromWishlistDto === "undefined" ? Object : _removefromwishlistdto.RemoveFromWishlistDto
    ]),
    _ts_metadata("design:returntype", Promise)
], InteractionController.prototype, "removeFromWishlist", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_addtocartdescriptor.addToCartDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard),
    (0, _common.Post)('cart'),
    (0, _common.HttpCode)(201),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _fastify.FastifyRequest === "undefined" ? Object : _fastify.FastifyRequest,
        typeof _addtocartdto.AddToCartDto === "undefined" ? Object : _addtocartdto.AddToCartDto
    ]),
    _ts_metadata("design:returntype", Promise)
], InteractionController.prototype, "addToCart", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_removefromcartdescriptor.removeFromCartDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard),
    (0, _common.Delete)('cart'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _fastify.FastifyRequest === "undefined" ? Object : _fastify.FastifyRequest,
        typeof _removefromcartdto.RemoveFromCartDto === "undefined" ? Object : _removefromcartdto.RemoveFromCartDto
    ]),
    _ts_metadata("design:returntype", Promise)
], InteractionController.prototype, "removeFromCart", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_getlibrarydescriptor.getLibraryDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard),
    (0, _common.Get)('library'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Req)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _fastify.FastifyRequest === "undefined" ? Object : _fastify.FastifyRequest
    ]),
    _ts_metadata("design:returntype", Promise)
], InteractionController.prototype, "getLibrary", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_getcartdescriptor.getCartDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard),
    (0, _common.Get)('cart'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Req)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _fastify.FastifyRequest === "undefined" ? Object : _fastify.FastifyRequest
    ]),
    _ts_metadata("design:returntype", Promise)
], InteractionController.prototype, "getCart", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_getwishlistdescriptor.getWishlistDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard),
    (0, _common.Get)('wishlist'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Req)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _fastify.FastifyRequest === "undefined" ? Object : _fastify.FastifyRequest
    ]),
    _ts_metadata("design:returntype", Promise)
], InteractionController.prototype, "getWishlist", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_reviewgamedescriptor.reviewGameDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard),
    (0, _common.Post)('review'),
    (0, _common.HttpCode)(201),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _fastify.FastifyRequest === "undefined" ? Object : _fastify.FastifyRequest,
        typeof _reviewgamedto.ReviewGameDto === "undefined" ? Object : _reviewgamedto.ReviewGameDto
    ]),
    _ts_metadata("design:returntype", Promise)
], InteractionController.prototype, "reviewGame", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_updatereviewdescriptor.updateReviewDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard),
    (0, _common.Put)('review'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _updatereviewdto.UpdateReviewDto === "undefined" ? Object : _updatereviewdto.UpdateReviewDto
    ]),
    _ts_metadata("design:returntype", Promise)
], InteractionController.prototype, "updateReview", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_checkreviewdescriptor.checkReviewDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard),
    (0, _common.Get)('check-review/:gameId'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Param)('gameId', _common.ParseIntPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _fastify.FastifyRequest === "undefined" ? Object : _fastify.FastifyRequest,
        Number
    ]),
    _ts_metadata("design:returntype", Promise)
], InteractionController.prototype, "checkReview", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_getreviewsdescriptor.getReviewsDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard),
    (0, _common.Get)('reviews'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Req)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _fastify.FastifyRequest === "undefined" ? Object : _fastify.FastifyRequest
    ]),
    _ts_metadata("design:returntype", Promise)
], InteractionController.prototype, "getReviews", null);
InteractionController = _ts_decorate([
    (0, _swagger.ApiTags)('User Interaction'),
    (0, _common.Controller)('user/interaction'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _interactionservice.InteractionService === "undefined" ? Object : _interactionservice.InteractionService
    ])
], InteractionController);

//# sourceMappingURL=interaction.controller.js.map