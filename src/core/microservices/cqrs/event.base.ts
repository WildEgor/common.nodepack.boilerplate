export type EventProps<T> = Partial<T>;

export abstract class Event {

  // eslint-disable-next-line no-empty-function,@typescript-eslint/no-empty-function
  protected constructor(_props?: EventProps<unknown>) {}

}
