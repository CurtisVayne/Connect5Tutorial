type param = {
  state: number;
  onClick: () => void;
};

function SmallCell(props: param) {
  let cellinfo;
  switch (props.state) {
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
    <div className="game-cell" onClick={() => props.onClick()}>
      {cellinfo}
    </div>
  );
}

export default SmallCell;
