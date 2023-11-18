import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Tender, User} from '../models';
import {TenderRepository} from '../repositories';

export class TenderController {
  constructor(
    @repository(TenderRepository)
    public tenderRepository: TenderRepository,
  ) { }

  @post('/tenders')
  @response(200, {
    description: 'Tender model instance',
    content: {'application/json': {schema: getModelSchemaRef(Tender)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tender, {
            title: 'NewTender',
            exclude: ['id'],
          }),
        },
      },
    })
    tender: Omit<Tender, 'id'>,
  ): Promise<Tender> {
    return this.tenderRepository.create(tender);
  }

  @get('/tenders/count')
  @response(200, {
    description: 'Tender model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Tender) where?: Where<Tender>,
  ): Promise<Count> {
    return this.tenderRepository.count(where);
  }

  @get('/tenders')
  @response(200, {
    description: 'Array of Tender model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Tender, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Tender) filter?: Filter<Tender>,
  ): Promise<Tender[]> {
    return this.tenderRepository.find(filter);
  }

  @patch('/tenders')
  @response(200, {
    description: 'Tender PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tender, {partial: true}),
        },
      },
    })
    tender: Tender,
    @param.where(Tender) where?: Where<Tender>,
  ): Promise<Count> {
    return this.tenderRepository.updateAll(tender, where);
  }

  @get('/tenders/{id}')
  @response(200, {
    description: 'Tender model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Tender, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Tender, {exclude: 'where'}) filter?: FilterExcludingWhere<Tender>
  ): Promise<Tender> {
    return this.tenderRepository.findById(id, filter);
  }

  @patch('/tenders/{id}')
  @response(204, {
    description: 'Tender PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tender, {partial: true}),
        },
      },
    })
    tender: Tender,
  ): Promise<void> {
    await this.tenderRepository.updateById(id, tender);
  }

  @put('/tenders/{id}')
  @response(204, {
    description: 'Tender PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tender: Tender,
  ): Promise<void> {
    await this.tenderRepository.replaceById(id, tender);
  }

  @del('/tenders/{id}')
  @response(204, {
    description: 'Tender DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tenderRepository.deleteById(id);
  }

  /// RELATIONS ///

  @get('/tenders/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Tender',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User),
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof Tender.prototype.id,
  ): Promise<User> {
    return this.tenderRepository.owner(id);
  }
}
