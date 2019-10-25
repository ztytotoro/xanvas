export class CanvasSetting implements ElementOption {
    canMove = true
    canResize = true
    hasBorder = true
}

export function createElement(name: string, draw: ElementDrawer) {
    return {
        name,
        draw,
        instance: (
            state: ElementState,
            produce: (option: ElementOption) => void = () => {}
        ) => {
            const options = new CanvasSetting()
            produce(options)
            return {
                name,
                state,
                options,
            } as ElementData
        },
    }
}

class Element {
    constructor(public name: string, public draw: ElementDrawer) {}

    option(state: ElementState) {
        return {
            type: this.name,
            state,
        }
    }
}

export const ImageItem = createElement('image', (ctx, option) => {
    ctx.drawImage(
        option.fill as HTMLImageElement,
        option.x,
        option.y,
        option.width,
        option.height
    )
})

export const RectItem = createElement('rect', (ctx, option) => {
    ctx.fillStyle = option.fill as string
    ctx.fillRect(option.x, option.y, option.width, option.height)
})
