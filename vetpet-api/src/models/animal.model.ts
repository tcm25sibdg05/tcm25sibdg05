import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Consulta} from './consulta.model';
import {RegistoTratamento} from './registo-tratamento.model';

@model()
export class Animal extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    mysql: { columnName: 'id_animal' }
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nome: string;

  @property({
    type: 'string',
    required: true,
  })
  especie: string;

  @property({
    type: 'string',
  })
  raca?: string;

  @property({
    type: 'number',
    required: true,
  })
  ano_nascimento: number;

  @property({
    type: 'string',
    required: true,
  })
  sexo: string;

  @property({
    type: 'string',
    required: true,
  })
  estado_saude: string;

  @belongsTo(() => Cliente, {name: 'cliente'})
  id_cliente: number;

  @hasMany(() => Consulta, {keyTo: 'id_animal'})
  consultas: Consulta[];

  @hasMany(() => RegistoTratamento, {keyTo: 'id_animal'})
  registosTratamento: RegistoTratamento[];

  constructor(data?: Partial<Animal>) {
    super(data);
  }
}

export interface AnimalRelations {
  // describe navigational properties here
}

export type AnimalWithRelations = Animal & AnimalRelations;
