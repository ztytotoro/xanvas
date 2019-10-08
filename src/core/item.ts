import { createCanvasItem } from './canvasItem';

export const ImageItem = createCanvasItem('image', (ctx, option) => {
  ctx.drawImage(
    <HTMLImageElement>option.fill,
    option.x,
    option.y,
    option.width,
    option.height
  );
});

export const RectItem = createCanvasItem('rect', (ctx, option) => {
  ctx.fillStyle = option.fill as string;
  ctx.fillRect(option.x, option.y, option.width, option.height);
});
