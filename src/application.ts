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
// CUSTOM MODULES
import {CrudRestComponent} from '@loopback/rest-crud';
// @see https://github.com/nflaig/loopback4-migration#update-directory-and-naming-convention
import {MigrationComponent} from "loopback4-migration";
// @see https://github.com/loopbackio/loopback-next/tree/master/examples/multi-tenancy
import {MultiTenancyComponent} from './multi-tenancy/component';
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
      path: '/explorer',
    });
    // Load components
    this.component(RestExplorerComponent);
    this.component(CrudRestComponent);
    // Bind migration component related elements
    this.component(MigrationComponent);
    /*
     * app.configure(MultiTenancyBindings.MIDDLEWARE)
     *   .to({strategyNames: ['jwt', 'header', 'query']});
     */
    this.component(MultiTenancyComponent);

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
