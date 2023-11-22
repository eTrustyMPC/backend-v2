import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
// @see https://loopback.io/doc/en/lb4/Calling-rest-apis.html
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
// @see https://github.com/loopbackio/loopback-next/tree/master/packages/rest-crud
import {CrudRestComponent} from '@loopback/rest-crud';
// @see https://github.com/nflaig/loopback4-migration#update-directory-and-naming-convention
import {MigrationComponent} from "loopback4-migration";
import {MySequence} from './sequence';
// @see https://github.com/loopbackio/loopback-next/tree/master/extensions/logging
import {LoggingComponent} from '@loopback/logging';

export {ApplicationConfig};

export class ETrustyApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Default logger
    this.component(LoggingComponent);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });

    // Load REST components
    this.component(RestExplorerComponent);
    this.component(CrudRestComponent);

    // Bind migration component related elements
    this.component(MigrationComponent);

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
}
