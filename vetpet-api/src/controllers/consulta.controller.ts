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
import {Consulta} from '../models';
import {ConsultaRepository} from '../repositories';

export class ConsultaController {
  constructor(
    @repository(ConsultaRepository)
    public consultaRepository : ConsultaRepository,
  ) {}

  @post('/consultas')
  @response(200, {
    description: 'Consulta model instance',
    content: {'application/json': {schema: getModelSchemaRef(Consulta)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consulta, {
            title: 'NewConsulta',
            exclude: ['id'],
          }),
        },
      },
    })
    consulta: Omit<Consulta, 'id'>,
  ): Promise<Consulta> {
    return this.consultaRepository.create(consulta);
  }

  @get('/consultas/count')
  @response(200, {
    description: 'Consulta model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Consulta) where?: Where<Consulta>,
  ): Promise<Count> {
    return this.consultaRepository.count(where);
  }

  @get('/consultas')
  @response(200, {
    description: 'Array of Consulta model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Consulta, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Consulta) filter?: Filter<Consulta>,
  ): Promise<Consulta[]> {
    return this.consultaRepository.find(filter);
  }

  @patch('/consultas')
  @response(200, {
    description: 'Consulta PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consulta, {partial: true}),
        },
      },
    })
    consulta: Consulta,
    @param.where(Consulta) where?: Where<Consulta>,
  ): Promise<Count> {
    return this.consultaRepository.updateAll(consulta, where);
  }

  @get('/consultas/{id}')
  @response(200, {
    description: 'Consulta model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Consulta, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Consulta, {exclude: 'where'}) filter?: FilterExcludingWhere<Consulta>
  ): Promise<Consulta> {
    return this.consultaRepository.findById(id, filter);
  }

  @patch('/consultas/{id}')
  @response(204, {
    description: 'Consulta PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consulta, {partial: true}),
        },
      },
    })
    consulta: Consulta,
  ): Promise<void> {
    await this.consultaRepository.updateById(id, consulta);
  }

  @put('/consultas/{id}')
  @response(204, {
    description: 'Consulta PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() consulta: Consulta,
  ): Promise<void> {
    await this.consultaRepository.replaceById(id, consulta);
  }

  @del('/consultas/{id}')
  @response(204, {
    description: 'Consulta DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.consultaRepository.deleteById(id);
  }
}
