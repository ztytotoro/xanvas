import { Subject, Subscription } from 'rxjs';

export function createEvent<T>(hs: EventHandler<T>) {
  return () => {
    const startSubject = new Subject<T>();
    const publishSubject = new Subject<{
      data: T;
      name?: string;
    }>();
    const endSubject = new Subject<T>();

    const subFn: Subscription[] = [];

    const start = (data: T) => startSubject.next(data);
    const onStart = (cb: (data: T) => void) =>
      subFn.push(startSubject.subscribe(data => cb(data)));

    const publish = (data: T, name?: string) =>
      publishSubject.next({
        data,
        name
      });
    const onPublish = (cb: (data: T, name?: string) => void) =>
      subFn.push(publishSubject.subscribe(({ data, name }) => cb(data, name)));

    const end = (data: T) => endSubject.next(data);
    const onEnd = (cb: (data: T) => void) =>
      subFn.push(endSubject.subscribe(data => cb(data)));

    const dispose = () => {
      subFn.forEach(sub => sub.unsubscribe());
    };

    return {
      subscriber: (e: MouseEvent | TouchEvent) =>
        hs(e, { start, publish, end }),
      onStart,
      onPublish,
      onEnd,
      dispose
    };
  };
}

export const moveEvent = createEvent((e, { start, publish, end }) => {
  if (e.type === 'mousedown' || e.type === 'touchstart') {
    start(e);
  }
  if (e.type === 'mousemove' || e.type === 'touchmove') {
    publish(e);
  }
  if (e.type === 'mouseup' || e.type === 'touchend') {
    end(e);
  }
});
