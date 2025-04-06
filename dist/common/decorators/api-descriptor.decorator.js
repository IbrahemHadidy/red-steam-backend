// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApiDescriptor", {
    enumerable: true,
    get: function() {
        return ApiDescriptor;
    }
});
const _common = require("@nestjs/common");
const _swagger = require("@nestjs/swagger");
function ApiDescriptor(options) {
    const { summary, description, parameters, body, responses, tags, security, queries, headers, authBearer, oauth2, exclude, consumes } = options;
    return (0, _common.applyDecorators)((0, _swagger.ApiOperation)({
        summary,
        description
    }), ...parameters?.map((parameter)=>(0, _swagger.ApiParam)(parameter)) || [], ...body && [
        (0, _swagger.ApiBody)(body)
    ] || [], ...responses?.map((response)=>(0, _swagger.ApiResponse)(response)) || [], ...tags && [
        (0, _swagger.ApiTags)(...tags)
    ] || [], ...security?.map((security)=>(0, _swagger.ApiSecurity)(security)) || [], ...queries?.map((query)=>(0, _swagger.ApiQuery)(query)) || [], ...headers && [
        (0, _swagger.ApiHeaders)(headers)
    ] || [], ...authBearer && [
        (0, _swagger.ApiBearerAuth)(authBearer)
    ] || [], ...oauth2 && [
        (0, _swagger.ApiOAuth2)(oauth2.scopes)
    ] || [], ...exclude && [
        (0, _swagger.ApiExcludeEndpoint)(exclude)
    ] || [], ...consumes && [
        (0, _swagger.ApiConsumes)(...consumes)
    ] || []);
}

//# sourceMappingURL=api-descriptor.decorator.js.map