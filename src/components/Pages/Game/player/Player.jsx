import P from "../../../Common/Typography/P/P";
const Player=(props)=>{
  if(props.ammountOfPlayers>=props.id){
      return <div><P>{props.id}</P> </div>;
  }else{
      return <div></div>;
  }
}
export default Player;