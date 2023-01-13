export const BrokerDecoratorToken = '__BROKER_TOPIC_METADATA__';

/**
 * Add topic name to method
 * @param topic
 * @constructor
 */
// eslint-disable-next-line func-style
export function BrokerTopic(topic: string): unknown {
  return (
    _target: unknown,
    _key: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    Reflect.defineMetadata(BrokerDecoratorToken, topic, descriptor.value);
    return descriptor;
  };
}
