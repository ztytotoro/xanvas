import { CanvasItem, setOption, CanvasSetting } from './index';

const item1Option = new CanvasSetting();
const item1 = new CanvasItem(setOption(item1Option), {
  x: 0,
  y: 0,
  height: 20,
  width: 20,
  fill: 'black'
});
