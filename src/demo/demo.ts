import { createElement, RectItem } from '../element'

const ImageItem = createElement('image', (ctx, option) => {
    ctx.fillStyle = option.fill as string
    ctx.rect(10, 10, 10, 10)
})

const instance = RectItem.instance(
    {
        height: 100,
        width: 100,
        x: 10,
        y: 10,
        fill: 'black',
    },
    option => {
        option.canMove
    }
)
