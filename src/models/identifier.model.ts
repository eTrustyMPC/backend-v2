import {Entity, model, property} from '@loopback/repository';

/**
 * https://standard.open-contracting.org/latest/en/schema/reference/#identifier
 *
 * The identifier block provides a way to identify the legal entities involved
 * in a contracting process.
 *
 * If a contracting process represents a contract arranged by the department
 * or branch of a larger organization, the legal entity (
 * usually the registered organization) should be described in the identifier
 * section, with details of the branch or department given in the name,
 * address and contact point as relevant.
 */
@model()
export class Identifier extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
    description: 'The identifier of the organization in the selected scheme.',
  })
  id: string;

  @property({
    type: 'string',
    required: false,
    description: 'Organization identifiers should be taken from an existing organization identifier list. The scheme field is used to indicate the list or register from which the identifier is taken. This value should be taken from the Organization Identifier Scheme codelist.',
  })
  scheme?: string;

  @property({
    type: 'string',
    description: 'The legally registered name of the organization.',
  })
  legalName?: string;

  @property({
    type: 'string',
    description: 'A URI to identify the organization, such as those provided by Open Corporates or some other relevant URI provider. This is not for listing the website of the organization: that can be done through the URL field of the Organization contact point.',
  })
  uri?: string;


  constructor(data?: Partial<Identifier>) {
    super(data);
  }
}

export interface IdentifierRelations {
  // describe navigational properties here
}

export type IdentifierWithRelations = Identifier & IdentifierRelations;
