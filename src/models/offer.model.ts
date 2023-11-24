import {model} from '@loopback/repository';
import {BaseModel} from './base-model.model';

@model()
export class Offer extends BaseModel {

  @property({
    type: 'number',
  })
  lotId?: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Offer>) {
    super(data);
  }
}

export interface OfferRelations {
  // describe navigational properties here
}

export type OfferWithRelations = Offer & OfferRelations;
