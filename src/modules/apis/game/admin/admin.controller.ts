// NestJS
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseIntPipe,
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

// importing swagger descriptors
import { createGameDescriptor } from '@apis/game/admin/api-descriptors/create-game.descriptor';
import { deleteGameDescriptor } from '@apis/game/admin/api-descriptors/delete-game.descriptor';

// Types
import type { File } from '@nest-lab/fastify-multer';

@ApiTags('Game Admin')
@Controller('game/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiDescriptor(createGameDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @UseInterceptors(AnyFilesInterceptor())
  @Post()
  @HttpCode(201)
  async create(@UploadedFiles() media: File[], @Body('body', new ParseJsonPipe(CreateGameDto)) body: CreateGameDto) {
    // Process files and map them to the appropriate fields
    const filesMap: { [fieldname: string]: File } = media.reduce((acc, file) => {
      acc[file.fieldname] = file;
      return acc;
    }, {});

    // Map the files to the DTO structure
    const data = {
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
      videoEntries: body.videoEntries.map((videoEntry) => ({
        ...videoEntry,
        video: filesMap[videoEntry.order.toString()],
        poster: filesMap[`${videoEntry.order.toString()}-poster`],
      })),
    };

    // Pass the constructed data object to the service
    const result = await this.adminService.createGame(data);

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
