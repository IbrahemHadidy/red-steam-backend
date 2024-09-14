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

// Decorators
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
import { CompanyService } from '@apis/company/company.service';

// Body DTOs
import { CreateDeveloperDto } from '@apis/company/dtos/create-developer.dto';
import { UpdateDeveloperDto } from '@apis/company/dtos/update-developer.dto';

// Query DTOs
import { DeveloperQueryDto } from '@apis/company/dtos/developer-search-query.dto';

// Serializer DTOs
import { CompanyDto } from '@apis/company/serializer-dtos/company.dto';
import { PaginatedCompaniesDataDto } from '@apis/company/serializer-dtos/paginated-companies-data.dto';

// Swagger descriptors
import { createDeveloperDescriptor } from '@apis/company/api-descriptors/create-developer.descriptor';
import { deleteDeveloperDescriptor } from '@apis/company/api-descriptors/delete-developer.descriptor';
import { getAllDevelopersDescriptor } from '@apis/company/api-descriptors/get-all-developers.descriptor';
import { getDeveloperDescriptor } from '@apis/company/api-descriptors/get-developer.descriptor';
import { getDevelopersPaginatedDescriptor } from '@apis/company/api-descriptors/get-developers-paginated.descriptor';
import { getDevelopersDescriptor } from '@apis/company/api-descriptors/get-developers.descriptor';
import { updateDeveloperDescriptor } from '@apis/company/api-descriptors/update-developer.descriptor';

@ApiTags('Developer')
@Controller('developer')
export class DeveloperController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiDescriptor(createDeveloperDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @Post()
  @HttpCode(201)
  async createDeveloper(@Body() body: CreateDeveloperDto) {
    const result = await this.companyService.createDeveloper(body);

    // Send the response
    return result;
  }

  @ApiDescriptor(getDeveloperDescriptor)
  @Serialize(CompanyDto)
  @Get(':id')
  @HttpCode(200)
  async getDeveloper(@Param('id', ParseIntPipe) id: number) {
    const result = await this.companyService.getDeveloper(id);

    // Send the response
    return result;
  }

  @ApiDescriptor(getDevelopersDescriptor)
  @Serialize(CompanyDto)
  @Get('bulk/:ids')
  @HttpCode(200)
  async getDevelopers(@Param('ids', new ParseArrayPipe({ items: Number })) ids: number[]) {
    const result = await this.companyService.getDevelopers(ids);

    // Send the response
    return result;
  }

  @ApiDescriptor(getAllDevelopersDescriptor)
  @Serialize(CompanyDto)
  @Get()
  @HttpCode(200)
  async getAllDevelopers() {
    const result = await this.companyService.getAllDevelopers();

    // Send the response
    return result;
  }

  @ApiDescriptor(getDevelopersPaginatedDescriptor)
  @Serialize(PaginatedCompaniesDataDto)
  @Get('paginated')
  @HttpCode(200)
  async getDevelopersPaginated(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('orderBy', new UnionTypeValidationPipe(['id', 'name', 'website']))
    orderBy: 'id' | 'name' | 'website',
    @Query('order', new UnionTypeValidationPipe(['ASC', 'DESC'])) order: 'ASC' | 'DESC',
    @Query('searchQuery', new ParseJsonPipe(DeveloperQueryDto, { optional: true })) searchQuery: DeveloperQueryDto = {},
  ) {
    const result = await this.companyService.getDevelopersPaginated(page, limit, orderBy, order, searchQuery);

    // Send the response
    return result;
  }

  @ApiDescriptor(updateDeveloperDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @Put(':id')
  @HttpCode(200)
  async updateDeveloper(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateDeveloperDto) {
    const result = await this.companyService.updateDeveloper(id, body);

    // Send the response
    return result;
  }

  @ApiDescriptor(deleteDeveloperDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @Delete(':id')
  @HttpCode(200)
  async deleteDeveloper(@Param('id', ParseIntPipe) id: number) {
    const result = await this.companyService.deleteDeveloper(id);

    // Send the response
    return result;
  }
}
