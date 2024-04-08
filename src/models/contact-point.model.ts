/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging --
 * Unsafe declaration merging is required to use base OCDS classes (from ts4ocds package)
 * as base classes for Loopback models
 */
import { Model, model, property } from '@loopback/repository';
import { OcdsSchemaParserService } from '../services';
import { ContactPoint as ContactPointBase } from '@ts4ocds/core/organization/contact-point';
export interface OcdsContactPoint extends ContactPointBase { }

const schemaParser = new OcdsSchemaParserService('ContactPoint');

@model({
  ...schemaParser.getModelMetadata(),
})
export class ContactPoint extends Model implements OcdsContactPoint {
  @property({
    type: 'string',
    index: true,
    ...schemaParser.getPropertyMetadata('name'),
  })
  name?: string;

  @property({
    type: 'string',
    index: true,
    ...schemaParser.getPropertyMetadata('email'),
  })
  email?: string;

  @property({
    type: 'string',
    index: true,
    ...schemaParser.getPropertyMetadata('telephone'),
  })
  telephone?: string;

  @property({
    type: 'string',
    index: true,
    ...schemaParser.getPropertyMetadata('faxNumber'),
  })
  faxNumber?: string;

  @property({
    type: 'string',
    index: true,
    ...schemaParser.getPropertyMetadata('url'),
  })
  url?: string;

  constructor(data?: Partial<ContactPoint>) {
    super(data);
  }
}

export interface ContactPointRelations {
  // describe navigational properties here
}

export type ContactPointWithRelations = ContactPoint & ContactPointRelations;
