export function getTargetItem() {}

export function moveEvent(items: ElementData) {
  items.state;
}

export enum OrderType {
  Top,
  Up,
  Down,
  Bottom
}

export enum EventType {
  MouseDown,
  MouseUp,
  MouseMove
}

export function orderItem() {}

export function invokeCommand() {}

export function reverseCommand() {}

export class CanvasSetting implements ElementOption {
  canMove = true;
  canResize = true;
  hasBorder = true;
}

export function createOperation(
  name: string,
  evenType: (eventType: typeof EventType) => EventType
) {}

createOperation('123', et => et.MouseDown);
