import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import User from './user.model';
import Room from './room.model';
import MessageLike from './meassage-like.model';

@Table({ tableName: 'messages', underscored: true })
export default class Message extends Model<Message> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.TEXT, unique: true, allowNull: false })
  text: string;

  //User relation
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
  userId: string;

  @BelongsTo(() => User)
  user?: User;

  //Room relation
  @ForeignKey(() => Room)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
  roomId: string;

  @BelongsTo(() => Room)
  room?: Room;

  //Like relation
  @BelongsToMany(() => User, () => MessageLike)
  likes?: User[];
}

export type MessageType = Omit<Message, Exclude<keyof Model, 'id'>>;