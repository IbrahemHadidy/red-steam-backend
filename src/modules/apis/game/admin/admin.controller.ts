// NestJS
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

// Multer
import { AnyFilesInterceptor } from '@nest-lab/fastify-multer';

// Swagger
import { ApiTags } from '@nestjs/swagger';

// Decorators
import { ApiDescriptor } from '@decorators/api-descriptor.decorator';

// Pipes
import { ParseJsonPipe } from '@pipes/parse-json.pipe';

// Guards
import { AdminGuard } from '@guards/admin.guard';
import { JwtAccessAuthGuard } from '@guards/jwt-access-auth.guard';

// Services
import { AdminService } from '@apis/game/admin/admin.service';

// Body DTOs
import { CreateGameDto } from '@apis/game/admin/dtos/create-game.dto';
import { UpdateGameDto } from '@apis/game/admin/dtos/update-game.dto';

// importing swagger descriptors
import { createGameDescriptor } from '@apis/game/admin/api-descriptors/create-game.descriptor';
import { updateGameDescriptor } from '@apis/game/admin/api-descriptors/update-game.descriptor';
import { deleteGameDescriptor } from '@apis/game/admin/api-descriptors/delete-game.descriptor';

// Types
import type { File } from '@nest-lab/fastify-multer';
import type { CreateData, UpdateData } from './admin.types';

@ApiTags('Game Admin')
@Controller('game/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiDescriptor(createGameDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @UseInterceptors(AnyFilesInterceptor())
  @Post()
  @HttpCode(201)
  async create(
    @UploadedFiles() media: File[],
    @Body('body', new ParseJsonPipe(CreateGameDto, { validate: true, excludeExtraneousValues: false }))
    bodyData,
  ) {
    // Process files and map them to the appropriate fields
    const filesMap: { [fieldname: string]: File } = media.reduce((acc, file) => {
      acc[file.fieldname] = file;
      return acc;
    }, {});

    // Type the body after validating using ParseJsonPipe to prevent validating the stringified body (which will fail)
    const body: CreateGameDto = bodyData;

    // Map the files to the DTO structure
    const data: CreateData = {
      ...body,
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
      imageEntries: body.imageEntries.map((imageEntry) => ({
        ...imageEntry,
        image: filesMap[imageEntry.order.toString()],
      })),
      videoEntries: body.videoEntries
        ? body.videoEntries.map((videoEntry) => ({
            ...videoEntry,
            video: filesMap[videoEntry.order.toString()],
            poster: filesMap[`${videoEntry.order.toString()}-poster`],
          }))
        : [],
    };

    // Pass the constructed data object to the service
    const result = await this.adminService.createGame(data);

    // Return the result
    return result;
  }

  @ApiDescriptor(updateGameDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @UseInterceptors(AnyFilesInterceptor())
  @Patch('/:id')
  @HttpCode(200)
  async updateGame(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() media: File[],
    @Body('body', new ParseJsonPipe(UpdateGameDto, { validate: true, excludeExtraneousValues: false }))
    bodyData,
  ) {
    // Process files and map them to the appropriate fields
    const filesMap: { [fieldname: string]: File } = media.reduce((acc, file) => {
      acc[file.fieldname] = file;
      return acc;
    }, {});

    // Type the body after validating using ParseJsonPipe to prevent validating the stringified body (which will fail)
    const body: UpdateGameDto = bodyData;

    // Map the files to the DTO structure
    const data: UpdateData = {
      ...body,
      id,
      changedThumbnails: {
        mainImage: filesMap['mainImage'],
        backgroundImage: filesMap['backgroundImage'],
        menuImg: filesMap['menuImg'],
        horizontalHeaderImage: filesMap['horizontalHeaderImage'],
        verticalHeaderImage: filesMap['verticalHeaderImage'],
        smallHeaderImage: filesMap['smallHeaderImage'],
        searchImage: filesMap['searchImage'],
        tabImage: filesMap['tabImage'],
      },
      addedScreenshots:
        body.addedScreenshots &&
        body.addedScreenshots.map((imageEntry) => ({
          ...imageEntry,
          image: filesMap[imageEntry.order.toString()],
        })),
      addedVideos:
        body.addedVideos &&
        body.addedVideos.map((videoEntry) => ({
          ...videoEntry,
          video: filesMap[videoEntry.order.toString()],
          poster: filesMap[`${videoEntry.order.toString()}-poster`],
        })),
    };

    // Pass the constructed data object to the service
    const result = await this.adminService.updateGame(data);

    // Return the result
    return result;
  }

  @ApiDescriptor(deleteGameDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @Delete('/:id')
  @HttpCode(200)
  async deleteGame(@Param('id', ParseIntPipe) id: number) {
    const result = await this.adminService.delete(id);

    // Send the response
    return result;
  }
}
