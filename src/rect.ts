import { CanvasItem, CanvasItemType, CanvasItemOption } from './item';

interface CanvasRectOption extends CanvasItemOption {
    width: number;
    height: number;
}

export class CanvasRect extends CanvasItem {
    type = CanvasItemType.Rect
    width!: number;
    height!: number;

    constructor(options: CanvasRectOption) {
        super(options);

        this.width = options.width;
        this.height = options.height;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.fill;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    isHit(x: number, y: number) {
        return x >= this.position.x && x <= this.position.x + this.width && y >= this.position.y && y <= this.position.y + this.height
    }
}