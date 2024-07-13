import P from "../../../Common/Typography/P/P";
import classes from "./leaders.module.scss";
const Leaders=(props)=>{
  const pointsHtml=props.points.map((pointsOfPlayer,index)=><div><span>player {index+1}</span>  <span>: {pointsOfPlayer} points</span></div>);
  return(
    <div className={classes.leaders} >
      {pointsHtml}
    </div>
  )
}
export default Leaders;