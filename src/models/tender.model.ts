import {Entity, model, property} from '@loopback/repository';
import {
  ProcurementMethod,
  TenderStatus
} from '@ts4ocds/core/tender';

@model({settings: {strict: true}})
export class Tender extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    description: 'A title for this tender. This will often be used by applications as a headline to attract interest, and to help analysts understand the nature of this procurement.'
  })
  title?: string;

  @property({
    type: 'string',
    description: 'A summary description of the tender. This complements any structured information provided using the items array. Descriptions should be short and easy to read. Avoid using ALL CAPS.',
  })
  description?: string;

  /**
   * The current status of the tender,
   * from the closed [tenderStatus](https://standard.open-contracting.org/1.1/en/schema/codelists/#tender-status) codelist.
   */
  @property({
    type: 'string',
    description: 'The current status of the tender, from the closed tenderStatus codelist.',
  })
  status: TenderStatus;

  @property({
    type: 'string',
    description: '',
  })
  procurementMethod: ProcurementMethod;

  @property({
    type: 'string',
    description: '',
  })
  mainProcurementCategory: ProcurementMethod;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //[prop: string]: any;

  constructor(data?: Partial<Tender>) {
    super(data);
  }
}

export interface TenderRelations {
  // describe navigational properties here
}

export type TenderWithRelations = Tender & TenderRelations;
