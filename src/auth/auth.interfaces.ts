import { User } from '../users/user.entity';
import { Role } from '../roles/role.interface';

export type AuthenticatedUser = Pick<User, 'id' | 'login' | 'role'>;
export type JwtPayload = {
  sub: number;
  login: string;
  role: Role;
};

export type UserContext = {
  req: {
    user: AuthenticatedUser;
  };
};
