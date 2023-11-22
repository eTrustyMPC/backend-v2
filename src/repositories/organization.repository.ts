import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Organization, OrganizationRelations, Person} from '../models';
import {PersonRepository} from './person.repository';

export class OrganizationRepository extends DefaultCrudRepository<
  Organization,
  typeof Organization.prototype.id,
  OrganizationRelations
> {

  public readonly persons: HasManyRepositoryFactory<Person, typeof Organization.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('PersonRepository') protected personRepositoryGetter: Getter<PersonRepository>,
  ) {
    super(Organization, dataSource);
    this.persons = this.createHasManyRepositoryFactoryFor('people', personRepositoryGetter,);
    this.registerInclusionResolver('people', this.persons.inclusionResolver);
  }
}
