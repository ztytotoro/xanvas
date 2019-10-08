import {
  CanvasItemSettings,
  CanvasItemSettingsProducer,
  CanvasItemInstance
} from './types';

export function getTargetItem() {}

export function moveEvent(items: CanvasItemInstance) {
  items.state;
}

enum OrderType {
  Top,
  Up,
  Down,
  Bottom
}

export function orderItem() {}

export function invokeCommand() {}

export function reverseCommand() {}

export class CanvasSetting implements CanvasItemSettings {
  canMove = true;
  canResize = true;
  hasBorder = true;
}

export function createOperation(name: string) {}
