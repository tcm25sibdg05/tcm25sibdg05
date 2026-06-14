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
  AcaoMedica,
  RegistoTratamento,
} from '../models';
import {AcaoMedicaRepository} from '../repositories';

export class AcaoMedicaRegistoTratamentoController {
  constructor(
    @repository(AcaoMedicaRepository) protected acaoMedicaRepository: AcaoMedicaRepository,
  ) { }

  @get('/acao-medicas/{id}/registo-tratamentos', {
    responses: {
      '200': {
        description: 'Array of AcaoMedica has many RegistoTratamento',
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
    return this.acaoMedicaRepository.registosTratamento(id).find(filter);
  }

  @post('/acao-medicas/{id}/registo-tratamentos', {
    responses: {
      '200': {
        description: 'AcaoMedica model instance',
        content: {'application/json': {schema: getModelSchemaRef(RegistoTratamento)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof AcaoMedica.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistoTratamento, {
            title: 'NewRegistoTratamentoInAcaoMedica',
            exclude: ['id_acao'],
            optional: ['id_acao']
          }),
        },
      },
    }) registoTratamento: Omit<RegistoTratamento, 'id_registo'>,
  ): Promise<RegistoTratamento> {
    return this.acaoMedicaRepository.registosTratamento(id).create(registoTratamento);
  }

  @patch('/acao-medicas/{id}/registo-tratamentos', {
    responses: {
      '200': {
        description: 'AcaoMedica.RegistoTratamento PATCH success count',
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
    return this.acaoMedicaRepository.registosTratamento(id).patch(registoTratamento, where);
  }

  @del('/acao-medicas/{id}/registo-tratamentos', {
    responses: {
      '200': {
        description: 'AcaoMedica.RegistoTratamento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(RegistoTratamento)) where?: Where<RegistoTratamento>,
  ): Promise<Count> {
    return this.acaoMedicaRepository.registosTratamento(id).delete(where);
  }
}
