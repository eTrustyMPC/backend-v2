import { Entity, model, property } from '@loopback/repository';
import { ObjectId } from 'bson';
import { Address } from './address.model';
import { Identifier } from './identifier.model';
import { OcdsSchemaParserService } from '../services';

const schemaParser = new OcdsSchemaParserService('Person');

@model({
  ...schemaParser.getModelMetadata(),
})
export class Person extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    default: () => (new ObjectId()).toString(),
    ...schemaParser.getPropertyMetadata('id'),
  })
  id?: string;

  @property({
    type: 'string',
    ...schemaParser.getPropertyMetadata('name'),
  })
  name?: string;

  @property({
    type: Identifier,
    ...schemaParser.getPropertyMetadata('identifier'),
  })
  identifier?: Identifier;

  @property({
    type: 'array',
    itemType: 'string',
    ...schemaParser.getPropertyMetadata('nationalities'),
  })
  nationalities?: string[];

  @property({
    type: Address,
    ...schemaParser.getPropertyMetadata('address'),
  })
  address?: Address;

  @property({
    type: 'string',
    ...schemaParser.getPropertyMetadata('email'),
  })
  email?: string;

  @property({
    type: 'string',
    ...schemaParser.getPropertyMetadata('faxNumber'),
  })
  faxNumber?: string;

  @property({
    type: 'string',
    ...schemaParser.getPropertyMetadata('telephone'),
  })
  telephone?: string;

  constructor(data?: Partial<Person>) {
    super(data);
  }
}

export interface PersonRelations {
  // describe navigational properties here
}

export type PersonWithRelations = Person & PersonRelations;
