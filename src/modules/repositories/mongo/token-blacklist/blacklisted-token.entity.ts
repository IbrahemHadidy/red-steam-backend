import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('blacklisted_tokens')
export class BlacklistedToken {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  token: string;
}