import { Entity, model, property } from '@loopback/repository';
import { Address } from './address.model';
import { Identifier } from './identifier.model';
import { ContactPoint } from './contact-point.model';
import { OcdsSchemaParserService } from '../services';

const schemaParser = new OcdsSchemaParserService();

@model()
export class OrganizationReference extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'string',
    ...schemaParser.getPropertyMetadata('OrganizationReference', 'name'),
  })
  name?: string;

  @property({
    type: Identifier,
    ...schemaParser.getPropertyMetadata('OrganizationReference', 'identifier'),
  })
  identifier?: Identifier;

  @property({
    type: Address,
    ...schemaParser.getPropertyMetadata('OrganizationReference', 'address'),
  })
  address?: Address;

  @property({
    type: 'array',
    itemType: Identifier,
    ...schemaParser.getPropertyMetadata('OrganizationReference', 'additionalIdentifiers'),
  })
  additionalIdentifiers?: Identifier[];

  @property({
    type: ContactPoint,
    ...schemaParser.getPropertyMetadata('OrganizationReference', 'contactPoint'),
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
