enum ActionPressedMove {
    PressDown,
    Move,
    PressUp,
}

const move = {
    start: ['pressDown', 'hasTarget', 'targetItem'],
    going: ['pressedMove'],
    end: ['pressUp'],
}

const select = {
    start: ['pressDown', 'withoutTarget'],
    going: ['pressedMove'],
    end: ['pressUp'],
}

const resize = {
    start: ['pressDown', 'hasTarget', 'targetBorder'],
    going: ['pressedMove'],
    end: ['pressUp'],
}

class MoveEvent {
    status = 'stop'
    test(e: string) {
        if (e === 'mousedown') {
            this.status = 'go'
        }
    }
}
/*
const move = flow(
    startWith([Event.MouseDown, Event.TouchStart]),
    fireWith([Event.MouseMove]),
    endWith([Event.MouseUp])
)
*/
