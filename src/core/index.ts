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

export function render(
  container: HTMLDivElement,
  { height, width }: { height: number; width: number }
) {
  container.style.height = height + 'px';
  container.style.width = width + 'px';
  const canvas = document.createElement('canvas');
  container.appendChild(canvas);
  initCanvasContext(canvas, {
    height,
    width
  });
}
