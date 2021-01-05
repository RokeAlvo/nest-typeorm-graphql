import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class LoginInputDTO {
  @Field()
  @IsString()
  login!: string;

  @Field()
  @IsString()
  passwordHash!: string;
}
