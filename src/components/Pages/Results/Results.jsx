import { useLocation, useNavigate } from "react-router-dom";
import {useState,useEffect} from "react";
import classes from "./Results.module.scss";
import bubbleSort from "../../Helpers/bubbleSort";
import { medalFirstPlace, medalFourthPlace, medalSecondPlace, medalThirdPlace } from "../../../Source/Data";
let Results=(props)=>{
    const location=useLocation();
    const navigate=useNavigate();
    const [pointsOfPlayers,setPointsOfPlayers]=useState(location.state.pointsOfPlayers);
    const [place,setPlace]=useState(-1);
    useEffect(()=>{
      if(pointsOfPlayers.length>0){
        const pointsOfPlayer=pointsOfPlayers[0]
        const sortedPoints=bubbleSort(pointsOfPlayers).reverse();
        setPlace(sortedPoints.findIndex(points=>pointsOfPlayer==points)+1);
      }
    },[pointsOfPlayers])
    return (
      <div className={classes.results}>
        {place == 1 ? <img className={classes.resultsImg} src={medalFirstPlace}/> : ""}
        {place == 2 ? <img className={classes.resultsImg} src={medalSecondPlace}/> : ""}
        {place == 3 ? <img className={classes.resultsImg} src={medalThirdPlace}/> : ""}
        {place == 4 ? <img className={classes.resultsImg} src={medalFourthPlace}/> : ""}
      </div>
    );
}
export default Results;