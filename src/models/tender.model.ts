import { Entity, model, property } from '@loopback/repository';
import { ObjectId } from 'bson';
import { OcdsSchemaParserService } from '../services';

const schemaParser = new OcdsSchemaParserService('Tender');

@model({
  ...schemaParser.getModelMetadata(),
})
export class Tender extends Entity {
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
    type: 'string',
    index: true,
    ...schemaParser.getPropertyMetadata('status'),
  })
  status?: string;

  @property({
    type: 'string',
    index: true,
    ...schemaParser.getPropertyMetadata('procurementMethod'),
  })
  procurementMethod?: string;

  @property({
    type: 'string',
    index: true,
    ...schemaParser.getPropertyMetadata('procurementMethodDetails'),
  })
  procurementMethodDetails?: string;

  @property({
    type: 'string',
    index: true,
    ...schemaParser.getPropertyMetadata('procurementMethodRationale'),
  })
  procurementMethodRationale?: string;

  @property({
    type: 'string',
    index: true,
    ...schemaParser.getPropertyMetadata('mainProcurementCategory'),
  })
  mainProcurementCategory?: string;

  @property({
    type: 'array',
    itemType: 'string',
    index: true,
    ...schemaParser.getPropertyMetadata('additionalProcurementCategories'),
  })
  additionalProcurementCategories?: string[];

  @property({
    type: 'string',
    index: true,
    ...schemaParser.getPropertyMetadata('awardCriteria'),
  })
  awardCriteria?: string;

  @property({
    type: 'string',
    index: true,
    ...schemaParser.getPropertyMetadata('awardCriteriaDetails'),
  })
  awardCriteriaDetails?: string;

  @property({
    type: 'string',
    index: true,
    ...schemaParser.getPropertyMetadata('submissionMethod'),
  })
  submissionMethod?: string;

  @property({
    type: 'string',
    index: true,
    ...schemaParser.getPropertyMetadata('submissionMethodDetails'),
  })
  submissionMethodDetails?: string;

  @property({
    type: 'boolean',
    index: true,
    ...schemaParser.getPropertyMetadata('hasEnquiries'),
  })
  hasEnquiries?: boolean;

  @property({
    type: 'string',
    index: true,
    ...schemaParser.getPropertyMetadata('eligibilityCriteria'),
  })
  eligibilityCriteria?: string;

  @property({
    type: 'number',
    index: true,
    ...schemaParser.getPropertyMetadata('numberOfTenderers'),
  })
  numberOfTenderers?: number;

  @property({
    type: 'string',
    index: true,
    ...schemaParser.getPropertyMetadata('coveredBy'),
  })
  coveredBy?: string;

  @property({
    type: 'boolean',
    index: true,
    ...schemaParser.getPropertyMetadata('hasEssentialAssets'),
  })
  hasEssentialAssets?: boolean;

  @property({
    type: 'string',
    index: true,
    ...schemaParser.getPropertyMetadata('reviewDetails'),
  })
  reviewDetails?: string;

  @property({
    type: 'string',
    index: true,
    ...schemaParser.getPropertyMetadata('valueCalculationMethod'),
  })
  valueCalculationMethod?: string;

  @property({
    type: 'string',
    index: true,
    ...schemaParser.getPropertyMetadata('crossBorderLaw'),
  })
  crossBorderLaw?: string;

  @property({
    type: 'object',
    index: true,
    ...schemaParser.getPropertyMetadata('lotDetails'),
  })
  lotDetails?: object;

  @property({
    type: 'boolean',
    index: true,
    ...schemaParser.getPropertyMetadata('hasOptions'),
  })
  hasOptions?: boolean;

  @property({
    type: 'boolean',
    index: true,
    ...schemaParser.getPropertyMetadata('hasRecurrence'),
  })
  hasRecurrence?: boolean;

  @property({
    type: 'boolean',
    index: true,
    ...schemaParser.getPropertyMetadata('hasRenewal'),
  })
  hasRenewal?: boolean;

  @property({
    type: 'string',
    index: true,
    ...schemaParser.getPropertyMetadata('mainProcurementCategoryDetails'),
  })
  mainProcurementCategoryDetails?: string;

  @property({
    type: 'string',
    index: true,
    ...schemaParser.getPropertyMetadata('statusDetails'),
  })
  statusDetails?: string;

  @property({
    type: 'boolean',
    index: true,
    ...schemaParser.getPropertyMetadata('hasSustainability'),
  })
  hasSustainability?: boolean;

  @property({
    type: 'boolean',
    index: true,
    ...schemaParser.getPropertyMetadata('competitive'),
  })
  competitive?: boolean;


  constructor(data?: Partial<Tender>) {
    super(data);
  }
}

export interface TenderRelations {
  // describe navigational properties here
}

export type TenderWithRelations = Tender & TenderRelations;
