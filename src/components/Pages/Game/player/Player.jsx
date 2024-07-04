import P from "../../../Common/Typography/P/P";
import Letter from './../letter/Letterr';
const Player=(props)=>{
  if(props.ammountOfPlayers>=props.id){
      return <Letter letter={"A"} value={1}/>;
  }else{
      return <div></div>;
  }
}
export default Player;