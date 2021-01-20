import React from "react"
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "../AppBar/AppBar"
import Books from "../displayBooks/displayBooks"
import Cart from "../cart/cart"

const useStyles = makeStyles((theme) => ({
    dashboardMain:{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white"
    }
}))    

export default function Dashboard(props) {
    const classes = useStyles();
    const [show, setShow] = React.useState(false);
    const [totalCartItem, setTotalCartItem] = React.useState();

    return (
        <div className={classes.dashboardMain}>
            <AppBar totalCartItem={totalCartItem} setShow={setShow}/>
        {show ? <Cart setTotalCartItem={setTotalCartItem} /> : <Books />}
            
        </div>
    )
}