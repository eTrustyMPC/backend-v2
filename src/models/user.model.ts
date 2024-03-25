import {
  User as BaseUser
} from '@loopback/authentication-jwt';
import {model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class User extends BaseUser {
  @property({
    type: 'string',
  })
  tenantId?: string;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
