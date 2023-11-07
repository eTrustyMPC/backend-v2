import {
  User as JwtUser
} from '@loopback/authentication-jwt';
import {model, property} from '@loopback/repository';

@model()
export class User extends JwtUser {
  @property({
    type: 'string',
  })
  tenantId?: string;

  @property({
    type: 'string',
    required: true,
  })
  name?: string;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
