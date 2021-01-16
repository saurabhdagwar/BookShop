import React from "react"
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "../AppBar/AppBar"
import Books from "../displayBooks/displayBooks"

const useStyles = makeStyles((theme) => ({

}))    

export default function Dashboard(props) {
    const classes = useStyles();

    return (
        <div className={classes.dashboardMain}>
            <AppBar />
            <Books />
        </div>
    )
}