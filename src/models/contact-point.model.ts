import { Model, model, property } from '@loopback/repository';
import { OcdsSchemaParserService } from '../services';

const schemaParser = new OcdsSchemaParserService('ContactPoint');

@model({
  ...schemaParser.getModelMetadata(),
})
export class ContactPoint extends Model {
  @property({
    type: 'string',
    ...schemaParser.getPropertyMetadata('name'),
  })
  name?: string;

  @property({
    type: 'string',
    ...schemaParser.getPropertyMetadata('email'),
  })
  email?: string;

  @property({
    type: 'string',
    ...schemaParser.getPropertyMetadata('telephone'),
  })
  telephone?: string;

  @property({
    type: 'string',
    ...schemaParser.getPropertyMetadata('faxNumber'),
  })
  faxNumber?: string;

  @property({
    type: 'string',
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
