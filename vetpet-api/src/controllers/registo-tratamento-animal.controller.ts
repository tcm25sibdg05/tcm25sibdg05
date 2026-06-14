import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  RegistoTratamento,
  Animal,
} from '../models';
import {RegistoTratamentoRepository} from '../repositories';

export class RegistoTratamentoAnimalController {
  constructor(
    @repository(RegistoTratamentoRepository)
    public registoTratamentoRepository: RegistoTratamentoRepository,
  ) { }

  @get('/registo-tratamentos/{id}/animal', {
    responses: {
      '200': {
        description: 'Animal belonging to RegistoTratamento',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Animal),
          },
        },
      },
    },
  })
  async getAnimal(
    @param.path.number('id') id: typeof RegistoTratamento.prototype.id,
  ): Promise<Animal> {
    return this.registoTratamentoRepository.animal(id);
  }
}
