// NestJS
import {
  BadRequestException,
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

// Multer
import { AnyFilesInterceptor } from '@nest-lab/fastify-multer';

// Swagger
import { ApiTags } from '@nestjs/swagger';

// Class-transformer
import { plainToClass } from 'class-transformer';

// Class-validator
import { validate } from 'class-validator';

// Decorators
import { ApiDescriptor } from '@decorators/api-descriptor.decorator';

// Guards
import { AdminGuard } from '@guards/admin.guard';
import { JwtAccessAuthGuard } from '@guards/jwt-access-auth.guard';

// Services
import { AdminService } from '@apis/game/admin/admin.service';

// DTOs
import { CreateGameDto } from '@apis/game/admin/dtos/create-game.dto';

// importing swagger descriptors
import { createGameDescriptor } from '@apis/game/admin/api-descriptors/create-game.descriptor';
import { deleteGameDescriptor } from '@apis/game/admin/api-descriptors/delete-game.descriptor';

// Types
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
  async create(@UploadedFiles() media: File[], @Body() bodyData: { body: string }) {
    // Parse the JSON body
    const parsedBodyData = JSON.parse(bodyData.body);

    // Convert parsed body data to CreateGameDto instance
    const body = plainToClass(CreateGameDto, parsedBodyData, { enableImplicitConversion: true });

    // Validate the parsed body data
    const errors = await validate(body);
    if (errors.length > 0) {
      throw new BadRequestException('Invalid body data: ' + errors.map((error) => error.toString()).join(', '));
    }

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
  async deleteGame(@Param('id') id: string) {
    const result = await this.adminService.delete(id);

    // Send the response
    return result;
  }
}
