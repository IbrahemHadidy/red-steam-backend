// TypeORM
import { BaseEntity, Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('blacklisted_tokens')
export class BlacklistedToken extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  token: string;
}
