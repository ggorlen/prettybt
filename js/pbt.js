"use strict";

const PrettyBT = (function () {
  function TreeNode(val, left, right) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
  
  const treeHeight = (root, height=0) => 
    root ? 1 + Math.max(
      treeHeight(root.left, height), 
      treeHeight(root.right, height)
    ) : height
  ;
  
  const drawBinaryTree = (canvas, root, size=15) => {
    const ctx = canvas.getContext("2d");
    let depth = treeHeight(root);
    let level = [];
    let x = size;
    let y = size * 2;
    const q = [[root, depth, null]];
  
    canvas.width = 2 ** depth * size + size * 2;
    canvas.height = depth * size * 4;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeStyle = "#666";
    ctx.lineWidth = 2;
    
    while (depth >= 0) {
      const [currNode, currDepth] = q.shift();
  
      if (currDepth < depth) {
        depth = currDepth;
        x += 2 ** depth * size;
  
        for (const node of level) {
          if (node) {
            ctx.lineWidth = 1;
  
            if (node.left) {
              ctx.beginPath();
              ctx.moveTo(x + 1, y + 1);
              ctx.lineTo(x - 2 ** (depth + 1) * size / 4, y + size * 4 - 1);
              ctx.stroke();
            }
  
            if (node.right) {
              ctx.beginPath();
              ctx.moveTo(x + 1, y + 1);
              ctx.lineTo(x + 2 ** (depth + 1) * size / 4, y + size * 4 - 1);
              ctx.stroke();
            }
  
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(x + 1, y + 1, size - 2, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fillStyle = "#fff";
            ctx.fill();
            ctx.fillStyle = "#000";
            ctx.font = `bold ${size - ("" + node.val).length}px Courier New`;
            ctx.fillText(node.val, x + 1, y + 1);
          }
  
          x += 2 ** (depth + 1) * size;
        }
  
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
  };
  
  const randomTree = (min=3, max=15, maxVal=120) => {
    const root = new TreeNode(~~(Math.random() * maxVal));
    let n = 1;
  
    while ((Math.random() > 0.1 || n < min) && n++ < max) {
      let curr = root;
      let prev = curr;
  
      while (curr) {
        prev = curr;
        curr = curr[Math.random()>=0.5?"left":"right"];
      }
  
      if (!prev.left && !prev.right) {
        prev[Math.random()>=0.5?"left":"right"] = new TreeNode(~~(Math.random() * maxVal));
      }
      else {
        prev[prev.left?"right":"left"] = new TreeNode(~~(Math.random() * maxVal));
      }
    }
  
    return root;
  };
  
  const treeFromString = s => {
    const treeArray = s
      .replace(/[\[|\]]/g, "")
      .split(",")
      .map(e => /(null)|(nil)/ig.test(e) ? null : e.trim())
    ;
    treeArray.unshift(null);
    const root = new TreeNode(treeArray[1]);
    treeFromArray(root, treeArray);
    return treeArray.length > 1 && treeArray[1] ? root : null;
  };
  
  const arrayFromTree = (root, a=[], i=0) => {
    if (root) {
      a[i] = root.val;
      arrayFromTree(root.left, a, i * 2 + 1);
      arrayFromTree(root.right, a, i * 2 + 2);
    }
  
    return a;
  };
  
  const treeFromArray = (root, a, i=1) => {
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
  };

  return {
    treeFromArray, 
    arrayFromTree, 
    treeFromString, 
    drawBinaryTree, 
    randomTree
  };
})();

