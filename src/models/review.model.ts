import {model, property} from '@loopback/repository';
import {BaseModel} from './base-model.model';

@model()
export class Review extends BaseModel {
  @property({
    type: 'string',
  })
  description?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Review>) {
    super(data);
  }
}

export interface ReviewRelations {
  // describe navigational properties here
}

export type ReviewWithRelations = Review & ReviewRelations;
