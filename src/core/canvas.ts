import { CanvasItemInstance, CanvasItem } from './types';
import { Subject } from 'rxjs';

export class CanvasCore {
  doRender = new Subject();
  canvasItems: {
    [key: string]: CanvasItem;
  } = {};
  items: CanvasItemInstance[] = [];

  constructor(private readonly ctx: CanvasRenderingContext2D) {
    this.doRender.subscribe(() => this.render());
  }

  addItem(item: CanvasItemInstance) {
    this.items.push(item);
    this.render();
  }

  register(citems: CanvasItem[]) {
    citems.forEach(item => (this.canvasItems[item.name] = item));
  }

  render() {
    this.items.forEach(item => {
      this.canvasItems[item.name].draw(this.ctx, item.state);
    });
  }
}
