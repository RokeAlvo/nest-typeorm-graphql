import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { Role } from '../roles/role.interface';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    @Inject('RolesService') readonly rolesService,
  ) {
    super();
  }
  // noinspection JSUnusedGlobalSymbols
  getRequest(context: ExecutionContext): unknown {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const roles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    ) as Role[];
    if (!roles) {
      return true;
    }
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const user = req?.user;
    const currentRole = this.rolesService.matchRole(user.role, roles);
    if (!currentRole) {
      throw new UnauthorizedException(
        `role ${user.role} does not have permission to access the current resource`,
      );
    }
    return true;
  }
}
