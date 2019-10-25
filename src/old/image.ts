import { CanvasItem, CanvasItemType, CanvasItemOption } from './item'
import { Subject, BehaviorSubject } from 'rxjs'
import { filter, first } from 'rxjs/operators'

interface CanvasImageOption extends CanvasItemOption {
    url: string
}

export enum RepeatType {
    Repeat = 'repeat',
    RepeatX = 'repeat-x',
    RepeatY = 'repeat-y',
    NoRepeat = 'no-repeat',
}

export class CanvasImage extends CanvasItem {
    type = CanvasItemType.Image
    width!: number
    height!: number
    url!: string
    image = new BehaviorSubject<HTMLImageElement | null>(null)

    constructor(options: CanvasImageOption) {
        super(options)

        this.width = options.width
        this.height = options.height
        this.url = options.url

        this.loadImageAsFill()
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.image
            .pipe(
                filter(x => x !== null),
                first()
            )
            .subscribe(img => {
                if (img !== null) {
                    ctx.drawImage(
                        img,
                        this.position.x,
                        this.position.y,
                        this.width,
                        this.height
                    )
                }
            })
    }

    loadImageAsFill() {
        const blueprint_background = new Image(this.width, this.height)
        blueprint_background.src = this.url
        blueprint_background.onload = () => {
            this.image.next(blueprint_background)
        }
    }
}
