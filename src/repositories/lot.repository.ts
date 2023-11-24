import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Lot, LotRelations, Tender, Offer, Person} from '../models';
import {TenderRepository} from './tender.repository';
import {OfferRepository} from './offer.repository';
import {PersonRepository} from './person.repository';

export class LotRepository extends DefaultCrudRepository<
  Lot,
  typeof Lot.prototype.id,
  LotRelations
> {

  public readonly tender: BelongsToAccessor<Tender, typeof Lot.prototype.id>;

  public readonly offers: HasManyRepositoryFactory<Offer, typeof Lot.prototype.id>;

  public readonly owner: BelongsToAccessor<Person, typeof Lot.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TenderRepository') protected tenderRepositoryGetter: Getter<TenderRepository>, @repository.getter('OfferRepository') protected offerRepositoryGetter: Getter<OfferRepository>, @repository.getter('PersonRepository') protected personRepositoryGetter: Getter<PersonRepository>,
  ) {
    super(Lot, dataSource);
    this.owner = this.createBelongsToAccessorFor('owner', personRepositoryGetter,);
    this.registerInclusionResolver('owner', this.owner.inclusionResolver);
    this.offers = this.createHasManyRepositoryFactoryFor('offers', offerRepositoryGetter,);
    this.registerInclusionResolver('offers', this.offers.inclusionResolver);
    this.tender = this.createBelongsToAccessorFor('tender', tenderRepositoryGetter,);
    this.registerInclusionResolver('tender', this.tender.inclusionResolver);
  }
}
