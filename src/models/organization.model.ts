import {Entity, model, property} from '@loopback/repository';

/**
 * An organization reference consists of two main components:
 * - An id used to cross-reference the entry in the parties section that
 *   contains full information on this organization or entity;
 * - A name field that repeats the name given in the parties section,
 *   provided for the convenience of users viewing the data, and to support
 *   detection of mistakes in cross-referencing.
 */
@model({settings: {strict: false}})
export class Organization extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Organization>) {
    super(data);
  }
}

export interface OrganizationRelations {
  // describe navigational properties here
}

export type OrganizationWithRelations = Organization & OrganizationRelations;
