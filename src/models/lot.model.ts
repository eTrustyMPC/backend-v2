import {model, property} from '@loopback/repository';
import {BaseModel} from './base-model.model';

@model()
export class Lot extends BaseModel {
  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'number',
  })
  tenderId?: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Lot>) {
    super(data);
  }
}

export interface LotRelations {
  // describe navigational properties here
}

export type LotWithRelations = Lot & LotRelations;
