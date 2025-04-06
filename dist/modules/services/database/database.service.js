// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DatabaseService", {
    enumerable: true,
    get: function() {
        return DatabaseService;
    }
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _typeorm = require("typeorm");
const _dropboxtokenentity = require("../../repositories/mongo/dropbox-tokens/dropbox-token.entity");
const _blacklistedtokenentity = require("../../repositories/mongo/token-blacklist/blacklisted-token.entity");
const _companyentity = require("../../repositories/sql/companies/company.entity");
const _gamefeatureentity = require("../../repositories/sql/games-features/game-feature.entity");
const _gamelanguageentity = require("../../repositories/sql/games-languages/game-language.entity");
const _gamepricingentity = require("../../repositories/sql/games-pricing/game-pricing.entity");
const _gametagentity = require("../../repositories/sql/games-tags/game-tag.entity");
const _gameentity = require("../../repositories/sql/games/game.entity");
const _reviewentity = require("../../repositories/sql/reviews/review.entity");
const _userentity = require("../../repositories/sql/users/user.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let DatabaseService = class DatabaseService {
    constructor(configService, logger){
        this.configService = configService;
        this.logger = logger;
    }
    getPostgresTypeOrmConfig() {
        const postgresOptions = {
            name: 'sql',
            type: 'postgres',
            url: this.configService.get('POSTGRESQL_URI'),
            entities: [
                _companyentity.Publisher,
                _companyentity.Developer,
                _gamefeatureentity.GameFeature,
                _gamelanguageentity.GameLanguage,
                _gamepricingentity.GamePricing,
                _gametagentity.GameTag,
                _reviewentity.Review,
                _gameentity.Game,
                _userentity.User
            ],
            migrations: [
                'dist/migrations/sql/**/*.js'
            ],
            synchronize: true
        };
        this.logger.log('PostgreSQL TypeORM config initialized');
        return postgresOptions;
    }
    getMongoTypeOrmConfig() {
        const mongoOptions = {
            name: 'mongo',
            type: 'mongodb',
            url: this.configService.get('MONGODB_URI'),
            entities: [
                _blacklistedtokenentity.BlacklistedToken,
                _dropboxtokenentity.DropboxToken
            ],
            migrations: [
                'dist/migrations/mongo/**/*.js'
            ],
            synchronize: true
        };
        this.logger.log('MongoDB TypeORM config initialized');
        return mongoOptions;
    }
    async getPostgresDataSource() {
        const postgresDataSource = new _typeorm.DataSource(this.getPostgresTypeOrmConfig());
        await postgresDataSource.initialize();
        this.logger.log('PostgreSQL datasource initialized');
        return postgresDataSource;
    }
    async getMongoDataSource() {
        const mongoDataSource = new _typeorm.DataSource(this.getMongoTypeOrmConfig());
        await mongoDataSource.initialize();
        this.logger.log('MongoDB datasource initialized');
        return mongoDataSource;
    }
};
DatabaseService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _config.ConfigService === "undefined" ? Object : _config.ConfigService,
        typeof _common.Logger === "undefined" ? Object : _common.Logger
    ])
], DatabaseService);

//# sourceMappingURL=database.service.js.map