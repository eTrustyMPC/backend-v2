import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Organization, OrganizationRelations, Person} from '../models';
import {PersonRepository} from './person.repository';

export class OrganizationRepository extends DefaultCrudRepository<
  Organization,
  typeof Organization.prototype.id,
  OrganizationRelations
> {

  public readonly persons: HasManyRepositoryFactory<Person, typeof Organization.prototype.id>;

  public readonly owner: BelongsToAccessor<Person, typeof Organization.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('PersonRepository') protected personRepositoryGetter: Getter<PersonRepository>,
  ) {
    super(Organization, dataSource);
    this.owner = this.createBelongsToAccessorFor('owner', personRepositoryGetter,);
    this.registerInclusionResolver('owner', this.owner.inclusionResolver);
    this.persons = this.createHasManyRepositoryFactoryFor('persons', personRepositoryGetter,);
    this.registerInclusionResolver('persons', this.persons.inclusionResolver);
  }
}
