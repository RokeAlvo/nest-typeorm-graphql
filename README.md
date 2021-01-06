# Nest-typeorm-graphql template

added:

- typeorm

- nestjs-query https://github.com/doug-martin/nestjs-query

- role based auth with jwt passport

## Auth

- add custom roles' strategy to `src/roles/roles.service.ts`

- add roles to `enum Role` from `src/roles/role.interface.ts`

- example of usage: `src/users/users.module.ts`

## Graphql

playground: http://localhost:3000/graphql

## Todo

- add bcrypt for password
