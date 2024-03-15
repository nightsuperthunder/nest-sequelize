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
  @Column({ type: DataType.STRING({ length: 50 }), field: 'first_name' })
  firstName: string;

  @Column({ type: DataType.STRING({ length: 50 }), field: 'last_name' })
  lastName: string;

  @Column({ type: DataType.STRING({ length: 50 }), unique: true })
  email: string;

  @Column({ type: DataType.STRING({ length: 150 }) })
  password: string;

  @Column({ type: DataType.STRING({ length: 20 }) })
  phone: string;

  @Column({ field: 'created_at' })
  @CreatedAt
  createdAt: Date;

  @Column({ field: 'updated_at' })
  @UpdatedAt
  updatedAt: Date;
}
