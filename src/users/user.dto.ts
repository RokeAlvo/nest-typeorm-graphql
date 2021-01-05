import {
  Authorize,
  FilterableField,
  Relation,
} from '@nestjs-query/query-graphql';
import { ObjectType, GraphQLISODateTime, Field, Int } from '@nestjs/graphql';
import { TodoItemDTO } from '../todo-item/todo-item.dto';
import { UserContext } from '../auth/auth.interfaces';

@ObjectType('User')
// @Authorize({
//   authorize: (context: UserContext) => ({
//     id: { eq: context.req.user.id },
//   }),
// })
@Relation('todos', () => [TodoItemDTO], { disableRemove: true })
export class UserDTO {
  @FilterableField(() => Int)
  id!: number;

  @FilterableField()
  login!: string;

  @Field()
  passwordHash: string;
}
