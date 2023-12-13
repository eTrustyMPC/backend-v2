import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Review, ReviewRelations, Tender, Offer, Person, ReviewCriterion} from '../models';
import {TenderRepository} from './tender.repository';
import {OfferRepository} from './offer.repository';
import {PersonRepository} from './person.repository';
import {ReviewCriterionRepository} from './review-criterion.repository';

export class ReviewRepository extends DefaultCrudRepository<
  Review,
  typeof Review.prototype.id,
  ReviewRelations
> {

  public readonly tender: BelongsToAccessor<Tender, typeof Review.prototype.id>;

  public readonly offer: BelongsToAccessor<Offer, typeof Review.prototype.id>;

  public readonly applicant: BelongsToAccessor<Person, typeof Review.prototype.id>;

  public readonly reviewCriterion: HasOneRepositoryFactory<ReviewCriterion, typeof Review.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TenderRepository') protected tenderRepositoryGetter: Getter<TenderRepository>, @repository.getter('OfferRepository') protected offerRepositoryGetter: Getter<OfferRepository>, @repository.getter('PersonRepository') protected personRepositoryGetter: Getter<PersonRepository>, @repository.getter('ReviewCriterionRepository') protected reviewCriterionRepositoryGetter: Getter<ReviewCriterionRepository>,
  ) {
    super(Review, dataSource);
    this.reviewCriterion = this.createHasOneRepositoryFactoryFor('reviewCriterion', reviewCriterionRepositoryGetter);
    this.registerInclusionResolver('reviewCriterion', this.reviewCriterion.inclusionResolver);
    this.applicant = this.createBelongsToAccessorFor('applicant', personRepositoryGetter,);
    this.registerInclusionResolver('applicant', this.applicant.inclusionResolver);
    this.offer = this.createBelongsToAccessorFor('offer', offerRepositoryGetter,);
    this.registerInclusionResolver('offer', this.offer.inclusionResolver);
    this.tender = this.createBelongsToAccessorFor('tender', tenderRepositoryGetter,);
    this.registerInclusionResolver('tender', this.tender.inclusionResolver);
  }
}
