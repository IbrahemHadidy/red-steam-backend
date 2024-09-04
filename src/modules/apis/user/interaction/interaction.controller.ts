// NestJS
import { Body, Controller, Delete, Get, HttpCode, Post, Put, Req, UseGuards } from '@nestjs/common';

// Fastify
import { FastifyRequest as Request } from 'fastify';

// Swagger
import { ApiDescriptor } from '@decorators/api-descriptor.decorator';
import { ApiTags } from '@nestjs/swagger';

// Guards
import { JwtAccessAuthGuard } from '@guards/jwt-access-auth.guard';

// Services
import { InteractionService } from '@apis/user/interaction/interaction.service';

// DTOs
import { AddToCartDto } from '@apis/user/interaction/dtos/add-to-cart.dto';
import { AddToLibraryDto } from '@apis/user/interaction/dtos/add-to-library.dto';
import { AddToWishlistDto } from '@apis/user/interaction/dtos/add-to-wishlist.dto';
import { ChangeTagsDto } from '@apis/user/interaction/dtos/change-tags.dto';
import { RemoveFromCartDto } from '@apis/user/interaction/dtos/remove-from-cart.dto';
import { RemoveFromLibraryDto } from '@apis/user/interaction/dtos/remove-from-library.dto';
import { RemoveFromWishlistDto } from '@apis/user/interaction/dtos/remove-from-wishlist.dto';
import { ReviewGameDto } from '@apis/user/interaction/dtos/review-game.dto';

// Swagger descriptors
import { addToCartDescriptor } from '@apis/user/interaction/api-descriptors/add-to-cart.descriptor';
import { addToLibraryDescriptor } from '@apis/user/interaction/api-descriptors/add-to-library.descriptor';
import { addToWishlistDescriptor } from '@apis/user/interaction/api-descriptors/add-to-wishlist.descriptor';
import { changeTagsDescriptor } from '@apis/user/interaction/api-descriptors/change-tags.descriptor';
import { getCartDescriptor } from '@apis/user/interaction/api-descriptors/get-cart.descriptor';
import { getLibraryDescriptor } from '@apis/user/interaction/api-descriptors/get-library.descriptor';
import { getReviewsDescriptor } from '@apis/user/interaction/api-descriptors/get-reviews.descriptor';
import { getTagsDescriptor } from '@apis/user/interaction/api-descriptors/get-tags.descriptor';
import { getWishlistDescriptor } from '@apis/user/interaction/api-descriptors/get-wishlist.descriptor';
import { removeFromCartDescriptor } from '@apis/user/interaction/api-descriptors/remove-from-cart.descriptor';
import { removeFromLibraryDescriptor } from '@apis/user/interaction/api-descriptors/remove-from-library.descriptor';
import { removeFromWishlistDescriptor } from '@apis/user/interaction/api-descriptors/remove-from-wishlist.descriptor';
import { reviewGameDescriptor } from '@apis/user/interaction/api-descriptors/review-game.descriptor';

@ApiTags('User Interaction')
@Controller('user/interaction')
export class InteractionController {
  constructor(private readonly interactionService: InteractionService) {}

  @ApiDescriptor(changeTagsDescriptor)
  @UseGuards(JwtAccessAuthGuard)
  @Put('tags')
  @HttpCode(200)
  public async changeTags(@Req() request: Request, @Body() bodyData: ChangeTagsDto) {
    const data = {
      ...bodyData,
      userId: request['userId'],
    };

    const result = await this.interactionService.changeTags(data);

    // Send the response
    return result;
  }

  @ApiDescriptor(getTagsDescriptor)
  @UseGuards(JwtAccessAuthGuard)
  @Get('tags')
  @HttpCode(200)
  public async getTags(@Req() request: Request) {
    const data = { userId: request['userId'] };
    const result = await this.interactionService.getTags(data);

    // Send the response
    return result;
  }

  @ApiDescriptor(addToLibraryDescriptor)
  @UseGuards(JwtAccessAuthGuard)
  @Post('library')
  @HttpCode(201)
  public async addToLibrary(@Req() request: Request, @Body() bodyData: AddToLibraryDto) {
    const data = {
      ...bodyData,
      userId: request['userId'],
    };

    const result = await this.interactionService.addToLibrary(data);

    // Send the response
    return result;
  }

