import { Entity, model, property } from '@loopback/repository';
import { Address } from './address.model';
import { Identifier } from './identifier.model';
import { OcdsSchemaParserService } from '../services';

const schemaParser = new OcdsSchemaParserService();

@model()
export class Person extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'string',
    ...schemaParser.getPropertyMetadata('Person', 'name'),
  })
  name?: string;

  @property({
    type: Identifier,
    ...schemaParser.getPropertyMetadata('Person', 'identifier'),
  })
  identifier?: Identifier;

  @property({
    type: 'array',
    itemType: 'string',
    ...schemaParser.getPropertyMetadata('Person', 'nationalities'),
  })
  nationalities?: string[];

  @property({
    type: Address,
    ...schemaParser.getPropertyMetadata('Person', 'address'),
  })
  address?: Address;

  @property({
    type: 'string',
    ...schemaParser.getPropertyMetadata('Person', 'email'),
  })
  email?: string;

  @property({
    type: 'string',
    ...schemaParser.getPropertyMetadata('Person', 'faxNumber'),
  })
  faxNumber?: string;

  @property({
    type: 'string',
    ...schemaParser.getPropertyMetadata('Person', 'telephone'),
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
