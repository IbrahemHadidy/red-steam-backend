// Class-transformer
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PaginatedFeaturesDataDto", {
    enumerable: true,
    get: function() {
        return PaginatedFeaturesDataDto;
    }
});
const _classtransformer = require("class-transformer");
const _featuredto = require("./feature.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let PaginatedFeaturesDataDto = class PaginatedFeaturesDataDto {
};
_ts_decorate([
    (0, _classtransformer.Expose)(),
    (0, _classtransformer.Type)(()=>_featuredto.FeatureDto),
    _ts_metadata("design:type", typeof FeatureType === "undefined" ? Object : FeatureType)
], PaginatedFeaturesDataDto.prototype, "items", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", Number)
], PaginatedFeaturesDataDto.prototype, "total", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", Number)
], PaginatedFeaturesDataDto.prototype, "totalPages", void 0);

//# sourceMappingURL=paginated-features-data.dto.js.map