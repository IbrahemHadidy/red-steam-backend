// NestJS
import { Body, Controller, Delete, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';

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

// DTOs
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
  async updateOffer(@Param('id') id: string, @Body() body: UpdateOfferDto) {
    const result = await this.offerService.updateOffer({ gameId: Number(id), ...body });

    // Send the response
    return result;
  }

  @ApiDescriptor(deleteOfferDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @Delete('/:id')
  @HttpCode(200)
  async deleteOffer(@Param('id') id: string) {
    const result = await this.offerService.delete(Number(id));

    // Send the response
    return result;
  }
}
