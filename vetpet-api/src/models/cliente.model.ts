import {Entity, model, property, hasMany} from '@loopback/repository';
import {Animal} from './animal.model';

@model({
  settings: {
    mysql: {table: 'Cliente'} 
  }
})
export class Cliente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    mysql: {
      columnName: 'id_cliente'
    }
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
  nif: string;

  @property({
    type: 'string',
    required: true,
  })
  telefone: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  morada: string;

  @hasMany(() => Animal, {keyTo: 'id_cliente'})
  animais: Animal[];

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
