export function initCanvasContext(canvas: HTMLCanvasElement) {
  if (canvas.getContext) {
    return canvas.getContext('2d');
  } else {
    return null;
  }
}

export function initCanvas(
  container: HTMLDivElement,
  { height, width }: { height: number; width: number }
) {
  container.style.height = height + 'px';
  container.style.width = width + 'px';
  const canvas = document.createElement('canvas');
  if (height) {
    canvas.height = height;
  }
  if (width) {
    canvas.width = width;
  }
  container.appendChild(canvas);
  return initCanvasContext(canvas);
}
