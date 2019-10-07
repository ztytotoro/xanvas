import { CanvasItemOptions } from './types';

export function makeFill(
  type: string | symbol,
  draw: (ctx: CanvasRenderingContext2D, option: CanvasItemOptions) => void
) {
  return {
    type,
    draw
  };
}

export const ImageFill = makeFill('image', (ctx, option) => {
  ctx.drawImage(
    <HTMLImageElement>option.fill,
    option.x,
    option.y,
    option.width,
    option.height
  );
});

export const RectFill = makeFill('rect', (ctx, option) => {
  ctx.fillStyle = option.fill as string;
  ctx.fillRect(option.x, option.y, option.width, option.height);
});
