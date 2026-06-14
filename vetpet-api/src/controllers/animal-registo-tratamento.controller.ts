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
  Animal,
  RegistoTratamento,
} from '../models';
import {AnimalRepository} from '../repositories';

export class AnimalRegistoTratamentoController {
  constructor(
    @repository(AnimalRepository) protected animalRepository: AnimalRepository,
  ) { }

  @get('/animals/{id}/registo-tratamentos', {
    responses: {
      '200': {
        description: 'Array of Animal has many RegistoTratamento',
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
    return this.animalRepository.registosTratamento(id).find(filter);
  }

  @post('/animals/{id}/registo-tratamentos', {
    responses: {
      '200': {
        description: 'Animal model instance',
        content: {'application/json': {schema: getModelSchemaRef(RegistoTratamento)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Animal.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistoTratamento, {
            title: 'NewRegistoTratamentoInAnimal',
            exclude: ['id'],
            optional: ['id_animal']
          }),
        },
      },
    }) registoTratamento: Omit<RegistoTratamento, 'id_registo'>,
  ): Promise<RegistoTratamento> {
    return this.animalRepository.registosTratamento(id).create(registoTratamento);
  }

  @patch('/animals/{id}/registo-tratamentos', {
    responses: {
      '200': {
        description: 'Animal.RegistoTratamento PATCH success count',
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
    return this.animalRepository.registosTratamento(id).patch(registoTratamento, where);
  }

  @del('/animals/{id}/registo-tratamentos', {
    responses: {
      '200': {
        description: 'Animal.RegistoTratamento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(RegistoTratamento)) where?: Where<RegistoTratamento>,
  ): Promise<Count> {
    return this.animalRepository.registosTratamento(id).delete(where);
  }
}
