import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Lot, Offer, OfferRelations, Person, Tender, Review} from '../models';
import {LotRepository} from './lot.repository';
import {PersonRepository} from './person.repository';
import {TenderRepository} from './tender.repository';
import {ReviewRepository} from './review.repository';

export class OfferRepository extends DefaultCrudRepository<
  Offer,
  typeof Offer.prototype.id,
  OfferRelations
> {

  public readonly tender: BelongsToAccessor<Tender, typeof Offer.prototype.id>;

  public readonly lot: BelongsToAccessor<Lot, typeof Offer.prototype.id>;

  public readonly tenderOwner: BelongsToAccessor<Person, typeof Offer.prototype.id>;

  public readonly applicant: BelongsToAccessor<Person, typeof Offer.prototype.id>;

  public readonly reviews: HasManyRepositoryFactory<Review, typeof Offer.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TenderRepository') protected tenderRepositoryGetter: Getter<TenderRepository>, @repository.getter('LotRepository') protected lotRepositoryGetter: Getter<LotRepository>, @repository.getter('PersonRepository') protected personRepositoryGetter: Getter<PersonRepository>, @repository.getter('ReviewRepository') protected reviewRepositoryGetter: Getter<ReviewRepository>,
  ) {
    super(Offer, dataSource);
    this.reviews = this.createHasManyRepositoryFactoryFor('reviews', reviewRepositoryGetter,);
    this.registerInclusionResolver('reviews', this.reviews.inclusionResolver);
    this.applicant = this.createBelongsToAccessorFor('applicant', personRepositoryGetter,);
    this.registerInclusionResolver('applicant', this.applicant.inclusionResolver);
    this.tenderOwner = this.createBelongsToAccessorFor('tenderOwner', personRepositoryGetter,);
    this.registerInclusionResolver('tenderOwner', this.tenderOwner.inclusionResolver);
    this.lot = this.createBelongsToAccessorFor('lot', lotRepositoryGetter,);
    this.registerInclusionResolver('lot', this.lot.inclusionResolver);
    this.tender = this.createBelongsToAccessorFor('tender', tenderRepositoryGetter,);
    this.registerInclusionResolver('tender', this.tender.inclusionResolver);
  }
}
