import {Entity, model, property, hasMany} from '@loopback/repository';
import {RegistoTratamento} from './registo-tratamento.model';

@model({
  settings: {
    mysql: {table: 'Acao_Medica'}
  }
})
export class AcaoMedica extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    mysql: { columnName: 'id_acao' }
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  descricao: string;

  @property({
    type: 'number',
    required: true,
  })
  preco: number;

  @hasMany(() => RegistoTratamento, {keyTo: 'id_acao'})
  registosTratamento: RegistoTratamento[];

  constructor(data?: Partial<AcaoMedica>) {
    super(data);
  }
}

export interface AcaoMedicaRelations {
  // describe navigational properties here
}

export type AcaoMedicaWithRelations = AcaoMedica & AcaoMedicaRelations;
