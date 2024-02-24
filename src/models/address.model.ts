import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Address extends Model {
  @property({
    type: 'string',
  })
  streetAddress?: string;

  @property({
    type: 'string',
  })
  locality?: string;

  @property({
    type: 'string',
  })
  region?: string;

  @property({
    type: 'string',
  })
  postalCode?: string;

  @property({
    type: 'string',
  })
  countryName?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Address>) {
    super(data);
  }
}

export interface AddressRelations {
  // describe navigational properties here
}

export type AddressWithRelations = Address & AddressRelations;
