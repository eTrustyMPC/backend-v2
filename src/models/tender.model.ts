import {belongsTo, hasMany, model, property} from '@loopback/repository';
import {BaseModel} from './base-model.model';
import {Lot} from './lot.model';
import {Person} from './person.model';

@model()
export class Tender extends BaseModel {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @hasMany(() => Lot)
  lots: Lot[];

  @belongsTo(() => Person)
  ownerId: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Tender>) {
    super(data);
  }
}

export interface TenderRelations {
  // describe navigational properties here
}

export type TenderWithRelations = Tender & TenderRelations;
