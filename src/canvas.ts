import { CanvasItem } from "./item";
import { fromEvent } from 'rxjs';
import { auditTime, merge, tap, map } from 'rxjs/operators'

export class Zovas {
    private readonly canvas!: HTMLCanvasElement;
    private readonly context!: CanvasRenderingContext2D;
    private items: CanvasItem[] = [];
    private prefix = {
        x: 0,
        y: 0
    }
    private dragItem: CanvasItem | null = null;

    constructor(element: HTMLCanvasElement | string) {
        try {
            if (typeof element === 'string') {
                element = document.getElementById(element) as HTMLCanvasElement;
            }
            this.canvas = element;
            const ctx = element.getContext('2d');

            if (ctx === null) {
                throw new Error('context is error');
            }
            else {
                this.context = ctx;
            }

            this.prefix.x = this.canvas.clientLeft;
            this.prefix.y = this.canvas.clientTop;

            const mouseDown = fromEvent(document, 'mousedown');
            const mouseUp = fromEvent(document, 'mouseup');
            const mouseMove = fromEvent(document, 'mousemove');
            mouseDown.pipe(
                merge(mouseUp),
                merge(mouseMove),
                auditTime(8.333),
                map((e: Event) => {
                    return e as MouseEvent
                }),
                tap(this.handleEvent.bind(this))
            ).subscribe(_ => {
                this.render();
            })

        } catch (error) {
            console.log(`Init failed: ${error}`);
        }
    }

    get height() {
        return this.canvas.clientHeight;
    }

    get width() {
        return this.canvas.clientWidth;
    }

    add(item: CanvasItem, x: number = (this.width - item.width) / 2, y: number = (this.height - item.height) / 2) {
        item.move(x, y);
        this.items.push(item);
    }

    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    render() {
        this.clear();
        for (const item of this.items) {
            item.draw(this.context);
        }
    }

    isInCanvas(x: number, y: number) {
        [x, y] = this.getPos(x, y);
        return x >= 0
            && y >= 0
            && x <= this.width
            && y <= this.height
    }

    getPos(x: number, y: number) {
        return [x - this.canvas.offsetLeft - this.prefix.x, y - this.canvas.offsetTop - this.prefix.y]
    }

    handleEvent(e: MouseEvent) {
        if (e.target === this.canvas && this.isInCanvas(e.clientX, e.clientY)) {
            const [x, y] = this.getPos(e.clientX, e.clientY);
            if(e.type === 'mousedown') {
                const target = this.items.filter(item => item.isHit(x, y))[0];
                if(target) {
                    target.anchor = {
                        x: x - target.position.x,
                        y: y - target.position.y
                    };
                    this.dragItem = target
                }
            }
            if(e.type === 'mouseup' && this.dragItem !== null) {
                this.dragItem = null;
            }
            if(e.type === 'mousemove' && this.dragItem) {
                this.dragItem.move(x - this.dragItem.anchor.x, y - this.dragItem.anchor.y);
                this.render();
            }
        }
    }
}