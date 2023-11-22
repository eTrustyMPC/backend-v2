import {model, property} from '@loopback/repository';
import {BaseModel} from './base-model.model';

@model()
export class Lot extends BaseModel {
  @property({
    type: 'string',
  })
  name?: string;


  constructor(data?: Partial<Lot>) {
    super(data);
  }
}

export interface LotRelations {
  // describe navigational properties here
}

export type LotWithRelations = Lot & LotRelations;
