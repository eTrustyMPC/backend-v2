import {belongsTo, hasMany, model, property} from '@loopback/repository';
import {BaseModel} from './base-model.model';
import {Offer} from './offer.model';
import {Person} from './person.model';
import {Review} from './review.model';
import {Tender} from './tender.model';

@model()
export class Lot extends BaseModel {
  @property({
    type: 'string',
  })
  name?: string;

  @belongsTo(() => Tender)
  tenderId: number;

  @hasMany(() => Offer)
  offers: Offer[];

  @belongsTo(() => Person)
  ownerId: number;

  @hasMany(() => Review, {through: {model: () => Offer}})
  reviews: Review[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //[prop: string]: any;

  constructor(data?: Partial<Lot>) {
    super(data);
  }
}

export interface LotRelations {
  // describe navigational properties here
}

export type LotWithRelations = Lot & LotRelations;
