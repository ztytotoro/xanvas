import { CanvasOption, CanvasOptionProducer } from './types';
import { Subject } from 'rxjs';
import { CanvasItem } from './canvasItem';

export class CanvasCore {
  doRender = new Subject();
  items: CanvasItem[] = [];

  constructor() {
    this.doRender.subscribe(() => this.render());
  }

  addItem(item: CanvasItem) {
    this.items.push(item);
  }

  render() {}
}

export function setOption(option: CanvasOption): CanvasOptionProducer {
  return produce => {
    produce(option);
    return option;
  };
}
