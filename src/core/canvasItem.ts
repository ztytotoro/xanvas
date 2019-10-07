import { CanvasElement, CanvasOptionProducer } from './types';

export class CanvasItem {
  constructor(
    // private doRender: Subject<unknown>,
    public state: CanvasElement
  ) {}

  update(produce: (state: CanvasElement) => CanvasElement) {
    const oldState = this.state;
    this.state = produce({ ...this.state });
    return oldState;
  }

  setOption(setOption: CanvasOptionProducer) {
    setOption(option => {
      option.canMove = true;
      option.canResize = true;
      option.hasBorder = true;
    });
  }

  render(ctx: CanvasRenderingContext2D) {}
}

export function canvasItemFactory(type: string) {
  return (state: CanvasElement) => {
    return {
      type,
      state
    };
  };
}
