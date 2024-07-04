import classes from "./Header.module.scss";
import H from "../Common/Typography/Headlines/H";
import { useNavigate } from "react-router-dom";
import { URLs } from "../../App";
let Header=(props)=>{
    return(
        <div className={classes.Header}>
            <H bouldness={2}>IUNO</H>
            
        </div>
    )
}
export default Header;