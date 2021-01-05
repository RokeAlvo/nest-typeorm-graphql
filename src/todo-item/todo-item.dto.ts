import { FilterableField, Relation } from '@nestjs-query/query-graphql';
import { ObjectType, GraphQLISODateTime, Field, Int } from '@nestjs/graphql';
import { UserDTO } from '../users/user.dto';

@ObjectType('TodoItem')
@Relation('user', () => UserDTO, { disableRemove: false })
export class TodoItemDTO {
  @FilterableField(() => Int)
  id!: number;

  @FilterableField()
  title!: string;

  @FilterableField()
  completed!: boolean;

  @Field(() => GraphQLISODateTime)
  created!: Date;

  @Field(() => GraphQLISODateTime)
  updated!: Date;
}
