# prettybt

Simple binary tree visualizer

[Demo](https://ggorlen.github.io/prettybt/)

![binary trees](assets/trees.gif)

## Usage

### Browser

```html
<body>

<!-- always use a specific commit hash -->
<script src="https://cdn.jsdelivr.net/gh/ggorlen/prettybt@f55c8c5/js/pbt.js"></script>
<script>

var canvas = document.createElement("canvas");
document.body.appendChild(canvas);

var tree = {val: 1, left: {val: 2}, right: {val: 3}};
// or: var tree = PrettyBT.treeFromString("[a,b,c,,d]");

PrettyBT.drawBinaryTree(canvas, tree, {size: 17});

</script>
</body>
```

### Making an SVG with [canvas2svg](https://github.com/gliffy/canvas2svg/)

```html
<body>

<script src="https://cdn.jsdelivr.net/gh/gliffy/canvas2svg@eaab317/canvas2svg.js"></script>
<script src="https://cdn.jsdelivr.net/gh/ggorlen/prettybt@f55c8c5/js/pbt.js"></script>
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

### NodeJS with [canvas](https://www.npmjs.com/package/canvas)

```javascript
const {createCanvas} = require("canvas"); // tested with 2.11.2
const PrettyBT = require("prettybt");

const canvas = createCanvas();
const tree = PrettyBT.randomTree();
PrettyBT.drawBinaryTree(canvas, tree);
console.log(`<img src="${canvas.toDataURL()}" />`);
```

