import {AuthenticationComponent} from '@loopback/authentication';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, inject} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';
// @see https://loopback.io/doc/en/lb4/Calling-rest-apis.html
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
// @see https://github.com/loopbackio/loopback-next/tree/master/packages/rest-crud
import {
  CrudRestComponent,
  defineCrudRepositoryClass,
  defineCrudRestController,
} from '@loopback/rest-crud';
// @see https://github.com/nflaig/loopback4-migration#update-directory-and-naming-convention
import {MigrationComponent} from "loopback4-migration";
import {DefaultSequence} from './sequence';
// @see https://github.com/loopbackio/loopback-next/tree/master/extensions/logging
// import {LoggingBindings, LoggingComponent} from '@loopback/logging';
// @see https://github.com/loopbackio/loopback-next/tree/master/extensions/context-explorer
import {
  ContextExplorerBindings,
  ContextExplorerComponent
} from '@loopback/context-explorer';
// app models
import {config as dotenv_config} from "dotenv";
import {
  Lot,
  Offer,
  Organization,
  Person,
  Review,
  ReviewCriterion,
  Tender
} from './models';
dotenv_config();

export {ApplicationConfig};

//console.log(`process.env`, process.env);

const DEFAULT_DATASOURCE: string = String(process.env.DEFAULT_DATASOURCE);

export class ETrustyApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(DefaultSequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });

    // Load Authentication
    this.component(AuthenticationComponent);

    // Load REST components
    this.component(RestExplorerComponent);
    this.component(CrudRestComponent);

    // Bind migration component related elements
    this.component(MigrationComponent);

    // @todo use debug plugins only in test/dev envs
    // Debugging: Winston logger (dev/test env only)
    /*this.configure(LoggingBindings.COMPONENT).to({
      enableFluent: false, // default to true
      enableHttpAccessLog: true, // default to true
    });
    this.component(LoggingComponent);*/
    // Debugging: context explorer (dev/test env only)
    this.component(ContextExplorerComponent);
    this.configure(ContextExplorerBindings.COMPONENT).to({
      path: '/context-explorer',
    });

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

  async boot(): Promise<void> {
    await super.boot();

    // Organization
    const OrganizationRepository = defineCrudRepositoryClass(Organization);
    const repoBindingOrganization = this.repository(OrganizationRepository);
    inject(`datasources.${DEFAULT_DATASOURCE}`)(OrganizationRepository, undefined, 0);

    const OrganizationController = defineCrudRestController<
      Organization,
      typeof Organization.prototype.id,
      'id'
    >(Organization, {basePath: '/organizations'});

    inject(repoBindingOrganization.key)(OrganizationController, undefined, 0);
    this.controller(OrganizationController);

    // Person
    // we use "persons" instead of "people" because unification
    // is more important than correct English :)
    const PersonRepository = defineCrudRepositoryClass(Person);
    const repoBindingPerson = this.repository(PersonRepository);
    inject(`datasources.${DEFAULT_DATASOURCE}`)(PersonRepository, undefined, 0);
    //inject('repositories.PersonRepository')(PersonRepository, undefined, 0);

    const PersonController = defineCrudRestController<
      Person,
      typeof Person.prototype.id,
      'id'
    >(Person, {basePath: '/persons'});

    inject(repoBindingPerson.key)(PersonController, undefined, 0);
    this.controller(PersonController);

    // Lot
    const LotRepository = defineCrudRepositoryClass(Lot);
    const repoBindingLot = this.repository(LotRepository);
    inject(`datasources.${DEFAULT_DATASOURCE}`)(LotRepository, undefined, 0);

    const LotController = defineCrudRestController<
      Lot,
      typeof Lot.prototype.id,
      'id'
    >(Lot, {basePath: '/lots'});

    inject(repoBindingLot.key)(LotController, undefined, 0);
    this.controller(LotController);

    // Offer
    const OfferRepository = defineCrudRepositoryClass(Offer);
    const repoBindingOffer = this.repository(OfferRepository);
    inject(`datasources.${DEFAULT_DATASOURCE}`)(OfferRepository, undefined, 0);

    const OfferController = defineCrudRestController<
      Offer,
      typeof Offer.prototype.id,
      'id'
    >(Offer, {basePath: '/offers'});

    inject(repoBindingOffer.key)(OfferController, undefined, 0);
    this.controller(OfferController);

    // ReviewCriterion
    const ReviewCriterionRepository = defineCrudRepositoryClass(ReviewCriterion);
    const repoBindingReviewCriterion = this.repository(ReviewCriterionRepository);
    inject(`datasources.${DEFAULT_DATASOURCE}`)(ReviewCriterionRepository, undefined, 0);

    const ReviewCriterionController = defineCrudRestController<
      ReviewCriterion,
      typeof ReviewCriterion.prototype.id,
      'id'
    >(ReviewCriterion, {basePath: '/review-criterions'});

    inject(repoBindingReviewCriterion.key)(ReviewCriterionController, undefined, 0);
    this.controller(ReviewCriterionController);

    // Review
    const ReviewRepository = defineCrudRepositoryClass(Review);
    const repoBindingReview = this.repository(ReviewRepository);
    inject(`datasources.${DEFAULT_DATASOURCE}`)(ReviewRepository, undefined, 0);

    const ReviewController = defineCrudRestController<
      Review,
      typeof Review.prototype.id,
      'id'
    >(Review, {basePath: '/reviews'});

    inject(repoBindingReview.key)(ReviewController, undefined, 0);
    this.controller(ReviewController);

    // Tender
    const TenderRepository = defineCrudRepositoryClass(Tender);
    const repoBindingTender = this.repository(TenderRepository);
    inject(`datasources.${DEFAULT_DATASOURCE}`)(TenderRepository, undefined, 0);

    const TenderController = defineCrudRestController<
      Tender,
      typeof Tender.prototype.id,
      'id'
    >(Tender, {basePath: '/tenders'});

    inject(repoBindingTender.key)(TenderController, undefined, 0);
    this.controller(TenderController);

  }
}
