import classes from "./H.module.scss"
let H =(props)=>{
    switch(props.bouldness){
        case 1 :
            return <h1 onClick={props.onClick} className={classes.H + " " + classes.h1} >{props.children}</h1>
        case 2:
            return <h2 onClick={props.onClick} className={classes.H + " " + classes.h2}>{props.children}</h2>
        default:
            return <h3 onClick={props.onClick} className={classes.H}>{props.children}</h3>
    }
}
export default H;