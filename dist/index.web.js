var zovas = (function (exports) {
  'use strict';

  function initCanvasContext(canvas, { height, width }) {
      if (canvas.getContext) {
          if (height) {
              canvas.height = height;
          }
          if (width) {
              canvas.width = width;
          }
          return canvas.getContext('2d');
      }
      else {
          return null;
      }
  }
  function render(container, { height, width }) {
      container.style.height = height + 'px';
      container.style.width = width + 'px';
      const canvas = document.createElement('canvas');
      container.appendChild(canvas);
      initCanvasContext(canvas, {
          height,
          width
      });
  }

  exports.initCanvasContext = initCanvasContext;
  exports.render = render;

  return exports;

}({}));
