import { Coordinate } from "./types";

export abstract class Element {}

export abstract class RectElement extends Element {
  coordinate!: Coordinate;

  setCoordinate(x: number, y: number) {
    this.coordinate = {
      x,
      y
    };
  }
}

export abstract class PathElement extends Element {}

export abstract class VirtualElement extends Element {
  constructor(private readonly innerElement: Element) {
    super();
  }
}

export class CombinedElement extends Element {
  private children: Element[] = [];
  constructor(...children: Element[]) {
    super();
    this.children = children;
  }
}

export function CreateElement(options: any, ...pipes: any[]) {}
