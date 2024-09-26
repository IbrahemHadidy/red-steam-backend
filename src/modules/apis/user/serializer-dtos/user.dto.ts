// Class-transformer
import { Expose, Type } from 'class-transformer';

// Body DTOs
import { ReviewDto } from '@apis/review/serializer-dtos/review.dto';
import { TagDto } from '@apis/tag/serializer-dtos/tag.dto';

// Types
import { ReviewDto as ReviewType } from '@apis/review/serializer-dtos/review.dto';
import { TagDto as TagType } from '@apis/tag/serializer-dtos/tag.dto';

export class UserDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly username: string;

  @Expose()
  readonly email: string;

  @Expose()
  readonly country: string;

  @Expose()
  readonly phoneNumber: string;

  @Expose()
  readonly profilePicture: string;

  @Expose()
  @Type(() => TagDto)
  readonly tags: TagType[];

  @Expose()
  readonly isVerified: boolean;

  @Expose()
  readonly isPhoneVerified: boolean;

  @Expose()
  readonly isAdmin: boolean;

  @Expose()
  readonly isActive: boolean;

  @Expose()
  readonly createdAt: Date;

  @Expose()
  readonly wishlist: BaseItem[];

  @Expose()
  readonly cart: BaseItem[];

  @Expose()
  readonly library: BaseItem[];

  @Expose()
  @Type(() => ReviewDto)
  readonly reviews: ReviewType[];
}

class BaseItem {
  @Expose()
  readonly id: number;

  @Expose()
  readonly addedOn: Date;
}
