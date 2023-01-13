import { Event } from './event.base';

/**
 * Event case (CQRS)
 */
export abstract class EventCaseBase<T extends Event> {

  abstract handle(data: T): void;

  execute(data: T): void {
    return this.handle(data);
  }

}
