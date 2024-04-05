import { Model, model, property } from '@loopback/repository';
import { OcdsSchemaParserService } from '../services';

const schemaParser = new OcdsSchemaParserService();

@model()
export class ContactPoint extends Model {
  @property({
    type: 'string',
    ...schemaParser.getPropertyMetadata('ContactPoint', 'name'),
  })
  name?: string;

  @property({
    type: 'string',
    ...schemaParser.getPropertyMetadata('ContactPoint', 'email'),
  })
  email?: string;

  @property({
    type: 'string',
    ...schemaParser.getPropertyMetadata('ContactPoint', 'telephone'),
  })
  telephone?: string;

  @property({
    type: 'string',
    ...schemaParser.getPropertyMetadata('ContactPoint', 'faxNumber'),
  })
  faxNumber?: string;

  @property({
    type: 'string',
    ...schemaParser.getPropertyMetadata('ContactPoint', 'url'),
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
