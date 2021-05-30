# prettybt

binary tree visualizer

![binary trees](assets/trees.gif)

### browser usage example

```html
<body>

<!-- always use a specific commit hash -->
<script src="https://cdn.jsdelivr.net/gh/ggorlen/prettybt@112f040/js/pbt.js"></script>
<script>

var canvas = document.createElement("canvas");
document.body.appendChild(canvas);
var size = 15;
PrettyBT.drawBinaryTree(
  canvas,
  PrettyBT.treeFromString("[a,b,c,,d]"), /* or pass JSON tree with val/left/right props */
  size
);

</script>
</body>
```

### todo

- handle sparse wide/deep trees better; find a way to squish 'em
- support horizontal output
- add light/dark color modes
- make node lib/npm package
- generate svg with [canvg](https://github.com/canvg/canvg)?
