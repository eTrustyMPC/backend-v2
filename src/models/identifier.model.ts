import { Entity, model, property } from '@loopback/repository';
import { ObjectId } from 'bson';

@model({
  settings: {
    strict: true
  }
})
export class Identifier extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    default: () => (new ObjectId()).toString(),
  })
  id?: string;

  @property({
    type: 'string',
  })
  schema?: string;

  @property({
    type: 'string',
  })
  legalName?: string;

  @property({
    type: 'string',
  })
  uri?: string;

  constructor(data?: Partial<Identifier>) {
    super(data);
  }
}

export interface IdentifierRelations {
  // describe navigational properties here
}

export type IdentifierWithRelations = Identifier & IdentifierRelations;
