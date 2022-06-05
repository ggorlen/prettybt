;(function () {
  "use strict";
  
  function TreeNode(val, left, right) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
  
  function treeHeight(root, height=0) {
    return root ? 1 + Math.max(
      treeHeight(root.left, height), 
      treeHeight(root.right, height)
    ) : height
  }

  function computeDimensions(root, size=15) {
    var depth = treeHeight(root);
    return {
      width: 2 ** depth * size + size * 2,
      height: depth * size * 4,
    };
  }
  
  function drawBinaryTree(
    canvas, 
    root, 
    size=15,
    mode
  ) {
    var ctx = canvas.getContext("2d");
    var depth = treeHeight(root);
    var level = [];
    var x = size;
    var y = size * 2;
    var q = [[root, depth, null]];
  
    canvas.width = 2 ** depth * size + size * 2;
    canvas.height = depth * size * 4;
    ctx.fillStyle = mode.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeStyle = mode.strokeStyle;
    ctx.lineWidth = 2;
    
    while (depth >= 0) {
      var node = q.shift();
      var currNode = node[0];
      var currDepth = node[1];
  
      if (currDepth < depth) {
        depth = currDepth;
        x += 2 ** depth * size;
  
        level.forEach(function (node) {
          if (node) {
            ctx.lineWidth = 1;
  
            if (node.left) {
              ctx.beginPath();
              ctx.moveTo(x + 1, y + 1);
              ctx.lineTo(
                x - 2 ** (depth + 1) * size / 4, 
                y + size * 4 - 1
              );
              ctx.stroke();
            }
  
            if (node.right) {
              ctx.beginPath();
              ctx.moveTo(x + 1, y + 1);
              ctx.lineTo(
                x + 2 ** (depth + 1) * size / 4, 
                y + size * 4 - 1
              );
              ctx.stroke();
            }
  
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(x + 1, y + 1, size - 2, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fillStyle = "#fff";
            ctx.fill();
            ctx.fillStyle = "#000";
            ctx.font = "bold " + 
              (size - ("" + node.val).length) + 
              "px Courier New"
            ;
            ctx.fillText(node.val, x + 1, y + 1);
          }
  
          x += 2 ** (depth + 1) * size;
        });
  
        x = size;
        y += size * 4;
        level = [];
      }
  
      if (currNode) {
        level.push(currNode);
        q.push([currNode.left, depth - 1]);
        q.push([currNode.right, depth - 1]);
      }
      else {
        level.push(null);
        q.push([null, depth - 1]);
        q.push([null, depth - 1]);
      }
    }
  }
  
  function randomTree(min=3, max=15, maxVal=120) {
    var root = new TreeNode(~~(Math.random() * maxVal));
    var n = 1;
  
    while ((Math.random() > 0.1 || n < min) && n++ < max) {
      var curr = root;
      var prev = curr;
  
      while (curr) {
        prev = curr;
        curr = curr[Math.random()>=0.5?"left":"right"];
      }
  
      if (!prev.left && !prev.right) {
        var child = Math.random() >= 0.5 ? "left" : "right"
        prev[child] = new TreeNode(~~(Math.random() * maxVal));
      }
      else {
        var child = prev.left ? "right" : "left";
        prev[child] = new TreeNode(~~(Math.random() * maxVal));
      }
    }
  
    return root;
  }
  
  function treeFromString(s) {
    var treeArray = s
      .replace(/[\[|\]]/g, "")
      .split(",")
      .map(e => /(null)|(nil)/ig.test(e) ? null : e.trim())
    ;
    treeArray.unshift(null);
    var root = new TreeNode(treeArray[1]);
    treeFromArray(root, treeArray);
    return treeArray.length > 1 && treeArray[1] ? root : null;
  };
  
  function arrayFromTree(root, a=[], i=0) {
    if (root) {
      a[i] = root.val;
      arrayFromTree(root.left, a, i * 2 + 1);
      arrayFromTree(root.right, a, i * 2 + 2);
    }
  
    return a;
  }
  
  function treeFromArray(root, a, i=1) {
    if (root && i < a.length) {
      if (a[i*2]) {
        root.left = new TreeNode(a[i*2]);
        treeFromArray(root.left, a, i * 2);
      }
  
      if (a[i*2+1]) {
        root.right = new TreeNode(a[i*2+1]);
        treeFromArray(root.right, a, i * 2 + 1);
      }
    }
  }

  var PrettyBT = {
    arrayFromTree: arrayFromTree, 
    computeDimensions: computeDimensions,
    drawBinaryTree: drawBinaryTree, 
    randomTree: randomTree,
    treeFromArray: treeFromArray, 
    treeFromString: treeFromString,
  };

  if (typeof module === "object" && 
      typeof module.exports === "object") {
    module.exports = PrettyBT;
  }

  if (typeof window === "object") {
    window.PrettyBT = PrettyBT;
  }
})();
