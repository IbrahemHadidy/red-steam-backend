// NestJS
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards } from '@nestjs/common';

// Serializer decorator
import { Serialize } from '@decorators/serialize.decorator';

// Swagger
import { ApiDescriptor } from '@decorators/api-descriptor.decorator';
import { ApiTags } from '@nestjs/swagger';

// Guards
import { AdminGuard } from '@guards/admin.guard';
import { JwtAccessAuthGuard } from '@guards/jwt-access-auth.guard';

// Services
import { LanguageService } from '@apis/language/language.service';

// DTOs
import { CreateLanguageDto } from '@apis/language/dtos/create-language.dto';
import { UpdateLanguageDto } from '@apis/language/dtos/update-language.dto';

// Serializer DTOs
import { LanguageDto } from '@apis/language/serializer-dtos/language.dto';

// Swagger descriptors
import { createLanguageDescriptor } from '@apis/language/api-descriptors/create-language.descriptor';
import { deleteLanguageDescriptor } from '@apis/language/api-descriptors/delete-language.descriptor';
import { getAllLanguagesDescriptor } from '@apis/language/api-descriptors/get-all-languages.descriptor';
import { getLanguageDescriptor } from '@apis/language/api-descriptors/get-language.descriptor';
import { getLanguagesPaginatedDescriptor } from '@apis/language/api-descriptors/get-languages-paginated.descriptor';
import { getLanguagesDescriptor } from '@apis/language/api-descriptors/get-languages.descriptor';
import { updateLanguageDescriptor } from '@apis/language/api-descriptors/update-language.descriptor';

@ApiTags('Language')
@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @ApiDescriptor(createLanguageDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @Post()
  @HttpCode(201)
  async createLanguage(@Body() body: CreateLanguageDto) {
    const result = await this.languageService.createLanguage(body);

    // Send the response
    return result;
  }

  @ApiDescriptor(getLanguageDescriptor)
  @Serialize(LanguageDto)
  @Get(':id')
  @HttpCode(200)
  async getLanguage(@Param('id') id: string) {
    const result = await this.languageService.getLanguage(Number(id));

    // Send the response
    return result;
  }

  @ApiDescriptor(getLanguagesDescriptor)
  @Serialize(LanguageDto)
  @Get('bulk/:ids')
  @HttpCode(200)
  async getLanguages(@Param('ids') ids: string) {
    const result = await this.languageService.getLanguages(ids.split(',').map(Number));

    // Send the response
    return result;
  }

  @ApiDescriptor(getAllLanguagesDescriptor)
  @Serialize(LanguageDto)
  @Get()
  @HttpCode(200)
  async getAllLanguages() {
    const result = await this.languageService.getAllLanguages();

    // Send the response
    return result;
  }

  @ApiDescriptor(getLanguagesPaginatedDescriptor)
  @Serialize(LanguageDto)
  @Get('paginated')
  @HttpCode(200)
  async getLanguagesPaginated(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('orderBy') orderBy: 'id' | 'name',
    @Query('order') order: 'ASC' | 'DESC',
    @Query('searchQuery') searchQuery?: string,
  ) {
    const result = await this.languageService.getLanguagesPaginated(
      Number(page),
      Number(limit),
      orderBy,
      order,
      searchQuery ? JSON.parse(decodeURIComponent(searchQuery)) : {},
    );

    // Send the response
    return result;
  }

  @ApiDescriptor(updateLanguageDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @Put(':id')
  @HttpCode(200)
  async updateLanguage(@Param('id') id: string, @Body() body: UpdateLanguageDto) {
    const result = await this.languageService.updateLanguage(Number(id), body);

    // Send the response
    return result;
  }

  @ApiDescriptor(deleteLanguageDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @Delete(':id')
  @HttpCode(200)
  async deleteLanguage(@Param('id') id: string) {
    const result = await this.languageService.deleteLanguage(Number(id));

    // Send the response
    return result;
  }
}
