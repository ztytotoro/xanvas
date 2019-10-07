import { CanvasItemInstance } from './types';
import { Subject } from 'rxjs';

export class CanvasCore {
  doRender = new Subject();
  items: CanvasItemInstance[] = [];

  constructor(private readonly ctx: CanvasRenderingContext2D) {
    this.doRender.subscribe(() => this.render());
  }

  addItem(item: CanvasItemInstance) {
    this.items.push(item);
  }

  render() {
    this.items.forEach(item => {
      item.draw(this.ctx, item.state);
    });
  }
}
