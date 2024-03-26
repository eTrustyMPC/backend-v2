import { Entity, model, property, belongsTo } from '@loopback/repository';
import { ObjectId } from 'bson';
import { Identifier } from './identifier.model';
import { OcdsSchemaParserService } from '../services';

const schemaParser = new OcdsSchemaParserService();

@model({
  settings: {
    strict: true
  },
  ...schemaParser.getModelMetadata('Organization'),
})
export class Organization extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    default: () => (new ObjectId()).toString(),
  })
  id?: string;

  @property({
    type: 'string',
    ...schemaParser.getPropertyMetadata('Organization', 'name'),
  })
  name?: string;

  @property({
    type: 'object',
    ...schemaParser.getPropertyMetadata('Organization', 'details'),
  })
  details?: object;

  @belongsTo(() => Identifier)
  identifierId: string;

  constructor(data?: Partial<Organization>) {
    super(data);
  }
}

export interface OrganizationRelations {
  // describe navigational properties here
}

export type OrganizationWithRelations = Organization & OrganizationRelations;
