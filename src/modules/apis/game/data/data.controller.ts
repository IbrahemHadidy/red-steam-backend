// NestJS
import { Controller, Get, HttpCode, Param, ParseArrayPipe, ParseIntPipe, Query } from '@nestjs/common';

// Swagger
import { ApiDescriptor } from '@decorators/api-descriptor.decorator';
import { ApiTags } from '@nestjs/swagger';

// Serializer decorator
import { Serialize } from '@decorators/serialize.decorator';

// Pipes
import { ParseQueryArrayPipe } from '@pipes/parse-query-array.pipe';
import { ParseQueryBoolPipe } from '@pipes/parse-query-boolean.pipe';
import { ParseQueryFloatPipe } from '@pipes/parse-query-float.pipe';
import { ParseQueryIntPipe } from '@pipes/parse-query-integer.pipe';
import { UnionTypeValidationPipe } from '@pipes/union-type-validation.pipe';

// Services
import { DataService } from '@apis/game/data/data.service';

// Serializing DTOs
import { GameDto } from '@apis/game/serializer-dtos/game.dto';
import { ReviewDto } from '@apis/review/serializer-dtos/review.dto';
// import { PaginatedGamesDataDto } from '@apis/game/serializer-dtos/paginated-games-data.dto';

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
    @Query(
      'sort',
      new UnionTypeValidationPipe(['relevance', 'name', 'lowestPrice', 'highestPrice', 'releaseDate', 'reviews'], {
        optional: true,
      }),
    )
    sort?: 'relevance' | 'name' | 'lowestPrice' | 'highestPrice' | 'releaseDate' | 'reviews',
    @Query('partialName') partialName?: string,
    @Query('maxPrice', new ParseQueryFloatPipe()) maxPrice?: number,
    @Query('tags', new ParseQueryArrayPipe({ items: Number })) tags?: number[],
    @Query('excludeTags', new ParseQueryArrayPipe({ items: Number })) excludeTags?: number[],
    @Query('paid', new ParseQueryBoolPipe()) paid?: boolean,
    @Query('offers', new ParseQueryBoolPipe()) offers?: boolean,
    @Query('platforms', new ParseQueryArrayPipe({ items: String }))
    platforms?: ('win' | 'mac')[],
    @Query('publishers', new ParseQueryArrayPipe({ items: Number })) publishers?: number[],
    @Query('developers', new ParseQueryArrayPipe({ items: Number })) developers?: number[],
    @Query('features', new ParseQueryArrayPipe({ items: Number })) features?: number[],
    @Query('languages', new ParseQueryArrayPipe({ items: Number })) languages?: number[],
    @Query('featured', new ParseQueryBoolPipe()) featured?: boolean,
    @Query('excludeMature', new ParseQueryBoolPipe()) excludeMature?: boolean,
    @Query('excludedGames', new ParseQueryArrayPipe({ items: Number }))
    excludedGames?: number[],
    @Query('upcomingMode', new UnionTypeValidationPipe(['onlyUpcoming', 'exclude'], { optional: true }))
    upcomingMode?: 'onlyUpcoming' | 'exclude',
    @Query('offset', new ParseQueryIntPipe()) offset?: number,
    @Query('limit', new ParseQueryIntPipe()) limit?: number,
  ) {
    const result = await this.dataService.getByParameters(
      {
        sort,
        partialName,
        maxPrice,
        tags,
        excludeTags,
        paid,
        offers,
        platforms,
        publishers,
        developers,
        features,
        languages,
        featured,
        excludeMature,
        excludedGames,
        upcomingMode,
      },
      {
        offset,
        limit,
      },
    );

    // Send the response
    return result;
  }

  @ApiDescriptor(getFeaturedDescriptor)
  @Serialize(GameDto)
  @Get('featured')
  @HttpCode(200)
  async getFeatured(@Query('limit', ParseIntPipe) limit: number = 10) {
    const result = await this.dataService.getFeaturedGames(limit);

    // Send the response
    return result;
  }

  @ApiDescriptor(getByTagsDescriptor)
  @Serialize(GameDto)
  @Get('tags')
  @HttpCode(200)
  async getByUserTags(
    @Query('tags', new ParseArrayPipe({ items: Number }))
    tags: number[],
    @Query('limit', ParseIntPipe)
    limit: number,
  ) {
    const result = await this.dataService.getByUserTags(tags, limit);

    // Send the response
    return result;
  }

  @ApiDescriptor(getByIdDescriptor)
  @Serialize(GameDto)
  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.dataService.getById(id);

    // Send the response
    return result;
  }

  @ApiDescriptor(getByIdsDescriptor)
  @Serialize(GameDto)
  @Get('bulk')
  @HttpCode(200)
  async getByIds(@Query('ids', new ParseArrayPipe({ items: Number })) ids: number[]) {
    const result = await this.dataService.getByIds(ids);

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
  @Get(':gameId/reviews')
  @HttpCode(200)
  async getGameReviews(
    @Param('gameId', ParseIntPipe) gameId: number,
    @Query('filter', new UnionTypeValidationPipe(['positive', 'negative', 'all']))
    filter: 'positive' | 'negative' | 'all',
    @Query('sort', new UnionTypeValidationPipe(['newest', 'oldest'])) sort: 'newest' | 'oldest',
    @Query('offset', ParseIntPipe) offset: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    const result = await this.dataService.getGameReviews(gameId, filter, sort, {
      offset,
      limit,
    });

    // Send the response
    return result;
  }
}
