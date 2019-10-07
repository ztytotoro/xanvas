import { createCanvasItem } from './canvasItem';

const ImageItem = createCanvasItem('image', (ctx, option) => {
  ctx.fillStyle = option.fill as string;
  ctx.rect(10, 10, 10, 10);
});

const instance = ImageItem(
  {
    height: 100,
    width: 100,
    x: 10,
    y: 10,
    fill: 'black'
  },
  option => {
    option.canMove;
  }
);
