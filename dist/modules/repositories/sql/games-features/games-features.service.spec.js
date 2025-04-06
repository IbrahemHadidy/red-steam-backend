"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _integrationsetup = require("../../../../../test/integration-setup");
const _gamesfeaturesmodule = require("./games-features.module");
const _gamesfeaturesservice = require("./games-features.service");
describe('gamesTagsService', ()=>{
    let gameFeature;
    let gameFeature2;
    let testIconBuffer;
    let testIconBuffer2;
    let testIconBuffer3;
    let featuresService;
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
                _gamesfeaturesmodule.GamesFeaturesModule
            ],
            providers: [
                _gamesfeaturesservice.GamesFeaturesService,
                _common.Logger
            ]
        }).compile();
        featuresService = module.get(_gamesfeaturesservice.GamesFeaturesService);
        testIconBuffer = Buffer.from('test-icon-data');
        testIconBuffer2 = Buffer.from('test-icon-data2');
        testIconBuffer3 = Buffer.from('test-icon-data3');
        gameFeature = await featuresService.create({
            name: 'Test1',
            icon: testIconBuffer
        });
        gameFeature2 = await featuresService.create({
            name: 'Test2',
            icon: testIconBuffer2
        });
    });
    afterEach(async ()=>{
        await featuresService.removeAll();
    });
    describe('getAll', ()=>{
        it('should return an array of game features', async ()=>{
            const gameFeatures = await featuresService.getAll('name', 'ASC');
            expect(gameFeatures.length).toEqual(2);
        });
    });
    describe('getById', ()=>{
        it('should return the game feature with the given id', async ()=>{
            const foundGameFeature = await featuresService.getById(gameFeature.id);
            expect(foundGameFeature).toEqual(expect.objectContaining({
                name: 'Test1'
            }));
        });
        it('should throw an error if the game feature does not exist', async ()=>{
            await expect(featuresService.getById(0)).rejects.toThrow(_common.NotFoundException);
        });
    });
    describe('getByName', ()=>{
        it('should return the game feature with the given name', async ()=>{
            const foundGameFeature = await featuresService.getByName('Test1');
            expect(foundGameFeature).toEqual(expect.objectContaining({
                name: 'Test1'
            }));
        });
        it('should throw an error if the game feature does not exist', async ()=>{
            await expect(featuresService.getByName('Test3')).rejects.toThrow(_common.NotFoundException);
        });
    });
    describe('getFeaturesPaginated', ()=>{
        it('should return an array of game features sorted by name', async ()=>{
            const gameFeatures = await featuresService.getFeaturesPaginated(0, 10, 'name', 'ASC');
            expect(gameFeatures.items.length).toEqual(2);
            expect(gameFeatures.items[0].name).toEqual('Test1');
            expect(gameFeatures.items[1].name).toEqual('Test2');
        });
        it('should return an array of game features sorted by id', async ()=>{
            const gameFeatures = await featuresService.getFeaturesPaginated(0, 10, 'id', 'ASC');
            expect(gameFeatures.items.length).toEqual(2);
            expect(gameFeatures.items[0].id).toEqual(gameFeature.id);
            expect(gameFeatures.items[1].id).toEqual(gameFeature2.id);
        });
        it('should return values with the given search', async ()=>{
            const gameFeatures = await featuresService.getFeaturesPaginated(0, 10, 'name', 'ASC', {
                name: 'Test2'
            });
            expect(gameFeatures.items.length).toEqual(1);
            expect(gameFeatures.items[0].name).toEqual('Test2');
        });
    });
    describe('create', ()=>{
        it('should create a new game feature', async ()=>{
            const createdGameFeature = await featuresService.create({
                name: 'Test3',
                icon: testIconBuffer2
            });
            expect(createdGameFeature).toEqual(expect.objectContaining({
                name: 'Test3'
            }));
        });
        it('should throw an error if the game feature name already exists', async ()=>{
            await expect(featuresService.create({
                name: 'Test1',
                icon: testIconBuffer
            })).rejects.toThrow(_common.ConflictException);
        });
    });
    describe('update', ()=>{
        it('should update the game feature with the given id', async ()=>{
            const updatedGameFeature = await featuresService.update(gameFeature2.id, {
                name: 'Test3',
                icon: testIconBuffer3
            });
            expect(updatedGameFeature).toEqual(expect.objectContaining({
                name: 'Test3'
            }));
        });
        it('should throw an error if the game feature does not exist', async ()=>{
            await expect(featuresService.update(0, {
                name: 'Test3',
                icon: testIconBuffer
            })).rejects.toThrow(_common.NotFoundException);
        });
        it('should throw an error if no name or description is provided', async ()=>{
            await expect(featuresService.update(gameFeature.id, {})).rejects.toThrow(_common.InternalServerErrorException);
        });
    });
    describe('remove', ()=>{
        it('should remove the game feature with the given id', async ()=>{
            const removedGameFeature = await featuresService.remove(gameFeature.id);
            expect(removedGameFeature).toEqual(expect.objectContaining({
                name: 'Test1'
            }));
        });
        it('should throw an error if the game feature does not exist', async ()=>{
            await expect(featuresService.remove(0)).rejects.toThrow(_common.NotFoundException);
        });
    });
    describe('removeAll', ()=>{
        it('should remove all game features', async ()=>{
            await featuresService.removeAll();
            const gameFeatures = await featuresService.getAll('name', 'ASC');
            expect(gameFeatures.length).toEqual(0);
        });
    });
});

//# sourceMappingURL=games-features.service.spec.js.map