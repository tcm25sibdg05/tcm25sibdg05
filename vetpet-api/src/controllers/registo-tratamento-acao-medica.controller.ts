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
  AcaoMedica,
} from '../models';
import {RegistoTratamentoRepository} from '../repositories';

export class RegistoTratamentoAcaoMedicaController {
  constructor(
    @repository(RegistoTratamentoRepository)
    public registoTratamentoRepository: RegistoTratamentoRepository,
  ) { }

  @get('/registo-tratamentos/{id}/acao-medica', {
    responses: {
      '200': {
        description: 'AcaoMedica belonging to RegistoTratamento',
        content: {
          'application/json': {
            schema: getModelSchemaRef(AcaoMedica),
          },
        },
      },
    },
  })
  async getAcaoMedica(
    @param.path.number('id') id: typeof RegistoTratamento.prototype.id,
  ): Promise<AcaoMedica> {
    return this.registoTratamentoRepository.acaoMedica(id);
  }
}
