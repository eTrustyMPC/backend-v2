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
  Organization,
  Tender,
} from '../models';
import {OrganizationRepository} from '../repositories';

export class OrganizationTenderController {
  constructor(
    @repository(OrganizationRepository) protected organizationRepository: OrganizationRepository,
  ) { }

  @get('/organizations/{id}/tenders', {
    tags: ['OrganizationController'],
    responses: {
      '200': {
        description: 'Array of Organization has many Tender',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tender)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Tender>,
  ): Promise<Tender[]> {
    return this.organizationRepository.tenders(id).find(filter);
  }

  @post('/organizations/{id}/tenders', {
    responses: {
      '200': {
        description: 'Organization model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tender)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Organization.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tender, {
            title: 'NewTenderInOrganization',
            exclude: ['id'],
            optional: ['organizationId']
          }),
        },
      },
    }) tender: Omit<Tender, 'id'>,
  ): Promise<Tender> {
    return this.organizationRepository.tenders(id).create(tender);
  }

  @patch('/organizations/{id}/tenders', {
    responses: {
      '200': {
        description: 'Organization.Tender PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tender, {partial: true}),
        },
      },
    })
    tender: Partial<Tender>,
    @param.query.object('where', getWhereSchemaFor(Tender)) where?: Where<Tender>,
  ): Promise<Count> {
    return this.organizationRepository.tenders(id).patch(tender, where);
  }

  @del('/organizations/{id}/tenders', {
    responses: {
      '200': {
        description: 'Organization.Tender DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Tender)) where?: Where<Tender>,
  ): Promise<Count> {
    return this.organizationRepository.tenders(id).delete(where);
  }
}
