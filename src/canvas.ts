import { Subject } from 'rxjs';

export class CanvasCore {
  doRender = new Subject();
  canvasItems: {
    [key: string]: Element;
  } = {};
  items: ElementData[] = [];

  constructor(private readonly ctx: CanvasRenderingContext2D) {
    this.doRender.subscribe(() => this.render());
  }

  addItem(item: ElementData) {
    this.items.push(item);
    this.render();
  }

  register(citems: Element[]) {
    citems.forEach(item => (this.canvasItems[item.name] = item));
  }

  render() {
    this.items.forEach(item => {
      this.canvasItems[item.name].draw(this.ctx, item.state);
    });
  }
}

export function initCanvasContext(canvas: HTMLCanvasElement) {
  if (canvas.getContext) {
    return canvas.getContext('2d');
  } else {
    return null;
  }
}

export function initCanvas(
  container: HTMLDivElement,
  { height, width }: { height: number; width: number }
) {
  container.style.height = height + 'px';
  container.style.width = width + 'px';
  const canvas = document.createElement('canvas');
  if (height) {
    canvas.height = height;
  }
  if (width) {
    canvas.width = width;
  }
  container.appendChild(canvas);
  const ctx = initCanvasContext(canvas);
  if (ctx) {
    return new CanvasCore(ctx);
  }
  return null;
}
