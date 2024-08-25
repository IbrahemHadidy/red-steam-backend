import { Controller, Get, HttpCode, Param, UseGuards, Query, Delete } from '@nestjs/common';
import { ApiDescriptor } from '@decorators/api-descriptor.decorator';
import { ApiTags } from '@nestjs/swagger';
import { ReviewService } from '@apis/review/review.service';

// Guards
import { JwtAccessAuthGuard } from '@guards/jwt-access-auth.guard';
import { AdminGuard } from '@guards/admin.guard';

// Swagger descriptors
import { getReviewsPaginatedDescriptor } from '@apis/review/api-descriptors/get-reviews-paginated.descriptor';
import { deleteReviewDescriptor } from '@apis/review/api-descriptors/delete-review.descriptor';

@Controller('review')
@ApiTags('Review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiDescriptor(getReviewsPaginatedDescriptor)
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
      searchQuery ? JSON.parse(searchQuery) : {},
    );

    // Send the response
    return result;
  }

  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @ApiDescriptor(deleteReviewDescriptor)
  @Delete(':id')
  @HttpCode(200)
  async deleteReview(@Param('id') id: string) {
    const result = await this.reviewService.deleteReview(Number(id));

    // Send the response
    return result;
  }
}
