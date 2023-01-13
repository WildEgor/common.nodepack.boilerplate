export type QueryProps<T> = Partial<T>;

export abstract class Query {

  // eslint-disable-next-line no-empty-function,@typescript-eslint/no-empty-function
  protected constructor(_props?: QueryProps<unknown>) {}

}
