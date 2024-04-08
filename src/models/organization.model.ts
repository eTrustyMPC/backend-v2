import { Entity, model, property, hasOne, referencesMany } from '@loopback/repository';
import { ObjectId } from 'bson';
import { Identifier, IdentifierWithRelations } from './identifier.model';
import { ContactPoint } from './contact-point.model';
import { Address } from './address.model';
import { OcdsSchemaParserService } from '../services';
import { Organization as OrganizationBase, Role } from '@ts4ocds/core/organization';
type OmittedOcdsFields = 'id' | 'details' | 'identifier' | 'additionalIdentifiers' | 'toReference';
export interface OcdsOrganization extends Omit<OrganizationBase, OmittedOcdsFields> { }

const schemaParser = new OcdsSchemaParserService('Organization');

@model({
  ...schemaParser.getModelMetadata(),
})
export class Organization extends Entity implements OcdsOrganization {
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

  @property({
    type: 'array',
    itemType: 'string',
    ...schemaParser.getPropertyMetadata('roles'),
  })
  roles?: Role[] | string[];

  @hasOne(() => Identifier)
  identifier: Identifier;

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
    index: true,
    ...schemaParser.getPropertyMetadata('contactPoint'),
  })
  contactPoint?: ContactPoint;

  @property({
    type: Address,
    index: true,
    ...schemaParser.getPropertyMetadata('address'),
  })
  address: Address;

  constructor(data?: Partial<Organization>) {
    super(data);
  }
}

export interface OrganizationRelations {
  identifier: IdentifierWithRelations;
  additionalIdentifiers: IdentifierWithRelations[];
}

export type OrganizationWithRelations = Organization & OrganizationRelations;
