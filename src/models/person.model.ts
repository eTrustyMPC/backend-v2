import { Entity, hasOne, model, property } from '@loopback/repository';
import { ObjectId } from 'bson';
import { Address } from './address.model';
import { Identifier, IdentifierWithRelations } from './identifier.model';
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
    index: true,
    ...schemaParser.getPropertyMetadata('name'),
  })
  name?: string;

  @hasOne(
    () => Identifier,
  )
  identifier?: Identifier;

  @property({
    type: 'array',
    itemType: 'string',
    index: true,
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
    index: true,
    ...schemaParser.getPropertyMetadata('email'),
  })
  email?: string;

  @property({
    type: 'string',
    index: true,
    ...schemaParser.getPropertyMetadata('faxNumber'),
  })
  faxNumber?: string;

  @property({
    type: 'string',
    index: true,
    ...schemaParser.getPropertyMetadata('telephone'),
  })
  telephone?: string;

  constructor(data?: Partial<Person>) {
    super(data);
  }
}

export interface PersonRelations {
  identifier: IdentifierWithRelations;
}

export type PersonWithRelations = Person & PersonRelations;
