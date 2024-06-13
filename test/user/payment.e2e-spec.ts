import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';;
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import request from 'supertest';
import { User } from '@repositories/sql/users/user.entity';
import { AppModule } from '@modules/app.module';
import { cleanAllEntities } from '../e2e-setup';
import { DatabaseService } from '@services/database/database.service';

describe('PaymentController (e2e)', () => {
  let app: NestFastifyApplication;
  let databaseService: DatabaseService;
  let postgresDataSource: DataSource;

  let accessToken: string;

  let orderId: string;
  let approvalUrl: string;

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

    // Create test users
    await request(app.getHttpServer()).post('/api/users/auth/signup').send({
      username: 'testuser',
      email: 'testuser@me.com',
      password: 'Testpassword123!',
      country: 'PS',
    });

    await request(app.getHttpServer()).post('/api/users/auth/signup').send({
      username: 'testuser2',
      email: 'testuser2@me.com',
      password: 'Testpassword123!',
      country: 'PS',
    });

    // Login test user
    const loginResponse = await request(app.getHttpServer())
      .post('/api/users/auth/login')
      .send({ identifier: 'testuser', password: 'Testpassword123!', rememberMe: true })
      .expect(200);
    accessToken = loginResponse.headers['authorization'];

    // Verify email
    const token = (await postgresDataSource.getRepository(User).findOne({ where: { email: 'testuser@me.com' } }))
      .verificationToken;
    await postgresDataSource.destroy();
    await request(app.getHttpServer())
      .post('/api/users/auth/verify-email')
      .send({ email: 'testuser@me.com', token })
      .expect(200);
  });

  describe('POST /api/user/payment/order/create', () => {
    it('should create an order', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/user/payment/order/create')
        .set('Authorization', accessToken)
        .send({
          totalPrice: 10,
          cartItems: [1, 2],
        })
        .expect(201);

      // Verify body structure
      expect(response.body).toEqual(
        expect.objectContaining({
          orderId: expect.any(String),
          approvalUrl: expect.any(String),
          orderdata: expect.objectContaining({ userId: expect.any(String), totalPrice: 10, cartItems: [1, 2] }),
        }),
      );

      // Get order ID and approval URL
      orderId = response.body.orderId;
      approvalUrl = response.body.links.find((link: { rel: string }) => link.rel === 'approve').href;

      // Log the approval URL and wait for manual approval
      console.log(
        '\x1b[33m%s\x1b[0m',
        `
                \x1b[33m╔═══════════════════════════════════════════════════════════════════════╗
                ║                                                                       ║
                ║  \x1b[1m\x1b[4mPlease manually approve the order by visiting the following URL:\x1b[0m\x1b[33m     ║
                ║                                                                       ║
                ║  \x1b[34m\x1b[1m${approvalUrl}\x1b[0m\x1b[33m   ║
                ║                                                                       ║
                ║  \x1b[1m\x1b[4mUse the following credentials for approval:\x1b[0m\x1b[33m                          ║
                ║  \x1b[1mBuyer Email:\x1b[0m \x1b[32msb-gc21b29998568@business.example.com\x1b[33m                   ║
                ║  \x1b[1mBuyer Password:\x1b[0m \x1b[32m';>7GL;d\x1b[33m                                             ║
                ║                                                                       ║
                ║  \x1b[1m\x1b[31mYou have 1 minute to approve the order, else the test will fail.\x1b[0m\x1b[33m     ║
                ║                                                                       ║
                ╚═══════════════════════════════════════════════════════════════════════╝\x1b[0m
        `,
      );
    });
  });

  describe('POST /api/user/payment/order/capture', () => {
    it('should capture an order', async () => {
      // Wait for 1 minute before executing the test
      await new Promise((resolve) => setTimeout(resolve, 60000));

      const response = await request(app.getHttpServer())
        .post('/api/user/payment/order/capture')
        .set('Authorization', accessToken)
        .send({ orderId })
        .expect(200);

      // Verify body structure
      expect(response.body).toEqual(
        expect.objectContaining({
          status: expect.any(String),
          orderId,
          payerName: expect.any(String),
        }),
      );
    });
  });

  afterAll(async () => {
    // Clean all entities after running tests
    await cleanAllEntities(databaseService);
  });
});
