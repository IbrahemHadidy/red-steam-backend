// NestJS
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// Entities
import { GameTag } from '@repositories/sql/games-tags/game-tag.entity';
import { Review } from '@repositories/sql/reviews/review.entity';

// Types
import type { GameTag as GameTagType } from '@repositories/sql/games-tags/game-tag.entity';
import type { Review as ReviewType } from '@repositories/sql/reviews/review.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  country: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  profilePicture: string;

  @ManyToMany(() => GameTag, (tag: GameTagType) => tag.users)
  @JoinTable({ name: 'users_tags' })
  tags: GameTagType[];

  @Column({ nullable: true })
  verificationToken: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  phoneVerificationCode: string;

  @Column({ nullable: true })
  isPhoneVerified: boolean;

  @Column({ nullable: true })
  passwordResetToken: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: false })
  isLoggedIn: boolean;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ type: 'jsonb', default: [] })
  wishlist: WishlistItem[];

  @Column({ type: 'jsonb', default: [] })
  cart: CartItem[];

  @Column({ type: 'jsonb', default: [] })
  library: LibraryItem[];

  @OneToMany(() => Review, (review: ReviewType) => review.user)
  reviews?: ReviewType[];
}

export class BaseItem {
  id: number;
  addedOn: Date;

  constructor(id: number) {
    this.id = id;
    this.addedOn = new Date();
  }
}

export class WishlistItem extends BaseItem {}

export class CartItem extends BaseItem {}

export class LibraryItem extends BaseItem {}
