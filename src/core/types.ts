export interface Brush {
  fill: string | CanvasGradient | CanvasPattern;
}

export interface Pos {
  x: number;
  y: number;
}

export interface Szie {
  width: number;
  height: number;
}

export interface CanvasElement extends Pos, Szie, Brush {}

export interface CanvasAction {
  canMove: boolean;
  canResize: boolean;
  hasBorder: boolean;
}

export interface CanvasOption extends CanvasAction {}

export type CanvasOptionProducer = (
  produce: (option: CanvasOption) => void
) => void;
