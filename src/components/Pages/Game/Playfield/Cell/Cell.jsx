import classes from "./../Playfield.module.scss";
import cellClasses from "./Cell.module.scss";
import P from "../../../../Common/Typography/P/P";
const Cell=(props)=>{
  if(props.board!=undefined){
    debugger;
    if(props.board.object=="word"){
      switch (props.board.multiply) {
        case 2:
          return (
            <div className={cellClasses.double_word}>
              <P> X2  word</P>
            </div>
          );
        case 3:
          return (
            <div className={cellClasses.triple_word}>
              <P>X3 word</P>
            </div>
          );
      }
    }else{
        switch (props.board.multiply) {
          case 2:
            return (
              <div className={cellClasses.double_letter}>
                <P>X2 letter</P>
              </div>
            );
          case 3:
            return (
              <div className={cellClasses.triple_letter}>
                <P>X3 letter</P>
              </div>
            );
        }      
    }
  }
}
export default Cell;