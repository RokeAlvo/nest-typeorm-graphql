import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TodoItemEntity } from '../todo-item/todo-item.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  login!: string;

  @Column()
  passwordHash!: string;

  @OneToMany(() => TodoItemEntity, (todoItem) => todoItem.user)
  todos!: TodoItemEntity[];
}
