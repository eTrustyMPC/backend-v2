import { Model, model, property } from '@loopback/repository';
import { OcdsSchemaParserService } from '../services';

const schemaParser = new OcdsSchemaParserService('Address');

@model({
  ...schemaParser.getModelMetadata(),
})
export class Address extends Model {
  @property({
    type: 'string',
    ...schemaParser.getPropertyMetadata('streetAddress'),
  })
  streetAddress?: string;

  @property({
    type: 'string',
    ...schemaParser.getPropertyMetadata('locality'),
  })
  locality?: string;

  @property({
    type: 'string',
    ...schemaParser.getPropertyMetadata('region'),
  })
  region?: string;

  @property({
    type: 'string',
    ...schemaParser.getPropertyMetadata('postalCode'),
  })
  postalCode?: string;

  @property({
    type: 'string',
    ...schemaParser.getPropertyMetadata('countryName'),
  })
  countryName?: string;

  @property({
    type: 'string',
    ...schemaParser.getPropertyMetadata('country'),
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
