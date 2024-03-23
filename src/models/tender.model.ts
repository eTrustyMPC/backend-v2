import {Entity, model, property} from '@loopback/repository';
import {
  TenderStatus
} from '@ts4ocds/core/tender';

@model({settings: {strict: false}})
export class Tender extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  name?: string;



  /**
   * The current status of the tender,
   * from the closed [tenderStatus](https://standard.open-contracting.org/1.1/en/schema/codelists/#tender-status) codelist.
   */
  @property({
    type: 'string',
  })
  status: TenderStatus;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Tender>) {
    super(data);
  }
}

export interface TenderRelations {
  // describe navigational properties here
}

export type TenderWithRelations = Tender & TenderRelations;
