import { Entity, model, property, belongsTo } from '@loopback/repository';
import { ObjectId } from 'bson';
import { Identifier, IdentifierWithRelations } from './identifier.model';
import { OcdsSchemaParserService } from '../services';

const schemaParser = new OcdsSchemaParserService('Organization');

@model({
  ...schemaParser.getModelMetadata(),
})
export class Organization extends Entity {
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

  @property({
    type: 'object',
    ...schemaParser.getPropertyMetadata('details'),
  })
  details?: object;

  @belongsTo(() => Identifier)
  identifierId: string;

  constructor(data?: Partial<Organization>) {
    super(data);
  }
}

export interface OrganizationRelations {
  identifier: IdentifierWithRelations;
}

export type OrganizationWithRelations = Organization & OrganizationRelations;
