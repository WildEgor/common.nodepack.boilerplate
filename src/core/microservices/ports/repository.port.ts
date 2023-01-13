import { DeepPartial } from '../../typescript';

export type IQueryParams<TF> = DeepPartial<TF>;
export type Column<T> = Extract<keyof T, string>;
export type Order<T> = [Column<T>, 'ASC' | 'DESC'];
export type SortBy<T> = Order<T>[];

export interface IOrderBy {
  [key: number]: -1 | 1;
}

export interface IPagination<TF> {
  page: number;
  size: number;
  sortBy: [string, unknown][];
  searchBy: string[];
  search: string;
  filter: TF;
}

export interface IFindManyPaginatedParams<TF, TQO> {
  pagination: Partial<IPagination<TF>>;
  orderBy?: IOrderBy;
  sortBy?: [string, IOrderBy][];
  opts?: TQO;
}

export interface IDataWithPaginationMeta<TE> {
  data: TE;
  pagination: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
  };
}

export interface ISave<TE, TSO> {
  save(props: TE, opts?: TSO): Promise<TE>;
}

export interface ISaveMultiple<TE> {
  saveMultiple(props: TE[]): Promise<TE[]>;
}

export interface IUpdateMany<TE, TF, TQO> {
  updateMany(props: TE, filter?: IQueryParams<TF>, opts?: TQO): Promise<TE[]>;
}

export interface IUpdateOne<TE, TF, TQO> {
  updateOne(props: TE, filter?: IQueryParams<TF>, opts?: TQO): Promise<TE | null>;

  updateOneOrThrow(props: TE, filter?: IQueryParams<TF>, opts?: TQO): Promise<TE>;
}

export interface IUpdateById<TE, TQO> {
  updateById(id: unknown, props?: Partial<TE>, opts?: TQO): Promise<TE | null>;

  updateByIdOrThrow(id: unknown, props?: Partial<TE>, opts?: TQO): Promise<TE>;
}

export interface IFindByIds<TE, TQO> {
  findByIds(ids: unknown[], opts?: TQO): Promise<TE[]>;
}

export interface IFindOne<TE, TF, TQO> {
  findOne(filter?: IQueryParams<TF>, opts?: TQO): Promise<TE | null>;

  findOneOrThrow(filter?: IQueryParams<TF>, opts?: TQO): Promise<TE>;
}

export interface IFindOneById<TE, TQO> {
  findOneByIdOrThrow(id: unknown, opts?: TQO): Promise<TE>;
}

export interface IFindMany<TE, TF, TQO> {
  findMany(filter?: IQueryParams<TF>, opts?: TQO): Promise<TE[]>;
}

export interface IFindManyPaginated<TE, TF, TQO> {
  findManyPaginated(
    options: IFindManyPaginatedParams<IQueryParams<TF>, TQO>,
  ): Promise<IDataWithPaginationMeta<TE[]>>;
}

export interface IDeleteById<TE> {
  deleteById(id: unknown): Promise<TE | null>;

  deleteByIdOrThrow(id: unknown): Promise<TE>;
}

export interface ISoftDeleteById<TE> {
  softDeleteById(id: unknown): Promise<TE | null>;

  softDeleteByIdOrThrow(id: unknown): Promise<TE | null>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface IRepositoryPort<T, TE, TF, TSO, TQO>
  extends ISave<TE, TSO>,
  ISaveMultiple<TE>,
  IUpdateMany<TE, TF, TQO>,
  IUpdateOne<TE, TF, TQO>,
  IUpdateById<TE, TQO>,
  IFindOne<TE, TF, TQO>,
  IFindByIds<TE, TQO>,
  IFindOneById<TE, TQO>,
  IFindMany<TE, TF, TQO>,
  IFindManyPaginated<TE, TF, TQO>,
  IDeleteById<TE>,
  ISoftDeleteById<TE> {
}
