// Uncomment these imports to begin using these cool features!

import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  Request,
  RequestBodyObject,
  RestBindings,
  SchemaObject,
  get,
  post,
  requestBody
} from '@loopback/rest';
import {SecurityBindings, UserProfile} from '@loopback/security';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';
import {UserRepository} from '../repositories';
import {UserCredentialsRepository} from '../repositories/user-credentials.repository';
import {UserIdentityRepository} from '../repositories/user-identity.repository';
import {Credentials} from './user.controller';

const JWKS_PRIVATE_KEY = fs.readFileSync(path.resolve('./jwks/rsa-2048-for-jwks.key'), "utf8");

const HEADER_SCHEMA: SchemaObject = {
  type: 'object',
  properties: {
    'Content-Type': {type: 'string'},
  },
  additionalProperties: true,
};

const USER_PROFILE_RESPONSE: RequestBodyObject = {
  description: 'User profile',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'sessionUserProfile',
        properties: {
          user: {type: 'object'},
        },
      },
    },
  },
};

/*export type Credentials = {
  email: string;
  password: string;
  name: string;
};*/

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
      minLength: 8,
    },
  },
};


/**
 * ThirdWeb integration: server-server auth
 */
export class AuthController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @repository(UserCredentialsRepository)
    public userCredentialsRepository: UserCredentialsRepository,
    @repository(UserIdentityRepository)
    public userIdentityRepository: UserIdentityRepository,
    @inject(RestBindings.Http.REQUEST) private req: Request
  ) { }

  @post('/auth/signup')
  async signup(
    @requestBody({
      description: 'signup user locally',
      required: true,
      content: {
        'application/x-www-form-urlencoded': {schema: CredentialsSchema},
      },
    })
    credentials: Credentials,
    //@inject(RestBindings.Http.RESPONSE) response: Response,
  ) {
    let userCredentials;
    try {
      userCredentials = await this.userCredentialsRepository.findById(
        credentials.email,
      );
    } catch (err) {
      if (err.code !== 'ENTITY_NOT_FOUND') {
        throw err;
      }
    }
    if (!userCredentials) {
      const user = await this.userRepository.create({
        email: credentials.email,
        username: credentials.email,
        name: credentials.name,
      });
      userCredentials = await this.userCredentialsRepository.create({
        id: credentials.email,
        password: credentials.password,
        userId: user.id,
      });
      const payload = {
        iss: "https://etrusty.io",
        sub: user.id.toString(),
        aud: "eTrusty",
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + 3600 * 13,
      };
      const token = jwt.sign(payload, JWKS_PRIVATE_KEY, {
        algorithm: "RS256",
        keyid: "0",
      });
      return {
        token: token
      };
    } else {
      const user = await this.userRepository.findOne({
        where: {
          email: credentials.email
        }
      });
      if (user !== null) {
        const payload = {
          iss: "https://etrusty.io",
          sub: user.id.toString(),
          aud: "eTrusty",
          email: user.email,
          exp: Math.floor(Date.now() / 1000) + 3600 * 13,
        };
        const token = jwt.sign(payload, JWKS_PRIVATE_KEY, {
          algorithm: "RS256",
          keyid: "0",
        });
        return {
          token: token
        };
      } else {
        return {
          code: '404',
          message: 'Entity not found'
        }
      }
    }
  }

  @post('/auth/login', {
    responses: {
      'default': {
        description: 'JWT Token Response',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              title: 'JWT Auth Token',
              properties: {
                headers: HEADER_SCHEMA,
                token: {type: 'string'}
              },
            },
          },
        },
      }
    },
  })
  async login(
    @requestBody({
      description: 'signup user locally',
      required: true,
      content: {
        'application/x-www-form-urlencoded': {schema: CredentialsSchema},
      },
    })
    credentials: Credentials
  ) {
    let userCredentials;
    try {
      userCredentials = await this.userCredentialsRepository.findById(
        credentials.email,
      );
    } catch (err) {
      if (err.code !== 'ENTITY_NOT_FOUND') {
        throw err;
      }
    }
    if (!userCredentials) {
      const user = await this.userRepository.create({
        email: credentials.email,
        username: credentials.email,
        name: credentials.name,
      });
      userCredentials = await this.userCredentialsRepository.create({
        id: credentials.email,
        password: credentials.password,
        userId: user.id,
      });
      const payload = {
        iss: "https://etrusty.io",
        sub: user.id.toString(),
        aud: "eTrusty",
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + 3600 * 13,
      };
      const token = jwt.sign(payload, JWKS_PRIVATE_KEY, {
        algorithm: "RS256",
        keyid: "0",
      });
      return {
        token: token
      };
    } else {
      const user = await this.userRepository.findOne({
        where: {
          email: credentials.email
        }
      });
      if (user !== null) {
        const payload = {
          iss: "https://etrusty.io",
          sub: user.id.toString(),
          aud: "eTrusty",
          email: user.email,
          exp: Math.floor(Date.now() / 1000) + 3600 * 13,
        };
        const token = jwt.sign(payload, JWKS_PRIVATE_KEY, {
          algorithm: "RS256",
          keyid: "0",
        });
        return {
          token: token
        };
      } else {
        return {
          code: '404',
          message: 'Entity not found'
        }
      }
    }
  }

  // @todo: set up JWT auth
  @authenticate('session')
  @get('/auth/whoAmI', {
    responses: USER_PROFILE_RESPONSE,
  })
  whoAmI(@inject(SecurityBindings.USER) user: UserProfile): object {
    /**
     * controller returns back currently logged in user information
     */
    return {
      user: user.profile,
      headers: Object.assign({}, this.req.headers),
    };
  }
}
