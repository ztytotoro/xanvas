import { CanvasOption, CanvasOptionProducer } from './types';

export function getTargetItem() {}

export function moveItem() {}

enum OrderType {
  Top,
  Up,
  Down,
  Bottom
}

export function orderItem() {}

export function invokeCommand() {}

export function reverseCommand() {}

export class CanvasSetting implements CanvasOption {
  canMove = true;
  canResize = true;
  hasBorder = true;
}
