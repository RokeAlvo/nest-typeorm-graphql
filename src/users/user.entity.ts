import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TodoItemEntity } from '../todo-item/todo-item.entity';
import { Role } from '../roles/role.interface';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  login!: string;

  @Column()
  passwordHash!: string;

  @Column()
  role!: Role;

  @OneToMany(() => TodoItemEntity, (todoItem) => todoItem.user)
  todos!: TodoItemEntity[];
}
