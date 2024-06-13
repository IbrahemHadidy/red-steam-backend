import { Expose } from 'class-transformer';

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
  tags: [];

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
  wishlist: [];

  @Expose()
  cart: [];

  @Expose()
  library: [];

  @Expose()
  reviews: [];
}
