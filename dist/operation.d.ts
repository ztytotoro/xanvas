export declare function getTargetItem(): void;
export declare function moveEvent(items: ElementData): void;
export declare enum OrderType {
    Top = 0,
    Up = 1,
    Down = 2,
    Bottom = 3
}
export declare enum EventType {
    MouseDown = 0,
    MouseUp = 1,
    MouseMove = 2
}
export declare function orderItem(): void;
export declare function invokeCommand(): void;
export declare function reverseCommand(): void;
export declare class CanvasSetting implements ElementOption {
    canMove: boolean;
    canResize: boolean;
    hasBorder: boolean;
}
export declare function createOperation(name: string, evenType: (eventType: typeof EventType) => EventType): void;
