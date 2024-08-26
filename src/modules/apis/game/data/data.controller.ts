import {
  Controller,
  Get,
  HttpCode,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// Decorators
import { ApiDescriptor } from '@decorators/api-descriptor.decorator';
import { Serialize } from '@decorators/serialize.decorator';

// Services
import { DataService } from '@apis/game/data/data.service';

// Serializing dtos
import { GameDataDto } from '@apis/game/serializer-dtos/game-data.dto';

// importing swagger descriptors
import { getByPartialNameDescriptor } from '@apis/game/data/api-descriptors/get-by-partial-name.descriptor';
import { getByParametersDescriptor } from '@apis/game/data/api-descriptors/get-by-parameters.descriptor';
import { getFeaturedDescriptor } from '@apis/game/data/api-descriptors/get-featured.descriptor';
import { getByTagsDescriptor } from '@apis/game/data/api-descriptors/get-by-tags.descriptor';
import { getByIdDescriptor } from '@apis/game/data/api-descriptors/get-by-id.descriptor';
import { getByOffersDescriptor } from '@apis/game/data/api-descriptors/get-by-offers.descriptor';
import { getByNewestDescriptor } from '@apis/game/data/api-descriptors/get-by-newest.descriptor';
import { getByTopSalesDescriptor } from '@apis/game/data/api-descriptors/get-by-top-sales.descriptor';
import { getBySpecialsDescriptor } from '@apis/game/data/api-descriptors/get-by-specials.descriptor';

@Controller('game/data')
@ApiTags('Game Data')
@Serialize(GameDataDto)
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @ApiDescriptor(getByPartialNameDescriptor)
  @Get('search/:partialName')
  @HttpCode(200)
  async search(@Param('partialName') partialName: string) {
    const result = await this.dataService.getByPartialName(partialName);

    // Send the response
    return result;
  }

  @ApiDescriptor(getByParametersDescriptor)
  @Get('search')
  @HttpCode(200)
  async getByParameters(
    @Query('sort') sort?: string,
    @Query('partialName') partialName?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('tags') tags?: string,
    @Query('excludeTags') excludeTags?: string,
    @Query('paid') paid?: string,
    @Query('offers') offers?: string,
    @Query('platforms') platforms?: string,
    @Query('publishers') publishers?: string,
    @Query('developers') developers?: string,
    @Query('features') features?: string,
    @Query('languages') languages?: string,
    @Query('featured') featured?: string,
    @Query('excludeMature') excludeMature?: string,
    @Query('offset') offset?: string,
    @Query('limit') limit?: string,
  ) {
    const result = await this.dataService.getByParameters(
      {
        sort: sort as 'relevance' | 'name' | 'lowestPrice' | 'highestPrice' | 'releaseDate' | 'reviews',
        partialName,
        maxPrice,
        tags: tags ? tags.split(',') : [],
        excludeTags: excludeTags ? excludeTags.split(',') : [],
        paid: paid === 'true',
        offers: offers === 'true',
        platforms: platforms ? (platforms.split(',') as ('win' | 'mac')[]) : [],
        publishers: publishers ? publishers.split(',') : [],
        developers: developers ? developers.split(',') : [],
        features: features ? features.split(',') : [],
        languages: languages ? languages.split(',') : [],
        featured: featured === 'true',
        excludeMature: excludeMature === 'true',
      },
      {
        offset: parseInt(offset, 10) || 0,
        limit: parseInt(limit, 10) || 10,
      },
    );

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
    const result = await this.dataService.getFeaturedGames(limit);

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
    const result = await this.dataService.getByUserTags(tags, limit);

    // Send the response
    return result;
  }

  @ApiDescriptor(getByIdDescriptor)
  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') id: string) {
    const result = await this.dataService.getById(id);

    // Send the response
    return result;
  }

  @ApiDescriptor(getByOffersDescriptor)
  @Get('offers')
  @HttpCode(200)
  async getByOffers() {
    const result = await this.dataService.getByOffers();

    // Send the response
    return result;
  }

  @ApiDescriptor(getByNewestDescriptor)
  @Get('newest')
  @HttpCode(200)
  async getByNewest() {
    const result = await this.dataService.getByNewest();

    // Send the response
    return result;
  }

  @ApiDescriptor(getByTopSalesDescriptor)
  @Get('top-sales')
  @HttpCode(200)
  async getByTopSales() {
    const result = await this.dataService.getByTopSales();

    // Send the response
    return result;
  }

  @ApiDescriptor(getBySpecialsDescriptor)
  @Get('specials')
  @HttpCode(200)
  async getBySpecials() {
    const result = await this.dataService.getBySpecials();

    // Send the response
    return result;
  }
}
