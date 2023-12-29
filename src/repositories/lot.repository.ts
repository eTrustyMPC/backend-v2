import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Lot, LotRelations, Offer, Person, Review, Tender} from '../models';
import {OfferRepository} from './offer.repository';
import {PersonRepository} from './person.repository';
import {ReviewRepository} from './review.repository';
import {TenderRepository} from './tender.repository';

export class LotRepository extends DefaultCrudRepository<
  Lot,
  typeof Lot.prototype.id,
  LotRelations
> {

  public readonly tender: BelongsToAccessor<Tender, typeof Lot.prototype.id>;

  public readonly offers: HasManyRepositoryFactory<Offer, typeof Lot.prototype.id>;

  public readonly owner: BelongsToAccessor<Person, typeof Lot.prototype.id>;

  public readonly reviews: HasManyThroughRepositoryFactory<Review, typeof Review.prototype.id,
    Offer,
    typeof Lot.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('TenderRepository') protected tenderRepositoryGetter: Getter<TenderRepository>,
    @repository.getter('OfferRepository') protected offerRepositoryGetter: Getter<OfferRepository>,
    @repository.getter('PersonRepository') protected personRepositoryGetter: Getter<PersonRepository>,
    @repository.getter('ReviewRepository') protected reviewRepositoryGetter: Getter<ReviewRepository>,
  ) {
    super(Lot, dataSource);
    this.reviews = this.createHasManyThroughRepositoryFactoryFor('reviews', reviewRepositoryGetter, offerRepositoryGetter,);
    this.registerInclusionResolver('reviews', this.reviews.inclusionResolver);
    this.owner = this.createBelongsToAccessorFor('owner', personRepositoryGetter,);
    this.registerInclusionResolver('owner', this.owner.inclusionResolver);
    this.offers = this.createHasManyRepositoryFactoryFor('offers', offerRepositoryGetter,);
    this.registerInclusionResolver('offers', this.offers.inclusionResolver);
    this.tender = this.createBelongsToAccessorFor('tender', tenderRepositoryGetter,);
    this.registerInclusionResolver('tender', this.tender.inclusionResolver);
  }
}
