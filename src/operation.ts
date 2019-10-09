import { Subject } from 'rxjs';
// export function getTargetItem() {}

// export enum OrderType {
//   Top,
//   Up,
//   Down,
//   Bottom
// }

// export enum EventType {
//   MouseDown,
//   MouseUp,
//   MouseMove
// }

// export enum MouseState {
//   Pressed,
//   Moving
// }

// export function orderItem() {}

// export function invokeCommand() {}

// export function reverseCommand() {}

// export class CanvasSetting implements ElementOption {
//   canMove = true;
//   canResize = true;
//   hasBorder = true;
// }

// export function createOperation(
//   evenType: (eventType: typeof EventType) => EventType,
//   handler?: (pre: Event, now: Event) => void
// ) {}

// const mouseDown = createOperation(et => et.MouseDown, (pre, now) => {});

// createOperation(et => et.MouseMove);

function createEvent<T>(hs: EventHandler<T>) {
  const startSubject = new Subject<T>();
  const publishSubject = new Subject<{
    data: T;
    name?: string;
  }>();
  const endSubject = new Subject<T>();

  const start = (data: T) => startSubject.next(data);
  const publish = (data: T, name?: string) =>
    publishSubject.next({
      data,
      name
    });
  const end = (data: T) => endSubject.next(data);

  return (e: MouseEvent | TouchEvent) => hs(e, { start, publish, end });
}

function getSelected(pos: Pos) {}

const moveEvent = createEvent((e, { start, publish, end }) => {
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

const moving = moveEvent((initialState: Pos, store: Map<string, Pos>) => {
  store.set('initialState', initialState);
});

const onstop = moving((state: Pos, store: Map<string, Pos>) => {
  const initialState = store.get('initialState');
});

onstop(/*...*/);
