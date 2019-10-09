import { Subject } from 'rxjs';
export declare class CanvasCore implements IDisposable {
    private readonly canvas;
    private readonly ctx;
    doRender: Subject<unknown>;
    canvasItems: {
        [key: string]: Element;
    };
    items: ElementData[];
    disposeFn: Function[];
    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D);
    addItem(item: ElementData): void;
    register(citems: Element[]): void;
    render(): void;
    dispose(): void;
}
export declare function initCanvasContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D | null;
export declare function initCanvas(container: HTMLDivElement, { height, width }: {
    height: number;
    width: number;
}): CanvasCore | null;
