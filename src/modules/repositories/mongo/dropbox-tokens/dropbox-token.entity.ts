// TypeORM
import { BaseEntity, Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('dropbox_tokens')
export class DropboxToken extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  accessToken: string;

  @Column()
  expirationTime: number;
}
