// NestJS
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

// Multer
import { AnyFilesInterceptor } from '@nest-lab/fastify-multer';

// Decorators
import { ApiDescriptor } from '@decorators/api-descriptor.decorator';
import { ApiTags } from '@nestjs/swagger';

// Guards
import { AdminGuard } from '@guards/admin.guard';
import { JwtAccessAuthGuard } from '@guards/jwt-access-auth.guard';

// Services
import { OfferService } from '@apis/game/offer/offer.service';

// Body DTOs
import { CreateOfferDto } from '@apis/game/offer/dtos/create-offer.dto';
import { UpdateOfferDto } from '@apis/game/offer/dtos/update-offer.dto';

// importing swagger descriptors
import { createOfferDescriptor } from '@apis/game/offer/api-descriptors/create-offer.descriptor';
import { deleteOfferDescriptor } from '@apis/game/offer/api-descriptors/delete-offer.descriptor';
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

  @ApiDescriptor(updateOfferDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @Put(':id')
  @HttpCode(200)
  async updateOffer(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateOfferDto) {
    const result = await this.offerService.updateOffer({ gameId: id, ...body });

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
