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

# 逻辑

## 逻辑定义

## 逻辑连接、组合、条件分支

```ts
const moveLogic = pipe(
  [Event.MouseDown, Type.Trigger],
  [Event.MouseMove, Type.Keep],
  [Event.MouseUp, Type.Trigger]
);
```
