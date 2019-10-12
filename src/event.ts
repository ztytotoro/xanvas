import {
  filter,
  switchMap,
  takeUntil,
  pairwise,
  map,
  startWith,
  endWith
} from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { timeStamp } from 'utils';

export const EventStart = Symbol('start');
export const EventEnd = Symbol('end');

export function createEvent<T = Event>(
  start: EventPredicate,
  on: EventPredicate,
  end: EventPredicate,
  mapper?: EventMapper<Event, T>
) {
  const startEvent = new Subject<Event>().pipe(filter(start));
  const onEvent = new Subject<Event>().pipe(filter(on));
  const endEvent = new Subject<Event>().pipe(filter(end));
  return startEvent.pipe(
    switchMap(_ =>
      onEvent.pipe(
        takeUntil(endEvent),
        map(source => (mapper ? mapper(source) : source)),
        startWith(EventStart),
        endWith(EventEnd)
      )
    ),
    pairwise(),
    filter(x => x !== [EventStart, EventEnd])
  ) as Observable<[typeof EventStart, T] | [T, typeof EventEnd]>;
}

export const moveEvent = createEvent<Pos>(
  e => e.type === 'mousedown' || e.type === 'touchstart',
  e => e.type === 'mousemove' || e.type === 'touchmove',
  e => e.type === 'mouseup' || e.type === 'touchend',
  source => {
    return {
      x: (source as MouseEvent).offsetX,
      y: (source as MouseEvent).offsetY
    };
  }
);
