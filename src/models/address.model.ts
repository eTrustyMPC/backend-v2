import { Model, model, property } from '@loopback/repository';
import { OcdsSchemaParserService } from '../services';

const schemaParser = new OcdsSchemaParserService();

@model()
export class Address extends Model {

  @property({
    type: 'string',
    ...schemaParser.getPropertyMetadata('Address', 'streetAddress'),
  })
  streetAddress?: string;

  @property({
    type: 'string',
    ...schemaParser.getPropertyMetadata('Address', 'locality'),
  })
  locality?: string;

  @property({
    type: 'string',
    ...schemaParser.getPropertyMetadata('Address', 'region'),
  })
  region?: string;

  @property({
    type: 'string',
    ...schemaParser.getPropertyMetadata('Address', 'postalCode'),
  })
  postalCode?: string;

  @property({
    type: 'string',
    ...schemaParser.getPropertyMetadata('Address', 'countryName'),
  })
  countryName?: string;

  @property({
    type: 'string',
    ...schemaParser.getPropertyMetadata('Address', 'country'),
  })
  country?: string;

  constructor(data?: Partial<Address>) {
    super(data);
  }
}

export interface AddressRelations {
  // describe navigational properties here
}

export type AddressWithRelations = Address & AddressRelations;
