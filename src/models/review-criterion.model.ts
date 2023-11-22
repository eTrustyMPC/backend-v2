import {model, property} from '@loopback/repository';
import {BaseModel} from '.';

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


  constructor(data?: Partial<ReviewCriterion>) {
    super(data);
  }
}

export interface ReviewCriterionRelations {
  // describe navigational properties here
}

export type ReviewCriterionWithRelations = ReviewCriterion & ReviewCriterionRelations;
