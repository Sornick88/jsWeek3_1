const maze = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 3],
  [1, 0, 1, 0, 1, 0, 1],
  [0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 2, 1, 0, 1, 0, 1]
];

const direction = ["N", "S", "N", "W", "W", "E", "E", "E", "E", "E", "W"];

const result = ["Lost", "Finish", "Dead"];

const terranType = {
  safe: 0,
  wall: 1,
  startPoint: 2,
  endPoint: 3
};

const moveType = {
  N: moveNorth,
  W: moveWest,
  S: moveSouth,
  E: moveEast
};

function moveNorth(mazeMap, currentPoint) {
  if (currentPoint.Y === 0) {
    return result[2];
  }

  currentPoint.Y--;
  if (mazeMap[currentPoint.Y][currentPoint.X] === terranType.wall) {
    return result[2];
  }
  if (mazeMap[currentPoint.Y][currentPoint.X] === terranType.endPoint) {
    return result[1];
  }
  return result[0];
}

function moveWest(mazeMap, currentPoint) {
  if (currentPoint.X === 0) {
    return result[2];
  }

  currentPoint.X--;
  if (mazeMap[currentPoint.Y][currentPoint.X] === terranType.wall) {
    return result[2];
  }
  if (mazeMap[currentPoint.Y][currentPoint.X] === terranType.endPoint) {
    return result[1];
  }
  return result[0];
}
function moveSouth(mazeMap, currentPoint) {
  if (currentPoint.Y === mazeMap.length - 1) {
    return result[2];
  }

  currentPoint.Y++;
  if (mazeMap[currentPoint.Y][currentPoint.X] === terranType.wall) {
    return result[2];
  }
  if (mazeMap[currentPoint.Y][currentPoint.X] === terranType.endPoint) {
    return result[1];
  }
  return result[0];
}
function moveEast(mazeMap, currentPoint) {
  if (currentPoint.X === mazeMap[currentPoint.Y].length - 1) {
    return result[2];
  }

  currentPoint.X++;
  if (mazeMap[currentPoint.Y][currentPoint.X] === terranType.wall) {
    return result[2];
  }
  if (mazeMap[currentPoint.Y][currentPoint.X] === terranType.endPoint) {
    return result[1];
  }
  return result[0];
}

function findStartPoint(mazeMap) {
  for (let idY = 0; idY !== mazeMap.lengt; idY++) {
    for (let idX = 0; idX !== mazeMap[idY].length; idX++) {
      if (mazeMap[idY][idX] === terranType.startPoint) {
        return { X: idX, Y: idY };
      }
    }
  }
}

function mazeRunner(mazeMap, moves) {
  const maze = mazeMap;

  let retStr = result[0];
  if (mazeMap.length === 0) return result[2];
  if (mazeMap.length === 1) return result[1];

  let currentPoint = findStartPoint(maze);
  if (!isNaN(currentPoint)) return;

  for (let moveId = 0; moveId !== moves.length; moveId++) {
    retStr = moveType[moves[moveId]](maze, currentPoint);
    if (retStr !== result[0]) {
      break;
    }
  }

  return retStr;
}

let resultString = mazeRunner(maze, direction);
console.log(resultString);
