import { ButtonWithText } from "../../../Common/Buttons/Buttons"

const ButtonsContainer=(props)=>{

  if (props.shouldShowEndMoveButton) {
    return (
      <div>
        <ButtonWithText onClick={()=>{return props.EndMoveButtonOnClick()}}>End move</ButtonWithText>
      </div>
    );
  }else{
    return <div></div>;
  }
}
export default ButtonsContainer;