  @ApiDescriptor(removeFromLibraryDescriptor)
  @UseGuards(JwtAccessAuthGuard)
  @Delete('library')
  @HttpCode(204)
  public async removeFromLibrary(@Req() request: Request, @Body() bodyData?: RemoveFromLibraryDto) {
    const userId = request['userId'];

    let result: { success: boolean; message: string };
    if (bodyData && bodyData.itemsIds) {
      const data = { userId, itemsIds: bodyData.itemsIds };
      result = await this.interactionService.removeFromLibrary(data);
    } else {
      const data = { userId };
      result = await this.interactionService.clearLibrary(data);
    }

    // Send the response
    return result;
  }

  @ApiDescriptor(addToWishlistDescriptor)
  @UseGuards(JwtAccessAuthGuard)
  @Post('wishlist')
  @HttpCode(201)
  public async addToWishlist(@Req() request: Request, @Body() bodyData: AddToWishlistDto) {
    const data = {
      ...bodyData,
      userId: request['userId'],
    };

    const result = await this.interactionService.addToWishlist(data);

    // Send the response
    return result;
  }

  @ApiDescriptor(removeFromWishlistDescriptor)
  @UseGuards(JwtAccessAuthGuard)
  @Delete('wishlist')
  @HttpCode(204)
  public async removeFromWishlist(@Req() request: Request, @Body() bodyData?: RemoveFromWishlistDto) {
    const userId = request['userId'];

    let result: { success: boolean; message: string };
    if (bodyData && bodyData.itemsIds) {
      const data = { userId, itemsIds: bodyData.itemsIds };
      result = await this.interactionService.removeFromWishlist(data);
    } else {
      const data = { userId };
      result = await this.interactionService.clearWishlist(data);
    }

    // Send the response
    return result;
  }

  @ApiDescriptor(addToCartDescriptor)
  @UseGuards(JwtAccessAuthGuard)
  @Post('cart')
  @HttpCode(201)
  public async addToCart(@Req() request: Request, @Body() bodyData: AddToCartDto) {
    const data = {
      ...bodyData,
      userId: request['userId'],
    };

    const result = await this.interactionService.addToCart(data);

    // Send the response
    return result;
  }

  @ApiDescriptor(removeFromCartDescriptor)
  @UseGuards(JwtAccessAuthGuard)
  @Delete('cart')
  @HttpCode(204)
  public async removeFromCart(@Req() request: Request, @Body() bodyData?: RemoveFromCartDto) {
    const userId = request['userId'];

    let result: { success: boolean; message: string };
    if (bodyData && bodyData.itemsIds) {
      const data = { userId, itemsIds: bodyData.itemsIds };
      result = await this.interactionService.removeFromCart(data);
    } else {
      const data = { userId };
      result = await this.interactionService.clearCart(data);
    }

    // Send the response
    return result;
  }

  @ApiDescriptor(getLibraryDescriptor)
  @UseGuards(JwtAccessAuthGuard)
  @Get('library')
  @HttpCode(200)
  public async getLibrary(@Req() request: Request) {
    const data = { userId: request['userId'] };

    const result = await this.interactionService.getLibrary(data);

    // Send the response
    return result;
  }

  @ApiDescriptor(getCartDescriptor)
  @UseGuards(JwtAccessAuthGuard)
  @Get('cart')
  @HttpCode(200)
  public async getCart(@Req() request: Request) {
    const data = { userId: request['userId'] };

    const result = await this.interactionService.getCart(data);

    // Send the response
    return result;
  }

  @ApiDescriptor(getWishlistDescriptor)
  @UseGuards(JwtAccessAuthGuard)
  @Get('wishlist')
  @HttpCode(200)
  public async getWishlist(@Req() request: Request) {
    const data = { userId: request['userId'] };

    const result = await this.interactionService.getWishlist(data);

    // Send the response
    return result;
  }

  @ApiDescriptor(reviewGameDescriptor)
  @UseGuards(JwtAccessAuthGuard)
  @Post('review')
  @HttpCode(201)
  public async reviewGame(@Req() request: Request, @Body() bodyData: ReviewGameDto) {
    const data = {
      ...bodyData,
      userId: request['userId'],
    };

    const result = await this.interactionService.reviewGame(data);

    // Send the response
    return result;
  }

  @ApiDescriptor(getReviewsDescriptor)
  @UseGuards(JwtAccessAuthGuard)
  @Get('reviews')
  @HttpCode(200)
  public async getReviews(@Req() request: Request) {
    const data = { userId: request['userId'] };
    const result = await this.interactionService.getReviews(data);

    // Send the response
    return result;
  }
}
