import {
  model,
  property, hasMany, belongsTo} from '@loopback/repository';
import {BaseModel} from './base-model.model';
import {Person} from './person.model';

@model()
export class Organization extends BaseModel {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @hasMany(() => Person)
  persons: Person[];

  @belongsTo(() => Person)
  ownerId: number;
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
