import { FilterQuery, Model, QueryOptions, SaveOptions, Types } from 'mongoose';
import { AggregateRoot, IDataWithPaginationMeta, IFindManyPaginatedParams, IQueryParams, IRepositoryPort, NotFoundException } from '../../microservices';
import { removeUndefinedProps } from '../../typescript';
import { OrmMapper } from './orm-mapper.base';

/**
 * Base CRUD mongodb repository
 */
export abstract class MongoBaseRepository<T, TE extends AggregateRoot<unknown>, TF, TSO, TQO>
implements IRepositoryPort<T, TE, TF, TSO, TQO> {

  constructor(
    // eslint-disable-next-line @typescript-eslint/no-parameter-properties
    protected readonly _model: Model<T>,
    // eslint-disable-next-line @typescript-eslint/no-parameter-properties
    protected readonly _mapper: OrmMapper<TE, T>,
    // eslint-disable-next-line no-empty-function
  ) {
  }

  /**
   * Create mongodb query object
   * @param query
   * @protected
   */
  protected abstract prepareFilter(query?: IQueryParams<TF>): FilterQuery<T>;

  public async findByIds(ids: string[], options?: TQO): Promise<TE[]> {
    const models = await this._model.find(
      {
        _id: {
          $in: ids.map((id) => new Types.ObjectId(id)),
        },
      }
      , null,
      {
        ...(options ? {
          new: true,
          ...options,
        } : {
          new: true,
        }),
      },
    );
    return models.map((model) => this._mapper.toDomainEntity(model.toObject()));
  }

  public async findOne(filter?: IQueryParams<TF>, options?: QueryOptions): Promise<TE | null> {
    const preparedFilter = this.prepareFilter(filter);
    const model = await this._model
      .findOne(preparedFilter, null, {
        ...(options ? {
          new: true,
          ...options,
        } : {
          new: true,
        }),
      });
    return model && this._mapper.toDomainEntity(model.toObject());
  }

  public async findOneOrThrow(
    filter: IQueryParams<TF>,
    options?: QueryOptions,
  ): Promise<TE> {
    const preparedFilter = this.prepareFilter(filter);
    const model = await this._model
      .findOne(preparedFilter, null, {
        ...(options ? {
          new: true,
          ...options,
        } : {
          new: true,
        }),
      });
    if (!model) {
      throw new NotFoundException('Model not found');
    }
    return this._mapper.toDomainEntity(model.toObject());
  }

  public async findOneByIdOrThrow(id: string, options?: QueryOptions): Promise<TE> {
    const model = await this._model.findById(new Types.ObjectId(id), null, {
      ...(options ? {
        new: true,
        ...options,
      } : {
        new: true,
      }),
    });
    if (!model) {
      throw new NotFoundException('Model not found');
    }
    return this._mapper.toDomainEntity(model.toObject());
  }

  public async findMany(
    filter: IQueryParams<TF>,
    options?: QueryOptions,
  ): Promise<TE[]> {
    const preparedFilter = this.prepareFilter(filter);
    const models = await this._model.find(preparedFilter, null, {
      ...(options ? {
        new: true,
        ...options,
      } : {
        new: true,
      }),
    });
    return models.map((model) => this._mapper.toDomainEntity(model.toObject()));
  }

  public async deleteById(id: string): Promise<TE | null> {
    const model = await this._model.findByIdAndDelete({
      _id: new Types.ObjectId(id),
    });
    return model && this._mapper.toDomainEntity(model.toObject());
  }

  public async deleteByIdOrThrow(id: string): Promise<TE> {
    const model = await this._model.findByIdAndDelete({
      _id: id,
    });
    if (!model) {
      throw new NotFoundException('Model not found');
    }
    return this._mapper.toDomainEntity(model.toObject());
  }

  public async softDeleteById(id: string): Promise<TE | null> {
    const model = await this._model.findByIdAndUpdate({
      _id: new Types.ObjectId(id),
    }, {
      isDeleted: true,
      is_deleted: true,
      deletedAt: new Date(),
      deleted_at: new Date(),
    }, {
      new: true,
    });
    return model && this._mapper.toDomainEntity(model.toObject());
  }

  public async softDeleteByIdOrThrow(id: string): Promise<TE> {
    const model = await this._model.findByIdAndUpdate({
      _id: id,
    }, {
      is_deleted: true,
      updated_at: new Date(),
    }, {
      new: true,
    });
    if (!model) {
      throw new NotFoundException('Model not found');
    }
    return this._mapper.toDomainEntity(model.toObject());
  }

  public async findManyPaginated(
    options: IFindManyPaginatedParams<IQueryParams<TF>, TQO>,
  ): Promise<IDataWithPaginationMeta<TE[]>> {
    const pageOptions = {
      page: options.pagination?.page || 1,
      limit: options.pagination?.size || 10,
    };

    const prepFilter = this.prepareFilter(options?.pagination?.filter);
    const query = this._model.find(prepFilter, null, options?.opts);

    if (options?.pagination?.sortBy) {
      const sorted = {};
      options?.pagination?.sortBy.map((s) => Object.assign(sorted, {
        [s[0]]: s[1],
      }));
      query.sort(sorted);
    }

    query
      .skip((pageOptions.page - 1) * pageOptions.limit)
      .limit(pageOptions.limit);

    const models = await query.exec();
    const count = await this._model.count(prepFilter);

    let totalPages = count / pageOptions.limit;
    if (count % pageOptions.limit) {
      totalPages = Math.ceil(totalPages);
    }
    return {
      data: models.map((model) => this._mapper.toDomainEntity(model.toObject())),
      pagination: {
        itemsPerPage: pageOptions.limit,
        totalItems: count,
        currentPage: pageOptions.page,
        totalPages,
      },
    };
  }

  public async save(props: TE, saveOptions?: SaveOptions): Promise<TE> {
    const ormEntity = this._mapper.toOrmEntity(props);
    const model = new this._model(ormEntity);
    await model.save(saveOptions);
    return this._mapper.toDomainEntity(model.toObject());
  }

  public async saveMultiple(props: TE[]): Promise<TE[]> {
    const ormModels = props.map((e) => new this._model(this._mapper.toOrmEntity(e)));
    const models = await this._model.create(
      ormModels,
    );
    return models.map((m) => this._mapper.toDomainEntity(m.toObject()));
  }

  public async updateById(id: string, props?: Partial<TE>, options?: TQO): Promise<TE | null> {
    const ormEntity = this._mapper.toOrmEntity(props as TE);
    const data = removeUndefinedProps(ormEntity);
    const model = await this._model.findByIdAndUpdate(new Types.ObjectId(id), {
      $set: {
        ...data,
      },
    }, {
      ...(options ? {
        new: true,
        ...options,
      } : {
        new: true,
      }),
    });
    return model && this._mapper.toDomainEntity(model.toObject());
  }

  public async updateByIdOrThrow(id: string, props?: Partial<TE>, options?: TQO): Promise<TE> {
    const ormEntity = this._mapper.toOrmEntity(props as TE);
    const data = removeUndefinedProps(ormEntity);
    const model = await this._model.findByIdAndUpdate(new Types.ObjectId(id), {
      $set: {
        ...data,
      },
    }, {
      ...(options ? {
        new: true,
        ...options,
      } : {
        new: true,
      }),
    });
    if (!model) {
      throw new NotFoundException('Model not found');
    }
    return this._mapper.toDomainEntity(model.toObject());
  }

  public async updateMany(props: TE, filter?: IQueryParams<TF>, opts?: TQO): Promise<TE[]> {
    const preparedFilter = this.prepareFilter(filter);
    const ormEntity = this._mapper.toOrmEntity(props as TE);
    const data = removeUndefinedProps(ormEntity);
    await this._model.updateMany(preparedFilter, {
      $set: {
        ...data,
      },
    }, opts);
    const models = await this._model.find(preparedFilter, null, opts);
    return models.map((m) => this._mapper.toDomainEntity(m));
  }

  public async updateOne(props: TE, filter?: IQueryParams<TF>, options?: TQO): Promise<TE | null> {
    const ormEntity = this._mapper.toOrmEntity(props as TE);
    const data = removeUndefinedProps(ormEntity);
    const preparedFilter = this.prepareFilter(filter);
    const model = await this._model.findOneAndUpdate(preparedFilter, {
      $set: {
        ...data,
      },
    }, {
      ...(options ? {
        new: true,
        ...options,
      } : {
        new: true,
      }),
    });
    return model && this._mapper.toDomainEntity(model.toObject());
  }

  public async updateOneOrThrow(props: TE, filter?: IQueryParams<TF>, options?: TQO): Promise<TE> {
    const preparedFilter = this.prepareFilter(filter);
    const ormEntity = this._mapper.toOrmEntity(props as TE);
    const data = removeUndefinedProps(ormEntity);
    const model = await this._model.findOneAndUpdate(preparedFilter, {
      $set: {
        ...data,
      },
    }, {
      ...(options ? {
        new: true,
        ...options,
      } : {
        new: true,
      }),
    });
    if (!model) {
      throw new NotFoundException('Model not found');
    }
    return this._mapper.toDomainEntity(model.toObject());
  }

}
