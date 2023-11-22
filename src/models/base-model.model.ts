import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class BaseModel extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<BaseModel>) {
    super(data);
  }
}

export interface BaseModelRelations {
  // describe navigational properties here
}

export type BaseModelWithRelations = BaseModel & BaseModelRelations;
