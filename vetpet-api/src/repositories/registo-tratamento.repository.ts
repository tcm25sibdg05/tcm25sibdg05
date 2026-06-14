import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {RegistoTratamento, RegistoTratamentoRelations, Consulta, Animal, AcaoMedica} from '../models';
import {ConsultaRepository} from './consulta.repository';
import {AnimalRepository} from './animal.repository';
import {AcaoMedicaRepository} from './acao-medica.repository';

export class RegistoTratamentoRepository extends DefaultCrudRepository<
  RegistoTratamento,
  typeof RegistoTratamento.prototype.id,
  RegistoTratamentoRelations
> {

  public readonly consulta: BelongsToAccessor<Consulta, typeof RegistoTratamento.prototype.id>;

  public readonly animal: BelongsToAccessor<Animal, typeof RegistoTratamento.prototype.id>;

  public readonly acaoMedica: BelongsToAccessor<AcaoMedica, typeof RegistoTratamento.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ConsultaRepository') protected consultaRepositoryGetter: Getter<ConsultaRepository>, @repository.getter('AnimalRepository') protected animalRepositoryGetter: Getter<AnimalRepository>, @repository.getter('AcaoMedicaRepository') protected acaoMedicaRepositoryGetter: Getter<AcaoMedicaRepository>,
  ) {
    super(RegistoTratamento, dataSource);
    this.acaoMedica = this.createBelongsToAccessorFor('acaoMedica', acaoMedicaRepositoryGetter,);
    this.registerInclusionResolver('acaoMedica', this.acaoMedica.inclusionResolver);
    this.animal = this.createBelongsToAccessorFor('animal', animalRepositoryGetter,);
    this.registerInclusionResolver('animal', this.animal.inclusionResolver);
    this.consulta = this.createBelongsToAccessorFor('consulta', consultaRepositoryGetter,);
  }
}
