import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Tender,
  Lot,
} from '../models';
import {TenderRepository} from '../repositories';

export class TenderLotController {
  constructor(
    @repository(TenderRepository) protected tenderRepository: TenderRepository,
  ) { }

  @get('/tenders/{id}/lots', {
    responses: {
      '200': {
        description: 'Array of Tender has many Lot',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Lot)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Lot>,
  ): Promise<Lot[]> {
    return this.tenderRepository.lots(id).find(filter);
  }

  @post('/tenders/{id}/lots', {
    responses: {
      '200': {
        description: 'Tender model instance',
        content: {'application/json': {schema: getModelSchemaRef(Lot)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tender.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lot, {
            title: 'NewLotInTender',
            exclude: ['id'],
            optional: ['tenderId']
          }),
        },
      },
    }) lot: Omit<Lot, 'id'>,
  ): Promise<Lot> {
    return this.tenderRepository.lots(id).create(lot);
  }

  @patch('/tenders/{id}/lots', {
    responses: {
      '200': {
        description: 'Tender.Lot PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lot, {partial: true}),
        },
      },
    })
    lot: Partial<Lot>,
    @param.query.object('where', getWhereSchemaFor(Lot)) where?: Where<Lot>,
  ): Promise<Count> {
    return this.tenderRepository.lots(id).patch(lot, where);
  }

  @del('/tenders/{id}/lots', {
    responses: {
      '200': {
        description: 'Tender.Lot DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Lot)) where?: Where<Lot>,
  ): Promise<Count> {
    return this.tenderRepository.lots(id).delete(where);
  }
}
