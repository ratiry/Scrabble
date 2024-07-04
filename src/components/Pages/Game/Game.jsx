import {  useLocation, useNavigate } from "react-router-dom";
import classes from './Game.module.scss';

let Game=()=>{
   

    return(
        <div className={classes.Game}> 
            <div></div>
            <div>player 2</div>
            <div></div>
            <div>player 3</div>
            <div>playfield</div>
            <div>player 4</div>
            <div>define a word</div>
            <div>player 1</div>
            <div>results</div>
        </div>
    )
}
export default Game;