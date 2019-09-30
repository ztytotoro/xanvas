import { CanvasElement, CanvasOption, CanvasOptionProducer } from './types';
import { Subject } from 'rxjs';

export class CanvasCore {
  doRender = new Subject();
  items: any[] = [];

  constructor() {
    this.doRender.subscribe(() => this.render());
  }

  addItem(item: any) {
    this.items.push(new item(this.doRender));
  }

  render() {}
}

export class CanvasItem {
  state: CanvasElement;
  constructor(
    // private doRender: Subject<unknown>,
    setOption: CanvasOptionProducer,
    state: CanvasElement
  ) {
    setOption(option => {
      option.canMove = true;
      option.canResize = true;
      option.hasBorder = true;
    });
    this.state = state;
  }

  update(produce: (state: CanvasElement) => CanvasElement) {
    const oldState = this.state;
    this.state = produce(this.state);
    return oldState;
  }
}

export function getTargetItem(x: number, y: number, items: any[]) {}

export function moveItem(dx: number, dy: number, item: any) {}

enum OrderType {
  Top,
  Up,
  Down,
  Bottom
}

export function orderItem(
  type: OrderType,
  currentIndex: number,
  items: any[]
) {}

export function invokeCommand(item: any, command: any) {}

export function reverseCommand(command: any) {}

export function setOption(option: CanvasOption): CanvasOptionProducer {
  return produce => {
    produce(option);
    return option;
  };
}

export class CanvasSetting implements CanvasOption {
  canMove = true;
  canResize = true;
  hasBorder = true;
}
