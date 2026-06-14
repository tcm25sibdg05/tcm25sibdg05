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
import {RegistoTratamento} from '../models';
import {RegistoTratamentoRepository} from '../repositories';

export class RegistoTratamentoController {
  constructor(
    @repository(RegistoTratamentoRepository)
    public registoTratamentoRepository : RegistoTratamentoRepository,
  ) {}

  @post('/registos-tratamentos')
  @response(200, {
    description: 'RegistoTratamento model instance',
    content: {'application/json': {schema: getModelSchemaRef(RegistoTratamento)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistoTratamento, {
            title: 'NewRegistoTratamento',
            exclude: ['id'],
          }),
        },
      },
    })
    registoTratamento: Omit<RegistoTratamento, 'id_registo'>,
  ): Promise<RegistoTratamento> {
    return this.registoTratamentoRepository.create(registoTratamento);
  }

  @get('/registos-tratamentos/count')
  @response(200, {
    description: 'RegistoTratamento model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(RegistoTratamento) where?: Where<RegistoTratamento>,
  ): Promise<Count> {
    return this.registoTratamentoRepository.count(where);
  }

  @get('/registos-tratamentos')
  @response(200, {
    description: 'Array of RegistoTratamento model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(RegistoTratamento, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(RegistoTratamento) filter?: Filter<RegistoTratamento>,
  ): Promise<RegistoTratamento[]> {
    return this.registoTratamentoRepository.find(filter);
  }

  @patch('/registos-tratamentos')
  @response(200, {
    description: 'RegistoTratamento PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistoTratamento, {partial: true}),
        },
      },
    })
    registoTratamento: RegistoTratamento,
    @param.where(RegistoTratamento) where?: Where<RegistoTratamento>,
  ): Promise<Count> {
    return this.registoTratamentoRepository.updateAll(registoTratamento, where);
  }

  @get('/registos-tratamentos/{id}')
  @response(200, {
    description: 'RegistoTratamento model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(RegistoTratamento, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(RegistoTratamento, {exclude: 'where'}) filter?: FilterExcludingWhere<RegistoTratamento>
  ): Promise<RegistoTratamento> {
    return this.registoTratamentoRepository.findById(id, filter);
  }

  @patch('/registos-tratamentos/{id}')
  @response(204, {
    description: 'RegistoTratamento PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistoTratamento, {partial: true}),
        },
      },
    })
    registoTratamento: RegistoTratamento,
  ): Promise<void> {
    await this.registoTratamentoRepository.updateById(id, registoTratamento);
  }

  @put('/registos-tratamentos/{id}')
  @response(204, {
    description: 'RegistoTratamento PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() registoTratamento: RegistoTratamento,
  ): Promise<void> {
    await this.registoTratamentoRepository.replaceById(id, registoTratamento);
  }

  @del('/registos-tratamentos/{id}')
  @response(204, {
    description: 'RegistoTratamento DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.registoTratamentoRepository.deleteById(id);
  }
}
