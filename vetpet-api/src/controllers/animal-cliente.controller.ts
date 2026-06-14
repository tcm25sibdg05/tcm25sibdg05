import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Animal,
  Cliente,
} from '../models';
import {AnimalRepository} from '../repositories';

export class AnimalClienteController {
  constructor(
    @repository(AnimalRepository)
    public animalRepository: AnimalRepository,
  ) { }

  @get('/animals/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Animal',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cliente),
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.number('id') id: typeof Animal.prototype.id,
  ): Promise<Cliente> {
    return this.animalRepository.cliente(id);
  }
}
