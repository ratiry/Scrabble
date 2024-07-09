import cellClasses from "./Cell.module.scss";
import P from "../../../../Common/Typography/P/P";
import Letter from "../../letter/Letterr";
const Cell=(props)=>{
  let neededClass="";
  let multiplyerString="";
  const onClick=()=>{
    if(props.board!=undefined & props.id!=112){
          props.setCandidateCellForCandidateLetterOnClick({
            position: props.id,
            multiply: props.board.multiply,
            object: props.board.object,
          });
    }else{
          props.setCandidateCellForCandidateLetterOnClick({
            position: props.id,
            multiply:1,
            object:"letter"
          });

    }
  }
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
  switch(props.state){
    case "empty":
        return (
          <div className={cellClasses.cell}>
            <div className={cellClasses[neededClass]}>
              <P>{multiplyerString}</P>
            </div>
          </div>
        );
    case "active":
        return (
          <div onClick={onClick} className={cellClasses.cell}>
            <div className={cellClasses.active}>
              <P>{multiplyerString}</P>
            </div>
          </div>
        );
    case "filled":
      return (
        <div className={cellClasses.cell}>
          <Letter value={props.letter.value} letter={props.letter.letter}/>
        </div>
      );    
  }
}
export default Cell;