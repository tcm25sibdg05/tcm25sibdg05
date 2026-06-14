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
  Veterinario,
} from '../models';
import {ConsultaRepository} from '../repositories';

export class ConsultaVeterinarioController {
  constructor(
    @repository(ConsultaRepository)
    public consultaRepository: ConsultaRepository,
  ) { }

  @get('/consultas/{id}/veterinario', {
    responses: {
      '200': {
        description: 'Veterinario belonging to Consulta',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Veterinario),
          },
        },
      },
    },
  })
  async getVeterinario(
    @param.path.number('id') id: typeof Consulta.prototype.id,
  ): Promise<Veterinario> {
    return this.consultaRepository.veterinario(id);
  }
}
