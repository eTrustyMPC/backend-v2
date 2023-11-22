import {model, property, belongsTo} from '@loopback/repository';
import {BaseModel} from './base-model.model';
import {Organization} from './organization.model';

@model()
export class Person extends BaseModel {
  @property({
    type: 'string',
  })
  firstName?: string;

  @property({
    type: 'string',
  })
  lastName?: string;

  @belongsTo(() => Organization)
  organizationId: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Person>) {
    super(data);
  }
}

export interface PersonRelations {
  // describe navigational properties here
}

export type PersonWithRelations = Person & PersonRelations;
