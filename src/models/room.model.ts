import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import User from './user.model';

@Table({ tableName: 'rooms', underscored: true })
export default class Room extends Model<Room> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING(64), unique: true, allowNull: false })
  title: string;

  //User realation
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
  userId: string;

  @BelongsTo(() => User)
  user?: User;
}

export type RoomType = Omit<Room, Exclude<keyof Model, 'id'>>;