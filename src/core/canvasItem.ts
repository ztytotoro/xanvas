import {
  CanvasItemOptions,
  CanvasItemSettings,
  CanvasItemRender,
  CanvasItemInstance
} from './types';

export function createCanvasItem(name: string, draw: CanvasItemRender) {
  return (
    state: CanvasItemOptions,
    produce: (option: CanvasItemSettings) => void = () => {}
  ) =>
    ({
      name,
      draw,
      state,
      produce
    } as CanvasItemInstance);
}
