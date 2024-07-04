
import classes from "./Welcome.module.scss";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { URLs } from "../../../App";
import {ButtonWithText} from "./../../Common/Buttons/Buttons.jsx";
import P from "../../Common/Typography/P/P";
import H from "../../Common/Typography/Headlines/H";
let Welcome=(props)=>{
    let navigate=useNavigate();
    let ComputerPlayers=[];
    let computerPlayersHtml=[];
    let preffiledValues={
      ammountOfPlayers:'3'
    }
    const  {
      register,
      formState:{
        errors
      },
      watch,
      handleSubmit,
    } = useForm({
      defaultValues:preffiledValues
    })
    let watchFields = watch("ammountOfPlayers"); 
    const onSubmit=(data)=>{
      navigate(URLs.game,{
        state:data
      })
    }
  
    return(
        <div className={classes.Welcome}>
            <H bouldness={1}>Scrabble game</H>
            <form  onSubmit={handleSubmit(onSubmit) }>
                <div className={classes.Item}>
                    <P>How many players</P>
                    <select  name="ammountOfPlayers" {...register('ammountOfPlayers')}>
                    <option >3</option>
                    <option >4</option>
                </select>
                </div>
                <ButtonWithText>Play</ButtonWithText>
            </form>
        </div>
    )
}
export default Welcome;