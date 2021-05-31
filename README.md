# prettybt

simple binary tree visualizer

![binary trees](assets/trees.gif)

### browser usage

```html
<body>

<!-- always use a specific commit hash -->
<script src="https://cdn.jsdelivr.net/gh/ggorlen/prettybt@eac688e/js/pbt.js"></script>
<script>

var canvas = document.createElement("canvas");
document.body.appendChild(canvas);

var tree = {val: 1, left: {val: 2}, right: {val: 3}};
// or: var tree = PrettyBT.treeFromString("[a,b,c,,d]");

var size = 15;
PrettyBT.drawBinaryTree(canvas, tree, size);

</script>
</body>
```

### todo

- handle sparse wide/deep trees better; find a way to squish 'em
- support horizontal output
- add light/dark color modes for the canvas instead of just CSS in the preview (for export purposes)
- generate SVG with [canvas2svg](https://github.com/gliffy/canvas2svg/)
- make node lib/npm package?
