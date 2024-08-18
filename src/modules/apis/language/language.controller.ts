import { Controller, Get, HttpCode, Param, Post, UseGuards, Body, Query, Delete, Put } from '@nestjs/common';
import { ApiDescriptor } from '@decorators/api-descriptor.decorator';
import { ApiTags } from '@nestjs/swagger';
import { LanguageService } from '@apis/language/language.service';

// Guards
import { JwtAccessAuthGuard } from '@guards/jwt-access-auth.guard';
import { AdminGuard } from '@guards/admin.guard';

// Dtos
import { CreateLanguageDto } from '@apis/language/dtos/create-language.dto';
import { UpdateLanguageDto } from '@apis/language/dtos/update-language.dto';

// Swagger descriptors
import { createLanguageDescriptor } from '@apis/language/api-descriptors/create-language.descriptor';
import { getLanguageDescriptor } from '@apis/language/api-descriptors/get-language.descriptor';
import { getLanguagesDescriptor } from '@apis/language/api-descriptors/get-languages.descriptor';
import { getAllLanguagesDescriptor } from '@apis/language/api-descriptors/get-all-languages.descriptor';
import { getLanguagesPaginatedDescriptor } from '@apis/language/api-descriptors/get-languages-paginated.descriptor';
import { updateLanguageDescriptor } from '@apis/language/api-descriptors/update-language.descriptor';
import { deleteLanguageDescriptor } from '@apis/language/api-descriptors/delete-language.descriptor';

@Controller('language')
@ApiTags('Language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @ApiDescriptor(createLanguageDescriptor)
  @Post()
  @HttpCode(201)
  async createLanguage(@Body() body: CreateLanguageDto) {
    const result = await this.languageService.createLanguage(body);

    // Send the response
    return result;
  }

  @Get(':id')
  @ApiDescriptor(getLanguageDescriptor)
  async getLanguage(@Param('id') id: string) {
    const result = await this.languageService.getLanguage(Number(id));

    // Send the response
    return result;
  }

  @Get('bulk/:ids')
  @ApiDescriptor(getLanguagesDescriptor)
  async getLanguages(@Param('ids') ids: string) {
    const result = await this.languageService.getLanguages(ids.split(',').map(Number));

    // Send the response
    return result;
  }

  @ApiDescriptor(getAllLanguagesDescriptor)
  @Get()
  @HttpCode(200)
  async getAllLanguages() {
    const result = await this.languageService.getAllLanguages();

    // Send the response
    return result;
  }

  @ApiDescriptor(getLanguagesPaginatedDescriptor)
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
      searchQuery ? JSON.parse(searchQuery) : {},
    );

    // Send the response
    return result;
  }

  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @ApiDescriptor(updateLanguageDescriptor)
  @Put(':id')
  @HttpCode(200)
  async updateLanguage(@Param('id') id: string, @Body() body: UpdateLanguageDto) {
    const result = await this.languageService.updateLanguage(Number(id), body);

    // Send the response
    return result;
  }

  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @ApiDescriptor(deleteLanguageDescriptor)
  @Delete(':id')
  @HttpCode(200)
  async deleteLanguage(@Param('id') id: string) {
    const result = await this.languageService.deleteLanguage(Number(id));

    // Send the response
    return result;
  }
}
