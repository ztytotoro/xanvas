import { Subject, fromEvent, forkJoin, merge } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { dragable } from 'operation';

export class CanvasCore implements IDisposable {
  doRender = new Subject();
  elementDefs: {
    [key: string]: Element;
  } = {};
  elements: ElementData[] = [];
  disposeFn: Function[] = [];
  event = new Subject<CanvasEvent>();

  constructor(private readonly ctx: CanvasRenderingContext2D) {
    // this.doRender.subscribe(() => this.render());
    const id = setInterval(() => this.render(), 8.33333);
    this.disposeFn.push(() => clearInterval(id));
    this.addEventListener();
  }

  addItem(item: ElementData) {
    this.elements.push(item);
  }

  register(citems: Element[]) {
    citems.forEach(item => (this.elementDefs[item.name] = item));
  }

  render() {
    this.clear();
    this.ctx.save();
    this.elements.forEach(item => {
      this.ctx.restore();
      this.elementDefs[item.name].draw(this.ctx, item.state);
    });
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  dispose() {
    this.disposeFn.forEach(fn => fn());
  }

  addEventListener() {
    const mousedown$ = fromEvent(window, 'mousedown');
    const mousemove$ = fromEvent(window, 'mousemove');
    const mouseup$ = fromEvent(window, 'mouseup');
    merge(mousedown$, mousemove$, mouseup$).pipe(
      map(e => {
        return {
          type: e.type,
          pos: {
            x: (<MouseEvent>e).offsetX - this.ctx.canvas.offsetLeft,
            y: (<MouseEvent>e).offsetY - this.ctx.canvas.offsetTop
          }
        } as CanvasEvent;
      })
    ).subscribe(this.event);
  }
}

export function initCanvasContext(canvas: HTMLCanvasElement) {
  return canvas.getContext?.('2d');
}

export function initCanvas(
  container: HTMLDivElement,
  { height, width }: { height: number; width: number; }
) {
  container.style.height = height + 'px';
  container.style.width = width + 'px';
  const canvas = document.createElement('canvas');
  canvas.height = height ?? canvas.height;

  height ?? (canvas.height = height);
  canvas.width = width ?? canvas.width;

  container.appendChild(canvas);
  const ctx = initCanvasContext(canvas);

  if (ctx) {
    const instance = new CanvasCore(ctx);
    dragable(instance);
    return instance;
  }
  return null;
}
