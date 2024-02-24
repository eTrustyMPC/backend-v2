import {Entity, model, property} from '@loopback/repository';

/**
 * https://standard.open-contracting.org/latest/en/schema/reference/#contactpoint
 */
@model()
export class ContactPoint extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: false,
    description: 'The name of the contact person, department, or contact point, for correspondence relating to this contracting process.',
  })
  name?: string;

  @property({
    type: 'string',
    required: false,
    description: 'The e-mail address of the contact point/person.',
  })
  email?: string;

  @property({
    type: 'string',
    description: 'The telephone number of the contact point/person. This should include the international dialing code.',
  })
  telephone?: string;

  @property({
    type: 'string',
    description: 'The fax number of the contact point/person. This should include the international dialing code.',
  })
  faxNumber?: string;

  @property({
    type: 'string',
    description: 'A web address for the contact point/person.',
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
