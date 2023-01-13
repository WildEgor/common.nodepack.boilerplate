import { AggregateRoot } from '../../microservices';

export type OrmEntityProps<TOrmEntity> = Omit<TOrmEntity,
'id' | 'createdAt' | 'updatedAt' | 'created_at' | 'updated_at'>;

export interface IEntityProps<TEntityProps> {
  id: string;
  props: TEntityProps;
}

export abstract class OrmMapper<TEntity extends AggregateRoot<unknown>, TOrmEntity> {

  protected abstract toDomain(ormEntity: TOrmEntity): TEntity;

  protected abstract toOrm(entity: TEntity): TOrmEntity;

  toDomainEntity(ormEntity: TOrmEntity): TEntity {
    return this.toDomain(ormEntity);
  }

  toOrmEntity(entity: TEntity): TOrmEntity {
    return this.toOrm(entity);
  }

}
