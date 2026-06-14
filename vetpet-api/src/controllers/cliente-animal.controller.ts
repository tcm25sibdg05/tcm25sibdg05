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
  Cliente,
  Animal,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteAnimalController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/animals', {
    responses: {
      '200': {
        description: 'Array of Cliente has many Animal',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Animal)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Animal>,
  ): Promise<Animal[]> {
    return this.clienteRepository.animais(id).find(filter);
  }

  @post('/clientes/{id}/animals', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Animal)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Animal, {
            title: 'NewAnimalInCliente',
            exclude: ['id'],
            optional: ['id_cliente']
          }),
        },
      },
    }) animal: Omit<Animal, 'id_animal'>,
  ): Promise<Animal> {
    return this.clienteRepository.animais(id).create(animal);
  }

  @patch('/clientes/{id}/animals', {
    responses: {
      '200': {
        description: 'Cliente.Animal PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Animal, {partial: true}),
        },
      },
    })
    animal: Partial<Animal>,
    @param.query.object('where', getWhereSchemaFor(Animal)) where?: Where<Animal>,
  ): Promise<Count> {
    return this.clienteRepository.animais(id).patch(animal, where);
  }

  @del('/clientes/{id}/animals', {
    responses: {
      '200': {
        description: 'Cliente.Animal DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Animal)) where?: Where<Animal>,
  ): Promise<Count> {
    return this.clienteRepository.animais(id).delete(where);
  }
}
