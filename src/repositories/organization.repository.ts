import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Organization, OrganizationRelations, Identifier} from '../models';
import {IdentifierRepository} from './identifier.repository';

export class OrganizationRepository extends DefaultCrudRepository<
  Organization,
  typeof Organization.prototype.id,
  OrganizationRelations
> {

  public readonly identifier: BelongsToAccessor<Identifier, typeof Organization.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('IdentifierRepository') protected identifierRepositoryGetter: Getter<IdentifierRepository>,
  ) {
    super(Organization, dataSource);
    this.identifier = this.createBelongsToAccessorFor('identifier', identifierRepositoryGetter,);
    this.registerInclusionResolver('identifier', this.identifier.inclusionResolver);
  }
}
