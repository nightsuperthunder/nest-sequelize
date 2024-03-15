import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column({ type: DataType.STRING({ length: 50 }) })
  firstName: string;
  @Column({ type: DataType.STRING({ length: 50 }) })
  lastName: string;
  @Column({ type: DataType.STRING({ length: 50 }), unique: true })
  email: string;
  @Column({ type: DataType.STRING({ length: 50 }) })
  password: string;
  @Column({ type: DataType.STRING({ length: 20 }) })
  phone: string;
  @CreatedAt
  createdAt: Date;
  @UpdatedAt
  updatedAt: Date;
}
