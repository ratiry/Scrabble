import { flyingRightDragon, levitatingDragon } from "../../../../../Source/Data";
import P from "../../../../Common/Typography/P/P";
import classes from "./credits.module.scss";

const Credits=()=>{
  return (
    <div className={classes.container}>
      <div className={classes.levitatingDragonsOnTheLeft}>
        <img src={levitatingDragon} alt="" />
        <img src={levitatingDragon} alt="" />
        <img src={levitatingDragon} alt="" />
      </div>
      <div className={classes.flyingDragons}>
        <img src={flyingRightDragon} className={classes.flyingRightDragon} alt="" />
        <div><P>Made By Slava</P></div>
        <img className={classes.flyingLeftDragon} src={flyingRightDragon} alt="" />
      </div>
      <div className={classes.levitatingDragonsOnTheRight}>
        <img src={levitatingDragon} alt="" />
        <img src={levitatingDragon} alt="" />
        <img src={levitatingDragon} alt="" />
      </div>
    </div>
  );
}
export default Credits;