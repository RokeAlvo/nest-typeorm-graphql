import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  admin = 'admin',
  user = 'user',
  guest = 'guest',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'The supported roles',
});
