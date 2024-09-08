// NestJS
import { Controller, Get, HttpCode, Param, Query } from '@nestjs/common';

// Swagger
import { ApiDescriptor } from '@decorators/api-descriptor.decorator';
import { ApiTags } from '@nestjs/swagger';

// Serializer decorator
import { Serialize } from '@decorators/serialize.decorator';

// Services
import { DataService } from '@apis/game/data/data.service';

// Serializing DTOs
import { GameDto } from '@apis/game/serializer-dtos/game.dto';
import { ReviewDto } from '@apis/review/serializer-dtos/review.dto';

// importing swagger descriptors
import { getByIdDescriptor } from '@apis/game/data/api-descriptors/get-by-id.descriptor';
import { getByIdsDescriptor } from '@apis/game/data/api-descriptors/get-by-ids.descriptor';
import { getByNewestDescriptor } from '@apis/game/data/api-descriptors/get-by-newest.descriptor';
import { getByOffersDescriptor } from '@apis/game/data/api-descriptors/get-by-offers.descriptor';
import { getByParametersDescriptor } from '@apis/game/data/api-descriptors/get-by-parameters.descriptor';
import { getByPartialNameDescriptor } from '@apis/game/data/api-descriptors/get-by-partial-name.descriptor';
import { getBySpecialsDescriptor } from '@apis/game/data/api-descriptors/get-by-specials.descriptor';
import { getByTagsDescriptor } from '@apis/game/data/api-descriptors/get-by-tags.descriptor';
import { getByTopSalesDescriptor } from '@apis/game/data/api-descriptors/get-by-top-sales.descriptor';
import { getByUpcommingDescriptor } from '@apis/game/data/api-descriptors/get-by-upcomming.descriptor';
import { getFeaturedDescriptor } from '@apis/game/data/api-descriptors/get-featured.descriptor';
import { getGameReviewsDescriptor } from '@apis/game/data/api-descriptors/get-game-reviews.descriptor';

@ApiTags('Game Data')
@Controller('game/data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @ApiDescriptor(getByPartialNameDescriptor)
  @Serialize(GameDto)
  @Get('search/:partialName')
  @HttpCode(200)
  async search(@Param('partialName') partialName: string) {
    const result = await this.dataService.getByPartialName(partialName);

    // Send the response
    return result;
  }

  @ApiDescriptor(getByParametersDescriptor)
  @Serialize(GameDto)
  @Get('search')
  @HttpCode(200)
  async getByParameters(
    @Query('sort') sort?: 'relevance' | 'name' | 'lowestPrice' | 'highestPrice' | 'releaseDate' | 'reviews',
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
    @Query('excludedGames') excludedGames?: string,
    @Query('upcomingMode') upcomingMode?: 'onlyUpcoming' | 'exclude',
    @Query('offset') offset?: string,
    @Query('limit') limit?: string,
  ) {
    const result = await this.dataService.getByParameters(
      {
        sort,
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
        excludedGames: excludedGames ? excludedGames.split(',') : [],
        upcomingMode: upcomingMode,
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
  @Serialize(GameDto)
  @Get('featured')
  @HttpCode(200)
  async getFeatured(@Query('limit') limit: string = '10') {
    const result = await this.dataService.getFeaturedGames(limit);

    // Send the response
    return result;
  }

  @ApiDescriptor(getByTagsDescriptor)
  @Serialize(GameDto)
  @Get('tags')
  @HttpCode(200)
  async getByUserTags(
    @Query('tags')
    tags: string,
    @Query('limit')
    limit: string,
  ) {
    const result = await this.dataService.getByUserTags(tags.split(','), limit);

    // Send the response
    return result;
  }

  @ApiDescriptor(getByIdDescriptor)
  @Serialize(GameDto)
  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') id: string) {
    const result = await this.dataService.getById(id);

    // Send the response
    return result;
  }

  @ApiDescriptor(getByIdsDescriptor)
  @Serialize(GameDto)
  @Get('bulk')
  @HttpCode(200)
  async getByIds(@Query('ids') ids: string) {
    const result = await this.dataService.getByIds(ids.split(','));

    // Send the response
    return result;
  }

  @ApiDescriptor(getByOffersDescriptor)
  @Serialize(GameDto)
  @Get('offers')
  @HttpCode(200)
  async getByOffers() {
    const result = await this.dataService.getByOffers();

    // Send the response
    return result;
  }

  @ApiDescriptor(getByNewestDescriptor)
  @Serialize(GameDto)
  @Get('newest')
  @HttpCode(200)
  async getByNewest() {
    const result = await this.dataService.getByNewest();

    // Send the response
    return result;
  }

  @ApiDescriptor(getByTopSalesDescriptor)
  @Serialize(GameDto)
  @Get('top-sales')
  @HttpCode(200)
  async getByTopSales() {
    const result = await this.dataService.getByTopSales();

    // Send the response
    return result;
  }

  @ApiDescriptor(getBySpecialsDescriptor)
  @Serialize(GameDto)
  @Get('specials')
  @HttpCode(200)
  async getBySpecials() {
    const result = await this.dataService.getBySpecials();

    // Send the response
    return result;
  }

  @ApiDescriptor(getByUpcommingDescriptor)
  @Serialize(GameDto)
  @Get('upcomming')
  @HttpCode(200)
  async getByUpcomming() {
    const result = await this.dataService.getByUpcomming();

    // Send the response
    return result;
  }

  @ApiDescriptor(getGameReviewsDescriptor)
  @Serialize(ReviewDto)
  @Get(':id/reviews')
  @HttpCode(200)
  async getGameReviews(
    @Param('gameId') gameId: string,
    @Query('filter') filter: 'positive' | 'negative' | 'all',
    @Query('sort') sort: 'newest' | 'oldest',
    @Query('offset') offset: string,
    @Query('limit') limit: string,
  ) {
    const result = await this.dataService.getGameReviews(gameId, filter, sort, {
      offset: parseInt(offset, 10),
      limit: parseInt(limit, 10),
    });

    // Send the response
    return result;
  }
}
