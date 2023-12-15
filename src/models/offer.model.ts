import {belongsTo, hasMany, model, property} from '@loopback/repository';
import {BaseModel} from './base-model.model';
import {Lot} from './lot.model';
import {Person} from './person.model';
import {Review} from './review.model';
import {Tender} from './tender.model';

@model()
export class Offer extends BaseModel {
  @belongsTo(() => Tender)
  tenderId: number;

  @belongsTo(() => Lot)
  lotId: number;

  @belongsTo(() => Person)
  tenderOwnerId: number;

  @belongsTo(() => Person)
  applicantId: number;

  @hasMany(() => Review)
  reviews: Review[];

  @property({
    type: 'number',
  })
  reviewId?: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //[prop: string]: any;

  constructor(data?: Partial<Offer>) {
    super(data);
  }
}

export interface OfferRelations {
  // describe navigational properties here
}

export type OfferWithRelations = Offer & OfferRelations;
