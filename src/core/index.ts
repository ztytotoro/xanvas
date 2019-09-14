export function initCanvasContext(
  canvas: HTMLCanvasElement,
  { height, width }: { height: number; width: number }
) {
  if (canvas.getContext) {
    if (height) {
      canvas.height = height;
    }
    if (width) {
      canvas.width = width;
    }
    return canvas.getContext('2d');
  } else {
    return null;
  }
}

interface Brush {
  fill: string | CanvasGradient | CanvasPattern;
}
