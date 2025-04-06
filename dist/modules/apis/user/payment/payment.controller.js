// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PaymentController", {
    enumerable: true,
    get: function() {
        return PaymentController;
    }
});
const _common = require("@nestjs/common");
const _fastify = require("fastify");
const _apidescriptordecorator = require("../../../../common/decorators/api-descriptor.decorator");
const _swagger = require("@nestjs/swagger");
const _jwtaccessauthguard = require("../../../../common/guards/jwt-access-auth.guard");
const _verifieduserguard = require("../../../../common/guards/verified-user.guard");
const _paymentservice = require("./payment.service");
const _captureorderdto = require("./dtos/capture-order.dto");
const _createorderdto = require("./dtos/create-order.dto");
const _captureorderdescriptor = require("./api-descriptors/capture-order.descriptor");
const _createorderdescriptor = require("./api-descriptors/create-order.descriptor");
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
let PaymentController = class PaymentController {
    constructor(paymentService){
        this.paymentService = paymentService;
    }
    async createOrder(request, bodyData) {
        const data = {
            ...bodyData,
            userId: request['userId']
        };
        const result = await this.paymentService.createOrder(data);
        // Send the response
        return result;
    }
    async captureOrder(request, bodyData) {
        const data = {
            ...bodyData,
            userId: request['userId']
        };
        const result = await this.paymentService.captureOrder(data);
        // Send the response
        return result;
    }
};
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_createorderdescriptor.createOrderDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard, _verifieduserguard.VerifiedUserGuard),
    (0, _common.Post)('order/create'),
    (0, _common.HttpCode)(201),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _fastify.FastifyRequest === "undefined" ? Object : _fastify.FastifyRequest,
        typeof _createorderdto.CreateOrderDto === "undefined" ? Object : _createorderdto.CreateOrderDto
    ]),
    _ts_metadata("design:returntype", Promise)
], PaymentController.prototype, "createOrder", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_captureorderdescriptor.captureOrderDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard, _verifieduserguard.VerifiedUserGuard),
    (0, _common.Post)('order/capture'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _fastify.FastifyRequest === "undefined" ? Object : _fastify.FastifyRequest,
        typeof _captureorderdto.CaptureOrderDto === "undefined" ? Object : _captureorderdto.CaptureOrderDto
    ]),
    _ts_metadata("design:returntype", Promise)
], PaymentController.prototype, "captureOrder", null);
PaymentController = _ts_decorate([
    (0, _swagger.ApiTags)('User Payment'),
    (0, _common.Controller)('user/payment'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _paymentservice.PaymentService === "undefined" ? Object : _paymentservice.PaymentService
    ])
], PaymentController);

//# sourceMappingURL=payment.controller.js.map