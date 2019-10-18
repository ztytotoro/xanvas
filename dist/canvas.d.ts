import { Subject } from 'rxjs';
export declare class CanvasCore implements IDisposable {
    private readonly ctx;
    doRender: Subject<unknown>;
    elementDefs: {
        [key: string]: Element;
    };
    elements: ElementData[];
    disposeFn: Function[];
    event: Subject<CanvasEvent>;
    constructor(ctx: CanvasRenderingContext2D);
    addItem(item: ElementData): void;
    register(citems: Element[]): void;
    render(): void;
    clear(): void;
    dispose(): void;
    addEventListener(): void;
}
export declare function initCanvasContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D | null;
export declare function initCanvas(container: HTMLDivElement, { height, width }: {
    height: number;
    width: number;
}): CanvasCore | null;
