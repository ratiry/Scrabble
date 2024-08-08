import { ButtonWithText } from "../../../Common/Buttons/Buttons"
import { useEffect, useState } from 'react';
const ButtonsContainer=(props)=>{
  const [shouldStopShowingDiscardButton,setShouldStopShowingDiscardButton]=useState(false);

  useEffect(()=>{
    if (props.players.length > 0) {
      if (props.stock.length < props.players[0].length) {
        setShouldStopShowingDiscardButton(true);
      }
    }
  },[props.stock])
  return(
    <div>
      {props.shouldShowDiscardButton  & !shouldStopShowingDiscardButton ? <ButtonWithText onClick={()=>{return props.discardButtonOnClick()}}>discard letters</ButtonWithText> : "" }
      {props.shouldShowDiscardButton ? <ButtonWithText onClick={()=>{return props.skipButtonOnClick()}}>skip this turn</ButtonWithText> : "" }
      {props.shouldShowEndMoveButton ?<ButtonWithText onClick={()=>{return props.EndMoveButtonOnClick()}}>End move</ButtonWithText>: ""}
    </div>
  )
}
export default ButtonsContainer;