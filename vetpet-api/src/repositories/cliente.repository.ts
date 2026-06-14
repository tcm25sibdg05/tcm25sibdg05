import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Cliente, ClienteRelations, Animal} from '../models';
import {AnimalRepository} from './animal.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly animais: HasManyRepositoryFactory<Animal, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('AnimalRepository') protected animalRepositoryGetter: Getter<AnimalRepository>,
  ) {
    super(Cliente, dataSource);
    this.animais = this.createHasManyRepositoryFactoryFor('animais', animalRepositoryGetter,);
    this.registerInclusionResolver('animais', this.animais.inclusionResolver);
  }
}
