// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SearchService", {
    enumerable: true,
    get: function() {
        return SearchService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _gameentity = require("./game.entity");
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
let SearchService = class SearchService {
    constructor(logger, gameRepository){
        this.logger = logger;
        this.gameRepository = gameRepository;
    }
    /**
   * Get games by partial name (for mini search)
   * @param data An object containing the name
   * @returns An array of games
   * @throws `NotFoundException` if no games are found
   */ async getByPartialName(partialName) {
        this.logger.log(`Finding games with partial name: ${partialName}`);
        // Find games with the given partial name
        const games = await this.gameRepository.find({
            where: {
                name: (0, _typeorm1.ILike)(`%${partialName}%`)
            },
            take: 10,
            relations: {
                pricing: true,
                tags: true
            }
        });
        // Return the games
        return games;
    }
    /**
   * Get games by parameters
   * @param searchData An object containing the parameters (partialName, price, tags, offers, platforms, sortBy, publishers, developers, features, featured)
   * @param pagination An object containing the pagination offset and limit
   * @returns An array of games or empty array if no games are found
   */ async getByParameters(searchData, pagination = {
        page: 0,
        limit: 20
    }) {
        const { sort, partialName, maxPrice, tags, excludeTags, paid, offers, platforms, publishers, developers, features, languages, featured, excludeMature, excludedGames, upcomingMode } = searchData;
        const { page, limit } = pagination;
        this.logger.log(`Finding games with parameters: ${JSON.stringify(searchData)}`);
        // Create include subqueries template
        const createIncludeSubQuery = (entity, values)=>{
            return this.gameRepository.createQueryBuilder('subGame').leftJoin(`subGame.${entity}s`, `${entity}`).select('subGame.id').where(`${entity}.id IN (:...${entity}s)`, {
                [`${entity}s`]: values
            }).groupBy('subGame.id').having(`COUNT(${entity}.id) = :${entity}sCount`, {
                [`${entity}sCount`]: values.length
            });
        };
        // Create exclude subqueries template
        const createExcludeSubQuery = (entity, values)=>{
            return this.gameRepository.createQueryBuilder('subGame').leftJoin(`subGame.${entity}s`, `${entity}`).select('subGame.id').where(`${entity}.id IN (:...exclude${entity}s)`, {
                [`exclude${entity}s`]: values
            }).groupBy('subGame.id').having(`COUNT(${entity}.id) > 0`);
        };
        // Create a query builder with the necessary joins
        const query = this.gameRepository.createQueryBuilder('game').leftJoinAndSelect('game.tags', 'tag').leftJoinAndSelect('game.pricing', 'pricing');
        // Apply name filter
        if (partialName) {
            query.andWhere('game.name ILIKE :partialName', {
                partialName: `%${partialName}%`
            });
        }
        // Apply paid filter
        if (offers) {
            query.andWhere('pricing.discount = true AND pricing.discountEndDate > :now', {
                now: new Date()
            });
        }
        // Apply price filter
        if (maxPrice) {
            query.andWhere('(pricing.basePrice <= :maxPrice OR (pricing.discountPrice <= :maxPrice AND pricing.discount = true AND pricing.discountEndDate > :now AND pricing.discountStartDate < :now))', {
                maxPrice,
                now: new Date()
            });
        }
        // Apply tags filter
        if (tags) {
            // Create a subquery to find games that have all the tags
            const tagsSubQuery = createIncludeSubQuery('tag', tags);
            // Add the subquery and parameters to the main query
            query.andWhere(`game.id IN (${tagsSubQuery.getQuery()})`);
            query.setParameters(tagsSubQuery.getParameters());
        }
        // Apply excludeTags filter
        if (excludeTags) {
            // Create a subquery to exclude games that have any of the excluded tags
            const excludeTagsSubQuery = createExcludeSubQuery('tag', excludeTags); // Exclude games with any of the excluded tags
            // Add the excludeTags subquery to the main query
            query.andWhere(`game.id NOT IN (${excludeTagsSubQuery.getQuery()})`);
            query.setParameters(excludeTagsSubQuery.getParameters());
        }
        // Apply paid filter
        if (paid) {
            query.andWhere('pricing.free = false');
        }
        // Apply platforms filter
        if (platforms) {
            if (platforms.includes('win')) {
                query.andWhere('game.platformEntries @> :platformsWin', {
                    platformsWin: JSON.stringify({
                        win: true
                    })
                });
            }
            if (platforms.includes('mac')) {
                query.andWhere('game.platformEntries @> :platformsMac', {
                    platformsMac: JSON.stringify({
                        mac: true
                    })
                });
            }
        }
        // Apply publishers filter
        if (publishers) {
            // Add the publisher relationship
            query.leftJoinAndSelect('game.publishers', 'publisher');
            // Create a subquerys to find games that have all the publishers
            const publishersSubQuery = createIncludeSubQuery('publisher', publishers);
            // Add the subquery and parameters to the main query
            query.andWhere(`game.id IN (${publishersSubQuery.getQuery()})`);
            query.setParameters(publishersSubQuery.getParameters());
        }
        // Apply developers filter
        if (developers) {
            // Add the developers relationship
            query.leftJoinAndSelect('game.developers', 'developer');
            // Create a subquery to find games that have all the developers
            const developersSubQuery = createIncludeSubQuery('developer', developers);
            // Add the subquery and parameters to the main query
            query.andWhere(`game.id IN (${developersSubQuery.getQuery()})`);
            query.setParameters(developersSubQuery.getParameters());
        }
        // Apply features filter
        if (features) {
            // Add the features relationship
            query.leftJoinAndSelect('game.features', 'feature');
            // Create a subquery to find games that have all the features
            const featuresSubQuery = createIncludeSubQuery('feature', features);
            // Add the subquery and parameters to the main query
            query.andWhere(`game.id IN (${featuresSubQuery.getQuery()})`);
            query.setParameters(featuresSubQuery.getParameters());
        }
        // Apply languages filter
        if (languages) {
            // Add the languages relationship
            query.leftJoinAndSelect('game.languages', 'language');
            // Create a subquery to find games that have all the languages
            const languagesSubQuery = createIncludeSubQuery('language', languages);
            // Add the subquery and parameters to the main query
            query.andWhere(`game.id IN (${languagesSubQuery.getQuery()})`);
            query.setParameters(languagesSubQuery.getParameters());
        }
        // Apply featured filter
        if (featured) {
            query.andWhere('game.featured = true');
        }
        // Apply exclude mature filter
        if (excludeMature) {
            query.andWhere('game.mature = false');
        }
        // Apply excluded games filter
        if (excludedGames) {
            query.andWhere('game.id NOT IN (:...excludedGames)', {
                excludedGames
            });
        }
        // Apply upcoming filter
        if (upcomingMode === 'onlyUpcoming') {
            query.andWhere('game.releaseDate > :now', {
                now: new Date()
            });
        } else if (upcomingMode === 'exclude') {
            query.andWhere('game.releaseDate <= :now', {
                now: new Date()
            });
        }
        // Apply sorting
        if (sort) {
            switch(sort){
                case 'name':
                    query.orderBy('game.name', 'ASC');
                    break;
                case 'totalSales':
                    query.orderBy('game.totalSales', 'DESC');
                    break;
                case 'lowestPrice':
                    query.orderBy('pricing.price', 'ASC');
                    break;
                case 'highestPrice':
                    query.orderBy('pricing.price', 'DESC');
                    break;
                case 'releaseDate':
                    query.orderBy('game.releaseDate', 'DESC');
                    break;
                case 'reviews':
                    query.orderBy('game.averageRating', 'DESC');
                    break;
                case 'relevance':
                default:
                    query.orderBy('game.reviewsCount', 'DESC');
                    break;
            }
        }
        // Apply pagination
        query.skip(Math.max((page - 1) * limit, 0)).take(limit);
        // Set cache for 30 seconds
        query.cache(`games-${JSON.stringify(searchData)}`, 30 * 1000);
        // Retrieve games with the given parameters
        const [games] = await query.getManyAndCount();
        // Return the games
        return games;
    }
    /**
   * Retrieves games sorted by the number of matching tags.
   * @param tags - The IDs of the tags to retrieve.
   * @param limit - The maximum number of games to retrieve.
   * @return A Promise that resolves to an array of game entities.
   */ async getByUserTags(tags, excludedGames, limit = 12) {
        this.logger.log(`Retrieving games with tag ids ${tags} from the database`);
        // Check if tags array is empty to avoid unnecessary queries
        if (tags.length === 0) {
            throw new _common.NotFoundException(`No tags provided`);
        }
        // Fetch games that have at least one of the specified tags and count the occurrences of tags
        const rawGames = await this.gameRepository.createQueryBuilder('game').leftJoin('game.tags', 'tag').where('tag.tag_id IN (:...tags)', {
            tags
        }).groupBy('game.game_id').addSelect('COUNT(tag.tag_id) as tagCount').orderBy('tagCount', 'DESC').limit(limit).getMany();
        // If no games are found, return an empty array
        if (rawGames.length === 0) return [];
        // Extract the game IDs from raw results
        const gameIds = rawGames.map((game)=>game.id);
        // Fetch the full Game entities with tags
        const foundGames = await this.gameRepository.find({
            where: excludedGames ? {
                id: (0, _typeorm1.And)((0, _typeorm1.In)(gameIds), (0, _typeorm1.Not)((0, _typeorm1.In)(excludedGames)))
            } : {
                id: (0, _typeorm1.In)(gameIds)
            },
            relations: {
                tags: true,
                pricing: true
            }
        });
        // Return the sorted games
        return foundGames;
    }
};
SearchService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(1, (0, _typeorm.InjectRepository)(_gameentity.Game, 'sql')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _common.Logger === "undefined" ? Object : _common.Logger,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], SearchService);

//# sourceMappingURL=search.service.js.map