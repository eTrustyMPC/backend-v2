import {model, property} from '@loopback/repository';
import {BaseModel} from '.';

@model()
export class Offer extends BaseModel {

  constructor(data?: Partial<Offer>) {
    super(data);
  }
}

export interface OfferRelations {
  // describe navigational properties here
}

export type OfferWithRelations = Offer & OfferRelations;
