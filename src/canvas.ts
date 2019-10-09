import { Subject } from 'rxjs';

export class CanvasCore implements IDisposable {
  doRender = new Subject();
  canvasItems: {
    [key: string]: Element;
  } = {};
  items: ElementData[] = [];
  disposeFn: Function[] = []

  constructor(private readonly canvas: HTMLCanvasElement, private readonly ctx: CanvasRenderingContext2D) {
    // this.doRender.subscribe(() => this.render());
    const id = setInterval(() => this.render(), 8.33333);
    this.disposeFn.push(() => clearInterval(id))
  }

  addItem(item: ElementData) {
    this.items.push(item);
  }

  register(citems: Element[]) {
    citems.forEach(item => (this.canvasItems[item.name] = item));
  }

  render() {
    this.clear();
    this.ctx.save();
    this.items.forEach(item => {
      this.ctx.restore();
      this.canvasItems[item.name].draw(this.ctx, item.state);
    });
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  dispose() {
    this.disposeFn.forEach(fn => fn());
  }
}

export function initCanvasContext(canvas: HTMLCanvasElement) {
  return canvas.getContext?.('2d');
}

export function initCanvas(
  container: HTMLDivElement,
  { height, width }: { height: number; width: number }
) {
  container.style.height = height + 'px';
  container.style.width = width + 'px';
  const canvas = document.createElement('canvas');
  canvas.height = height ?? canvas.height;

  height ?? (canvas.height = height)
  canvas.width = width ?? canvas.width;

  container.appendChild(canvas);
  const ctx = initCanvasContext(canvas);

  return ctx ? new CanvasCore(canvas, ctx) : null;
}
