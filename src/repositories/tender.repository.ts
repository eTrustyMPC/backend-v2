import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Tender, TenderRelations, Lot} from '../models';
import {LotRepository} from './lot.repository';

export class TenderRepository extends DefaultCrudRepository<
  Tender,
  typeof Tender.prototype.id,
  TenderRelations
> {

  public readonly lots: HasManyRepositoryFactory<Lot, typeof Tender.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('LotRepository') protected lotRepositoryGetter: Getter<LotRepository>,
  ) {
    super(Tender, dataSource);
    this.lots = this.createHasManyRepositoryFactoryFor('lots', lotRepositoryGetter,);
    this.registerInclusionResolver('lots', this.lots.inclusionResolver);
  }
}
