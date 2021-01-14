import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Services from "../../Services/userServices"
const services = new Services();

const useStyles = makeStyles((theme) => ({
    loginMain: {
    display: "flex",
    flexDirection: "column",
   justifyContent: "center",
    borderRadius: "10px",
    padding: "30px",
    width: "300px"
  },
  header:{
      display: "flex",
      justifyContent: "space-between",
      width: "90%",
      fontSize: '1.2em',
      fontFamily: "roboto,'Noto Sans Myanmar UI',arial,sans-serif",
      color: "#A03037",
  },
  inputField:{
      margin: "5px 0 5px 0",
      width: "90%",
  },
  input:{
    color: "#A03037"
  },
  signUpButton:{
      marginTop: "10px",
      display:"flex",
      justifyContent:"space-between",
  },
  regButton:{
      marginTop: "20px",
      background: "#A03037",
      width: "90%"
  }
}));

export default function Login(props) {
  const classes = useStyles();
  const [email, setEmail] = React.useState();
  const [emailFlag,setEmailFlag] = React.useState(false);
  const [emailError, setEmailError] = React.useState("");
  const [password, setPassword] = React.useState();
  const [passwordFlag,setPasswordFlag] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState("");

  const nextPath = (path) => {
    props.history.push(path);
  };

  const makeInitial = () => {
    setEmailFlag(false);
    setEmailError("");
    setPasswordFlag(false);
    setPasswordError("");
  }

  const patternCheck = () => {
    makeInitial();
      const emailPattern = /[a-zA-Z0-9._]+[@]{1}[a-zA-Z120-9]*[.]{1}[a-zA-Z]*$/
      const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/
      let isError = false
    if(!(emailPattern.test(email))){
        setEmailFlag(true);
        setEmailError("Email is Not Proper");
        // console.log("Email is Not Proper")
        isError = true;
    }
    if(!(passwordPattern.test(password))){
        setPasswordFlag(true);
        setPasswordError("Please Enter Valid Password");
        // console.log("Please Enter Valid Password")
        isError = true;
    }
    return isError;
  }

  const submit = () => {
    if(patternCheck()){
        console.log("Error Occured");
    }
    else{
        console.log("Success");
        const data = {
            "email": email,
            "password": password,
        }
        services.SignIn(data)
        .then((data) => {
            console.log('Login successful'+JSON.stringify(data.config.data));
            localStorage.setItem("bookStoreUser",data.config.data);
            // nextPath("../")
        })
        .catch((err) => {
            console.log('Login Error'+err);
        })
    }
  };

  return (
      <>
        <Dialog open={true}>
    <div className={classes.loginMain}>
        <div className={classes.header}>
         Login 
        <Button onClick={() => nextPath("../SignUp")}> Sign Up </Button>
        </div>
      <div className={classes.inputField}>
      <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailFlag}
              helperText={emailError}
              fullWidth
              className={classes.input}
              label="Email"
            />
      </div>
      <div className={classes.inputField}>
      <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordFlag}
              helperText={passwordError}
              fullWidth
              className={classes.input}
              label="Password"
              type="password"
            />
      </div>
        <Button fullWidth className={classes.regButton} onClick={submit} variant="contained" >
          Login
        </Button>
    </div>
    </Dialog>
    </>
  );
}
