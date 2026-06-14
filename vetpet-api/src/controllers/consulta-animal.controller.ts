import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Consulta,
  Animal,
} from '../models';
import {ConsultaRepository} from '../repositories';

export class ConsultaAnimalController {
  constructor(
    @repository(ConsultaRepository)
    public consultaRepository: ConsultaRepository,
  ) { }

  @get('/consultas/{id}/animal', {
    responses: {
      '200': {
        description: 'Animal belonging to Consulta',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Animal),
          },
        },
      },
    },
  })
  async getAnimal(
    @param.path.number('id') id: typeof Consulta.prototype.id,
  ): Promise<Animal> {
    return this.consultaRepository.animal(id);
  }
}
