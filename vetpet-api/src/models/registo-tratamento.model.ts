import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Consulta} from './consulta.model';
import {Animal} from './animal.model';
import {AcaoMedica} from './acao-medica.model';

@model({
  settings: {
    mysql: {table: 'Registo_Tratamento'}
  }
})
export class RegistoTratamento extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    mysql: { columnName: 'id_registo' }
  })
  id?: number;

  @property({
    type: 'string',
  })
  notas_clinicas?: string;
  @belongsTo(() => Consulta, {name: 'consulta'})
  id_consulta: number;

  @belongsTo(() => Animal, {name: 'animal'})
  id_animal: number;

  @belongsTo(() => AcaoMedica, {name: 'acaoMedica'})
  id_acao: number;

  constructor(data?: Partial<RegistoTratamento>) {
    super(data);
  }
}

export interface RegistoTratamentoRelations {
  // describe navigational properties here
}

export type RegistoTratamentoWithRelations = RegistoTratamento & RegistoTratamentoRelations;
