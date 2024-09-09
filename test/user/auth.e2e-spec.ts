import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { DataSource } from 'typeorm';
import { cleanAllEntities } from '../e2e-setup';

import { AppModule } from '@modules/app.module';
import { User } from '@repositories/sql/users/user.entity';
import { DatabaseService } from '@services/database/database.service';

describe('AuthController (e2e)', () => {
  let app: NestFastifyApplication;
  let databaseService: DatabaseService;
  let postgresDataSource: DataSource;

  let accessToken: string;
  let refreshToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [DatabaseService, ConfigService, Logger],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    databaseService = moduleFixture.get<DatabaseService>(DatabaseService);

    // Initialize data sources
    postgresDataSource = await databaseService.getPostgresDataSource();

    // Register application level settings (CORS, ValidationPipe, etc.)
    await AppModule.register(app);

    await app.init();
    await app.getHttpAdapter().getInstance().ready();

    // Clean all entities before running tests
    await cleanAllEntities(databaseService);
  });

  afterAll(async () => {
    // Clean all entities after running tests
    await cleanAllEntities(databaseService);
  });

  describe('POST /api/user/auth/signup', () => {
    const data = {
      username: 'testuser',
      email: 'testuser@me.com',
      password: 'Testpassword123!',
      country: 'PS',
    };

    it('should create a new user', async () => {
      const response = await request(app.getHttpServer()).post('/api/user/auth/signup').send(data).expect(201);

      // Verify response structure
      expect(response.body).toHaveProperty('message', 'Signup successful');
    });

    it('should throw an error if user already exists', async () => {
      const response = await request(app.getHttpServer()).post('/api/user/auth/signup').send(data).expect(409);

      // Verify response structure
      expect(response.body).toHaveProperty('message', 'User already exists');
    });

    it('should throw an error if email is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/user/auth/signup')
        .send({ ...data, email: 'invalid-email' })
        .expect(400);

      // Verify response structure
      expect(response.body).toHaveProperty('message', 'Please enter a valid email');
    });

    it('should throw an error if password is weak', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/user/auth/signup')
        .send({ ...data, password: 'weakpassword' })
        .expect(400);

      // Verify response structure
      expect(response.body).toHaveProperty('message', 'Password is too weak');
    });
  });

  describe('POST /api/user/auth/login', () => {
    it('should login a user', async () => {
      const data = {
        identifier: 'testuser',
        password: 'Testpassword123!',
        rememberMe: true,
      };

      const response = await request(app.getHttpServer()).post('/api/user/auth/login').send(data).expect(200);

      // Verify body structure
      expect(response.body).toEqual(
        expect.objectContaining({
          message: 'Login successful',
          userData: expect.objectContaining({
            id: expect.any(String),
            username: 'testuser',
            email: expect.stringContaining('@me.com'),
            country: 'PS',
            phoneNumber: null,
            profilePicture: null,
            tags: [],
            isVerified: false,
            isPhoneVerified: null,
            isAdmin: false,
            isActive: false,
            createdAt: expect.any(String),
            wishlist: [],
            cart: [],
            library: [],
          }),
        }),
      );

      // Verify headers
      expect(response.headers['authorization']).toMatch(/^Bearer \S+$/);
      expect(response.headers['x-refresh-token']).toMatch(/^Bearer \S+$/);

      // Store the tokens in variables
      accessToken = response.headers['authorization'];
      refreshToken = response.headers['x-refresh-token'];
    });

    it('should throw an error if user does not exist', async () => {
      const data = {
        identifier: 'invaliduser',
        password: 'Testpassword123!',
        rememberMe: true,
      };

      const response = await request(app.getHttpServer()).post('/api/user/auth/login').send(data).expect(404);

      // Verify response structure
      expect(response.body).toHaveProperty('message', 'User not found');
    });
  });

  describe('POST /api/user/auth/auto-login', () => {
    it('should auto login a user', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/user/auth/auto-login')
        .set('x-refresh-token', refreshToken)
        .expect(200);

      // Verify body structure
      expect(response.body).toEqual(
        expect.objectContaining({
          message: 'Auto login successful',
          userData: expect.objectContaining({
            id: expect.any(String),
            username: 'testuser',
            email: 'testuser@me.com',
            country: 'PS',
            phoneNumber: null,
            profilePicture: null,
            tags: [],
            isVerified: false,
            isPhoneVerified: null,
            isAdmin: false,
            isActive: false,
            createdAt: expect.any(String),
            wishlist: [],
            cart: [],
            library: [],
          }),
        }),
      );

      // Verify headers
      expect(response.headers['authorization']).toMatch(/^Bearer \S+$/);

      // Store the access token in a variable
      accessToken = response.headers['authorization'];
    });

    it('should throw an error if refresh token is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/user/auth/auto-login')
        .set('x-refresh-token', 'invalid-refresh-token')
        .expect(401);

      // Verify response structure
      expect(response.body).toHaveProperty('message', 'Refresh token not found');
    });
  });

  describe('POST /api/user/auth/refresh-token', () => {
    it('should refresh access token', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/user/auth/refresh-token')
        .set('x-refresh-token', refreshToken)
        .expect(200);

      // Verify body structure
      expect(response.body).toEqual({ message: 'Refresh token successful' });

      // Verify headers
      expect(response.headers['authorization']).toMatch(/^Bearer \S+$/);

      // Store the access token in a variable
      accessToken = response.headers['authorization'];
    });
  });

  describe('GET /api/user/auth/user-data', () => {
    it('should get user data', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/user/auth/user-data')
        .set('authorization', accessToken)
        .expect(200);

      // Verify body structure
      expect(response.body).toEqual(
        expect.objectContaining({
          userData: expect.objectContaining({
            id: expect.any(String),
            username: 'testuser',
            email: expect.stringContaining('@me.com'),
            country: 'PS',
            phoneNumber: null,
            profilePicture: null,
            tags: [],
            isVerified: false,
            isPhoneVerified: null,
            isAdmin: false,
            isActive: false,
            createdAt: expect.any(String),
            wishlist: [],
            cart: [],
            library: [],
          }),
        }),
      );
    });
  });

  describe('GET /api/user/auth/verification-status', () => {
    it('should get verification status', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/user/auth/verification-status/testuser')
        .expect(200);

      // Verify body structure
      expect(response.body).toEqual({ verified: false });
    });
  });

  describe('POST /api/user/auth/resend-verification-token', () => {
    it('should resend verification token', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/user/auth/resend-verification-token')
        .send({ email: 'testuser@me.com' })
        .expect(200);

      // Verify body structure
      expect(response.body).toEqual({ message: 'Verification email sent' });
    });
  });

  describe('POST /api/user/auth/verify-email', () => {
    it('should verify email', async () => {
      // Get the token from database
      const token = (await postgresDataSource.getRepository(User).findOne({ where: { email: 'testuser@me.com' } }))
        .verificationToken;
      await postgresDataSource.destroy();

      const response = await request(app.getHttpServer())
        .post('/api/user/auth/verify-email')
        .send({ email: 'testuser@me.com', token })
        .expect(200);

      // Verify body structure
      expect(response.body).toEqual({ message: 'Email verified successfully' });
    });
  });

  describe('POST /api/user/auth/update-tokens', () => {
    it('should update tokens', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/user/auth/update-tokens')
        .set('authorization', accessToken)
        .set('x-refresh-token', refreshToken)
        .expect(200);

      // Verify headers
      expect(response.headers['authorization']).toMatch(/^Bearer \S+$/);
      expect(response.headers['x-refresh-token']).toMatch(/^Bearer \S+$/);

      // Store the tokens in variables
      accessToken = response.headers['authorization'];
      refreshToken = response.headers['x-refresh-token'];
    });
  });

  describe('POST /api/user/auth/logout', () => {
    it('should logout a user', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/user/auth/logout')
        .set('authorization', accessToken)
        .set('x-refresh-token', refreshToken)
        .expect(200);

      // Verify response structure
      expect(response.body).toEqual({ message: 'Logout successful' });
    });
  });

  describe('GET /api/user/auth/waiting-time', () => {
    it('should get waiting time', async () => {
      const response = await request(app.getHttpServer()).get('/api/user/auth/waiting-time').expect(200);

      // Verify body structure
      expect(response.body).toEqual({ waitingTime: expect.any(Number) });
    });
  });
});
