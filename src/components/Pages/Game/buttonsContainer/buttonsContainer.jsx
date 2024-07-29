import { ButtonWithText } from "../../../Common/Buttons/Buttons"

const ButtonsContainer=(props)=>{

  return(
    <div>
      {props.shouldShowDiscardButton ? <ButtonWithText onClick={()=>{return props.discardButtonOnClick()}}>discard letters</ButtonWithText> : "" }
      {props.shouldShowEndMoveButton ?<ButtonWithText onClick={()=>{return props.EndMoveButtonOnClick()}}>End move</ButtonWithText>: ""}
    </div>
  )
}
export default ButtonsContainer;