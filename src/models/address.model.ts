/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging --
 * Unsafe declaration merging is required to use base OCDS classes (from ts4ocds package)
 * as base classes for Loopback models
 */
import { Model, model, property } from '@loopback/repository';
import { OcdsSchemaParserService } from '../services';
import { Address as AddressBase } from '@ts4ocds/core/address';
export interface OcdsAddress extends AddressBase { }

const schemaParser = new OcdsSchemaParserService('Address');

@model({
  ...schemaParser.getModelMetadata(),
})
export class Address extends Model implements OcdsAddress {
  @property({
    type: 'string',
    index: true,
    ...schemaParser.getPropertyMetadata('streetAddress'),
  })
  streetAddress?: string;

  @property({
    type: 'string',
    index: true,
    ...schemaParser.getPropertyMetadata('locality'),
  })
  locality?: string;

  @property({
    type: 'string',
    index: true,
    ...schemaParser.getPropertyMetadata('region'),
  })
  region?: string;

  @property({
    type: 'string',
    index: true,
    ...schemaParser.getPropertyMetadata('postalCode'),
  })
  postalCode?: string;

  @property({
    type: 'string',
    index: true,
    ...schemaParser.getPropertyMetadata('countryName'),
  })
  countryName?: string;

  /**
   * Country code. The country, from the closed country codelist.
   */
  @property({
    type: 'string',
    index: true,
    ...schemaParser.getPropertyMetadata('country'),
  })
  country?: string;

  constructor(data?: Partial<Address>) {
    super(data);
  }
}
// add methods from OCDS model to Loopback
//applyMixins(Address, [AddressBase]);

export interface AddressRelations {
  // describe navigational properties here
}

export type AddressWithRelations = Address & AddressRelations;
