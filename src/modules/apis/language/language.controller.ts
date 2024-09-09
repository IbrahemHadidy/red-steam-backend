// NestJS
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

// Serializer decorator
import { Serialize } from '@decorators/serialize.decorator';

// Swagger
import { ApiDescriptor } from '@decorators/api-descriptor.decorator';
import { ApiTags } from '@nestjs/swagger';

// Pipes
import { ParseJsonPipe } from '@pipes/parse-json.pipe';
import { UnionTypeValidationPipe } from '@pipes/union-type-validation.pipe';

// Guards
import { AdminGuard } from '@guards/admin.guard';
import { JwtAccessAuthGuard } from '@guards/jwt-access-auth.guard';

// Services
import { LanguageService } from '@apis/language/language.service';

// Body DTOs
import { CreateLanguageDto } from '@apis/language/dtos/create-language.dto';
import { UpdateLanguageDto } from '@apis/language/dtos/update-language.dto';

// Query DTOs
import { LanguageQueryDto } from '@apis/language/dtos/language-search-query.dto';

// Serializer DTOs
import { LanguageDto } from '@apis/language/serializer-dtos/language.dto';
import { PaginatedLanguagesDataDto } from '@apis/language/serializer-dtos/paginated-languages-data.dto';

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
  async getLanguage(@Param('id', ParseIntPipe) id: number) {
    const result = await this.languageService.getLanguage(id);

    // Send the response
    return result;
  }

  @ApiDescriptor(getLanguagesDescriptor)
  @Serialize(LanguageDto)
  @Get('bulk/:ids')
  @HttpCode(200)
  async getLanguages(@Param('ids', new ParseArrayPipe({ items: Number })) ids: number[]) {
    const result = await this.languageService.getLanguages(ids);

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
  @Serialize(PaginatedLanguagesDataDto)
  @Get('paginated')
  @HttpCode(200)
  async getLanguagesPaginated(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('orderBy', new UnionTypeValidationPipe(['id', 'name'])) orderBy: 'id' | 'name',
    @Query('order', new UnionTypeValidationPipe(['ASC', 'DESC'])) order: 'ASC' | 'DESC',
    @Query('searchQuery', new ParseJsonPipe(LanguageQueryDto, { optional: true })) searchQuery: LanguageQueryDto = {},
  ) {
    const result = await this.languageService.getLanguagesPaginated(page, limit, orderBy, order, searchQuery);

    // Send the response
    return result;
  }

  @ApiDescriptor(updateLanguageDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @Put(':id')
  @HttpCode(200)
  async updateLanguage(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateLanguageDto) {
    const result = await this.languageService.updateLanguage(id, body);

    // Send the response
    return result;
  }

  @ApiDescriptor(deleteLanguageDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @Delete(':id')
  @HttpCode(200)
  async deleteLanguage(@Param('id', ParseIntPipe) id: number) {
    const result = await this.languageService.deleteLanguage(id);

    // Send the response
    return result;
  }
}
