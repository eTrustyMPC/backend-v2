import {Entity, model, property} from '@loopback/repository';

/**
 * A period has a start date, end date, and/or duration.
 * Start and end dates are represented using date-times.
 * Durations are represented as a number of days.
 *
 * Periods can also include a maxExtentDate which indicates the latest
 * possible end date of this period, or the latest date up until which
 * the period could be extended without an amendment.
 */
@model()
export class Period extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    description: 'The start date for the period. When known, a precise start date must be provided.',
  })
  startDate?: string;

  @property({
    type: 'date',
    description: 'The end date for the period. When known, a precise end date must be provided.',
  })
  endDate?: string;

  @property({
    type: 'date',
    description: 'The period cannot be extended beyond this date. This field can be used to express the maximum available date for extension or renewal of this period.',
  })
  maxExtentDate?: string;

  @property({
    type: 'number',
    description: 'The maximum duration of this period in days. A user interface can collect or display this data in months or years as appropriate, and then convert it into days when storing this field. This field can be used when exact dates are not known. If a startDate and endDate are set, this field, if used, should be equal to the difference between startDate and endDate. Otherwise, if a startDate and maxExtentDate are set, this field, if used, should be equal to the difference between startDate and maxExtentDate.',
  })
  durationInDays?: number;


  constructor(data?: Partial<Period>) {
    super(data);
  }
}

export interface PeriodRelations {
  // describe navigational properties here
}

export type PeriodWithRelations = Period & PeriodRelations;
