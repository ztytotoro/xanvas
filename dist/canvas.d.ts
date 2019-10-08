import { Subject } from 'rxjs';
export declare class CanvasCore {
    private readonly ctx;
    doRender: Subject<unknown>;
    canvasItems: {
        [key: string]: Element;
    };
    items: ElementData[];
    constructor(ctx: CanvasRenderingContext2D);
    addItem(item: ElementData): void;
    register(citems: Element[]): void;
    render(): void;
}
export declare function initCanvasContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D | null;
export declare function initCanvas(container: HTMLDivElement, { height, width }: {
    height: number;
    width: number;
}): CanvasCore | null;
