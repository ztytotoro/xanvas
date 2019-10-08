export declare function createElement(name: string, draw: ElementDrawer): {
    name: string;
    draw: ElementDrawer;
    instance: (state: ElementState, produce?: (option: ElementOption) => void) => ElementData;
};
export declare const ImageItem: {
    name: string;
    draw: ElementDrawer;
    instance: (state: ElementState, produce?: (option: ElementOption) => void) => ElementData;
};
export declare const RectItem: {
    name: string;
    draw: ElementDrawer;
    instance: (state: ElementState, produce?: (option: ElementOption) => void) => ElementData;
};
