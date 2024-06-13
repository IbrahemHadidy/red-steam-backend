import fs from 'fs';
import path from 'path';
import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import request from 'supertest';
import { User } from '@repositories/sql/users/user.entity';
import { AppModule } from '@modules/app.module';
import { cleanAllEntities } from '../e2e-setup';
import { DatabaseService } from '@services/database/database.service';

describe('ManagementController (e2e)', () => {
  let app: NestFastifyApplication;
  let databaseService: DatabaseService;
  let postgresDataSource: DataSource;

  let accessToken: string;
  let currentTestEmail: string = 'testuser@me.com';
  let currentTestPassword: string = 'Testpassword123!';


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

  afterAll(async () => {
    // Clean all entities after running tests
    await cleanAllEntities(databaseService);
  });

  describe('GET /api/users/management/email/:email', () => {
    it('should return true if email exists', async () => {
      const result = await request(app.getHttpServer()).get('/api/users/management/email/testuser@me.com').expect(200);

      // Verify body structure
      expect(result.body).toEqual({ exists: true, message: 'Email already exists' });
    });

    it('should return false if email does not exist', async () => {
      const result = await request(app.getHttpServer()).get('/api/users/management/email/testuser6@me.com').expect(200);

      // Verify body structure
      expect(result.body).toEqual({ exists: false, message: 'Email available' });
    });
  });

  describe('GET /api/users/management/username/:username', () => {
    it('should return true if username exists', async () => {
      const result = await request(app.getHttpServer()).get('/api/users/management/username/testuser').expect(200);

      // Verify body structure
      expect(result.body).toEqual({ exists: true, message: 'Username already exists' });
    });

    it('should return false if username does not exist', async () => {
      const result = await request(app.getHttpServer()).get('/api/users/management/username/testuser4').expect(200);

      // Verify body structure
      expect(result.body).toEqual({ exists: false, message: 'Username available' });
    });
  });

  describe('PATCH /api/users/management/username', () => {
    it('should change username', async () => {
      const result = await request(app.getHttpServer())
        .patch('/api/users/management/username')
        .send({ password: currentTestPassword, newUsername: 'testuser3' })
        .set('authorization', accessToken)
        .expect(200);

      // Verify body structure
      expect(result.body).toEqual({ message: 'Username changed successfully' });
    });

    it('should not change username if new username already exists', async () => {
      await request(app.getHttpServer())
        .patch('/api/users/management/username')
        .send({ password: currentTestPassword, newUsername: 'testuser2' })
        .set('authorization', accessToken)
        .expect(409);
    });

    it('should not change username if new username is the same as the old one', async () => {
      await request(app.getHttpServer())
        .patch('/api/users/management/username')
        .send({ password: currentTestPassword, newUsername: 'testuser3' })
        .set('authorization', accessToken)
        .expect(400);
    });
  });

  describe('PATCH /api/users/management/email', () => {
    it('should change email', async () => {
      const result = await request(app.getHttpServer())
        .patch('/api/users/management/email')
        .send({ password: currentTestPassword, currentEmail: 'testuser@me.com', newEmail: 'testuser3@me.com' })
        .set('authorization', accessToken)
        .expect(200);

      // Verify body structure
      expect(result.body).toEqual({ message: 'Email changed successfully' });

      // Set current test email
      currentTestEmail = 'testuser3@me.com';
    });

    it('should not change email if current email is not the same as the old one', async () => {
      await request(app.getHttpServer())
        .patch('/api/users/management/email')
        .send({ password: currentTestPassword, currentEmail: 'testuser@me.com', newEmail: 'testuser4@me.com' })
        .set('authorization', accessToken)
        .expect(401);
    });

    it('should not change email if new email is the same as the old one', async () => {
      await request(app.getHttpServer())
        .patch('/api/users/management/email')
        .send({ password: currentTestPassword, currentEmail: currentTestEmail, newEmail: currentTestEmail })
        .set('authorization', accessToken)
        .expect(400);
    });

    it('should not change email if new email already exists', async () => {
      await request(app.getHttpServer())
        .patch('/api/users/management/email')
        .send({ password: currentTestPassword, currentEmail: currentTestEmail, newEmail: 'testuser2@me.com' })
        .set('authorization', accessToken)
        .expect(409);
    });
  });

  describe('PATCH /api/users/management/country', () => {
    it('should change country', async () => {
      const result = await request(app.getHttpServer())
        .patch('/api/users/management/country')
        .send({ newCountry: 'EG' })
        .set('authorization', accessToken)
        .expect(200);

      // Verify body structure
      expect(result.body).toEqual({ message: 'Country changed successfully' });
    });

    it('should not change country if new country is the same as the old one', async () => {
      await request(app.getHttpServer())
        .patch('/api/users/management/country')
        .send({ newCountry: 'EG' })
        .set('authorization', accessToken)
        .expect(400);
    });
  });

  describe('PATCH /api/users/management/avatar', () => {
    it('should change avatar', async () => {
      const filePath = path.resolve(__dirname, 'test.png');
      const fileContent = Buffer.from([1, 2, 3]);

      // Create a test file
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, fileContent);
      }

      const result = await request(app.getHttpServer())
        .patch('/api/users/management/avatar')
        .attach('avatar', fs.readFileSync(filePath), {
          filename: 'test-avatar.jpg',
          contentType: 'image/jpeg',
        })
        .set('authorization', accessToken)
        .expect(200);

      // Verify body structure
      expect(result.body).toEqual({ message: 'Avatar uploaded successfully' });

      // Delete test file
      fs.unlinkSync(filePath);
    });
  });

  describe('DELETE /api/users/management/avatar', () => {
    it('should delete avatar', async () => {
      await request(app.getHttpServer())
        .delete('/api/users/management/avatar')
        .set('authorization', accessToken)
        .expect(204);
    });
  });

  describe('PATCH /api/users/management/password/change', () => {
    it('should change password', async () => {
      const result = await request(app.getHttpServer())
        .patch('/api/users/management/password/change')
        .send({ oldPassword: currentTestPassword, newPassword: 'Testpassword1234!' })
        .set('authorization', accessToken)
        .expect(200);

      // Verify body structure
      expect(result.body).toEqual({ message: 'Password changed successfully' });

      // Set current test password
      currentTestPassword = 'Testpassword1234!';
    });

    it('should not change password if new password is the same as the old one', async () => {
      await request(app.getHttpServer())
        .patch('/api/users/management/password/change')
        .send({ oldPassword: currentTestPassword, newPassword: currentTestPassword })
        .set('authorization', accessToken)
        .expect(400);
    });
  });

  describe('POST /api/users/management/password/forgot', () => {
    it('should send reset email', async () => {
      const result = await request(app.getHttpServer())
        .post('/api/users/management/password/forgot')
        .send({ email: 'testuser3@me.com' })
        .expect(200);

      // Verify body structure
      expect(result.body).toEqual({ message: 'Reset email sent successfully' });
    });
  });

  describe('PATCH /api/users/management/password/reset', () => {
    it('should change password', async () => {
      const result = await request(app.getHttpServer())
        .patch('/api/users/management/password/reset')
        .send({ newPassword: 'Testpassword12345!', token: 'test-reset-token' })
        .expect(200);

      // Verify body structure
      expect(result.body).toEqual({ message: 'Password reset successful' });

      // Set current test password
      currentTestPassword = 'Testpassword12345!';
    });

    it('should not change password if token is invalid', async () => {
      await request(app.getHttpServer())
        .patch('/api/users/management/password/reset')
        .send({ newPassword: currentTestPassword, token: 'invalid-token' })
        .expect(401);
    });
  });

  describe('DELETE /api/users/management/account', () => {
    it('should delete account', async () => {
      await request(app.getHttpServer())
        .delete('/api/users/management/account')
        .send({ password: currentTestPassword })
        .set('authorization', accessToken)
        .expect(204);
    });
  });
});
