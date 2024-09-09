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
import { TagService } from '@apis/tag/tag.service';

// Body DTOs
import { CreateTagDto } from '@apis/tag/dtos/create-tag.dto';
import { UpdateTagDto } from '@apis/tag/dtos/update-tag.dto';

// Query DTOs
import { TagQueryDto } from '@apis/tag/dtos/tag-search-query.dto';

// Serializer DTOs
import { PaginatedTagsDataDto } from '@apis/tag/serializer-dtos/paginated-tags-data.dto';
import { TagDto } from '@apis/tag/serializer-dtos/tag.dto';

// Swagger descriptors
import { createTagDescriptor } from '@apis/tag/api-descriptors/create-tag.descriptor';
import { deleteTagDescriptor } from '@apis/tag/api-descriptors/delete-tag.descriptor';
import { getAllTagsDescriptor } from '@apis/tag/api-descriptors/get-all-tags.descriptor';
import { getTagDescriptor } from '@apis/tag/api-descriptors/get-tag.descriptor';
import { getTagsPaginatedDescriptor } from '@apis/tag/api-descriptors/get-tags-paginated.descriptor';
import { getTagsDescriptor } from '@apis/tag/api-descriptors/get-tags.descriptor';
import { updateTagDescriptor } from '@apis/tag/api-descriptors/update-tag.descriptor';

@ApiTags('Tag')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @ApiDescriptor(createTagDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @Post()
  @HttpCode(201)
  async createTag(@Body() body: CreateTagDto) {
    const result = await this.tagService.createTag(body);

    // Send the response
    return result;
  }

  @ApiDescriptor(getTagDescriptor)
  @Serialize(TagDto)
  @Get(':id')
  @HttpCode(200)
  async getTag(@Param('id', ParseIntPipe) id: number) {
    const result = await this.tagService.getTag(id);

    // Send the response
    return result;
  }

  @ApiDescriptor(getTagsDescriptor)
  @Serialize(TagDto)
  @Get('bulk/:ids')
  @HttpCode(200)
  async getTags(@Param('ids', new ParseArrayPipe({ items: Number })) ids: number[]) {
    const result = await this.tagService.getTags(ids);

    // Send the response
    return result;
  }

  @ApiDescriptor(getAllTagsDescriptor)
  @Serialize(TagDto)
  @Get()
  @HttpCode(200)
  async getAllTags() {
    const result = await this.tagService.getAllTags();

    // Send the response
    return result;
  }

  @ApiDescriptor(getTagsPaginatedDescriptor)
  @Serialize(PaginatedTagsDataDto)
  @Get('paginated')
  @HttpCode(200)
  async getTagsPaginated(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('orderBy', new UnionTypeValidationPipe(['id', 'name'])) orderBy: 'id' | 'name',
    @Query('order', new UnionTypeValidationPipe(['ASC', 'DESC'])) order: 'ASC' | 'DESC',
    @Query('searchQuery', new ParseJsonPipe(TagQueryDto, { optional: true })) searchQuery: TagQueryDto = {},
  ) {
    const result = await this.tagService.getTagsPaginated(page, limit, orderBy, order, searchQuery);

    // Send the response
    return result;
  }

  @ApiDescriptor(updateTagDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @Put(':id')
  @HttpCode(200)
  async updateTag(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateTagDto) {
    const result = await this.tagService.updateTag(id, body);

    // Send the response
    return result;
  }

  @ApiDescriptor(deleteTagDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @Delete(':id')
  @HttpCode(200)
  async deleteTag(@Param('id', ParseIntPipe) id: number) {
    const result = await this.tagService.deleteTag(id);

    // Send the response
    return result;
  }
}
