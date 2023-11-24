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
  Lot,
  Offer,
} from '../models';
import {LotRepository} from '../repositories';

export class LotOfferController {
  constructor(
    @repository(LotRepository) protected lotRepository: LotRepository,
  ) { }

  @get('/lots/{id}/offers', {
    responses: {
      '200': {
        description: 'Array of Lot has many Offer',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Offer)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Offer>,
  ): Promise<Offer[]> {
    return this.lotRepository.offers(id).find(filter);
  }

  @post('/lots/{id}/offers', {
    responses: {
      '200': {
        description: 'Lot model instance',
        content: {'application/json': {schema: getModelSchemaRef(Offer)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Lot.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Offer, {
            title: 'NewOfferInLot',
            exclude: ['id'],
            optional: ['lotId']
          }),
        },
      },
    }) offer: Omit<Offer, 'id'>,
  ): Promise<Offer> {
    return this.lotRepository.offers(id).create(offer);
  }

  @patch('/lots/{id}/offers', {
    responses: {
      '200': {
        description: 'Lot.Offer PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Offer, {partial: true}),
        },
      },
    })
    offer: Partial<Offer>,
    @param.query.object('where', getWhereSchemaFor(Offer)) where?: Where<Offer>,
  ): Promise<Count> {
    return this.lotRepository.offers(id).patch(offer, where);
  }

  @del('/lots/{id}/offers', {
    responses: {
      '200': {
        description: 'Lot.Offer DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Offer)) where?: Where<Offer>,
  ): Promise<Count> {
    return this.lotRepository.offers(id).delete(where);
  }
}
