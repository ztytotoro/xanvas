import { CanvasCore } from './canvas'

export function createOperation(canvasCore: CanvasCore) {}

function findElement(pos: Pos, elements: ElementData[]) {
    for (const el of elements) {
        if (
            pos.x >= el.state.x &&
            pos.y >= el.state.y &&
            pos.x <= el.state.x + el.state.width &&
            pos.y <= el.state.y + el.state.height
        ) {
            return el
        }
    }
    return null
}

export function dragable(canvasCore: CanvasCore) {
    let el: ElementData | null = null
    let lastPos: Pos
    canvasCore.event.subscribe(e => {
        if (e.type === 'mousedown') {
            el = findElement(e.pos, canvasCore.elements)
            lastPos = e.pos
        }
        if (e.type === 'mousemove') {
            if (!el) return
            el.state.x += e.pos.x - lastPos.x
            el.state.y += e.pos.y - lastPos.y
            lastPos = e.pos
        }
        if (e.type === 'mouseup') {
            el = null
        }
    })
}
