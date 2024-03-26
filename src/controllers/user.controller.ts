import { authenticate, TokenService } from '@loopback/authentication';
import {
  Credentials,
  MyUserService,
  TokenServiceBindings,
  User,
  UserRepository,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import { inject } from '@loopback/core';
import { repository } from '@loopback/repository';
import {
  get,
  post,
  requestBody,
  SchemaObject,
} from '@loopback/rest';
import { SecurityBindings, securityId, UserProfile } from '@loopback/security';
import { genSalt, hash } from 'bcryptjs';
import { ObjectId } from 'bson';
import _ from 'lodash';

const CredentialsSchema: SchemaObject = {
  type: 'object',
  title: 'User',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      title: 'E-mail',
      format: 'email',
    },
    password: {
      type: 'string',
    },
  },
};

const UserResponseSchema: SchemaObject = {
  type: 'object',
  title: 'User',
  description: 'Created user',
  properties: {
    id: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
  },
};

export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': { schema: CredentialsSchema },
  },
};

export class UserController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(SecurityBindings.USER, { optional: true })
    public user: UserProfile,
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
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
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{ token: string }> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);
    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);
    return { token };
  }

  @authenticate('jwt')
  @get('/whoAmI', {
    responses: {
      '200': {
        description: 'Return current user',
        content: {
          'application/json': {
            schema: {
              type: 'string',
            },
          },
        },
      },
    },
  })
  async whoAmI(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<string> {
    return currentUserProfile[securityId];
  }

  @post('/signup', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: UserResponseSchema,
          },
        },
      },
    },
  })
  async signUp(
    @requestBody(CredentialsRequestBody) newUser: Credentials,
  ): Promise<User> {
    const password = await hash(newUser.password, await genSalt());
    const savedUser = await this.userRepository.create({
      'id': (new ObjectId()).toString(),
      ..._.omit(newUser, 'password'),
    }
    );

    await this.userRepository.userCredentials(savedUser.id).create({ password });

    return savedUser;
  }
}
