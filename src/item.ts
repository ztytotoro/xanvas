export interface Position {
    x: number;
    y: number;
}

export enum CanvasItemType {
    Rect = 'rect'
}

export interface CanvasItemOption {
    name: string;
    fill: string;
    position?: [number, number]
}

export abstract class CanvasItem {
    name!: string;
    position!: Position;
    anchor!: Position;
    type!: CanvasItemType;
    fill = 'black';

    constructor(options: CanvasItemOption) {
        this.name = options.name;
        this.fill = options.fill;
        if(options.position) {
            this.position = {
                x: options.position[0],
                y: options.position[1]
            }
        }
    }

    abstract draw(context: CanvasRenderingContext2D): void;
    abstract get width(): number;
    abstract get height(): number;
    abstract isHit(x: number, y: number): boolean;

    move(posX: number, posY: number) {
        this.position = {
            x: posX,
            y: posY
        }
    }
}