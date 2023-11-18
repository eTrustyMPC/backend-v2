import {Entity, belongsTo, model, property, referencesMany} from '@loopback/repository';
import {User} from './user.model';

@model({
  settings: {
    description: "Tender object, container for Lots"
  }
})
export class Tender extends Entity {
  @property({
    type: 'number',
    id: 1,
    generated: false,
    updateOnly: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'date',
  })
  startDate?: string;

  @property({
    type: 'date',
  })
  endDate?: string;

  @property({
    type: 'date',
  })
  deadlineDate?: string;

  @belongsTo(() => User)
  ownerId: number;

  @referencesMany(() => User)
  juryMemberIds: number[];

  constructor(data?: Partial<Tender>) {
    super(data);
  }
}

export interface TenderRelations {
  // describe navigational properties here
}

export type TenderWithRelations = Tender & TenderRelations;
