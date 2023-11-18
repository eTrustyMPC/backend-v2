
import {authenticate, TokenService, UserService} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {model, property, repository} from '@loopback/repository';
import {
  get,
  post,
  requestBody,
  SchemaObject
} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {genSalt, hash} from 'bcryptjs';
import _ from 'lodash';

import {
  Credentials,
  TokenServiceBindings,
  UserServiceBindings,
} from '../components/jwt-authentication';
import {User} from '../models';
import {UserRepository} from '../repositories';

@model()
export class NewUserRequest extends User {
  @property({
    type: 'string',
    required: true,
  })
  password: string;
}

const CredentialsSchema: SchemaObject = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 6,
    },
  },
};

export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {
      schema: CredentialsSchema,
      example: {
        "email": "test@example.com",
        "password": "87654321"
      },
    },
  },
};

export class UserController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: UserService<User, Credentials>,
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @post('/auth/signUp', {
    tags: ["Auth"],
    summary: 'New User registration',
    responses: {
      '200': {
        description: 'Successful registration, data of newly created User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  async signUp(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
    //newUserRequest: NewUserRequest,
  ): Promise<User> {
    const password = await hash(credentials.password, await genSalt());
    const savedUser = await this.userRepository.create(
      _.omit(credentials, 'password'),
    );

    await this.userRepository.userCredentials(savedUser.id).create({password});

    return savedUser;
  }

  @post('/auth/logIn', {
    tags: ["Auth"],
    summary: 'Log in existing user with email/password',
    responses: {
      '200': {
        description: 'Successful auth: JWT token will be returned in response',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      '401': {
        description: 'Invalid email/password'
      },
    },
  })
  async logIn(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{token: string}> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);
    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);
    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);

    return {token};
  }

  @authenticate('jwt')
  @get('/auth/whoAmI', {
    tags: ["Auth"],
    summary: 'Get id of currently logged in User',
    responses: {
      '200': {
        description: 'Current user id',
        content: {
          'application/json': {
            schema: {
              type: 'string',
            },
          },
        },
      },
      '401': {
        description: 'Unauthorized'
      },
    },
  })
  async whoAmI(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<string> {
    return currentUserProfile[securityId];
  }
}
