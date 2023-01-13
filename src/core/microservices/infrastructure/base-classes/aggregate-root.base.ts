export abstract class AggregateRoot<T> {

  public props: T;

  protected constructor(props: T) {
    this.props = props;
  }

  public getDomainPropsCopy(): T {
    const copy = Object.freeze(this);
    return copy.props;
  }

  public static getDomainPropsCopy<T extends AggregateRoot<T>>(
    aggregateRoot: T,
  ): T {
    const copy = Object.freeze(aggregateRoot);
    return copy.props;
  }

}
