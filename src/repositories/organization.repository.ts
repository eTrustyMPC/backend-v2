import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Organization, OrganizationRelations, Tender} from '../models';
import {TenderRepository} from './tender.repository';

export class OrganizationRepository extends DefaultCrudRepository<
  Organization,
  typeof Organization.prototype.id,
  OrganizationRelations
> {

  public readonly tenders: HasManyRepositoryFactory<Tender, typeof Organization.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TenderRepository') protected tenderRepositoryGetter: Getter<TenderRepository>,
  ) {
    super(Organization, dataSource);
    this.tenders = this.createHasManyRepositoryFactoryFor('tenders', tenderRepositoryGetter,);
    this.registerInclusionResolver('tenders', this.tenders.inclusionResolver);
  }
}
