export interface Brush {
  fill: string | CanvasGradient | CanvasPattern | HTMLImageElement;
}

export interface Pos {
  x: number;
  y: number;
}

export interface Szie {
  width: number;
  height: number;
}

export interface CanvasItemOptions extends Pos, Szie, Brush {}

export interface CanvasAction {
  canMove: boolean;
  canResize: boolean;
  hasBorder: boolean;
}

export interface CanvasItemSettings extends CanvasAction {}

export type CanvasItemSettingsProducer = (
  produce: (option: CanvasItemSettings) => void
) => void;

export type CanvasItemRender = (
  ctx: CanvasRenderingContext2D,
  option: CanvasItemOptions
) => void;

export interface CanvasItemInstance {
  name: string;
  draw: CanvasItemRender;
  state: CanvasItemOptions;
  produce: (option: CanvasItemSettings) => void;
}
