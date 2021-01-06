import { Injectable } from '@nestjs/common';
import { Role } from './role.interface';

@Injectable()
export class RolesService {
  roleStrategy = 'default';
  matchRole(userRole: Role, resourceRoles: Role[]): boolean {
    switch (this.roleStrategy) {
      default:
        return !!resourceRoles.find((role) => role === userRole);
    }
  }
}
