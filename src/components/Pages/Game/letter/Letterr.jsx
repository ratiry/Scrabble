import classes from "./Letter.module.scss";
const Letter=(props)=>{
  return(
    <div className={classes.letter}>
      <span className={classes.symble}>{props.letter}</span>
      <span className={classes.value}>{props.value}</span>
    </div>
  )
}
export default Letter;