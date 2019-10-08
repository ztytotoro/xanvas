import immer from 'immer';
import { CanvasSetting } from './operation';

export function createElement(name: string, draw: ElementDrawer) {
  return {
    name,
    draw,
    instance: (
      state: ElementState,
      produce: (option: ElementOption) => void = () => {}
    ) => {
      function updateState(
        this: ElementData,
        p: (state: ElementState) => void
      ) {
        immer(this.state, p);
      }
      const options = new CanvasSetting();
      produce(options);
      const result = {
        name,
        state,
        options
      } as ElementData;
      updateState.bind(result);
      return result;
    }
  };
}

export const ImageItem = createElement('image', (ctx, option) => {
  ctx.drawImage(
    <HTMLImageElement>option.fill,
    option.x,
    option.y,
    option.width,
    option.height
  );
});

export const RectItem = createElement('rect', (ctx, option) => {
  ctx.fillStyle = option.fill as string;
  ctx.fillRect(option.x, option.y, option.width, option.height);
});
