import {model, property} from '@loopback/repository';
import {BaseModel} from '.';

@model()
export class Review extends BaseModel {

  constructor(data?: Partial<Review>) {
    super(data);
  }
}

export interface ReviewRelations {
  // describe navigational properties here
}

export type ReviewWithRelations = Review & ReviewRelations;
