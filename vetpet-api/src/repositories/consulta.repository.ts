import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Consulta, ConsultaRelations, Animal, Veterinario, RegistoTratamento} from '../models';
import {AnimalRepository} from './animal.repository';
import {VeterinarioRepository} from './veterinario.repository';
import {RegistoTratamentoRepository} from './registo-tratamento.repository';

export class ConsultaRepository extends DefaultCrudRepository<
  Consulta,
  typeof Consulta.prototype.id,
  ConsultaRelations
> {

  public readonly animal: BelongsToAccessor<Animal, typeof Consulta.prototype.id>;

  public readonly veterinario: BelongsToAccessor<Veterinario, typeof Consulta.prototype.id>;

  public readonly registosTratamento: HasManyRepositoryFactory<RegistoTratamento, typeof Consulta.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('AnimalRepository') protected animalRepositoryGetter: Getter<AnimalRepository>, @repository.getter('VeterinarioRepository') protected veterinarioRepositoryGetter: Getter<VeterinarioRepository>, @repository.getter('RegistoTratamentoRepository') protected registoTratamentoRepositoryGetter: Getter<RegistoTratamentoRepository>,
  ) {
    super(Consulta, dataSource);
    this.registosTratamento = this.createHasManyRepositoryFactoryFor('registosTratamento', registoTratamentoRepositoryGetter,);
    this.registerInclusionResolver('registosTratamento', this.registosTratamento.inclusionResolver);
    this.veterinario = this.createBelongsToAccessorFor('veterinario', veterinarioRepositoryGetter,);
    this.registerInclusionResolver('veterinario', this.veterinario.inclusionResolver);
    this.animal = this.createBelongsToAccessorFor('animal', animalRepositoryGetter,);
    this.registerInclusionResolver('animal', this.animal.inclusionResolver);
  }
}
