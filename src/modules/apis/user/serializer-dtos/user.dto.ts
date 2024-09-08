// Class-transformer
import { Expose, Type } from 'class-transformer';

// DTOs
import { ReviewDto } from '@apis/review/serializer-dtos/review.dto';
import { TagDto } from '@apis/tag/serializer-dtos/tag.dto';

// Types
import { ReviewDto as ReviewDtoType } from '@apis/review/serializer-dtos/review.dto';
import { TagDto as TagDtoType } from '@apis/tag/serializer-dtos/tag.dto';

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  country: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  profilePicture: string;

  @Expose()
  @Type(() => TagDto)
  tags: TagDtoType[];

  @Expose()
  isVerified: boolean;

  @Expose()
  isPhoneVerified: boolean;

  @Expose()
  isAdmin: boolean;

  @Expose()
  isActive: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  wishlist: BaseItem[];

  @Expose()
  cart: BaseItem[];

  @Expose()
  library: BaseItem[];

  @Expose()
  @Type(() => ReviewDto)
  reviews: ReviewDtoType[];
}

class BaseItem {
  @Expose()
  id: number;

  @Expose()
  addedOn: Date;
}
