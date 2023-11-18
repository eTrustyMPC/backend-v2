import {Entity, hasOne, model, property} from '@loopback/repository';
//import {Team} from './team.model';
import {UserCredentials} from './user-credentials.model';

@model({
  settings: {
    strict: false,
    description: "User model",
  },
})
export class User extends Entity {
  // must keep it
  @property({
    type: 'number',
    id: 1,
    generated: false,
    updateOnly: true,
  })
  id: number;

  @property({
    type: 'string',
    description: [
      "User realms used to separate accounts between spaces.",
      "Two users within one realm must have unique emails.",
      "One realm can be shared between several tenants."
    ].join(" "),
  })
  realm?: string;

  @property({
    type: 'string',
    description: [
      "Unique human-readable id of the user. Not required, can be blank,",
      "but must be defined in User model for compatibility with Loopback internals."
    ].join(" "),
  })
  username?: string;

  // must keep it
  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'boolean',
  })
  emailVerified?: boolean;

  @property({
    type: 'string',
    description: "Email verification token (only if email verification enabled).",
  })
  verificationToken?: string;

  @hasOne(() => UserCredentials)
  userCredentials: UserCredentials;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
