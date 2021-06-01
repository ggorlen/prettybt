# prettybt

simple binary tree visualizer

![binary trees](assets/trees.gif)

## Usage

### Browser

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

### Making an SVG with [canvas2svg](https://github.com/gliffy/canvas2svg/)

```html
<body>

<script src="https://cdn.jsdelivr.net/gh/gliffy/canvas2svg@eaab317/canvas2svg.js"></script>
<script src="https://cdn.jsdelivr.net/gh/ggorlen/prettybt@bcdbe62/js/pbt.js"></script>
<script>

var tree = PrettyBT.randomTree();
var dimensions = PrettyBT.computeDimensions(tree);
var canvas = (function () {
  var ctx = new C2S(dimensions.width, dimensions.height);
  return {
    getContext: function () {
      return ctx;
    }
  };
})();
PrettyBT.drawBinaryTree(canvas, tree);

var svg = document.createElement("div");
document.body.appendChild(svg);
svg.outerHTML = canvas.getContext().getSerializedSvg();

</script>
</body>
```

## TODO

- make npm package
- handle sparse wide/deep trees better; find a way to squish 'em
- support horizontal output
- add light/dark color modes for the canvas instead of just CSS in the preview (for export purposes)

