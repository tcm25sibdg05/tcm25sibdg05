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
import {AcaoMedica} from '../models';
import {AcaoMedicaRepository} from '../repositories';

export class AcaoMedicaController {
  constructor(
    @repository(AcaoMedicaRepository)
    public acaoMedicaRepository : AcaoMedicaRepository,
  ) {}

  @post('/acoes-medicas')
  @response(200, {
    description: 'AcaoMedica model instance',
    content: {'application/json': {schema: getModelSchemaRef(AcaoMedica)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AcaoMedica, {
            title: 'NewAcaoMedica',
            exclude: ['id'],
          }),
        },
      },
    })
    acaoMedica: Omit<AcaoMedica, 'id'>,
  ): Promise<AcaoMedica> {
    return this.acaoMedicaRepository.create(acaoMedica);
  }

  @get('/acoes-medicas/count')
  @response(200, {
    description: 'AcaoMedica model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AcaoMedica) where?: Where<AcaoMedica>,
  ): Promise<Count> {
    return this.acaoMedicaRepository.count(where);
  }

  @get('/acoes-medicas')
  @response(200, {
    description: 'Array of AcaoMedica model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AcaoMedica, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AcaoMedica) filter?: Filter<AcaoMedica>,
  ): Promise<AcaoMedica[]> {
    return this.acaoMedicaRepository.find(filter);
  }

  @patch('/acoes-medicas')
  @response(200, {
    description: 'AcaoMedica PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AcaoMedica, {partial: true}),
        },
      },
    })
    acaoMedica: AcaoMedica,
    @param.where(AcaoMedica) where?: Where<AcaoMedica>,
  ): Promise<Count> {
    return this.acaoMedicaRepository.updateAll(acaoMedica, where);
  }

  @get('/acoes-medicas/{id}')
  @response(200, {
    description: 'AcaoMedica model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AcaoMedica, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AcaoMedica, {exclude: 'where'}) filter?: FilterExcludingWhere<AcaoMedica>
  ): Promise<AcaoMedica> {
    return this.acaoMedicaRepository.findById(id, filter);
  }

  @patch('/acoes-medicas/{id}')
  @response(204, {
    description: 'AcaoMedica PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AcaoMedica, {partial: true}),
        },
      },
    })
    acaoMedica: AcaoMedica,
  ): Promise<void> {
    await this.acaoMedicaRepository.updateById(id, acaoMedica);
  }

  @put('/acoes-medicas/{id}')
  @response(204, {
    description: 'AcaoMedica PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() acaoMedica: AcaoMedica,
  ): Promise<void> {
    await this.acaoMedicaRepository.replaceById(id, acaoMedica);
  }

  @del('/acoes-medicas/{id}')
  @response(204, {
    description: 'AcaoMedica DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.acaoMedicaRepository.deleteById(id);
  }
}
