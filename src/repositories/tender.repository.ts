import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Lot, Person, Tender, TenderRelations} from '../models';
import {LotRepository} from './lot.repository';
import {PersonRepository} from './person.repository';

export class TenderRepository extends DefaultCrudRepository<
  Tender,
  typeof Tender.prototype.id,
  TenderRelations
> {

  public readonly lots: HasManyRepositoryFactory<Lot, typeof Tender.prototype.id>;

  public readonly owner: BelongsToAccessor<Person, typeof Tender.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('LotRepository') protected lotRepositoryGetter: Getter<LotRepository>,
    @repository.getter('PersonRepository') protected personRepositoryGetter: Getter<PersonRepository>,
  ) {
    super(Tender, dataSource);
    this.owner = this.createBelongsToAccessorFor('owner', personRepositoryGetter,);
    this.registerInclusionResolver('owner', this.owner.inclusionResolver);
    this.lots = this.createHasManyRepositoryFactoryFor('lots', lotRepositoryGetter,);
    this.registerInclusionResolver('lots', this.lots.inclusionResolver);
  }
}
