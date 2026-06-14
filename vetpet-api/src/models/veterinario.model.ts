import {Entity, model, property, hasMany} from '@loopback/repository';
import {Consulta} from './consulta.model';

@model()
export class Veterinario extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    mysql: { columnName: 'id_veterinario' }
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
  especialidade: string;

  @property({
    type: 'string',
    required: true,
  })
  contacto: string;

  @hasMany(() => Consulta, {keyTo: 'id_veterinario'})
  consultas: Consulta[];

  constructor(data?: Partial<Veterinario>) {
    super(data);
  }
}

export interface VeterinarioRelations {
  // describe navigational properties here
}

export type VeterinarioWithRelations = Veterinario & VeterinarioRelations;
