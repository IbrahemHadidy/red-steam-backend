// TypeORM
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Game", {
    enumerable: true,
    get: function() {
        return Game;
    }
});
const _typeorm = require("typeorm");
const _companyentity = require("../companies/company.entity");
const _gamefeatureentity = require("../games-features/game-feature.entity");
const _gamelanguageentity = require("../games-languages/game-language.entity");
const _gamepricingentity = require("../games-pricing/game-pricing.entity");
const _gametagentity = require("../games-tags/game-tag.entity");
const _reviewentity = require("../reviews/review.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let Game = class Game extends _typeorm.BaseEntity {
    // Function to update reviews count and average rating
    async updateReviewsData() {
        const result = await Game.createQueryBuilder('game').leftJoin('game.reviews', 'review').select([
            'COUNT(review.id) AS count',
            'SUM(CASE WHEN review.positive = true THEN 1 ELSE 0 END) AS positivecount'
        ]).where('game.id = :id', {
            id: this.id
        }).getRawOne();
        const reviewsCount = Number(result.count) || 0;
        const positiveReviewsCount = Number(result.positivecount) || 0;
        this.reviewsCount = reviewsCount;
        if (reviewsCount > 0) {
            this.averageRating = positiveReviewsCount / reviewsCount * 100;
        } else {
            this.averageRating = 0;
        }
        // Call save after calculating reviews data
        await this.save();
    }
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('increment', {
        name: 'game_id'
    }),
    _ts_metadata("design:type", Number)
], Game.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        length: 50,
        unique: true
    }),
    _ts_metadata("design:type", String)
], Game.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        length: 50,
        unique: true
    }),
    _ts_metadata("design:type", String)
], Game.prototype, "storageName", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        length: 50
    }),
    _ts_metadata("design:type", String)
], Game.prototype, "category", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'text'
    }),
    _ts_metadata("design:type", String)
], Game.prototype, "description", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: new Date()
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Game.prototype, "releaseDate", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], Game.prototype, "featured", void 0);
_ts_decorate([
    (0, _typeorm.ManyToMany)(()=>_companyentity.Publisher, (company)=>company.games),
    (0, _typeorm.JoinTable)({
        name: 'games_publishers'
    }),
    _ts_metadata("design:type", Array)
], Game.prototype, "publishers", void 0);
_ts_decorate([
    (0, _typeorm.ManyToMany)(()=>_companyentity.Developer, (company)=>company.games),
    (0, _typeorm.JoinTable)({
        name: 'games_developers'
    }),
    _ts_metadata("design:type", Array)
], Game.prototype, "developers", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'jsonb'
    }),
    _ts_metadata("design:type", typeof ThumbnailsEntry === "undefined" ? Object : ThumbnailsEntry)
], Game.prototype, "thumbnailEntries", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'jsonb',
        nullable: true
    }),
    _ts_metadata("design:type", Array)
], Game.prototype, "imageEntries", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'jsonb',
        nullable: true
    }),
    _ts_metadata("design:type", Array)
], Game.prototype, "videoEntries", void 0);
_ts_decorate([
    (0, _typeorm.ManyToMany)(()=>_gametagentity.GameTag, (tag)=>tag.games),
    (0, _typeorm.JoinTable)({
        name: 'games_tags'
    }),
    _ts_metadata("design:type", Array)
], Game.prototype, "tags", void 0);
_ts_decorate([
    (0, _typeorm.OneToOne)(()=>_gamepricingentity.GamePricing, (pricing)=>pricing.game, {
        cascade: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'pricing_id'
    }),
    _ts_metadata("design:type", typeof GamePricingType === "undefined" ? Object : GamePricingType)
], Game.prototype, "pricing", void 0);
_ts_decorate([
    (0, _typeorm.ManyToMany)(()=>_gamefeatureentity.GameFeature, (feature)=>feature.games),
    (0, _typeorm.JoinTable)({
        name: 'games_features'
    }),
    _ts_metadata("design:type", Array)
], Game.prototype, "features", void 0);
_ts_decorate([
    (0, _typeorm.ManyToMany)(()=>_gamelanguageentity.GameLanguage, (language)=>language.games),
    (0, _typeorm.JoinTable)({
        name: 'games_languages'
    }),
    _ts_metadata("design:type", Array)
], Game.prototype, "languages", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'jsonb',
        nullable: true
    }),
    _ts_metadata("design:type", Array)
], Game.prototype, "languageSupport", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'jsonb'
    }),
    _ts_metadata("design:type", typeof PlatformEntry === "undefined" ? Object : PlatformEntry)
], Game.prototype, "platformEntries", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Game.prototype, "link", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'text'
    }),
    _ts_metadata("design:type", String)
], Game.prototype, "about", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], Game.prototype, "mature", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'text'
    }),
    _ts_metadata("design:type", String)
], Game.prototype, "matureDescription", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'jsonb'
    }),
    _ts_metadata("design:type", typeof SystemRequirementEntry === "undefined" ? Object : SystemRequirementEntry)
], Game.prototype, "systemRequirements", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'text',
        nullable: true
    }),
    _ts_metadata("design:type", String)
], Game.prototype, "legal", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_reviewentity.Review, (review)=>review.game),
    _ts_metadata("design:type", Array)
], Game.prototype, "reviews", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'int',
        default: 0
    }),
    _ts_metadata("design:type", Number)
], Game.prototype, "totalSales", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'float',
        default: 0
    }),
    _ts_metadata("design:type", Number)
], Game.prototype, "averageRating", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'int',
        default: 0
    }),
    _ts_metadata("design:type", Number)
], Game.prototype, "reviewsCount", void 0);
Game = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'games'
    })
], Game);

//# sourceMappingURL=game.entity.js.map