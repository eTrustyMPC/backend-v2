import {
  User as BaseUser
} from '@loopback/authentication-jwt';
import {model, property} from '@loopback/repository';

@model()
export class User extends BaseUser {
  @property({
    type: 'string',
  })
  tenantId?: string;

  @property({
    type: 'string',
  })
  firstName?: string;

  @property({
    type: 'string',
  })
  lastName?: string;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
