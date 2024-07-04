import cellClasses from "./Cell.module.scss";
import P from "../../../../Common/Typography/P/P";
import Letter from "../../letter/Letterr";
const Cell=(props)=>{
  let neededClass="";
  let multiplyerString="";
  if(props.board!=undefined){
    multiplyerString="X"+props.board.multiply+" "+ props.board.object;
    switch(props.board.object){
      case "word":
        switch (props.board.multiply) {
          case 2:
            neededClass="double_word";
            break;
          case 3:
            neededClass="triple_word";
            break;
        }
        break;
      case "letter":
        switch (props.board.multiply) {
          case 2:
            neededClass = "double_letter";
            break;
          case 3:
            neededClass = "triple_letter";
            break;
            
        }
        break;
      case "star":
        neededClass="star";
        multiplyerString = "";

    }
  }
  return (
    <div className={cellClasses.cell}>
      {props.isFilled != true ? (
        <div className={cellClasses[neededClass]}>
          <P>{multiplyerString}</P>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
export default Cell;