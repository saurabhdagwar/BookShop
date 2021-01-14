import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import logo from "../../assets/education.svg";

const useStyles = makeStyles((theme) => ({
  signUpMain: {
    display: "flex",
    flexDirection: "column",
    border: "2px solid #A03037",
    borderRadius: "10px",
    padding: "30px",
    width: "300px"
  },
  header:{
      justifySelf: "flex-start",
      width: "70%"
  },
  inputField:{
      margin: "5px 0 5px 0",
  },
  input:{
    width: "80%",
    color: "#A03037"
  },
  signUpButton:{
      marginTop: "10px",
      display:"flex",
      justifyContent:"space-between",
  },
  regButton:{
      color: "#A03037"
  }
}));

export default function SignUp(props) {
  const classes = useStyles();
  return (
    <div className={classes.signUpMain}>
        <div className={classes.titleField}>
        <div className={classes.header}>
        <img className={classes.titleLogo} src={logo} />
        <Typography variant="h6">Bookshop</Typography>
        </div>

        </div>
      <div className={classes.inputField}>
        <TextField className={classes.input} label="Full Name" />
      </div>
      <div className={classes.inputField}>
        <TextField className={classes.input} label="Email" />
      </div>
      <div className={classes.inputField}>
        <TextField className={classes.input} label="Password" type="password" />
      </div>
      <div className={classes.inputField}>
        <TextField className={classes.input} label="Mobile" type="number" />
      </div>
      <div className={classes.signUpButton}>
      <Button className={classes.regButton}>Login</Button>
        <Button  className={classes.regButton} variant="outlined" color="primary">
          Sign Up
        </Button>
      </div>
    </div>
  );
}
