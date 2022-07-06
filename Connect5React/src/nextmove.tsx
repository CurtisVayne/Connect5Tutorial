function Nextmove({ xnext }: { xnext: boolean }) {
  return <div className="status bigtext">Next Move: {xnext ? "X" : "O"}</div>;
}

export default Nextmove;
