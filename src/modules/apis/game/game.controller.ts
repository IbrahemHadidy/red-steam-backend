import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AnyFilesInterceptor } from '@nest-lab/fastify-multer';

// Decorators
import { ApiDescriptor } from '@decorators/api-descriptor.decorator';
import { Serialize } from '@decorators/serialize.decorator';

// Guards
import { JwtAccessAuthGuard } from '@guards/jwt-access-auth.guard';
import { VerifiedUserGuard } from '@guards/verified-user.guard';

// Services
import { GameService } from '@apis/game/game.service';

// Serializing dtos
import { GameDataDto } from '@apis/game/serializer-dtos/game-data.dto';

// Dtos
import { CreateGameDto } from '@apis/game/dtos/create-game.dto';

// importing swagger descriptors
import { createGameDescriptor } from '@apis/game/api-descriptors/create-game.descriptor';
import { getByPartialNameDescriptor } from '@apis/game/api-descriptors/get-by-partial-name.descriptor';
import { getByParametersDescriptor } from '@apis/game/api-descriptors/get-by-parameters.descriptor';
import { getFeaturedDescriptor } from '@apis/game/api-descriptors/get-featured.descriptor';
import { getByTagsDescriptor } from '@apis/game/api-descriptors/get-by-tags.descriptor';
import { getByIdDescriptor } from '@apis/game/api-descriptors/get-by-id.descriptor';
import { getByOffersDescriptor } from '@apis/game/api-descriptors/get-by-offers.descriptor';
import { getByNewestDescriptor } from '@apis/game/api-descriptors/get-by-newest.descriptor';
import { getByTopSalesDescriptor } from '@apis/game/api-descriptors/get-by-top-sales.descriptor';
import { getBySpecialsDescriptor } from '@apis/game/api-descriptors/get-by-specials.descriptor';

import type { File } from '@nest-lab/fastify-multer';

@Controller('game')
@ApiTags('Game')
@Serialize(GameDataDto)
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @ApiDescriptor(createGameDescriptor)
  @UseGuards(JwtAccessAuthGuard, VerifiedUserGuard)
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

    const result = await this.gameService.createGame(data);

    // Send the response
    return result;
  }

  @ApiDescriptor(getByPartialNameDescriptor)
  @Get('search/:partialName')
  @HttpCode(200)
  async search(@Param('partialName') partialName: string) {
    const result = await this.gameService.getByPartialName(partialName);

    // Send the response
    return result;
  }

  @ApiDescriptor(getByParametersDescriptor)
  @Get('search')
  @HttpCode(200)
  async getByParameters(
    @Query()
    searchData: {
      sort?: 'relevance' | 'name' | 'lowestPrice' | 'highestPrice' | 'releaseDate' | 'reviews';
      partialName?: string;
      maxPrice?: string;
      tags?: string[];
      excludeTags?: string[];
      paid?: boolean;
      offers?: boolean;
      platforms?: ('win' | 'mac')[];
      publishers?: string[];
      developers?: string[];
      features?: string[];
      languages?: string[];
      featured?: boolean;
      excludeMature?: boolean;
    },
    @Query()
    pagination: { offset: string; limit: string },
  ) {
    const result = await this.gameService.getByParameters(searchData, pagination);

    // Send the response
    return result;
  }

  @ApiDescriptor(getFeaturedDescriptor)
  @Get('featured')
  @HttpCode(200)
  async getFeatured(
    @Query()
    limit: string = '10',
  ) {
    const result = await this.gameService.getFeaturedGames(limit);

    // Send the response
    return result;
  }

  @ApiDescriptor(getByTagsDescriptor)
  @Get('tags')
  @HttpCode(200)
  async getByUserTags(
    @Query()
    tags: string[],
    @Query()
    limit: string,
  ) {
    const result = await this.gameService.getByUserTags(tags, limit);

    // Send the response
    return result;
  }

  @ApiDescriptor(getByIdDescriptor)
  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') id: string) {
    const result = await this.gameService.getById(id);

    // Send the response
    return result;
  }

  @ApiDescriptor(getByOffersDescriptor)
  @Get('offers')
  @HttpCode(200)
  async getByOffers() {
    const result = await this.gameService.getByOffers();

    // Send the response
    return result;
  }

  @ApiDescriptor(getByNewestDescriptor)
  @Get('newest')
  @HttpCode(200)
  async getByNewest() {
    const result = await this.gameService.getByNewest();

    // Send the response
    return result;
  }

  @ApiDescriptor(getByTopSalesDescriptor)
  @Get('top-sales')
  @HttpCode(200)
  async getByTopSales() {
    const result = await this.gameService.getByTopSales();

    // Send the response
    return result;
  }

  @ApiDescriptor(getBySpecialsDescriptor)
  @Get('specials')
  @HttpCode(200)
  async getBySpecials() {
    const result = await this.gameService.getBySpecials();

    // Send the response
    return result;
  }
}
