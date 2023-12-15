import {belongsTo, hasOne, model, property} from '@loopback/repository';
import {BaseModel} from './base-model.model';
import {Offer} from './offer.model';
import {Person} from './person.model';
import {ReviewCriterion} from './review-criterion.model';
import {Tender} from './tender.model';

@model()
export class Review extends BaseModel {
  @property({
    type: 'string',
  })
  description?: string;

  @belongsTo(() => Tender)
  tenderId: number;

  @belongsTo(() => Offer)
  offerId: number;

  @belongsTo(() => Person)
  applicantId: number;

  @hasOne(() => ReviewCriterion)
  reviewCriterion: ReviewCriterion;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //[prop: string]: any;

  constructor(data?: Partial<Review>) {
    super(data);
  }
}

export interface ReviewRelations {
  // describe navigational properties here
}

export type ReviewWithRelations = Review & ReviewRelations;
