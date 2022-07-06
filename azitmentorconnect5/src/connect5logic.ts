export function GetWinner(
  idx: number,
  idxy: number,
  grid: number[][],
  maxDimension: number
): number {
  let result = calcResult(idx, idxy, grid, maxDimension);
  if (result > 0) {
    return result;
  } else {
    for (let i = 0; i < maxDimension; i++) {
      for (let j = 0; j < maxDimension; j++) {
        let result = calcResult(i, j, grid, maxDimension);
        if (result > 0) {
          return result;
        }
      }
    }
  }
  return 0;
}

function calcResult(
  startX: number,
  startY: number,
  grid: number[][],
  maxDimension: number
): number {
  const shifter = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
  ];
  for (let i = 0; i < shifter.length; i++) {
    const element = shifter[i];
    let res = calcOnelineResult(
      startX,
      startY,
      element[0],
      element[1],
      grid,
      maxDimension
    );
    if (res > 0) {
      return res;
    }
  }
  return 0;
}

function calcOnelineResult(
  startX: number,
  startY: number,
  shiftX: number,
  shiftY: number,
  grid: number[][],
  maxDimension: number
): number {
  let actX = startX;
  let actY = startY;
  let cnt = 0;
  let lastItem = grid[actX][actY];
  while (true) {
    if (lastItem == grid[actX][actY]) {
      cnt++;
      if (cnt == 5) {
        return lastItem;
      }
      actX += shiftX;
      actY += shiftY;
      if (
        actX >= maxDimension ||
        actY >= maxDimension ||
        actX < 0 ||
        actY < 0
      ) {
        return 0;
      }
    } else {
      return 0;
    }
  }
}
