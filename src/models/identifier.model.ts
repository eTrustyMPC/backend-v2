import { Entity, model, property } from '@loopback/repository';
import { ObjectId } from 'bson';
import { OcdsSchemaParserService } from '../services';

const schemaParser = new OcdsSchemaParserService();

@model({
  settings: {
    strict: true
  },
  ...schemaParser.getModelMetadata('Identifier'),
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
    ...schemaParser.getPropertyMetadata('Identifier', 'scheme'),
  })
  scheme?: string;

  @property({
    type: 'string',
    ...schemaParser.getPropertyMetadata('Identifier', 'legalName'),
  })
  legalName?: string;

  @property({
    type: 'string',
    ...schemaParser.getPropertyMetadata('Identifier', 'uri'),
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
