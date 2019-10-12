import { EventStart, EventEnd } from './event';
import { Subject, Observable } from 'rxjs';
import { moveEvent, createEvent } from 'event';
import { tap } from 'rxjs/operators';
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

export class CanvasSetting implements ElementOption {
  canMove = true;
  canResize = true;
  hasBorder = true;
}

// export function createOperation(
//   evenType: (eventType: typeof EventType) => EventType,
//   handler?: (pre: Event, now: Event) => void
// ) {}

// const mouseDown = createOperation(et => et.MouseDown, (pre, now) => {});

// createOperation(et => et.MouseMove);

function getWidgets(pos: Pos) {}

let t: any;

moveEvent.subscribe(([prev, now]) => {
  if (prev === EventStart) {
    t = getWidgets(<Pos>now);
    return;
  }
  if (now === EventEnd) {
    t = [];
    return;
  }
  t.forEach((x: any) => {
    x.x += now.x - prev.x;
    x.y += now.y - prev.y;
  });
});

export function createOperation<T>(
  event: Observable<T>,
  process: (data: T, store: Map<string, any>) => void
) {
  const store = new Map<string, any>();
  return event.pipe(tap(data => process(data, store)));
}

export const moveOperation = createOperation(
  moveEvent,
  ([prev, now], store) => {
    if (prev === EventStart) {
      store.set('', getWidgets(<Pos>now));
      return;
    }
    if (now === EventEnd) {
      store.set('', []);
      return;
    }
    store.get('').forEach((x: any) => {
      x.x += now.x - prev.x;
      x.y += now.y - prev.y;
    });
  }
);
