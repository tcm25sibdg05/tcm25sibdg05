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
  Consulta,
} from '../models';
import {RegistoTratamentoRepository} from '../repositories';

export class RegistoTratamentoConsultaController {
  constructor(
    @repository(RegistoTratamentoRepository)
    public registoTratamentoRepository: RegistoTratamentoRepository,
  ) { }

  @get('/registo-tratamentos/{id}/consulta', {
    responses: {
      '200': {
        description: 'Consulta belonging to RegistoTratamento',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Consulta),
          },
        },
      },
    },
  })
  async getConsulta(
    @param.path.number('id') id: typeof RegistoTratamento.prototype.id,
  ): Promise<Consulta> {
    return this.registoTratamentoRepository.consulta(id);
  }
}
