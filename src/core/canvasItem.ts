import {
  CanvasItemOptions,
  CanvasItemSettings,
  CanvasItemRender,
  CanvasItemInstance
} from './types';
import immer from 'immer';
import { CanvasSetting } from './operation';

export function createCanvasItem(name: string, draw: CanvasItemRender) {
  return {
    name,
    draw,
    instance: (
      state: CanvasItemOptions,
      produce: (option: CanvasItemSettings) => void = () => {}
    ) => {
      function updateState(
        this: CanvasItemInstance,
        p: (state: CanvasItemOptions) => void
      ) {
        immer(this.state, p);
      }
      const options = new CanvasSetting();
      produce(options);
      const result = {
        name,
        state,
        options
      } as CanvasItemInstance;
      updateState.bind(result);
      return result;
    }
  };
}
