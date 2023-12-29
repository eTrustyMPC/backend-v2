import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Organization, Person, PersonRelations, Tender} from '../models';
import {OrganizationRepository} from './organization.repository';
import {TenderRepository} from './tender.repository';

export class PersonRepository extends DefaultCrudRepository<
  Person,
  typeof Person.prototype.id,
  PersonRelations
> {

  public readonly organization: BelongsToAccessor<Organization, typeof Person.prototype.id>;

  public readonly tendersOwned: HasManyRepositoryFactory<Tender, typeof Person.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('OrganizationRepository') protected organizationRepositoryGetter: Getter<OrganizationRepository>,
    @repository.getter('TenderRepository') protected tenderRepositoryGetter: Getter<TenderRepository>,
  ) {
    super(Person, dataSource);
    this.tendersOwned = this.createHasManyRepositoryFactoryFor('tendersOwned', tenderRepositoryGetter,);
    this.registerInclusionResolver('tendersOwned', this.tendersOwned.inclusionResolver);
    this.organization = this.createBelongsToAccessorFor('organization', organizationRepositoryGetter,);
    this.registerInclusionResolver('organization', this.organization.inclusionResolver);
  }
}
