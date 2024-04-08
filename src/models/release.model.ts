import { Entity, model, property } from '@loopback/repository';
import { ObjectId } from 'bson';
import { OcdsSchemaParserService } from '../services';
//import { Identifier as IdentifierBase } from '@ts4ocds/core/organization';
//export interface OcdsIdentifier extends IdentifierBase { }

const schemaParser = new OcdsSchemaParserService('Release');

@model({
  ...schemaParser.getModelMetadata(),
})
export class Release extends Entity {
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
    ...schemaParser.getPropertyMetadata('ocid'),
  })
  ocid?: string;

  @property({
    type: 'string',
    index: true,
    ...schemaParser.getPropertyMetadata('title'),
  })
  title?: string;

  @property({
    type: 'string',
    index: true,
    ...schemaParser.getPropertyMetadata('description'),
  })
  description?: string;

  @property({
    type: 'date',
    index: true,
    ...schemaParser.getPropertyMetadata('date'),
  })
  date?: string;

  @property({
    type: 'string',
    required: true,
    index: true,
    ...schemaParser.getPropertyMetadata('tag'),
  })
  tag: string;

  @property({
    type: 'string',
    default: 'tender',
    index: true,
    ...schemaParser.getPropertyMetadata('initiationType'),
  })
  initiationType?: string;

  @property({
    type: 'string',
    default: 'en',
    index: true,
    ...schemaParser.getPropertyMetadata('language'),
  })
  language?: string;

  constructor(data?: Partial<Release>) {
    super(data);
  }
}

export interface ReleaseRelations {
  // describe navigational properties here
}

export type ReleaseWithRelations = Release & ReleaseRelations;
