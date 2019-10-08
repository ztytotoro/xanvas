interface Fill {
  fill: string | CanvasGradient | CanvasPattern | HTMLImageElement;
}

interface Pos {
  x: number;
  y: number;
}

interface Szie {
  width: number;
  height: number;
}

interface ElementState extends Pos, Szie, Fill {}

interface Operation {
  canMove: boolean;
  canResize: boolean;
  hasBorder: boolean;
}

interface ElementOption extends Operation {}

type ElementOptionProducer = (produce: (option: ElementOption) => void) => void;

type ElementDrawer = (
  ctx: CanvasRenderingContext2D,
  option: ElementState
) => void;

interface Element {
  name: string;
  draw: ElementDrawer;
}

interface ElementData {
  name: string;
  state: ElementState;
  options: ElementOption;
}
