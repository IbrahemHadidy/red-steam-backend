"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _typeorm = require("@nestjs/typeorm");
const _integrationsetup = require("../../../../../test/integration-setup");
const _gamestagsservice = require("./games-tags.service");
const _gamestagsmodule = require("./games-tags.module");
describe('gamesTagsService', ()=>{
    let testTag;
    let testTag2;
    let gamesTagsService;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            imports: [
                _config.ConfigModule.forRoot(_integrationsetup.environmentConfig),
                _typeorm.TypeOrmModule.forRootAsync({
                    inject: [
                        _config.ConfigService
                    ],
                    name: 'sql',
                    useFactory: async (configService)=>(0, _integrationsetup.getSqlTypeOrmConfig)(configService)
                }),
                _gamestagsmodule.GamesTagsModule
            ],
            providers: [
                _gamestagsservice.GamesTagsService,
                _common.Logger
            ]
        }).compile();
        gamesTagsService = module.get(_gamestagsservice.GamesTagsService);
        testTag = await gamesTagsService.create('Test');
        testTag2 = await gamesTagsService.create('Test2');
    });
    afterEach(async ()=>{
        await gamesTagsService.removeAll();
    });
    describe('getAll', ()=>{
        it('should return an array of game tags', async ()=>{
            const tags = await gamesTagsService.getAll('name', 'ASC');
            expect(tags.length).toBeGreaterThan(0);
        });
    });
    describe('getByName', ()=>{
        it('should return the game tag with the given name', async ()=>{
            const tag = await gamesTagsService.getByName('Test');
            expect(tag.name).toEqual('Test');
        });
    });
    describe('getByNameList', ()=>{
        it('should return the game tags with the given names', async ()=>{
            const tags = await gamesTagsService.getByNameList([
                'Test',
                'Test2'
            ]);
            // Assert
            expect(tags.length).toEqual(2);
            expect(tags[0].name).toEqual('Test');
            expect(tags[1].name).toEqual('Test2');
        });
    });
    describe('getById', ()=>{
        it('should return the game tag with the given id', async ()=>{
            const tag = await gamesTagsService.getById(testTag.id);
            // Assert
            expect(tag.name).toEqual(testTag.name);
        });
    });
    describe('getByIds', ()=>{
        it('should return the game tags with the given ids', async ()=>{
            const tags = await gamesTagsService.getByIds([
                testTag.id,
                testTag2.id
            ]);
            // Assert
            expect(tags[0].name).toEqual(testTag.name);
            expect(tags[1].name).toEqual(testTag2.name);
        });
    });
    describe('getTagsPaginated', ()=>{
        it('should return an array of game tags sorted by name', async ()=>{
            const gameTags = await gamesTagsService.getTagsPaginated(0, 10, 'name', 'ASC');
            expect(gameTags.items.length).toEqual(2);
            expect(gameTags.items[0].name).toEqual('Test1');
            expect(gameTags.items[1].name).toEqual('Test2');
        });
        it('should return an array of game tags sorted by id', async ()=>{
            const gameTags = await gamesTagsService.getTagsPaginated(0, 10, 'id', 'ASC');
            expect(gameTags.items.length).toEqual(2);
            expect(gameTags.items[0].id).toEqual(testTag.id);
            expect(gameTags.items[1].id).toEqual(testTag2.id);
        });
        it('should return values with the given search', async ()=>{
            const gameTags = await gamesTagsService.getTagsPaginated(0, 10, 'name', 'ASC', {
                name: 'Test2'
            });
            expect(gameTags.items.length).toEqual(1);
            expect(gameTags.items[0].name).toEqual('Test2');
        });
    });
    describe('create', ()=>{
        it('should create a new game tag', async ()=>{
            const name = 'Test1';
            const createdTag = await gamesTagsService.create(name);
            // Assert
            expect(createdTag.name).toEqual(name);
            // Cleanup
            await gamesTagsService.removeByName(name);
        });
        it('should throw a ConflictException if the game tag already exists', async ()=>{
            // Assert
            await expect(gamesTagsService.create('Test')).rejects.toThrow(_common.ConflictException);
        });
    });
    describe('removeById', ()=>{
        it('should remove the game tag with the given id', async ()=>{
            const createdTag = await gamesTagsService.create('Test3');
            const removedTag = await gamesTagsService.removeById(createdTag.id);
            // Assert
            expect(removedTag.name).toEqual('Test3');
        });
    });
    describe('removeByIds', ()=>{
        it('should remove the game tags with the given ids', async ()=>{
            const createdTag = await gamesTagsService.create('Test3');
            const createdTag2 = await gamesTagsService.create('Test4');
            const removedTags = await gamesTagsService.removeByIds([
                createdTag.id,
                createdTag2.id
            ]);
            // Assert
            expect(removedTags.length).toEqual(2);
            expect(removedTags[0].name).toEqual('Test3');
            expect(removedTags[1].name).toEqual('Test4');
        });
    });
    describe('removeByName', ()=>{
        it('should remove the game tag with the given name', async ()=>{
            const createdTag = await gamesTagsService.create('Test3');
            const removedTag = await gamesTagsService.removeByName(createdTag.name);
            // Assert
            expect(removedTag.name).toEqual('Test3');
        });
    });
    describe('removeByNameList', ()=>{
        it('should remove the game tags with the given names', async ()=>{
            const createdTag = await gamesTagsService.create('Test3');
            const createdTag2 = await gamesTagsService.create('Test4');
            const removedTags = await gamesTagsService.removeByNameList([
                createdTag.name,
                createdTag2.name
            ]);
            // Assert
            expect(removedTags.length).toEqual(2);
            expect(removedTags[0].name).toEqual('Test3');
            expect(removedTags[1].name).toEqual('Test4');
        });
    });
    describe('removeAll', ()=>{
        it('should delete all game tags', async ()=>{
            await gamesTagsService.create('Test3');
            await gamesTagsService.create('Test4');
            await gamesTagsService.removeAll();
            const tags = await gamesTagsService.getAll('name', 'ASC');
            expect(tags.length).toEqual(0);
        });
    });
});

//# sourceMappingURL=games-tags.service.spec.js.map