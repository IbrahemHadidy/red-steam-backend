// Class-transformer
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateGameDto", {
    enumerable: true,
    get: function() {
        return CreateGameDto;
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
let ImageEntriesDto = class ImageEntriesDto {
};
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)({
        message: 'The order of the image is required'
    }),
    (0, _classvalidator.IsNumber)({
        allowNaN: false
    }, {
        message: 'The order of the image must be a number'
    }),
    _ts_metadata("design:type", Number)
], ImageEntriesDto.prototype, "order", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)({
        message: 'The path of the image must be a string'
    }),
    _ts_metadata("design:type", Boolean)
], ImageEntriesDto.prototype, "featured", void 0);
let VideoEntriesDto = class VideoEntriesDto {
};
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)({
        message: 'The order of the video is required'
    }),
    (0, _classvalidator.IsNumber)({
        allowNaN: false
    }, {
        message: 'The order of the video must be a number'
    }),
    _ts_metadata("design:type", Number)
], VideoEntriesDto.prototype, "order", void 0);
let PricingDto = class PricingDto {
};
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)({
        message: 'The price of the game is required'
    }),
    (0, _classvalidator.IsBoolean)({
        message: 'The price of the game must be a boolean'
    }),
    _ts_metadata("design:type", Boolean)
], PricingDto.prototype, "free", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)({
        message: 'The base price of the game must be a string'
    }),
    _ts_metadata("design:type", String)
], PricingDto.prototype, "basePrice", void 0);
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
        message: 'The interface of the language is required'
    }),
    (0, _classvalidator.IsBoolean)({
        message: 'The interface of the language must be a boolean'
    }),
    _ts_metadata("design:type", Boolean)
], LanguageDto.prototype, "interface", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)({
        message: 'The audio of the language is required'
    }),
    (0, _classvalidator.IsBoolean)({
        message: 'The audio of the language must be a boolean'
    }),
    _ts_metadata("design:type", Boolean)
], LanguageDto.prototype, "fullAudio", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)({
        message: 'The subtitles of the language is required'
    }),
    (0, _classvalidator.IsBoolean)({
        message: 'The subtitles of the language must be a boolean'
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
        message: 'The minimum system requirement is required'
    }),
    (0, _classvalidator.IsBoolean)({
        message: 'The minimum system requirement must be a boolean'
    }),
    _ts_metadata("design:type", Boolean)
], SystemRequirementsDto.prototype, "req64", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)({
        message: 'The mini system requirement is required'
    }),
    (0, _classtransformer.Type)(()=>SystemRequirementDto),
    _ts_metadata("design:type", typeof SystemRequirementDto === "undefined" ? Object : SystemRequirementDto)
], SystemRequirementsDto.prototype, "mini", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)({
        message: 'The recommended system requirement is required'
    }),
    (0, _classtransformer.Type)(()=>SystemRequirementDto),
    _ts_metadata("design:type", typeof SystemRequirementDto === "undefined" ? Object : SystemRequirementDto)
], SystemRequirementsDto.prototype, "recommended", void 0);
let PlatformsDto = class PlatformsDto {
};
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)({
        message: 'The platform is required'
    }),
    (0, _classvalidator.IsBoolean)({
        message: 'The platform must be a boolean'
    }),
    _ts_metadata("design:type", Boolean)
], PlatformsDto.prototype, "win", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)({
        message: 'The platform is required'
    }),
    (0, _classvalidator.IsBoolean)({
        message: 'The platform must be a boolean'
    }),
    _ts_metadata("design:type", Boolean)
], PlatformsDto.prototype, "mac", void 0);
let CreateGameDto = class CreateGameDto {
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
], CreateGameDto.prototype, "name", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The category of the game',
        example: 'Action',
        required: true
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'The category of the game is required'
    }),
    (0, _classvalidator.IsString)({
        message: 'The category of the game must be a string'
    }),
    _ts_metadata("design:type", String)
], CreateGameDto.prototype, "category", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The description of the game',
        example: 'An epic game',
        required: true
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'The description of the game is required'
    }),
    (0, _classvalidator.IsString)({
        message: 'The description of the game must be a string'
    }),
    _ts_metadata("design:type", String)
], CreateGameDto.prototype, "description", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The release date of the game',
        example: '2022-10-10',
        required: true
    }),
    (0, _classvalidator.IsDate)({
        message: 'The release date of the game must be a date'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'The release date of the game is required'
    }),
    (0, _classtransformer.Type)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CreateGameDto.prototype, "releaseDate", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The featured status of the game',
        example: 'true',
        required: true
    }),
    (0, _classvalidator.IsBoolean)({
        message: 'The featured status of the game must be a boolean'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'The featured status of the game is required'
    }),
    _ts_metadata("design:type", Boolean)
], CreateGameDto.prototype, "featured", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The developers ids of the game',
        example: '[1, 2]',
        required: true,
        type: 'array'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'The developers of the game is required',
        each: true
    }),
    (0, _classvalidator.IsArray)({
        message: 'The developers of the game must be an array'
    }),
    (0, _classvalidator.IsNumber)({
        allowNaN: false
    }, {
        each: true,
        message: 'The developers of the game must be a number'
    }),
    _ts_metadata("design:type", Array)
], CreateGameDto.prototype, "developers", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The publishers ids of the game',
        example: '[1, 2]',
        required: true,
        type: 'array'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'The publishers of the game is required',
        each: true
    }),
    (0, _classvalidator.IsArray)({
        message: 'The publishers of the game must be an array'
    }),
    (0, _classvalidator.IsNumber)({
        allowNaN: false
    }, {
        each: true,
        message: 'The publishers of the game must be a number'
    }),
    _ts_metadata("design:type", Array)
], CreateGameDto.prototype, "publishers", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The Image entries of the game',
        example: '{"order": 1, "featured": true}',
        required: true,
        type: 'array'
    }),
    (0, _classvalidator.IsArray)({
        message: 'The Image entries of the game must be an array'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'The Image entries of the game is required',
        each: true
    }),
    (0, _classtransformer.Type)(()=>ImageEntriesDto),
    _ts_metadata("design:type", Array)
], CreateGameDto.prototype, "imageEntries", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The Video entries of the game',
        example: '{"order": 2}',
        required: true,
        type: 'array'
    }),
    (0, _classvalidator.IsArray)({
        message: 'The Video entries of the game must be an array'
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classtransformer.Type)(()=>VideoEntriesDto),
    _ts_metadata("design:type", Array)
], CreateGameDto.prototype, "videoEntries", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The price of the game',
        example: '{"free": false, "basePrice": 12.5}',
        required: true
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'The price of the game is required'
    }),
    (0, _classvalidator.IsObject)({
        message: 'The price of the game must be an object'
    }),
    (0, _classtransformer.Type)(()=>PricingDto),
    _ts_metadata("design:type", typeof PricingDto === "undefined" ? Object : PricingDto)
], CreateGameDto.prototype, "pricing", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The game tags',
        example: '[1, 2]',
        required: true,
        type: 'array'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'The game tags is required',
        each: true
    }),
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
], CreateGameDto.prototype, "tags", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The game features',
        example: '[1, 2]',
        required: true,
        type: 'array'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'The game features is required',
        each: true
    }),
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
], CreateGameDto.prototype, "features", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The game languages',
        example: '[{name: "English (US)", interface: true, fullAudio: true, subtitles: true}]',
        required: true,
        type: 'array'
    }),
    (0, _classvalidator.IsArray)({
        message: 'The game languages must be an array'
    }),
    (0, _classtransformer.Type)(()=>LanguageDto),
    _ts_metadata("design:type", Array)
], CreateGameDto.prototype, "languages", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The game platforms',
        example: '{win: true, mac: true}',
        required: true
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'The game platforms is required'
    }),
    (0, _classvalidator.IsObject)({
        message: 'The game platforms must be an object'
    }),
    (0, _classtransformer.Type)(()=>PlatformsDto),
    _ts_metadata("design:type", typeof PlatformsDto === "undefined" ? Object : PlatformsDto)
], CreateGameDto.prototype, "platformEntries", void 0);
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
    `,
        required: true
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'The game system requirements is required'
    }),
    (0, _classvalidator.IsObject)({
        message: 'The game system requirements must be an object'
    }),
    (0, _classtransformer.Type)(()=>SystemRequirementsDto),
    _ts_metadata("design:type", typeof SystemRequirementsDto === "undefined" ? Object : SystemRequirementsDto)
], CreateGameDto.prototype, "systemRequirements", void 0);
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
], CreateGameDto.prototype, "link", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The game about',
        example: 'enter HTML here',
        required: true
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'The game about is required'
    }),
    (0, _classvalidator.IsString)({
        message: 'The game about must be a string'
    }),
    _ts_metadata("design:type", String)
], CreateGameDto.prototype, "about", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The game mature status',
        example: 'true',
        required: true
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'The game mature status is required'
    }),
    (0, _classvalidator.IsBoolean)({
        message: 'The game mature status must be a boolean'
    }),
    _ts_metadata("design:type", Boolean)
], CreateGameDto.prototype, "mature", void 0);
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
], CreateGameDto.prototype, "matureDescription", void 0);
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
], CreateGameDto.prototype, "legal", void 0);

//# sourceMappingURL=create-game.dto.js.map