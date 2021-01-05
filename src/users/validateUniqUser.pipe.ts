import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { User } from './user.entity';
import { UserDTO } from './user.dto';

@Injectable()
export class ValidateUniqUserPipe implements PipeTransform {
  constructor(
    @InjectQueryService(User) private usersService: QueryService<User>,
  ) {}

  async transform(value: { input: { user: UserDTO } }) {
    const userLogin = value.input.user.login;
    const [user] = await this.usersService.query({
      filter: { login: { eq: userLogin } },
      paging: { limit: 1 },
    });

    if (user) {
      throw new BadRequestException('a user with this login exists');
    }
    return value;
  }
}
