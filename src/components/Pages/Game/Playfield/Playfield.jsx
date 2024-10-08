import P from "../../../Common/Typography/P/P";
import Cell from "./Cell/Cell";
import classes from "./Playfield.module.scss";
import { Board } from "../../../../Source/Data";
import cellClasses from "./Cell/Cell.module.scss";

const Playfield = (props) => {
  const cells = [
    ...Array(props.widthAndLengthOfBoard * props.widthAndLengthOfBoard).keys(),
  ];
  const cellsHtml = cells.map((cell, index) => {
    return (
      <Cell
        letter={props.cells[index]}
        setCandidateCellForCandidateLetterOnClick={
          props.setCandidateCellForCandidateLetterOnClick
        }
        areCellsAvaliableForPicking={props.areCellsAvaliableForPicking}
        avaliablePositions={props.avaliablePositions}
        deleteCandidateLetterOnDoubleClick={props.deleteCandidateLetterOnDoubleClick}
        board={props.Board[index]}
        id={index}
        state={
          props.cells[index] != false
            ? "filled"
            : props.avaliablePositions.includes(index) &
              props.areCellsAvaliableForPicking
            ? "active"
            : props.cells[index] == false
            ? "empty"
            : ""
        }
      />
    );
  });
  return <div className={classes.playfield}>{cellsHtml}</div>;
};
export default Playfield;
