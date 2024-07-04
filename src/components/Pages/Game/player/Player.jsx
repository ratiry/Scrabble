import P from "../../../Common/Typography/P/P";
import Letter from './../letter/Letterr';
import classes from "./Player.module.scss";
const Player=(props)=>{
  if(props.ammountOfPlayers>=props.id){
      return (
        <div className={classes.player}>
          <Letter letter={"A"} value={1} />
        </div>
      );
  }else{
      return <div></div>;
  }
}
export default Player;