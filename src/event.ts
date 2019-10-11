import { filter, switchMap, takeUntil, pairwise, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

export function createEvent<T>(start: EventPredicate, on: EventPredicate, end: EventPredicate, mapper: EventMapper<Event, T>) {
  const startEvent = new Subject<Event>().pipe(
    filter(start)
  );
  const onEvent = new Subject<Event>().pipe(
    filter(on)
  );
  const endEvent = new Subject<Event>().pipe(
    filter(end)
  );
  return startEvent.pipe(
    switchMap(() => onEvent),
    takeUntil(endEvent),
    pairwise(),
    map(([prev, now]) => mapper(prev, now))
  );
}

export const moveEvent = createEvent<Pos>(
  e => e.type === 'mousedown' || e.type === 'touchstart',
  e => e.type === 'mousemove' || e.type === 'touchmove',
  e => e.type === 'mouseup' || e.type === 'touchend',
  (prev, now) => {
    return {
      x: (now as MouseEvent).offsetX - (prev as MouseEvent).offsetX,
      y: (now as MouseEvent).offsetY - (prev as MouseEvent).offsetY
    };
  }
);

