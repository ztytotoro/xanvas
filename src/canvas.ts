import { CanvasItem, Position } from "./item";
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
    private resizeItem: CanvasItem | null = null;

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
                map((e: Event) => {
                    return e as MouseEvent
                })
            )
                .subscribe(this.handleDrag.bind(this));

            mouseMove.pipe(
                merge(mouseMove),
                auditTime(8.333),
                map((e: Event) => {
                    return e as MouseEvent
                })
            ).subscribe(this.handleMove.bind(this))

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

    handleDrag(e: MouseEvent) {
        if (e.target === this.canvas /*&& this.isInCanvas(e.clientX, e.clientY)*/) {
            const [x, y] = this.getPos(e.clientX, e.clientY);
            if (e.type === 'mousedown') {
                const target = this.items.filter(item => item.isHit(x, y) || item.isBorder(x, y))[0];
                if (target) {
                    if (target.isBorder(x, y)) {
                        this.resizeItem = target;
                        this.resizeItem.resizeType = this.resizeItem.getHitPos(x, y);
                        const xa = this.resizeItem.position.x - x;
                        const ya = this.resizeItem.position.y - y;
                        const xb = this.resizeItem.position.x + this.resizeItem.width - x;
                        const yb = this.resizeItem.position.y + this.resizeItem.height - y;
                        this.resizeItem.resizePrefix.x = Math.abs(xa) < Math.abs(xb) ? xa : xb;
                        this.resizeItem.resizePrefix.y = Math.abs(ya) < Math.abs(yb) ? ya : yb;
                    }
                    else {
                        target.anchor = {
                            x: x - target.position.x,
                            y: y - target.position.y
                        };
                        this.dragItem = target
                    }
                }
            }
        }
        if (e.type === 'mouseup') {
            this.dragItem = null;
            if (this.resizeItem !== null) {
                this.resizeItem.resizeType = Position.None;
                this.resizeItem = null;
            }
        }
    }

    handleMove(e: MouseEvent) {
        if (e.type === 'mousemove') {
            //TODO 点下的时候瞬间误差会导致图形有微小的调整
            let [x, y] = this.getPos(e.clientX, e.clientY);

            if (this.dragItem !== null) {
                this.dragItem.move(inRange(x - this.dragItem.anchor.x, 0, this.width - this.dragItem.width), inRange(y - this.dragItem.anchor.y, 0, this.height - this.dragItem.height));
                this.render();
            }
            else if (this.resizeItem !== null) {
                let left = false;
                let right = false;
                let top = false;
                let bottom = false;

                switch (this.resizeItem.resizeType) {
                    case Position.Bottom: bottom = true; break;
                    case Position.Left: left = true; break;
                    case Position.LeftBottom: bottom = true; left = true; break;
                    case Position.LeftTop: top = true; left = true; break;
                    case Position.Right: right = true; break;
                    case Position.RightBottom: right = true; bottom = true; break;
                    case Position.RightTop: right = true; top = true; break;
                    case Position.Top: top = true; break;
                    default: break;
                }
                x = x + this.resizeItem.resizePrefix.x;
                y = y + this.resizeItem.resizePrefix.y;
                if (right) {
                    this.resizeItem.width = inRange(x - this.resizeItem.position.x, 2, this.width - this.resizeItem.position.x);
                }
                if (bottom) {
                    this.resizeItem.height = inRange(y - this.resizeItem.position.y, 2, this.height - this.resizeItem.position.y);
                }
                if (left) {
                    const diff = this.resizeItem.position.x - (Math.max(x, 0));
                    this.resizeItem.position.x -= diff;
                    this.resizeItem.width += diff;
                }
                if (top) {
                    const diff = this.resizeItem.position.y - (Math.max(y, 0));
                    this.resizeItem.position.y -= diff;
                    this.resizeItem.height += diff;
                }
                this.render();
            } else {
                const mouseover = this.items.filter(item => item.isBorder(x, y))[0];
                if (mouseover) {
                    switch (mouseover.getHitPos(x, y)) {
                        case Position.Bottom: this.canvas.style.cursor = 's-resize'; break;
                        case Position.Left: this.canvas.style.cursor = 'w-resize'; break;
                        case Position.LeftBottom: this.canvas.style.cursor = 'sw-resize'; break;
                        case Position.LeftTop: this.canvas.style.cursor = 'nw-resize'; break;
                        case Position.Right: this.canvas.style.cursor = 'e-resize'; break;
                        case Position.RightBottom: this.canvas.style.cursor = 'se-resize'; break;
                        case Position.RightTop: this.canvas.style.cursor = 'ne-resize'; break;
                        case Position.Top: this.canvas.style.cursor = 'n-resize'; break;
                        default: this.canvas.style.cursor = 'default'; break;
                    }
                } else {
                    this.canvas.style.cursor = 'default';
                }
            }
        }
    }
}

function inRange(x: number, min: number, max: number) {
    return x < min ? min : x > max ? max : x;
}