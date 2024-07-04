
import classes from "./P.module.scss";
let P=(props)=>{
    return(
        <p className={classes.P}>{props.children}</p>
    )
}
export default P;