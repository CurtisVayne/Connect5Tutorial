import { useEffect, useState } from "react";

function Connect5() {
  let maxDimension = 10; // this must be in sync with the css style: grid-template-columns/rows: repeat(10, 1fr);

  const [grid, setGrid] = useState<number[][]>([]);
  const [xIsNext, setNext] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [gameOn, setGameOn] = useState<boolean>(true);

  useEffect(() => initData(), []);

  function newGame() {
    initData();
    setMessage("");
    setGameOn(true);
  }

  function initData() {
    let g = new Array(maxDimension);
    for (let i = 0; i < maxDimension; i++) {
      g[i] = new Array(maxDimension);
      for (let j = 0; j < maxDimension; j++) {
        g[i][j] = 0;
      }
    }

    setGrid(g);
    setNext(true);
  }

  function cellClick(idx: number, idxy: number) {
    if (!gameOn || grid[idx][idxy] > 0) return;
    grid[idx][idxy] = xIsNext ? 1 : 2;
    let result = calcResult(idx, idxy);
    if (result > 0) {
      setMessage("Winner:" + (result == 1 ? "X" : "O"));
      setGameOn(false);
    } else {
      for (let i = 0; i < maxDimension; i++) {
        for (let j = 0; j < maxDimension; j++) {
          let result = calcResult(i, j);
          if (result > 0) {
            setMessage("Winner:" + (result == 1 ? "X" : "O"));
            setGameOn(false);
          }
        }
      }
    }
    setGrid(grid);
    setNext(!xIsNext);
  }

  function calcResult(startX: number, startY: number): number {
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
      let res = calcOnelineResult(startX, startY, element[0], element[1]);
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
    shiftY: number
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

  return (
    <div className="container">
      <h1 className="title">Connect 5 - with React</h1>
      <div className="player">
        <button onClick={newGame} className="btn">
          New Game
        </button>
        <div className="status bigtext">Next Move: {xIsNext ? "X" : "O"}</div>
      </div>
      <div className="game-container">
        <div className="game" id="gamediv">
          {grid!.map((o, i) =>
            o.map((k, j) => {
              let cellinfo;
              switch (k) {
                case 0:
                  cellinfo = <></>;
                  break;
                case 1:
                  cellinfo = <span className="x">X</span>;
                  break;
                case 2:
                  cellinfo = <span className="o">O</span>;
                  break;
              }
              return (
                <div
                  className="game-cell"
                  onClick={() => cellClick(i, j)}
                  key={i * 10 + j}
                >
                  {cellinfo}
                </div>
              );
            })
          )}
        </div>
        <div></div>
      </div>
      <div className="bigtext">{message}</div>
    </div>
  );
}

export default Connect5;
