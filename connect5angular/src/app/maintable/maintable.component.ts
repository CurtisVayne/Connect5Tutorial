import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maintable',
  templateUrl: './maintable.component.html',
  styleUrls: ['./maintable.component.scss']
})
export class MaintableComponent implements OnInit {
  gridData: number[][] = [];
  xIsNext = true;
  maxDimension = 10; // this must be in sync with the css style: grid-template-columns/rows: repeat(10, 1fr);
  message = "";
  gameOn = true;
  constructor() {
    this.initData();
  }

  ngOnInit(): void {
  }

  newGame() {
    this.xIsNext = true;
    this.initData();
    this.message = "";
    this.gameOn = true;
  }

  initData() {
    this.gridData = new Array(this.maxDimension);
    for (let i = 0; i < this.maxDimension; i++) {
      this.gridData[i] = new Array(this.maxDimension);
    }
  }

  cellClick(idx: number, idx2: number) {
    if (!this.gameOn || this.gridData[idx][idx2] > 0) return;
    this.gridData[idx][idx2] = this.xIsNext ? 1 : 2;
    this.xIsNext = !this.xIsNext;
    let result = this.calcResult(idx, idx2);
    if (result > 0) {
      this.message = "Winner:" + (result == 1 ? "X" : "O");
      this.gameOn = false;
    }
  }

  calcResult(startX: number, startY: number): number {
    const shifter = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [-1, 1], [1, -1]];
    for (let i = 0; i < shifter.length; i++) {
      const element = shifter[i];
      let res = this.calcOnelineResult(startX, startY, element[0], element[1]);
      if (res > 0) {
        return res;
      }
    }
    return 0;
  }

  calcOnelineResult(startX: number, startY: number, shiftX: number, shiftY: number): number {
    let actX = startX;
    let actY = startY;
    let cnt = 0;
    let lastItem = this.gridData[actX][actY];
    while (true) {
      if (lastItem == this.gridData[actX][actY]) {
        cnt++;
        if (cnt == 5) {
          return lastItem;
        }
        actX += shiftX;
        actY += shiftY;
        if (actX >= this.maxDimension || actY >= this.maxDimension || actX < 0 || actY < 0) {
          return 0;
        }
      }
      else {
        return 0;
      }
    }
  }

}
