// Class-transformer
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GameDto", {
    enumerable: true,
    get: function() {
        return GameDto;
    }
});
const _classtransformer = require("class-transformer");
const _companydto = require("../../company/serializer-dtos/company.dto");
const _featuredto = require("../../feature/serializer-dtos/feature.dto");
const _languagedto = require("../../language/serializer-dtos/language.dto");
const _reviewdto = require("../../review/serializer-dtos/review.dto");
const _tagdto = require("../../tag/serializer-dtos/tag.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ThumbnailEntriesDto = class ThumbnailEntriesDto {
};
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", String)
], ThumbnailEntriesDto.prototype, "mainImage", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", String)
], ThumbnailEntriesDto.prototype, "backgroundImage", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", String)
], ThumbnailEntriesDto.prototype, "menuImg", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", String)
], ThumbnailEntriesDto.prototype, "horizontalHeaderImage", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", String)
], ThumbnailEntriesDto.prototype, "verticalHeaderImage", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", String)
], ThumbnailEntriesDto.prototype, "smallHeaderImage", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", String)
], ThumbnailEntriesDto.prototype, "searchImage", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", String)
], ThumbnailEntriesDto.prototype, "tabImage", void 0);
let ImageEntriesDto = class ImageEntriesDto {
};
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", String)
], ImageEntriesDto.prototype, "link", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", Boolean)
], ImageEntriesDto.prototype, "featured", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", Number)
], ImageEntriesDto.prototype, "order", void 0);
let VideoEntriesDto = class VideoEntriesDto {
};
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", String)
], VideoEntriesDto.prototype, "link", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", Boolean)
], VideoEntriesDto.prototype, "posterLink", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", Number)
], VideoEntriesDto.prototype, "order", void 0);
let PlatformEntryDto = class PlatformEntryDto {
};
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", Boolean)
], PlatformEntryDto.prototype, "win", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", Boolean)
], PlatformEntryDto.prototype, "mac", void 0);
let languageSupportDto = class languageSupportDto {
};
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", String)
], languageSupportDto.prototype, "name", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", Boolean)
], languageSupportDto.prototype, "interface", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", Boolean)
], languageSupportDto.prototype, "fullAudio", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", Boolean)
], languageSupportDto.prototype, "subtitles", void 0);
let SystemRequirementEntryDto = class SystemRequirementEntryDto {
};
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", Boolean)
], SystemRequirementEntryDto.prototype, "req64", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    (0, _classtransformer.Type)(()=>SystemRequirementsDetailsDto),
    _ts_metadata("design:type", Array)
], SystemRequirementEntryDto.prototype, "mini", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    (0, _classtransformer.Type)(()=>SystemRequirementsDetailsDto),
    _ts_metadata("design:type", Array)
], SystemRequirementEntryDto.prototype, "recommended", void 0);
let SystemRequirementsDetailsDto = class SystemRequirementsDetailsDto {
};
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", String)
], SystemRequirementsDetailsDto.prototype, "os", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", String)
], SystemRequirementsDetailsDto.prototype, "cpu", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", String)
], SystemRequirementsDetailsDto.prototype, "ram", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", String)
], SystemRequirementsDetailsDto.prototype, "gpu", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", String)
], SystemRequirementsDetailsDto.prototype, "dx", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", String)
], SystemRequirementsDetailsDto.prototype, "network", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", String)
], SystemRequirementsDetailsDto.prototype, "storage", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", String)
], SystemRequirementsDetailsDto.prototype, "additionalNotes", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", String)
], SystemRequirementsDetailsDto.prototype, "soundCard", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", String)
], SystemRequirementsDetailsDto.prototype, "vrSupport", void 0);
let PricingDto = class PricingDto {
};
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", Number)
], PricingDto.prototype, "id", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", Boolean)
], PricingDto.prototype, "free", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", String)
], PricingDto.prototype, "basePrice", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", Boolean)
], PricingDto.prototype, "discount", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", Number)
], PricingDto.prototype, "discountPercentage", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", String)
], PricingDto.prototype, "discountPrice", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PricingDto.prototype, "discountStartDate", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PricingDto.prototype, "discountEndDate", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", String)
], PricingDto.prototype, "offerType", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", String)
], PricingDto.prototype, "price", void 0);
let GameDto = class GameDto {
};
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", String)
], GameDto.prototype, "id", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", String)
], GameDto.prototype, "name", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", String)
], GameDto.prototype, "category", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", String)
], GameDto.prototype, "description", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], GameDto.prototype, "releaseDate", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", Boolean)
], GameDto.prototype, "featured", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    (0, _classtransformer.Type)(()=>_companydto.CompanyDto),
    _ts_metadata("design:type", Array)
], GameDto.prototype, "publishers", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    (0, _classtransformer.Type)(()=>_companydto.CompanyDto),
    _ts_metadata("design:type", Array)
], GameDto.prototype, "developers", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    (0, _classtransformer.Type)(()=>ThumbnailEntriesDto),
    _ts_metadata("design:type", Array)
], GameDto.prototype, "thumbnailEntries", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    (0, _classtransformer.Type)(()=>ImageEntriesDto),
    _ts_metadata("design:type", Array)
], GameDto.prototype, "imageEntries", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    (0, _classtransformer.Type)(()=>VideoEntriesDto),
    _ts_metadata("design:type", Array)
], GameDto.prototype, "videoEntries", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    (0, _classtransformer.Type)(()=>_tagdto.TagDto),
    _ts_metadata("design:type", Array)
], GameDto.prototype, "tags", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    (0, _classtransformer.Type)(()=>PricingDto),
    _ts_metadata("design:type", Array)
], GameDto.prototype, "pricing", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    (0, _classtransformer.Type)(()=>_featuredto.FeatureDto),
    _ts_metadata("design:type", Array)
], GameDto.prototype, "features", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    (0, _classtransformer.Type)(()=>PlatformEntryDto),
    _ts_metadata("design:type", Array)
], GameDto.prototype, "platformEntries", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    (0, _classtransformer.Type)(()=>_languagedto.LanguageDto),
    _ts_metadata("design:type", Array)
], GameDto.prototype, "languages", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    (0, _classtransformer.Type)(()=>languageSupportDto),
    _ts_metadata("design:type", Array)
], GameDto.prototype, "languageSupport", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", String)
], GameDto.prototype, "link", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", String)
], GameDto.prototype, "about", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", Boolean)
], GameDto.prototype, "mature", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", String)
], GameDto.prototype, "matureDescription", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    (0, _classtransformer.Type)(()=>SystemRequirementEntryDto),
    _ts_metadata("design:type", Array)
], GameDto.prototype, "systemRequirements", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", String)
], GameDto.prototype, "legal", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    (0, _classtransformer.Type)(()=>_reviewdto.ReviewDto),
    _ts_metadata("design:type", Array)
], GameDto.prototype, "reviews", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", Number)
], GameDto.prototype, "totalSales", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", Number)
], GameDto.prototype, "averageRating", void 0);
_ts_decorate([
    (0, _classtransformer.Expose)(),
    _ts_metadata("design:type", Number)
], GameDto.prototype, "reviewsCount", void 0);

//# sourceMappingURL=game.dto.js.map