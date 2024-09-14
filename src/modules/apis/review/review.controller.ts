// NestJS
import { Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';

// Decorators
import { Serialize } from '@decorators/serialize.decorator';

// Swagger
import { ApiDescriptor } from '@decorators/api-descriptor.decorator';
import { ApiTags } from '@nestjs/swagger';

// Pipes
import { ParseJsonPipe } from '@pipes/parse-json.pipe';
import { UnionTypeValidationPipe } from '@pipes/union-type-validation.pipe';

// Guards
import { AdminGuard } from '@guards/admin.guard';
import { JwtAccessAuthGuard } from '@guards/jwt-access-auth.guard';

// Services
import { ReviewService } from '@apis/review/review.service';

// Query DTOs
import { ReviewQueryDto } from '@apis/review/dtos/review-search-query.dto';

// Serializer DTOs
// import { ReviewDto } from '@apis/review/serializer-dtos/review.dto';
import { PaginatedReviewsDataDto } from '@apis/review/serializer-dtos/paginated-reviews-data.dto';

// Swagger descriptors
import { deleteReviewDescriptor } from '@apis/review/api-descriptors/delete-review.descriptor';
import { getReviewsPaginatedDescriptor } from '@apis/review/api-descriptors/get-reviews-paginated.descriptor';

@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiDescriptor(getReviewsPaginatedDescriptor)
  @Serialize(PaginatedReviewsDataDto)
  @Get('paginated')
  @HttpCode(200)
  async getReviewsPaginated(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('orderBy', new UnionTypeValidationPipe(['id', 'username', 'gameName', 'content', 'rating']))
    orderBy: 'id' | 'username' | 'gameName' | 'content' | 'rating',
    @Query('order', new UnionTypeValidationPipe(['ASC', 'DESC'])) order: 'ASC' | 'DESC',
    @Query('searchQuery', new ParseJsonPipe(ReviewQueryDto, { optional: true })) searchQuery: ReviewQueryDto = {},
  ) {
    const result = await this.reviewService.getReviewsPaginated(page, limit, orderBy, order, searchQuery);

    // Send the response
    return result;
  }

  @ApiDescriptor(deleteReviewDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @Delete(':id')
  @HttpCode(200)
  async deleteReview(@Param('id', ParseIntPipe) id: number) {
    const result = await this.reviewService.deleteReview(id);

    // Send the response
    return result;
  }
}
