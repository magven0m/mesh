import { BelongsToMany, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import Room from './room.model';
import Message from './message.model';
import MessageLike from './meassage-like.model';

@Table({ tableName: 'users', underscored: true })
export default class User extends Model<User> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING(64), unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING(64), unique: true, allowNull: false })
  nickname: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  password: string;

  //Room relation
  @HasMany(() => Room)
  rooms: Room[];

  //Messasge relation
  @HasMany(() => Message)
  messages: Message[];

  //Like relation
  @BelongsToMany(() => Message, () => MessageLike)
  likes: Message[];
}

export type UserType = Omit<User, Exclude<keyof Model, 'id'>>;
