import { useEffect, useState } from "react";
import { GetWinner } from "./connect5logic";
import SmallCell from "./SmallCell";
import Nextmove from "./nextmove";

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
    let result = GetWinner(idx, idxy, grid, maxDimension);
    if (result > 0) {
      setMessage("Winner:" + (result == 1 ? "X" : "O"));
      setGameOn(false);
    }
    setGrid(grid);
    setNext(!xIsNext);
  }

  return (
    <div className="container">
      <h1 className="title">Connect 5 - with React</h1>
      <div className="player">
        <button onClick={newGame} className="btn">
          New Game
        </button>
        <Nextmove xnext={xIsNext}></Nextmove>
      </div>
      <div className="game-container">
        <div className="game" id="gamediv">
          {grid!.map((o, i) =>
            o.map((k, j) => {
              return (
                <SmallCell
                  state={k}
                  onClick={() => cellClick(i, j)}
                ></SmallCell>
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
