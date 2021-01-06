import { FilterableField, Relation } from '@nestjs-query/query-graphql';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { TodoItemDTO } from '../todo-item/todo-item.dto';
import { Role } from '../roles/role.interface';

@ObjectType('User')
@Relation('todos', () => [TodoItemDTO], { disableRemove: true })
export class UserDTO {
  @FilterableField(() => Int)
  id!: number;

  @FilterableField()
  login!: string;

  @Field()
  passwordHash: string;

  @Field(() => Role)
  role: Role;
}
