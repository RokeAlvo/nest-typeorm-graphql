import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { LoginResponseDto } from './dto/login-response.dto';
import { AuthenticatedUser, JwtPayload } from './auth.interfaces';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectQueryService(User)
    private usersService: QueryService<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    login: string,
    pass: string,
  ): Promise<AuthenticatedUser | null> {
    const [user] = await this.usersService.query({
      filter: { login: { eq: login } },
      paging: { limit: 1 },
    });
    // dont use plain text passwords in production!
    if (user && user.passwordHash === pass) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async currentUser(authUser: AuthenticatedUser): Promise<User> {
    try {
      const user = await this.usersService.getById(authUser.id);
      return user;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  login(user: AuthenticatedUser): Promise<LoginResponseDto> {
    const payload: JwtPayload = { login: user.login, sub: user.id };
    return Promise.resolve({
      accessToken: this.jwtService.sign(payload),
    });
  }
}
