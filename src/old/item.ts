export interface Coordinate {
    x: number
    y: number
}

export enum CanvasItemType {
    Rect = 'rect',
    Image = 'image',
}

export enum Position {
    Left = 'left',
    Right = 'right',
    Top = 'top',
    Bottom = 'bottom',
    LeftTop = 'leftTop',
    LeftBottom = 'leftBottom',
    RightTop = 'rightTop',
    RightBottom = 'rightBottom',
    None = 'None',
}

export interface CanvasItemOption {
    name: string
    fill: string
    position?: [number, number]
    width: number
    height: number
}

const RADIUS = 5

export abstract class CanvasItem {
    name!: string
    position!: Coordinate
    anchor!: Coordinate
    type!: CanvasItemType
    fill = 'black'
    resizeType = Position.None
    resizePrefix = {
        x: 0,
        y: 0,
    }

    constructor(options: CanvasItemOption) {
        this.name = options.name
        this.fill = options.fill
        if (options.position) {
            this.position = {
                x: options.position[0],
                y: options.position[1],
            }
        }
    }

    abstract draw(context: CanvasRenderingContext2D): void
    abstract get width(): number
    abstract get height(): number

    abstract set width(newVal: number)
    abstract set height(newVal: number)

    isHit(x: number, y: number) {
        return (
            x > this.position.x + 2 &&
            x < this.position.x + this.width - 2 &&
            y > this.position.y + 2 &&
            y < this.position.y + this.height - 2
        )
    }

    move(posX: number, posY: number) {
        this.position = {
            x: posX,
            y: posY,
        }
    }

    isBorder(x: number, y: number) {
        return (
            this.isHitBottom(x, y) ||
            this.isHitLeft(x, y) ||
            this.isHitLeftBottom(x, y) ||
            this.isHitLeftTop(x, y) ||
            this.isHitRight(x, y) ||
            this.isHitRightBottom(x, y) ||
            this.isHitRightTop(x, y) ||
            this.isHitTop(x, y)
        )
    }

    getHitPos(x: number, y: number) {
        if (this.isHitBottom(x, y)) return Position.Bottom
        if (this.isHitLeft(x, y)) return Position.Left
        if (this.isHitLeftBottom(x, y)) return Position.LeftBottom
        if (this.isHitLeftTop(x, y)) return Position.LeftTop
        if (this.isHitRight(x, y)) return Position.Right
        if (this.isHitRightBottom(x, y)) return Position.RightBottom
        if (this.isHitRightTop(x, y)) return Position.RightTop
        if (this.isHitTop(x, y)) return Position.Top
        return Position.None
    }

    isHitLeftTop(x: number, y: number) {
        return (
            x >= this.position.x - RADIUS &&
            x <= this.position.x + RADIUS &&
            y >= this.position.y - RADIUS &&
            y <= this.position.y + RADIUS
        )
    }

    isHitRightTop(x: number, y: number) {
        return (
            x >= this.position.x + this.width - RADIUS &&
            x <= this.position.x + this.width + RADIUS &&
            y >= this.position.y - RADIUS &&
            y <= this.position.y + RADIUS
        )
    }

    isHitLeftBottom(x: number, y: number) {
        return (
            x >= this.position.x - RADIUS &&
            x <= this.position.x + RADIUS &&
            y >= this.position.y + this.height - RADIUS &&
            y <= this.position.y + this.height + RADIUS
        )
    }

    isHitRightBottom(x: number, y: number) {
        return (
            x >= this.position.x + this.width - RADIUS &&
            x <= this.position.x + this.width + RADIUS &&
            y >= this.position.y + this.height - RADIUS &&
            y <= this.position.y + this.height + RADIUS
        )
    }

    isHitLeft(x: number, y: number) {
        return (
            x >= this.position.x - RADIUS &&
            x <= this.position.x + RADIUS &&
            y > this.position.y + RADIUS &&
            y <= this.position.y + this.height - RADIUS
        )
    }

    isHitRight(x: number, y: number) {
        return (
            x >= this.position.x + this.width - RADIUS &&
            x <= this.position.x + this.width + RADIUS &&
            y > this.position.y + RADIUS &&
            y <= this.position.y + this.height - RADIUS
        )
    }

    isHitTop(x: number, y: number) {
        return (
            x > this.position.x + RADIUS &&
            x < this.position.x + this.width - RADIUS &&
            y >= this.position.y - RADIUS &&
            y <= this.position.y + RADIUS
        )
    }

    isHitBottom(x: number, y: number) {
        return (
            x > this.position.x + RADIUS &&
            x < this.position.x + this.width - RADIUS &&
            y >= this.position.y + this.height - RADIUS &&
            y <= this.position.y + this.height + RADIUS
        )
    }
}
