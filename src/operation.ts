import { Subject } from 'rxjs';
import { moveEvent, createEvent } from 'event';
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

function getSelected(pos: Pos) {}

function createOperation<T extends ReturnType<typeof createEvent>>(
  event: T,
  handler: (event: T) => void
) {
  return;
}
const { onStart, onPublish, onEnd } = moveEvent();
