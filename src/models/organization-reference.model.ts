import { Entity, model, property } from '@loopback/repository';
import { ObjectId } from 'bson';
import { Address } from './address.model';
import { Identifier } from './identifier.model';
import { ContactPoint } from './contact-point.model';
import { OcdsSchemaParserService } from '../services';

const schemaParser = new OcdsSchemaParserService('OrganizationReference');

@model({
  ...schemaParser.getModelMetadata(),
})
export class OrganizationReference extends Entity {
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
    type: Address,
    ...schemaParser.getPropertyMetadata('address'),
  })
  address?: Address;

  @property({
    type: 'array',
    itemType: Identifier,
    ...schemaParser.getPropertyMetadata('additionalIdentifiers'),
  })
  additionalIdentifiers?: Identifier[];

  @property({
    type: ContactPoint,
    ...schemaParser.getPropertyMetadata('contactPoint'),
  })
  contactPoint?: ContactPoint;

  constructor(data?: Partial<OrganizationReference>) {
    super(data);
  }
}

export interface OrganizationReferenceRelations {
  // describe navigational properties here
}

export type OrganizationReferenceWithRelations = OrganizationReference & OrganizationReferenceRelations;
