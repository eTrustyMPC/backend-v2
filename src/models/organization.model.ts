import {
  model,
  property
} from '@loopback/repository';
import {BaseModel} from './base-model.model';

@model()
export class Organization extends BaseModel { //Entity {
  /*@property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;*/

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;


  constructor(data?: Partial<Organization>) {
    super(data);
  }
}

export interface OrganizationRelations {
  // describe navigational properties here
}

export type OrganizationWithRelations = Organization & OrganizationRelations;
