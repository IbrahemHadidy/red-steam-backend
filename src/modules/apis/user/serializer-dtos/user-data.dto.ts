import type { GameDataDto as GameDataDtoType } from '@apis/game/serializer-dtos/game-data.dto';
import { GameDataDto } from '@apis/game/serializer-dtos/game-data.dto';
import { Expose, Type } from 'class-transformer';

export class UserDataDto {
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
  tags: TagDto[];

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
  @Type(() => reviewDto)
  reviews: reviewDto[];
}

class BaseItem {
  @Expose()
  id: number;

  @Expose()
  addedOn: Date;
}

class TagDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}

class reviewDto {
  @Expose()
  id: number;

  @Expose()
  positive: boolean;

  @Expose()
  date: Date;

  @Expose()
  content: string;

  @Expose()
  @Type(() => UserDataDto)
  user: UserDataDto;

  @Expose()
  @Type(() => GameDataDto)
  game: GameDataDtoType;
}
