import { Body, Controller, Delete, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AnyFilesInterceptor } from '@nest-lab/fastify-multer';

// Decorators
import { ApiDescriptor } from '@decorators/api-descriptor.decorator';

// Guards
import { JwtAccessAuthGuard } from '@guards/jwt-access-auth.guard';
import { AdminGuard } from '@guards/admin.guard';

// Services
import { OfferService } from '@apis/game/offer/offer.service';

// Dtos
import { CreateOfferDto } from '@apis/game/offer/dtos/create-offer.dto';
import { UpdateOfferDto } from '@apis/game/offer/dtos/update-offer.dto';

// importing swagger descriptors
import { createOfferDescriptor } from '@apis/game/offer/api-descriptors/create-offer.descriptor';
import { updateOfferDescriptor } from '@apis/game/offer/api-descriptors/update-offer.descriptor';
import { deleteOfferDescriptor } from '@apis/game/offer/api-descriptors/delete-offer.descriptor';

@Controller('game/offer')
@ApiTags('Game Offer')
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

  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @ApiDescriptor(updateOfferDescriptor)
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
