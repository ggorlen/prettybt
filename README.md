# prettybt

string to visual binary tree.

![binary trees](assets/trees.gif)

### Browser usage example

```html
<body>
<script src="https://cdn.jsdelivr.net/gh/ggorlen/prettybt@112f040/js/pbt.js"></script>
<script>

var canvas = document.createElement("canvas");
document.body.appendChild(canvas);
drawBinaryTree(
  treeFromString("[a,b,c,,d]"), 
  canvas.getContext("2d"), 
  canvas
);

</script>
</body>
```

### todo

- accept JSON
- handle sparse wide/deep trees better; find a way to squish 'em
- add horizontal/vertical output support
- namespace functions
- simplify params to `drawBinaryTree`, pass in non-canvas element?
- make node lib/npm package?
- support svg with [canvg](https://github.com/canvg/canvg)?
