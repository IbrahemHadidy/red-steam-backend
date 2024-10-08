// NestJS
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

// Fastify
import { FastifyRequest as Request } from 'fastify';

// Recaptcha
import { Recaptcha } from '@nestlab/google-recaptcha';

// Multer
import { FileInterceptor } from '@nest-lab/fastify-multer';

// Swagger
import { ApiDescriptor } from '@decorators/api-descriptor.decorator';
import { ApiTags } from '@nestjs/swagger';

// Decorators
import { RemoveResponseCookies } from '@decorators/remove-response-cookies.decorator';

// Guards
import { JwtAccessAuthGuard } from '@guards/jwt-access-auth.guard';
import { VerifiedUserGuard } from '@guards/verified-user.guard';

// Services
import { ManagementService } from '@apis/user/management/management.service';

// Body DTOs
import { ChangeCountryDto } from '@apis/user/management/dtos/change-country.dto';
import { ChangeEmailDto } from '@apis/user/management/dtos/change-email.dto';
import { ChangePasswordDto } from '@apis/user/management/dtos/change-password.dto';
import { ChangeUsernameDto } from '@apis/user/management/dtos/change-username.dto';
import { DeleteAccountDto } from '@apis/user/management/dtos/delete-account.dto';
import { ForgotPasswordDto } from '@apis/user/management/dtos/forgot-password.dto';
import { PasswordResetDto } from '@apis/user/management/dtos/password-reset.dto';

// Swagger descriptors
import { changeCountryDescriptor } from '@apis/user/management/api-descriptors/change-country.descriptor';
import { changeEmailDescriptor } from '@apis/user/management/api-descriptors/change-email.descriptor';
import { changePasswordDescriptor } from '@apis/user/management/api-descriptors/change-password.descriptor';
import { changeUsernameDescriptor } from '@apis/user/management/api-descriptors/change-username.descriptor';
import { checkEmailExistsDescriptor } from '@apis/user/management/api-descriptors/check-email-exists.descriptor';
import { checkUsernameExistsDescriptor } from '@apis/user/management/api-descriptors/check-username-exists.descriptor';
import { deleteAccountDescriptor } from '@apis/user/management/api-descriptors/delete-account.descriptor';
import { deleteAvatarDescriptor } from '@apis/user/management/api-descriptors/delete-avatar.descriptor';
import { forgotPasswordDescriptor } from '@apis/user/management/api-descriptors/forgot-password.descriptor';
import { passwordResetDescriptor } from '@apis/user/management/api-descriptors/password-reset.descriptor';
import { uploadAvatarDescriptor } from '@apis/user/management/api-descriptors/upload-avatar.descriptor';

// Types
import type { File } from '@nest-lab/fastify-multer';

@ApiTags('User Management')
@Controller('user/management')
export class ManagementController {
  constructor(private readonly managementService: ManagementService) {}

  @ApiDescriptor(checkEmailExistsDescriptor)
  @Get('email/:email')
  @HttpCode(200)
  public async checkEmailExists(@Param('email') email: string) {
    const data = { email };

    const result = await this.managementService.checkEmailExists(data);

    // Send the response
    return result;
  }

  @ApiDescriptor(checkUsernameExistsDescriptor)
  @Get('username/:username')
  @HttpCode(200)
  public async checkUsernameExists(@Param('username') username: string) {
    const data = { username };

    const result = await this.managementService.checkUsernameExists(data);

    // Send the response
    return result;
  }

  @ApiDescriptor(changeUsernameDescriptor)
  @UseGuards(JwtAccessAuthGuard, VerifiedUserGuard)
  @Patch('username')
  @HttpCode(200)
  public async changeUsername(@Req() request: Request, @Body() bodyData: ChangeUsernameDto) {
    const data: ChangeUsernameDto & { userId: string } = {
      ...bodyData,
      userId: request['userId'],
    };

    const result = await this.managementService.changeUsername(data);

    // Send the response
    return result;
  }

  @ApiDescriptor(changeEmailDescriptor)
  @UseGuards(JwtAccessAuthGuard, VerifiedUserGuard)
  @Patch('email')
  @HttpCode(200)
  public async changeEmail(@Req() request: Request, @Body() bodyData: ChangeEmailDto) {
    const data: ChangeEmailDto & { userId: string } = {
      ...bodyData,
      userId: request['userId'],
    };

    const result = await this.managementService.changeEmail(data);

    // Send the response
    return result;
  }

  @ApiDescriptor(changeCountryDescriptor)
  @UseGuards(JwtAccessAuthGuard, VerifiedUserGuard)
  @Patch('country')
  public async changeCountry(@Req() request: Request, @Body() bodyData: ChangeCountryDto) {
    const data: ChangeCountryDto & { userId: string } = {
      ...bodyData,
      userId: request['userId'],
    };

    const result = await this.managementService.changeCountry(data);

    // Send the response
    return result;
  }

  @ApiDescriptor(uploadAvatarDescriptor)
  @UseGuards(JwtAccessAuthGuard, VerifiedUserGuard)
  @Patch('avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  @HttpCode(200)
  async uploadAvatar(@Req() request: Request, @UploadedFile() avatar: File) {
    const data: { avatar: File; userId: string } = {
      avatar,
      userId: request['userId'],
    };

    const result = await this.managementService.uploadAvatar(data);

    // Send the response
    return result;
  }

  @ApiDescriptor(deleteAvatarDescriptor)
  @UseGuards(JwtAccessAuthGuard, VerifiedUserGuard)
  @Delete('avatar')
  @HttpCode(200)
  async deleteAvatar(@Req() request: Request) {
    const data: { userId: string } = {
      userId: request['userId'],
    };

    const result = await this.managementService.deleteAvatar(data);

    // Send the response
    return result;
  }

  @ApiDescriptor(changePasswordDescriptor)
  @UseGuards(JwtAccessAuthGuard, VerifiedUserGuard)
  @Patch('password/change')
  @HttpCode(200)
  public async changePassword(@Req() request: Request, @Body() bodyData: ChangePasswordDto) {
    const data: ChangePasswordDto & { userId: string } = {
      ...bodyData,
      userId: request['userId'],
    };

    const result = await this.managementService.changePassword(data);

    // Send the response
    return result;
  }

  @ApiDescriptor(forgotPasswordDescriptor)
  @Recaptcha()
  @Post('password/forgot')
  @HttpCode(200)
  public async forgotPassword(@Body() data: ForgotPasswordDto) {
    const result = await this.managementService.forgotPassword(data);

    // Send the response
    return result;
  }

  @ApiDescriptor(passwordResetDescriptor)
  @Patch('password/reset')
  @HttpCode(200)
  public async passwordReset(@Body() data: PasswordResetDto) {
    const result = await this.managementService.passwordReset(data);

    // Send the response
    return result;
  }

  @ApiDescriptor(deleteAccountDescriptor)
  @UseGuards(JwtAccessAuthGuard, VerifiedUserGuard)
  @RemoveResponseCookies()
  @Delete('account')
  @HttpCode(200)
  public async deleteAccount(@Req() request: Request, @Body() bodyData: DeleteAccountDto) {
    const data: DeleteAccountDto & { userId: string } = {
      ...bodyData,
      userId: request['userId'],
    };

    const result = await this.managementService.deleteAccount(data);

    // Send the response
    return result;
  }
}
