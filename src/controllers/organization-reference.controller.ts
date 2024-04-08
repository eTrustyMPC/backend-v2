import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {OrganizationReference} from '../models';
import {OrganizationReferenceRepository} from '../repositories';

export class OrganizationReferenceController {
  constructor(
    @repository(OrganizationReferenceRepository)
    public organizationReferenceRepository : OrganizationReferenceRepository,
  ) {}

  @post('/organization-references')
  @response(200, {
    description: 'OrganizationReference model instance',
    content: {'application/json': {schema: getModelSchemaRef(OrganizationReference)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrganizationReference, {
            title: 'NewOrganizationReference',
            exclude: ['id'],
          }),
        },
      },
    })
    organizationReference: Omit<OrganizationReference, 'id'>,
  ): Promise<OrganizationReference> {
    return this.organizationReferenceRepository.create(organizationReference);
  }

  @get('/organization-references/count')
  @response(200, {
    description: 'OrganizationReference model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(OrganizationReference) where?: Where<OrganizationReference>,
  ): Promise<Count> {
    return this.organizationReferenceRepository.count(where);
  }

  @get('/organization-references')
  @response(200, {
    description: 'Array of OrganizationReference model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(OrganizationReference, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(OrganizationReference) filter?: Filter<OrganizationReference>,
  ): Promise<OrganizationReference[]> {
    return this.organizationReferenceRepository.find(filter);
  }

  @patch('/organization-references')
  @response(200, {
    description: 'OrganizationReference PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrganizationReference, {partial: true}),
        },
      },
    })
    organizationReference: OrganizationReference,
    @param.where(OrganizationReference) where?: Where<OrganizationReference>,
  ): Promise<Count> {
    return this.organizationReferenceRepository.updateAll(organizationReference, where);
  }

  @get('/organization-references/{id}')
  @response(200, {
    description: 'OrganizationReference model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(OrganizationReference, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(OrganizationReference, {exclude: 'where'}) filter?: FilterExcludingWhere<OrganizationReference>
  ): Promise<OrganizationReference> {
    return this.organizationReferenceRepository.findById(id, filter);
  }

  @patch('/organization-references/{id}')
  @response(204, {
    description: 'OrganizationReference PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrganizationReference, {partial: true}),
        },
      },
    })
    organizationReference: OrganizationReference,
  ): Promise<void> {
    await this.organizationReferenceRepository.updateById(id, organizationReference);
  }

  @put('/organization-references/{id}')
  @response(204, {
    description: 'OrganizationReference PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() organizationReference: OrganizationReference,
  ): Promise<void> {
    await this.organizationReferenceRepository.replaceById(id, organizationReference);
  }

  @del('/organization-references/{id}')
  @response(204, {
    description: 'OrganizationReference DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.organizationReferenceRepository.deleteById(id);
  }
}
