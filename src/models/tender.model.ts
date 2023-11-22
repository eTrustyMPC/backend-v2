import {model, property} from '@loopback/repository';
import {BaseModel} from './base-model.model';

@model()
export class Tender extends BaseModel {
  @property({
    type: 'string',
    required: true,
  })
  name: string;


  constructor(data?: Partial<Tender>) {
    super(data);
  }
}

export interface TenderRelations {
  // describe navigational properties here
}

export type TenderWithRelations = Tender & TenderRelations;
