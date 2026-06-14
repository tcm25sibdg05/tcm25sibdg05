import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Animal} from './animal.model';
import {Veterinario} from './veterinario.model';
import {RegistoTratamento} from './registo-tratamento.model';

@model()
export class Consulta extends Entity {
@property({
    type: 'number',
    id: true,
    generated: true,
    mysql: { columnName: 'id_consulta' }
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  estado_consulta: string;

  @property({
    type: 'string',
    required: true,
  })
  data_consulta: string;

  @property({
    type: 'string',
    required: true,
  })
  hora_consulta: string;

  @belongsTo(() => Animal, {name: 'animal'})
  id_animal: number;

  @belongsTo(() => Veterinario, {name: 'veterinario'})
  id_veterinario: number;

  @hasMany(() => RegistoTratamento, {keyTo: 'id_consulta'})
  registosTratamento: RegistoTratamento[];

  constructor(data?: Partial<Consulta>) {
    super(data);
  }
}

export interface ConsultaRelations {
  // describe navigational properties here
}

export type ConsultaWithRelations = Consulta & ConsultaRelations;
