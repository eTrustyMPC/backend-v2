// @see https://github.com/loopbackio/loopback-next/tree/master/examples/todo-jwt
// @see https://www.npmjs.com/package/loopback4-authentication
import {AuthenticationComponent} from '@loopback/authentication';
// @see https://loopback.io/doc/en/lb4/Authorization-overview.html
// @see https://github.com/loopbackio/loopback-next/blob/master/examples/access-control-migration
import {
  JWTAuthenticationComponent,
  MyUserService,
  SECURITY_SCHEME_SPEC,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
// @see https://loopback.io/doc/en/lb4/Authorization-overview.html
import {AuthorizationComponent} from '@loopback/authorization';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
// @see https://github.com/casbin/node-casbin
import {CasbinAuthorizationComponent} from './components/casbin-authorization';
import {DbDataSource} from './datasources';
// CUSTOM MODULES
import {CrudRestComponent} from '@loopback/rest-crud';
// @see https://github.com/nflaig/loopback4-migration#update-directory-and-naming-convention
import {MigrationComponent} from "loopback4-migration";
// @see https://github.com/loopbackio/loopback-next/tree/master/examples/multi-tenancy
import {MultiTenancyBindings} from './components/multi-tenancy';
import {MultiTenancyComponent} from './components/multi-tenancy/component';
import {MySequence} from './sequence';

export {ApplicationConfig};

export class ETrustyApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/api/explorer',
    });
    // set up server default security rules
    this.addSecuritySpec();

    // Load components
    this.component(RestExplorerComponent);
    this.component(CrudRestComponent);
    // Bind migration component related elements
    this.component(MigrationComponent);
    // MultiTenancy support
    this.component(MultiTenancyComponent);
    this.configure(MultiTenancyBindings.MIDDLEWARE).to({
      strategyNames: ['jwt', 'header', 'query']
    });
    // Mount authentication system
    this.component(AuthenticationComponent);
    this.component(AuthorizationComponent);
    this.component(JWTAuthenticationComponent);
    this.component(CasbinAuthorizationComponent);

    // Bind datasource
    this.dataSource(DbDataSource, UserServiceBindings.DATASOURCE_NAME);
    // User service bindings
    this.bind(UserServiceBindings.USER_SERVICE).toClass(MyUserService);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }

  addSecuritySpec(): void {
    this.api({
      openapi: '3.0.0',
      info: {
        title: 'eTrusty',
        version: require('.././package.json').version,
      },
      paths: {},
      components: {securitySchemes: SECURITY_SCHEME_SPEC},
      security: [
        {
          jwt: [],
        },
      ],
      servers: [{url: '/'}],
    });
  }
}
