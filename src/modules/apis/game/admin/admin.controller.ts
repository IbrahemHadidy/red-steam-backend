import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AnyFilesInterceptor } from '@nest-lab/fastify-multer';

// Decorators
import { ApiDescriptor } from '@decorators/api-descriptor.decorator';

// Guards
import { JwtAccessAuthGuard } from '@guards/jwt-access-auth.guard';
import { AdminGuard } from '@guards/admin.guard';

// Services
import { AdminService } from '@apis/game/admin/admin.service';

// Dtos
import { CreateGameDto } from '@apis/game/admin/dtos/create-game.dto';

// importing swagger descriptors
import { deleteGameDescriptor } from '@apis/game/admin/api-descriptors/delete-game.descriptor'
import { createGameDescriptor } from '@apis/game/admin/api-descriptors/create-game.descriptor'

import type { File } from '@nest-lab/fastify-multer';

@Controller('game/admin')
@ApiTags('Game Admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiDescriptor(createGameDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @UseInterceptors(AnyFilesInterceptor())
  @Post()
  @HttpCode(201)
  async create(@UploadedFiles() media: File[], @Body() bodyData: CreateGameDto) {
    const filesMap = media.reduce((acc, file) => {
      acc[file.fieldname] = file;
      return acc;
    }, {});

    const data = {
      ...bodyData,
      thumbnailEntries: {
        mainImage: filesMap['mainImage'],
        backgroundImage: filesMap['backgroundImage'],
        menuImg: filesMap['menuImg'],
        horizontalHeaderImage: filesMap['horizontalHeaderImage'],
        verticalHeaderImage: filesMap['verticalHeaderImage'],
        smallHeaderImage: filesMap['smallHeaderImage'],
        searchImage: filesMap['searchImage'],
        tabImage: filesMap['tabImage'],
      },
      imageEntries: bodyData.imageEntries.map((imageEntry) => ({
        ...imageEntry,
        image: filesMap[imageEntry.order.toString()],
      })),
      videoEntries: bodyData.videoEntries.map((videoEntry) => ({
        ...videoEntry,
        video: filesMap[videoEntry.order.toString()],
        poster: filesMap[`${videoEntry.order.toString()}-poster`],
      })),
    };

    const result = await this.adminService.createGame(data);

    // Send the response
    return result;
  }

  @ApiDescriptor(deleteGameDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @Delete('/:id')
  @HttpCode(200)
  async deleteGame(@Param('id') id: string) {
    const result = await this.adminService.delete(id);

    // Send the response
    return result;
  }
}
