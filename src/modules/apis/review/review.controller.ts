// NestJS
import { Controller, Delete, Get, HttpCode, Param, Query, UseGuards } from '@nestjs/common';

// Serializer decorator
import { Serialize } from '@decorators/serialize.decorator';

// Swagger
import { ApiDescriptor } from '@decorators/api-descriptor.decorator';
import { ApiTags } from '@nestjs/swagger';

// Guards
import { AdminGuard } from '@guards/admin.guard';
import { JwtAccessAuthGuard } from '@guards/jwt-access-auth.guard';

// Services
import { ReviewService } from '@apis/review/review.service';

// Swagger descriptors
import { deleteReviewDescriptor } from '@apis/review/api-descriptors/delete-review.descriptor';
import { getReviewsPaginatedDescriptor } from '@apis/review/api-descriptors/get-reviews-paginated.descriptor';

// Serializer DTOs
import { ReviewDto } from '@apis/review/serializer-dtos/review.dto';

@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiDescriptor(getReviewsPaginatedDescriptor)
  @Serialize(ReviewDto)
  @Get('paginated')
  @HttpCode(200)
  async getReviewsPaginated(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('orderBy') orderBy: 'id' | 'username' | 'gameName' | 'content' | 'rating',
    @Query('order') order: 'ASC' | 'DESC',
    @Query('searchQuery') searchQuery?: string,
  ) {
    const result = await this.reviewService.getReviewsPaginated(
      Number(page),
      Number(limit),
      orderBy,
      order,
      searchQuery ? JSON.parse(decodeURIComponent(searchQuery)) : {},
    );

    // Send the response
    return result;
  }

  @ApiDescriptor(deleteReviewDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @Delete(':id')
  @HttpCode(200)
  async deleteReview(@Param('id') id: string) {
    const result = await this.reviewService.deleteReview(Number(id));

    // Send the response
    return result;
  }
}
