import { Body, Controller, Get, HttpCode, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FastifyRequest as Request } from 'fastify';
import { ApiDescriptor } from '@decorators/api-descriptor.decorator';
import { Serialize } from '@decorators/serialize.decorator';
import { MaskEmail } from '@decorators/mask-email.decorator';
import { JwtAccessAuthGuard } from '@guards/jwt-access-auth.guard';
import { JwtRefreshAuthGuard } from '@guards/jwt-refresh-auth.guard';
import { AuthService } from '@apis/user/auth/auth.service';

// importing dtos
import { SignupDto } from '@apis/user/auth/dtos/signup.dto';
import { LoginDto } from '@apis/user/auth/dtos/login.dto';
import { ResendRegisterTokenDto } from '@apis/user/auth/dtos/resend-register-token.dto';
import { VerifyEmailDto } from '@apis/user/auth/dtos/verify-email.dto';

// importing serializer dtos
import { NestedDataDto } from '@apis/user/serializer-dtos/nested-data.dto';

// importing swagger descriptors
import { signupDescriptor } from '@apis/user/auth/api-descriptors/signup.descriptor';
import { loginDescriptor } from '@apis/user/auth/api-descriptors/login.descriptor';
import { autoLoginDescriptor } from '@apis/user/auth/api-descriptors/auto-login.descriptor';
import { logoutDescriptor } from '@apis/user/auth/api-descriptors/logout.discriptor';
import { refreshTokenDescriptor } from '@apis/user/auth/api-descriptors/refresh-token.descriptor';
import { userDataDescriptor } from '@apis/user/auth/api-descriptors/user-data.descriptor';
import { verificationStatusDescriptor } from '@apis/user/auth/api-descriptors/verification-status.descriptor';
import { resendVerificationTokenDescriptor } from '@apis/user/auth/api-descriptors/resend-verification-token.descriptor';
import { verifyEmailDescriptor } from '@apis/user/auth/api-descriptors/verify-email.descriptor';
import { updateTokensDescriptor } from '@apis/user/auth/api-descriptors/update-tokens.descriptor';
import { waitingTimeDescriptor } from '@apis/user/auth/api-descriptors/waiting-time.descriptor';

@ApiTags('User Authentication')
@Controller('users/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiDescriptor(signupDescriptor)
  @MaskEmail()
  @Serialize(NestedDataDto)
  @Post('signup')
  @HttpCode(201)
  public async signup(@Body() data: SignupDto) {
    const result = await this.authService.signup(data);

    // Send the response
    return result;
  }

  @ApiDescriptor(loginDescriptor)
  @MaskEmail()
  @Serialize(NestedDataDto)
  @Post('login')
  @HttpCode(200)
  public async login(@Body() data: LoginDto) {
    const result = await this.authService.login(data);

    // Send the response
    return result;
  }

  @ApiDescriptor(autoLoginDescriptor)
  @Serialize(NestedDataDto)
  @UseGuards(JwtRefreshAuthGuard)
  @MaskEmail()
  @Post('auto-login')
  @HttpCode(200)
  public async autoLogin(@Req() request: Request) {
    const data = {
      userId: request['userId'],
    };

    const result = await this.authService.autoLogin(data);

    // Send the response
    return result;
  }

  @ApiDescriptor(logoutDescriptor)
  @UseGuards(JwtAccessAuthGuard, JwtRefreshAuthGuard)
  @Post('logout')
  @HttpCode(200)
  async logout(@Req() request: Request) {
    const data = {
      userId: request['userId'],
      accessToken: request['accessToken'],
      refreshToken: request['refreshToken'],
    };

    const result = await this.authService.logout(data);

    // Send the response
    return result;
  }

  @ApiDescriptor(refreshTokenDescriptor)
  @UseGuards(JwtRefreshAuthGuard)
  @Serialize(NestedDataDto)
  @Post('refresh-token')
  @HttpCode(200)
  public async refreshToken(@Req() request: Request) {
    const data = {
      userId: request['userId'],
    };

    const result = await this.authService.refreshToken(data);

    // Send the response
    return result;
  }

  @ApiDescriptor(userDataDescriptor)
  @Serialize(NestedDataDto)
  @UseGuards(JwtAccessAuthGuard)
  @Get('user-data')
  @HttpCode(200)
  public async getUserData(@Req() request: Request) {
    const data = {
      userId: request['userId'],
    };

    const result = await this.authService.getUserData(data);

    // Send the response
    return result;
  }

  @ApiDescriptor(verificationStatusDescriptor)
  @Get('verification-status/:identifier')
  @HttpCode(200)
  public async getVerificationStatus(@Param('identifier') identifier: string) {
    const data = { identifier };

    const result = await this.authService.getVerificationStatus(data);

    // Send the response
    return result;
  }

  @ApiDescriptor(resendVerificationTokenDescriptor)
  @Post('resend-verification-token')
  @HttpCode(200)
  public async resendVerificationToken(@Body() data: ResendRegisterTokenDto) {
    const result = await this.authService.resendVerificationToken(data);

    // Send the response
    return result;
  }

  @ApiDescriptor(verifyEmailDescriptor)
  @Post('verify-email')
  @HttpCode(200)
  public async verifyEmail(@Body() data: VerifyEmailDto) {
    const result = await this.authService.verifyEmail(data);

    // Send the response
    return result;
  }

  @ApiDescriptor(updateTokensDescriptor)
  @Serialize(NestedDataDto)
  @UseGuards(JwtAccessAuthGuard, JwtRefreshAuthGuard)
  @Post('update-tokens')
  @HttpCode(200)
  public async updateTokens(@Req() request: Request) {
    const data = {
      userId: request['userId'],
      accessToken: request['accessToken'],
      refreshToken: request['refreshToken'],
    };

    const result = await this.authService.updateTokens(data);

    // Send the response
    return result;
  }

  @ApiDescriptor(waitingTimeDescriptor)
  @Get('waiting-time')
  @HttpCode(200)
  public getWaitingTime() {
    const result = this.authService.getWaitingTime();

    // Send the response
    return result;
  }
}
