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
  Consulta,
  RegistoTratamento,
} from '../models';
import {ConsultaRepository} from '../repositories';

export class ConsultaRegistoTratamentoController {
  constructor(
    @repository(ConsultaRepository) protected consultaRepository: ConsultaRepository,
  ) { }

  @get('/consultas/{id}/registo-tratamentos', {
    responses: {
      '200': {
        description: 'Array of Consulta has many RegistoTratamento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(RegistoTratamento)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<RegistoTratamento>,
  ): Promise<RegistoTratamento[]> {
    return this.consultaRepository.registosTratamento(id).find(filter);
  }

  @post('/consultas/{id}/registo-tratamentos', {
    responses: {
      '200': {
        description: 'Consulta model instance',
        content: {'application/json': {schema: getModelSchemaRef(RegistoTratamento)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Consulta.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistoTratamento, {
            title: 'NewRegistoTratamentoInConsulta',
            exclude: ['id'],
            optional: ['id_consulta']
          }),
        },
      },
    }) registoTratamento: Omit<RegistoTratamento, 'id_registo'>,
  ): Promise<RegistoTratamento> {
    return this.consultaRepository.registosTratamento(id).create(registoTratamento);
  }

  @patch('/consultas/{id}/registo-tratamentos', {
    responses: {
      '200': {
        description: 'Consulta.RegistoTratamento PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistoTratamento, {partial: true}),
        },
      },
    })
    registoTratamento: Partial<RegistoTratamento>,
    @param.query.object('where', getWhereSchemaFor(RegistoTratamento)) where?: Where<RegistoTratamento>,
  ): Promise<Count> {
    return this.consultaRepository.registosTratamento(id).patch(registoTratamento, where);
  }

  @del('/consultas/{id}/registo-tratamentos', {
    responses: {
      '200': {
        description: 'Consulta.RegistoTratamento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(RegistoTratamento)) where?: Where<RegistoTratamento>,
  ): Promise<Count> {
    return this.consultaRepository.registosTratamento(id).delete(where);
  }
}
