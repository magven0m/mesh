import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import User from './user.model';
import Message from './message.model';

@Table({ tableName: 'user_message_likes', underscored: true })
export default class MessageLike extends Model<MessageLike> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  //Message realation
  @ForeignKey(() => Message)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
  messageId: string;

  @BelongsTo(() => Message)
  message?: Message;

  //User realation
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
  userId: string;

  @BelongsTo(() => User)
  user?: User;
}

export type MessageLikeType = Omit<MessageLike, Exclude<keyof Model, 'id'>>;