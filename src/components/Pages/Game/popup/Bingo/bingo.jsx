import { didSomebodySayBingoUrl, rainbowFire } from "../../../../../Source/Data";
import H from "../../../../Common/Typography/Headlines/H";
import P from "../../../../Common/Typography/P/P";
import classes from "./bingo.module.scss";

const Bingo=(props)=>{
  return (
    <div className={classes.bingo}>
      <img className={classes.rainbowFire} src={rainbowFire} alt="" />
      <img src={didSomebodySayBingoUrl} alt="" />
      <img src={didSomebodySayBingoUrl} alt="" />
      <img src={didSomebodySayBingoUrl} alt="" />
      <img src={didSomebodySayBingoUrl} alt="" />
      <p className={classes.bingoWord}>BINGO!!!</p>
      <img src={didSomebodySayBingoUrl} alt="" />
      <img src={didSomebodySayBingoUrl} alt="" />
      <img src={didSomebodySayBingoUrl} alt="" />
      <img src={didSomebodySayBingoUrl} alt="" />

    </div>
  );
}
export default Bingo;