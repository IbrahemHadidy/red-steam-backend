// NestJS
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

// Multer
import { AnyFilesInterceptor } from '@nest-lab/fastify-multer';

// Decorators
import { ApiDescriptor } from '@decorators/api-descriptor.decorator';
import { Serialize } from '@decorators/serialize.decorator';
import { ApiTags } from '@nestjs/swagger';

// Pipes
import { ParseJsonPipe } from '@pipes/parse-json.pipe';
import { UnionTypeValidationPipe } from '@pipes/union-type-validation.pipe';

// Guards
import { AdminGuard } from '@guards/admin.guard';
import { JwtAccessAuthGuard } from '@guards/jwt-access-auth.guard';

// Services
import { OfferService } from '@apis/game/offer/offer.service';

// Body DTOs
import { CreateOfferDto } from '@apis/game/offer/dtos/create-offer.dto';
import { UpdateOfferDto } from '@apis/game/offer/dtos/update-offer.dto';

// Query DTOs
import { OfferQueryDto } from '@apis/game/offer/dtos/offer-search-query.dto';

// Serializer DTOs
import { PaginatedGamesDataDto } from '@apis/game/serializer-dtos/paginated-games-data.dto';

// importing swagger descriptors
import { createOfferDescriptor } from '@apis/game/offer/api-descriptors/create-offer.descriptor';
import { deleteOfferDescriptor } from '@apis/game/offer/api-descriptors/delete-offer.descriptor';
import { getOffersPaginatedDescriptor } from '@apis/game/offer/api-descriptors/get-offers-paginated.descriptor';
import { updateOfferDescriptor } from '@apis/game/offer/api-descriptors/update-offer.descriptor';

@ApiTags('Game Offer')
@Controller('game/offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @ApiDescriptor(createOfferDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @UseInterceptors(AnyFilesInterceptor())
  @Post()
  @HttpCode(201)
  async create(@Body() body: CreateOfferDto) {
    const result = await this.offerService.createOffer(body);
    // Send the response
    return result;
  }

  @ApiDescriptor(getOffersPaginatedDescriptor)
  @Serialize(PaginatedGamesDataDto)
  @Get('paginated')
  @HttpCode(200)
  async getOffersPaginated(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query(
      'orderBy',
      new UnionTypeValidationPipe([
        'id',
        'name',
        'discountPrice',
        'basePrice',
        'discountPercentage',
        'offerType',
        'discountStartDate',
        'discountEndDate',
      ]),
    )
    orderBy:
      | 'id'
      | 'name'
      | 'discountPrice'
      | 'basePrice'
      | 'discountPercentage'
      | 'offerType'
      | 'discountStartDate'
      | 'discountEndDate',
    @Query('order', new UnionTypeValidationPipe(['ASC', 'DESC'])) order: 'ASC' | 'DESC',
    @Query('searchQuery', new ParseJsonPipe(OfferQueryDto, { optional: true, validate: true }))
    searchQuery: OfferQueryDto = {},
  ) {
    const result = await this.offerService.getOffersPaginated(page, limit, orderBy, order, searchQuery, true);

    // Send the response
    return result;
  }

  @ApiDescriptor(updateOfferDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @Put(':id')
  @HttpCode(200)
  async updateOffer(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateOfferDto) {
    const result = await this.offerService.updateOffer({ id, ...body });

    // Send the response
    return result;
  }

  @ApiDescriptor(deleteOfferDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @Delete('/:id')
  @HttpCode(200)
  async deleteOffer(@Param('id', ParseIntPipe) id: number) {
    const result = await this.offerService.delete(id);

    // Send the response
    return result;
  }
}
