import {inject} from '@loopback/core';
//import {LoggingBindings, WinstonLogger, logInvocation} from '@loopback/logging';
import {
  Request,
  ResponseObject,
  RestBindings,
  get,
  response,
} from '@loopback/rest';

/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'PingResponse',
        properties: {
          greeting: {type: 'string'},
          date: {type: 'string'},
          url: {type: 'string'},
          headers: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

/**
 * A simple controller to bounce back http requests
 */
export class PingController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    //@inject(LoggingBindings.WINSTON_LOGGER) private logger: WinstonLogger
  ) { }

  // Map to `GET /ping`
  @get('/ping')
  @response(200, PING_RESPONSE)
  //@logInvocation()
  ping(): object {
    // @todo logging does not working
    // console.log('kk');
    //this.logger.log('info', `Called url: ${this.req.url}`);

    // Reply with a greeting, the current time, the url, and request headers
    return {
      greeting: 'Hello from LoopBack',
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
    };
  }
}
