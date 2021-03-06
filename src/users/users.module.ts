import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { UserDTO } from './user.dto';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ValidateUniqUserPipe } from './validateUniqUser.pipe';
import { Roles } from '../roles/roles.decorator';

const guards = [JwtAuthGuard];

@Module({
  imports: [
    NestjsQueryTypeOrmModule.forFeature([User]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([User])],
      resolvers: [
        {
          DTOClass: UserDTO,
          EntityClass: User,
          create: {
            guards,
            pipes: [ValidateUniqUserPipe],
          },
          update: { guards },
          delete: { guards },
          read: { guards, decorators: [Roles('admin')] },
        },
      ],
    }),
  ],
  exports: [NestjsQueryTypeOrmModule.forFeature([User])],
})
export class UsersModule {}
