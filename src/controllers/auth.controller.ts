// Uncomment these imports to begin using these cool features!

import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {
  get,
  Request,
  RequestBodyObject,
  RestBindings,
  SchemaObject,
} from '@loopback/rest';
import {SecurityBindings, UserProfile} from '@loopback/security';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';

const PRIVATE_KEY = fs.readFileSync(path.resolve('./jwks/rsa-2048-for-jwks.key'), "utf8"); //Buffer.from("TEST".toString(), 'utf8');

const HEADER_SCHEMA: SchemaObject = {
  type: 'object',
  properties: {
    'Content-Type': {type: 'string'},
  },
  additionalProperties: true,
};

const USER_PROFILE_RESPONSE: RequestBodyObject = {
  description: 'Session user profile',
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


export class AuthController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) { }

  @get('/login', {
    responses: {
      'default': {
        description: 'JWT Auth Response',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              title: 'JWT Auth token',
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
    const payload = {
      iss: "https://etrusty.io",
      sub: 0,//user.id.toString(),
      aud: "eTrusty",
      email: "test@example.com", //user.email,
      exp: Math.floor(Date.now() / 1000) + 3600,
    };

    const token = jwt.sign(payload, PRIVATE_KEY, {
      algorithm: "RS256",
      keyid: "0",
    });
    return {
      'token': token
    };
  }

  @authenticate('session')
  @get('/whoAmI', {
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
