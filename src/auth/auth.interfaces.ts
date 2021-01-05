import { User } from '../users/user.entity';

export type AuthenticatedUser = Pick<User, 'id' | 'login'>;
export type JwtPayload = {
  sub: number;
  login: string;
};

export type UserContext = {
  req: {
    user: AuthenticatedUser;
  };
};
