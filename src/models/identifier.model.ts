import { Entity, model, property } from '@loopback/repository';
import { ObjectId } from 'bson';
import { OcdsSchemaParserService } from '../services';
import { Identifier as IdentifierBase } from '@ts4ocds/core/organization';
export interface OcdsIdentifier extends IdentifierBase { }

const schemaParser = new OcdsSchemaParserService('Identifier');

@model({
  ...schemaParser.getModelMetadata(),
})
export class Identifier extends Entity implements OcdsIdentifier {
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
    ...schemaParser.getPropertyMetadata('scheme'),
  })
  scheme?: string;

  @property({
    type: 'string',
    index: true,
    ...schemaParser.getPropertyMetadata('legalName'),
  })
  legalName?: string;

  @property({
    type: 'string',
    index: true,
    ...schemaParser.getPropertyMetadata('uri'),
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
