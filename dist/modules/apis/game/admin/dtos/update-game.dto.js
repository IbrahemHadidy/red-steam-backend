// Class-transformer
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateGameDto", {
    enumerable: true,
    get: function() {
        return UpdateGameDto;
    }
});
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
const _swagger = require("@nestjs/swagger");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ChangedOrdersDto = class ChangedOrdersDto {
};
let AddedScreenshotsDto = class AddedScreenshotsDto {
};
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)({
        each: true,
        message: 'The screenshots of the game is required'
    }),
    (0, _classvalidator.IsNumber)({
        allowNaN: false
    }, {
        each: true,
        message: 'The screenshots of the game must be an array of numbers'
    }),
    _ts_metadata("design:type", Number)
], AddedScreenshotsDto.prototype, "order", void 0);
let AddedVideosDto = class AddedVideosDto {
};
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)({
        each: true,
        message: 'The videos of the game is required'
    }),
    (0, _classvalidator.IsNumber)({
        allowNaN: false
    }, {
        each: true,
        message: 'The videos of the game must be an array of numbers'
    }),
    _ts_metadata("design:type", Number)
], AddedVideosDto.prototype, "order", void 0);
let PricingDto = class PricingDto {
};
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsBoolean)({
        message: 'The free status of the game must be a boolean'
    }),
    _ts_metadata("design:type", Boolean)
], PricingDto.prototype, "free", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)({
        message: 'The price of the game must be a string'
    }),
    _ts_metadata("design:type", String)
], PricingDto.prototype, "price", void 0);
let LanguageDto = class LanguageDto {
};
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)({
        message: 'The name of the language is required'
    }),
    (0, _classvalidator.IsString)({
        message: 'The name of the language must be a string'
    }),
    _ts_metadata("design:type", String)
], LanguageDto.prototype, "name", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)({
        message: 'The interface status of the language is required'
    }),
    (0, _classvalidator.IsBoolean)({
        message: 'The interface status of the language must be a boolean'
    }),
    _ts_metadata("design:type", Boolean)
], LanguageDto.prototype, "interface", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)({
        message: 'The audio status of the language is required'
    }),
    (0, _classvalidator.IsBoolean)({
        message: 'The audio status of the language must be a boolean'
    }),
    _ts_metadata("design:type", Boolean)
], LanguageDto.prototype, "fullAudio", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)({
        message: 'The subtitles status of the language is required'
    }),
    (0, _classvalidator.IsBoolean)({
        message: 'The subtitles status of the language must be a boolean'
    }),
    _ts_metadata("design:type", Boolean)
], LanguageDto.prototype, "subtitles", void 0);
let SystemRequirementDto = class SystemRequirementDto {
};
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)({
        message: 'The OS system requirement must be a string'
    }),
    _ts_metadata("design:type", String)
], SystemRequirementDto.prototype, "os", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)({
        message: 'The CPU system requirement must be a string'
    }),
    _ts_metadata("design:type", String)
], SystemRequirementDto.prototype, "cpu", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)({
        message: 'The RAM system requirement must be a string'
    }),
    _ts_metadata("design:type", String)
], SystemRequirementDto.prototype, "ram", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)({
        message: 'The GPU system requirement must be a string'
    }),
    _ts_metadata("design:type", String)
], SystemRequirementDto.prototype, "gpu", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)({
        message: 'The DX system requirement must be a string'
    }),
    _ts_metadata("design:type", String)
], SystemRequirementDto.prototype, "dx", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)({
        message: 'The Network system requirement must be a string'
    }),
    _ts_metadata("design:type", String)
], SystemRequirementDto.prototype, "network", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)({
        message: 'The Storage system requirement must be a string'
    }),
    _ts_metadata("design:type", String)
], SystemRequirementDto.prototype, "storage", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)({
        message: 'The Sound card system requirement must be a string'
    }),
    _ts_metadata("design:type", String)
], SystemRequirementDto.prototype, "soundCard", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)({
        message: 'The VR support system requirement must be a string'
    }),
    _ts_metadata("design:type", String)
], SystemRequirementDto.prototype, "vrSupport", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)({
        message: 'The Additional notes of the system requirement must be a string'
    }),
    _ts_metadata("design:type", String)
], SystemRequirementDto.prototype, "additionalNotes", void 0);
let SystemRequirementsDto = class SystemRequirementsDto {
};
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)({
        message: 'The requirements of the game is required'
    }),
    (0, _classvalidator.IsBoolean)({
        message: 'The requirements of the game must be a boolean'
    }),
    _ts_metadata("design:type", Boolean)
], SystemRequirementsDto.prototype, "req64", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)({
        message: 'The requirements of the game is required'
    }),
    (0, _classtransformer.Type)(()=>SystemRequirementDto),
    _ts_metadata("design:type", typeof SystemRequirementDto === "undefined" ? Object : SystemRequirementDto)
], SystemRequirementsDto.prototype, "mini", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)({
        message: 'The requirements of the game is required'
    }),
    (0, _classtransformer.Type)(()=>SystemRequirementDto),
    _ts_metadata("design:type", typeof SystemRequirementDto === "undefined" ? Object : SystemRequirementDto)
], SystemRequirementsDto.prototype, "recommended", void 0);
let PlatformsDto = class PlatformsDto {
};
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)({
        message: 'The platforms of the game is required',
        each: true
    }),
    (0, _classvalidator.IsBoolean)(),
    _ts_metadata("design:type", Boolean)
], PlatformsDto.prototype, "win", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)({
        message: 'The platforms of the game is required',
        each: true
    }),
    (0, _classvalidator.IsBoolean)(),
    _ts_metadata("design:type", Boolean)
], PlatformsDto.prototype, "mac", void 0);
let UpdateGameDto = class UpdateGameDto {
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The name of the game',
        example: 'Red Dead Redemption 2',
        required: true
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'The name of the game is required'
    }),
    (0, _classvalidator.IsString)({
        message: 'The name of the game must be a string'
    }),
    _ts_metadata("design:type", String)
], UpdateGameDto.prototype, "name", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The category of the game',
        example: 'Action'
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)({
        message: 'The category of the game must be a string'
    }),
    _ts_metadata("design:type", String)
], UpdateGameDto.prototype, "category", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The description of the game',
        example: 'An epic game'
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)({
        message: 'The description of the game must be a string'
    }),
    _ts_metadata("design:type", String)
], UpdateGameDto.prototype, "description", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The release date of the game',
        example: '2022-10-10'
    }),
    (0, _classvalidator.IsDate)({
        message: 'The release date of the game must be a date'
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classtransformer.Type)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], UpdateGameDto.prototype, "releaseDate", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The featured status of the game',
        example: 'true'
    }),
    (0, _classvalidator.IsBoolean)({
        message: 'The featured status of the game must be a boolean'
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Boolean)
], UpdateGameDto.prototype, "featured", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The developers ids of the game',
        example: '[1, 2]',
        type: 'array'
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsArray)({
        message: 'The developers of the game must be an array'
    }),
    (0, _classvalidator.IsNumber)({
        allowNaN: false
    }, {
        each: true,
        message: 'The developers of the game must be an array of numbers'
    }),
    _ts_metadata("design:type", Array)
], UpdateGameDto.prototype, "developers", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The publishers ids of the game',
        example: '[1, 2]',
        type: 'array'
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsArray)({
        message: 'The publishers of the game must be an array'
    }),
    (0, _classvalidator.IsNumber)({
        allowNaN: false
    }, {
        each: true,
        message: 'The publishers of the game must be an array of numbers'
    }),
    _ts_metadata("design:type", Array)
], UpdateGameDto.prototype, "publishers", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The deleted images ids of the game',
        example: '[1, 2]',
        type: 'array'
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsArray)({
        message: 'The deleted images of the game must be an array'
    }),
    (0, _classvalidator.IsNumber)({
        allowNaN: false
    }, {
        each: true,
        message: 'The deleted images of the game must be an array of numbers'
    }),
    _ts_metadata("design:type", Array)
], UpdateGameDto.prototype, "deletedScreenshots", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The deleted videos ids of the game',
        example: '[1, 2]',
        type: 'array'
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsArray)({
        message: 'The deleted videos of the game must be an array'
    }),
    (0, _classvalidator.IsNumber)({
        allowNaN: false
    }, {
        each: true,
        message: 'The deleted videos of the game must be an array of numbers'
    }),
    _ts_metadata("design:type", Array)
], UpdateGameDto.prototype, "deletedVideos", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The changed image orders of the game',
        example: '[{oldOrder: 1, newOrder: 2}, {oldOrder: 2, newOrder: 3}]',
        type: 'array'
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsArray)({
        message: 'The changed image orders of the game must be an array'
    }),
    (0, _classtransformer.Type)(()=>ChangedOrdersDto),
    _ts_metadata("design:type", Array)
], UpdateGameDto.prototype, "changedScreenshots", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The changed video orders of the game',
        example: '[{oldOrder: 1, newOrder: 2}, {oldOrder: 2, newOrder: 3}]',
        type: 'array'
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsArray)({
        message: 'The changed video orders of the game must be an array'
    }),
    (0, _classtransformer.Type)(()=>ChangedOrdersDto),
    _ts_metadata("design:type", Array)
], UpdateGameDto.prototype, "changedVideos", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The Image entries of the game',
        example: '{"order": 1, "featured": true}',
        type: 'array'
    }),
    (0, _classvalidator.IsArray)({
        message: 'The Added Images of the game must be an array'
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classtransformer.Type)(()=>AddedScreenshotsDto),
    _ts_metadata("design:type", Array)
], UpdateGameDto.prototype, "addedScreenshots", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The Video entries of the game',
        example: '{"order": 2}',
        type: 'array'
    }),
    (0, _classvalidator.IsArray)({
        message: 'The Added Videos of the game must be an array'
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classtransformer.Type)(()=>AddedVideosDto),
    _ts_metadata("design:type", Array)
], UpdateGameDto.prototype, "addedVideos", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The new featured orders',
        example: '[1, 2]',
        type: 'array'
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsArray)({
        message: 'The new featured orders must be an array'
    }),
    (0, _classvalidator.IsNumber)({
        allowNaN: false
    }, {
        each: true,
        message: 'The new featured orders must be an array of numbers'
    }),
    _ts_metadata("design:type", Array)
], UpdateGameDto.prototype, "featuredOrders", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The price of the game',
        example: '{"free": false, "basePrice": 12.5}'
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsObject)({
        message: 'The price of the game must be an object'
    }),
    (0, _classtransformer.Type)(()=>PricingDto),
    _ts_metadata("design:type", typeof PricingDto === "undefined" ? Object : PricingDto)
], UpdateGameDto.prototype, "pricing", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The game tags',
        example: '[1, 2]',
        type: 'array'
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsArray)({
        message: 'The game tags must be an array'
    }),
    (0, _classvalidator.IsNumber)({
        allowNaN: false
    }, {
        each: true,
        message: 'The game tags must be a number'
    }),
    _ts_metadata("design:type", Array)
], UpdateGameDto.prototype, "tags", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The game features',
        example: '[1, 2]',
        type: 'array'
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsArray)({
        message: 'The game features must be an array'
    }),
    (0, _classvalidator.IsNumber)({
        allowNaN: false
    }, {
        each: true,
        message: 'The game features must be a number'
    }),
    _ts_metadata("design:type", Array)
], UpdateGameDto.prototype, "features", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The game languages',
        example: '[{name: "English (US)", interface: true, fullAudio: true, subtitles: true}]',
        type: 'array'
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsArray)({
        message: 'The game languages must be an array'
    }),
    (0, _classtransformer.Type)(()=>LanguageDto),
    _ts_metadata("design:type", Array)
], UpdateGameDto.prototype, "languages", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The game platforms',
        example: '{win: true, mac: true}'
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsObject)({
        message: 'The game platforms must be an object'
    }),
    (0, _classtransformer.Type)(()=>PlatformsDto),
    _ts_metadata("design:type", typeof PlatformsDto === "undefined" ? Object : PlatformsDto)
], UpdateGameDto.prototype, "platformEntries", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The game system requirements',
        example: `
    {
      req64: true,
      mini: {
        os: "Windows 7",
        cpu: "Intel Core 2 Quad Q6600",
        ram: "4 GB",
        gpu: "NVIDIA 9800 GT",
        dx: "9.0c",
        network: "802.11 b/g/n",
        storage: "32 GB",
        soundCard: "AMD Phenom II X4 945",
        vrSupport: "VR Supported",
        additionalNotes: "VR Supported"
      },
      recommended: {
        os: "Windows 10",
        cpu: "Intel Core i5-4590",
        ram: "8 GB",
        gpu: "NVIDIA GTX 660",
        dx: "9.0c",
        network: "802.11 b/g/n",
        storage: "64 GB",
        soundCard: "AMD Phenom II X4 945",
        vrSupport: "VR Supported",
        additionalNotes: "VR Supported"
      }
    }
    `
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsObject)({
        message: 'The game system requirements must be an object'
    }),
    (0, _classtransformer.Type)(()=>SystemRequirementsDto),
    _ts_metadata("design:type", typeof SystemRequirementsDto === "undefined" ? Object : SystemRequirementsDto)
], UpdateGameDto.prototype, "systemRequirements", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The game link',
        example: 'https://www.battlefield.com/',
        required: false
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)({
        message: 'The game link must be a string'
    }),
    _ts_metadata("design:type", String)
], UpdateGameDto.prototype, "link", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The game about',
        example: 'enter HTML here'
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)({
        message: 'The game about must be a string'
    }),
    _ts_metadata("design:type", String)
], UpdateGameDto.prototype, "about", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The game mature status',
        example: 'true'
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsBoolean)({
        message: 'The game mature status must be a boolean'
    }),
    _ts_metadata("design:type", Boolean)
], UpdateGameDto.prototype, "mature", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The game mature description',
        example: 'enter HTML here'
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)({
        message: 'The game mature description must be a string'
    }),
    _ts_metadata("design:type", String)
], UpdateGameDto.prototype, "matureDescription", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The game legal',
        example: 'enter HTML here'
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)({
        message: 'The game legal must be a string'
    }),
    _ts_metadata("design:type", String)
], UpdateGameDto.prototype, "legal", void 0);

//# sourceMappingURL=update-game.dto.js.map