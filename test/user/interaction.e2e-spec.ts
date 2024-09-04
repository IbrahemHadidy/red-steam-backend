import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import request from 'supertest';
import { cleanAllEntities } from '../e2e-setup';

import { DatabaseService } from '@services/database/database.service';
import { AppModule } from '@modules/app.module';

describe('InteractionController (e2e)', () => {
  let app: NestFastifyApplication;
  let databaseService: DatabaseService;

  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [DatabaseService, ConfigService, Logger],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    databaseService = moduleFixture.get<DatabaseService>(DatabaseService);

    // Register application level settings (CORS, ValidationPipe, etc.)
    await AppModule.register(app);

    await app.init();
    await app.getHttpAdapter().getInstance().ready();

    // Clean all entities before running tests
    await cleanAllEntities(databaseService);

    // Create test user
    await request(app.getHttpServer()).post('/api/users/auth/signup').send({
      username: 'testuser',
      email: 'testuser@me.com',
      password: 'Testpassword123!',
      country: 'PS',
    });

    // Login test user
    const loginResponse = await request(app.getHttpServer())
      .post('/api/users/auth/login')
      .send({ username: 'testuser', password: 'Testpassword123!' })
      .expect(200);
    accessToken = loginResponse.body.accessToken;
    
    // Create test tags


    // Create test games


    // Create test companies


    // Create test features
  });

  describe('changeTags', () => {
    it('should change tags successfully', async () => {
      // Call changeTags function
      const result = await request(app.getHttpServer())
        .put('/api/users/auth/change-tags')
        .set('authorization', accessToken)
        .send({ tags: ['tag1', 'tag2', 'tag3'] })
        .expect(200);

      
    });
  });

  afterAll(async () => {
    // Clean all entities after running tests
    await cleanAllEntities(databaseService);
  });
});
