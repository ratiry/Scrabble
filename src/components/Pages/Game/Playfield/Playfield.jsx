import P from "../../../Common/Typography/P/P";
import Cell from "./Cell/Cell";
import classes from "./Playfield.module.scss";
import { Board } from "../../../Helpers/Data";
const Playfield=(props)=>{
  const cells = [...Array(15 * 15).keys()];
  const cellsHtml=cells.map((cell,index)=>{return <div className={classes.cell}>{<Cell board={Board[index]} id={index} />}</div>})
  return (
    <div className={classes.playfield}>
      {cellsHtml}
    </div>
  )
}
export default Playfield;