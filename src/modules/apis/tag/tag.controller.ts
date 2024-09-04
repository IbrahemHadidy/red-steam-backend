// NestJS
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards } from '@nestjs/common';

// Swagger
import { ApiDescriptor } from '@decorators/api-descriptor.decorator';
import { ApiTags } from '@nestjs/swagger';

// Guards
import { AdminGuard } from '@guards/admin.guard';
import { JwtAccessAuthGuard } from '@guards/jwt-access-auth.guard';

// Services
import { TagService } from '@apis/tag/tag.service';

// DTOs
import { CreateTagDto } from '@apis/tag/dtos/create-tag.dto';
import { UpdateTagDto } from '@apis/tag/dtos/update-tag.dto';

// Swagger descriptors
import { createTagDescriptor } from '@apis/tag/api-descriptors/create-tag.descriptor';
import { deleteTagDescriptor } from '@apis/tag/api-descriptors/delete-tag.descriptor';
import { getAllTagsDescriptor } from '@apis/tag/api-descriptors/get-all-tags.descriptor';
import { getTagDescriptor } from '@apis/tag/api-descriptors/get-tag.descriptor';
import { getTagsPaginatedDescriptor } from '@apis/tag/api-descriptors/get-tags-paginated.descriptor';
import { getTagsDescriptor } from '@apis/tag/api-descriptors/get-tags.descriptor';
import { updateTagDescriptor } from '@apis/tag/api-descriptors/update-tag.descriptor';

@Controller('tag')
@ApiTags('Tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @ApiDescriptor(createTagDescriptor)
  @Post()
  @HttpCode(201)
  async createTag(@Body() body: CreateTagDto) {
    const result = await this.tagService.createTag(body);

    // Send the response
    return result;
  }

  @ApiDescriptor(getTagDescriptor)
  @Get(':id')
  @HttpCode(200)
  async getTag(@Param('id') id: string) {
    const result = await this.tagService.getTag(Number(id));

    // Send the response
    return result;
  }

  @ApiDescriptor(getTagsDescriptor)
  @Get('bulk/:ids')
  @HttpCode(200)
  async getTags(@Param('ids') ids: string) {
    const result = await this.tagService.getTags(ids.split(',').map(Number));

    // Send the response
    return result;
  }

  @ApiDescriptor(getAllTagsDescriptor)
  @Get()
  @HttpCode(200)
  async getAllTags() {
    const result = await this.tagService.getAllTags();

    // Send the response
    return result;
  }

  @ApiDescriptor(getTagsPaginatedDescriptor)
  @Get('paginated')
  @HttpCode(200)
  async getTagsPaginated(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('orderBy') orderBy: 'id' | 'name',
    @Query('order') order: 'ASC' | 'DESC',
    @Query('searchQuery') searchQuery?: string,
  ) {
    const result = await this.tagService.getTagsPaginated(
      Number(page),
      Number(limit),
      orderBy,
      order,
      searchQuery ? JSON.parse(decodeURIComponent(searchQuery)) : {},
    );

    // Send the response
    return result;
  }

  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @ApiDescriptor(updateTagDescriptor)
  @Put(':id')
  @HttpCode(200)
  async updateTag(@Param('id') id: string, @Body() body: UpdateTagDto) {
    const result = await this.tagService.updateTag(Number(id), body);

    // Send the response
    return result;
  }

  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @ApiDescriptor(deleteTagDescriptor)
  @Delete(':id')
  @HttpCode(200)
  async deleteTag(@Param('id') id: string) {
    const result = await this.tagService.deleteTag(Number(id));

    // Send the response
    return result;
  }
}
