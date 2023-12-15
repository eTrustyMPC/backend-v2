import {model, property} from '@loopback/repository';
import {BaseModel} from './base-model.model';

@model()
export class ReviewCriterion extends BaseModel {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'number',
  })
  reviewId?: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //[prop: string]: any;

  constructor(data?: Partial<ReviewCriterion>) {
    super(data);
  }
}

export interface ReviewCriterionRelations {
  // describe navigational properties here
}

export type ReviewCriterionWithRelations = ReviewCriterion & ReviewCriterionRelations;
