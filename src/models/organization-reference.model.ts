import { Entity, model, property, hasOne, referencesMany } from '@loopback/repository';
import { ObjectId } from 'bson';
import { Address } from './address.model';
import { Identifier, IdentifierWithRelations } from './identifier.model';
import { ContactPoint } from './contact-point.model';
import { OcdsSchemaParserService } from '../services';
import { OrganizationReference as OrganizationReferenceBase } from '@ts4ocds/core/organization';
export interface OcdsOrganizationReference extends Omit<OrganizationReferenceBase, 'id'> { }

const schemaParser = new OcdsSchemaParserService('OrganizationReference');

@model({
  ...schemaParser.getModelMetadata(),
})
export class OrganizationReference extends Entity implements OcdsOrganizationReference {
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

  @hasOne(() => Identifier)
  identifier: Identifier;

  @property({
    type: Address,
    ...schemaParser.getPropertyMetadata('address'),
  })
  address?: Address;

  @referencesMany(
    () => Identifier,
    {
      name: 'additionalIdentifiers',
      keyFrom: 'additionalIdentifierIds',
    },
    {
      description: schemaParser.getPropertyMetadata('additionalIdentifiers').jsonSchema?.description,
      name: 'additionalIdentifierIds',
      index: true,
    }
  )
  additionalIdentifierIds?: string[];

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
  identifier: IdentifierWithRelations;
  additionalIdentifiers: IdentifierWithRelations[];
}

export type OrganizationReferenceWithRelations = OrganizationReference & OrganizationReferenceRelations;
