import {Entity, model, property} from '@loopback/repository';

@model()
export class Package extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'string',
  })
  uri?: string;

  @property({
    type: 'string',
  })
  extensions?: string;

  @property({
    type: 'date',
  })
  publishedDate?: string;

  @property({
    type: 'string',
  })
  publicationPolicy?: string;

  @property({
    type: 'string',
  })
  license?: string;


  constructor(data?: Partial<Package>) {
    super(data);
  }
}

export interface PackageRelations {
  // describe navigational properties here
}

export type PackageWithRelations = Package & PackageRelations;
