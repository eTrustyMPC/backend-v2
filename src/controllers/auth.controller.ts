// Uncomment these imports to begin using these cool features!

import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {
  get,
  post,
  Request,
  RequestBodyObject,
  RestBindings,
  SchemaObject,
} from '@loopback/rest';
import {SecurityBindings, UserProfile} from '@loopback/security';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';

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


/**
 * ThirdWeb integration: server-server auth
 */
export class AuthController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) { }

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
  async login() {
    // @todo: set up password validation
    const payload = {
      iss: "https://etrusty.io",
      sub: "777777", //user.id.toString(),
      aud: "eTrusty",
      email: "test@example.com", //user.email,
      exp: Math.floor(Date.now() / 1000) + 3600 * 7,
    };

    const token = jwt.sign(payload, JWKS_PRIVATE_KEY, {
      algorithm: "RS256",
      keyid: "0",
    });
    return {
      'token': token
    };
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
