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
  Consulta,
} from '../models';
import {AnimalRepository} from '../repositories';

export class AnimalConsultaController {
  constructor(
    @repository(AnimalRepository) protected animalRepository: AnimalRepository,
  ) { }

  @get('/animals/{id}/consultas', {
    responses: {
      '200': {
        description: 'Array of Animal has many Consulta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Consulta)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Consulta>,
  ): Promise<Consulta[]> {
    return this.animalRepository.consultas(id).find(filter);
  }

  @post('/animals/{id}/consultas', {
    responses: {
      '200': {
        description: 'Animal model instance',
        content: {'application/json': {schema: getModelSchemaRef(Consulta)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Animal.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consulta, {
            title: 'NewConsultaInAnimal',
            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) consulta: Omit<Consulta, 'id_consulta'>,
  ): Promise<Consulta> {
    return this.animalRepository.consultas(id).create(consulta);
  }

  @patch('/animals/{id}/consultas', {
    responses: {
      '200': {
        description: 'Animal.Consulta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consulta, {partial: true}),
        },
      },
    })
    consulta: Partial<Consulta>,
    @param.query.object('where', getWhereSchemaFor(Consulta)) where?: Where<Consulta>,
  ): Promise<Count> {
    return this.animalRepository.consultas(id).patch(consulta, where);
  }

  @del('/animals/{id}/consultas', {
    responses: {
      '200': {
        description: 'Animal.Consulta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Consulta)) where?: Where<Consulta>,
  ): Promise<Count> {
    return this.animalRepository.consultas(id).delete(where);
  }
}
