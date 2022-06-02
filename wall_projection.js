function toWalls(model) {
  // model will be in form of [[x1,y1,z1], [x2,y2,z2], ...] */
  // return walls in +x, +y and +z direction as [wall_x, wall_y, wall_z]
  // wall will be represented as [[0,1,0],[1,0,1],[1,0,0]] when 1 is block and 0 is air
  // wall_y is oriented as player is facing +x direction and look directly down

  // console.log(model);

  let max_x = -Infinity;
  let max_y = -Infinity;
  let max_z = -Infinity;

  for (let block of model) {
    max_x = max_x < block[0] + 2 ? block[0] + 2 : max_x;
    max_y = max_y < block[1] + 2 ? block[1] + 2 : max_y;
    max_z = max_z < block[2] + 2 ? block[2] + 2 : max_z;
  }

  let wall_x = [];

  for (let i = 0; i < max_x; i++) {
    let arr = [];
    for (let j = 0; j < max_y; j++) arr[arr.length] = 0;
    wall_x[wall_x.length] = arr;
  }

  let wall_y = [];

  for (let i = 0; i < max_z; i++) {
    let arr = [];
    for (let j = 0; j < max_x; j++) arr[arr.length] = 0;
    wall_y[wall_y.length] = arr;
  }

  let wall_z = [];

  for (let i = 0; i < max_z; i++) {
    let arr = [];
    for (let j = 0; j < max_y; j++) arr[arr.length] = 0;
    wall_z[wall_z.length] = arr;
  }

  for (let block of model) {
    wall_x[block[0]][block[1]] = 1;
    wall_y[block[2]][block[0]] = 1;
    wall_z[block[2]][block[1]] = 1;
  }

  console.log(max_x, max_y, max_z);

  return [wall_x, wall_y, wall_z];
}

const walls = toWalls([
  [9, 7, 6],
  [8, 5, 8],
  [8, 2, 6],
  [7, 3, 9],
  [7, 2, 7],
  [7, 2, 3],
  [7, 1, 3],
  [6, 9, 4],
  [6, 8, 8],
  [5, 9, 4],
  [5, 3, 1],
  [5, 1, 3],
  [5, 1, 6],
  [4, 9, 4],
  [4, 8, 2],
  [4, 6, 2],
  [4, 3, 1],
  [3, 3, 8],
  [3, 1, 4],
  [3, 1, 6],
  [2, 8, 7],
  [2, 7, 3],
  [2, 3, 3],
  [1, 6, 6],
  [1, 5, 5],
  [1, 3, 3],
  [1, 2, 6],
]);

// Random integer inclusively from min to max
function randInt(min, max) {
  return (Math.round(Math.random() * (max - min + 1)) % (max - min + 1)) + min;
}

// Generate a random model
function randomModel() {
  let arr = [];
  for (let i = 0; i <= 24; i++) {
    arr[arr.length] = [randInt(1, 9), randInt(1, 9), randInt(1, 9)];
  }
  return arr;
}
// const walls = toWalls(randomModel());

// Print out wall
function printWall(wall) {
  // Display walls in the form of characters so it's easier to visualise
  // 0: Air   (-)
  // 1: Geode (\x1b[35m█\x1b[39m)
  // 2: Slime (\x1b[32m█\x1b[39m)
  // 3: Honey (\x1b[33m█\x1b[39m)
  // 4: Placeholder (X)
  const wall_pattern = [
    "\x1b[30m█\x1b[39m",
    "\x1b[35m█\x1b[39m",
    "\x1b[32m█\x1b[39m",
    "\x1b[33m█\x1b[39m",
    "\x1b[36m█\x1b[39m",
  ];

  let column = wall.length;
  let rows = wall[0].length;
  for (let i = 0; i < rows; i++) {
    let str = "";
    for (let j = 0; j < column; j++) {
      str += `${wall_pattern[wall[j][i]]}${wall_pattern[wall[j][i]]}`;
    }
    console.log(str);
  }
  console.log("\n");
}

function developedWall(newWall) {
  for (let i = 0; i < newWall.length; i++) {
    for (let j = 0; j < newWall[i].length; j++) {
      if (newWall[i][j] == 1)
        for (let a = -1; a <= 1; a++) {
          for (let b = -1; b <= 1; b++) {
            let idx = i + a,
              jdx = j + b;
            if (
              idx < 0 ||
              idx >= newWall.length ||
              jdx < 0 ||
              jdx >= newWall[i].length
            )
              continue;
            // console.log(idx, jdx);
            if (newWall[idx][jdx] == 1) continue;
            newWall[idx][jdx] = 4;
          }
        }
    }
  }
  return newWall;
}

const keypress = async () => {
  process.stdin.setRawMode(true);
  return new Promise((resolve) =>
    process.stdin.once("data", () => {
      process.stdin.setRawMode(false);
      resolve();
    })
  );
};

async function generateStickyBlocks(gapWall) {
  // Apply Breadth-first search (BFS)
  // Until batch size is 12
  let toggle = true;
  for (let i = 0; i < gapWall.length; i++) {
    for (let j = 0; j < gapWall[i].length; j++) {
      if (gapWall[i][j] != 4) continue;

      //Act like queue for BFS
      const queue = [];
      toggle = !toggle;
      // Current index of BFS
      let focusi = i;
      let focusj = j;
      queue.push([focusi, focusj]);
      gapWall[focusi][focusj] = toggle ? 2 : 3;
      let patchSize = 1;
      // BFS pattern will be in the order of down -> right -> top -> left
      // console.log("\033[2J");
      // console.log(`New patch at i=${focusi} j=${focusj}`);
      while (queue.length && patchSize < 12) {
        await keypress();
        printWall(gapWall);
        console.log(queue);
        let temp = queue.shift();
        focusi = temp[0];
        focusj = temp[1];
        let downidx = focusj + 1;
        let rightidx = focusi + 1;
        let topidx = focusj - 1;
        let leftidx = focusi - 1;
        // console.log(`BFS to ${focusi} ${focusj}`);
        if (downidx < gapWall[i].length && gapWall[focusi][downidx] == 4) {
          queue.push([focusi, downidx]);
          gapWall[focusi][downidx] = toggle ? 2 : 3;
          patchSize++;
          // console.log("Down");
        }
        if (rightidx < gapWall.length && gapWall[rightidx][focusj] == 4) {
          queue.push([rightidx, focusj]);
          gapWall[rightidx][focusj] = toggle ? 2 : 3;
          patchSize++;
          // console.log("Right");
        }
        if (topidx >= 0 && gapWall[focusi][topidx] == 4) {
          queue.push([focusi, topidx]);
          gapWall[focusi][topidx] = toggle ? 2 : 3;
          patchSize++;
          // console.log("Top");
        }
        if (leftidx >= 0 && gapWall[leftidx][focusj] == 4) {
          queue.push([leftidx, focusj]);
          gapWall[leftidx][focusj] = toggle ? 2 : 3;
          patchSize++;
          // console.log("Left");
        }

        // console.log(`${queue.length} ${patchSize}`);
      }
    }
  }
  return gapWall;
}

let devwall0 = developedWall(walls[0]);
// let devwall1 = developedWall(walls[1]);
// let devwall2 = developedWall(walls[2]);
printWall(devwall0);
// printWall(generateStickyBlocks(devwall0));
generateStickyBlocks(devwall0);

// printWall(devwall1);
// printWall(generateStickyBlocks(devwall1));

// printWall(devwall2);
// printWall(generateStickyBlocks(devwall2));
