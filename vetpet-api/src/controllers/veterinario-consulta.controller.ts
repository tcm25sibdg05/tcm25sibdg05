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
  Veterinario,
  Consulta,
} from '../models';
import {VeterinarioRepository} from '../repositories';

export class VeterinarioConsultaController {
  constructor(
    @repository(VeterinarioRepository) protected veterinarioRepository: VeterinarioRepository,
  ) { }

  @get('/veterinarios/{id}/consultas', {
    responses: {
      '200': {
        description: 'Array of Veterinario has many Consulta',
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
    return this.veterinarioRepository.consultas(id).find(filter);
  }

  @post('/veterinarios/{id}/consultas', {
    responses: {
      '200': {
        description: 'Veterinario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Consulta)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Veterinario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consulta, {
            title: 'NewConsultaInVeterinario',
            exclude: ['id'],
            optional: ['id_veterinario']
          }),
        },
      },
    }) consulta: Omit<Consulta, 'id'>,
  ): Promise<Consulta> {
    return this.veterinarioRepository.consultas(id).create(consulta);
  }

  @patch('/veterinarios/{id}/consultas', {
    responses: {
      '200': {
        description: 'Veterinario.Consulta PATCH success count',
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
    return this.veterinarioRepository.consultas(id).patch(consulta, where);
  }

  @del('/veterinarios/{id}/consultas', {
    responses: {
      '200': {
        description: 'Veterinario.Consulta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Consulta)) where?: Where<Consulta>,
  ): Promise<Count> {
    return this.veterinarioRepository.consultas(id).delete(where);
  }
}
