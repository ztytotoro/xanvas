```ts
const ImageItem = createCanvasItem('image', (ctx, option) => {
    ctx.fill = option.fill;
    ctx.
});

const instance = ImageItem({
    height: 100,
    width: 100,
    fill: 'black'
}, option => {
    option.canMove = true;
})
```
