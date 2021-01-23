import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Services from "../../Services/userServices";
const services = new Services();

const useStyles = makeStyles((theme) => ({
 
  signUpMain: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: "10px",
    width: "350px",
        [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  Title: {
    width: "100%",
    height: "10%",
    backgroundColor: "#A03037",
    color: "white",
    textAlign: "center",
    fontSize: "25px",
    fontWeight: "bold",
  },
  SignUpBody: {
    padding: "30px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    width: "90%",
    fontSize: "1.2em",
    fontFamily: "roboto,'Noto Sans Myanmar UI',arial,sans-serif",
    color: "#A03037",
  },
  inputField: {
    margin: "5px 0 5px 0",
    width: "90%",
  },
  input: {
    color: "#A03037",
  },
  signUpButton: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
  regButton: {
    marginTop: "20px",
    background: "#A03037",
    width: "90%",
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  const [name, setName] = React.useState();
  const [nameFlag, setNameFlag] = React.useState();
  const [nameError, setNameError] = React.useState("");
  const [email, setEmail] = React.useState();
  const [emailFlag, setEmailFlag] = React.useState(false);
  const [emailError, setEmailError] = React.useState("");
  const [password, setPassword] = React.useState();
  const [passwordFlag, setPasswordFlag] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState("");
  const [mobile, setMobile] = React.useState();
  const [mobileFlag, setMobileFlag] = React.useState(false);
  const [mobileError, setMobileError] = React.useState("");

  const nextPath = (path) => {
    props.history.push(path);
  };

  const makeInitial = () => {
    setNameFlag(false);
    setNameError("");
    setEmailFlag(false);
    setEmailError("");
    setMobileFlag(false);
    setMobileError("");
    setPasswordFlag(false);
    setPasswordError("");
  };

  const patternCheck = () => {
    makeInitial();
    const namePattern = /^[A-Z]{1}[a-z ]{3,}$/;
    const emailPattern = /[a-zA-Z0-9._]+[@]{1}[a-zA-Z120-9]*[.]{1}[a-zA-Z]*$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/;
    const mobilePattern = /^[6-9]{1}[0-9]{9}$/;
    let isError = false;
    if (!namePattern.test(name)) {
      setNameFlag(true);
      setNameError("Name is Not Proper");
      isError = true;
    }
    if (!mobilePattern.test(mobile)) {
      setMobileFlag(true);
      setMobileError("Mobile Number is Not Proper");
      isError = true;
    }
    if (!emailPattern.test(email)) {
      setEmailFlag(true);
      setEmailError("Email is Not Proper");
      isError = true;
    }
    if (!passwordPattern.test(password)) {
      setPasswordFlag(true);
      setPasswordError("Please Enter Valid Password");
      isError = true;
    }
    return isError;
  };

  const submit = () => {
    if (patternCheck()) {
      console.log("Error Occured");
    } else {
      console.log("Success");
      const data = {
        fullName: name,
        email: email,
        password: password,
        phone: mobile,
      };
      services
        .SignUp(data)
        .then((data) => {
          console.log("registration successful" + data);
          nextPath("../Login");
        })
        .catch((err) => {
          console.log("Registration Error" + err);
        });
    }
  };

  return (
    <>
      <Dialog open={true} className={classes.mainDialog}>
        <div className={classes.signUpMain}>
          <div className={classes.Title}>Book Store</div>
          <div className={classes.SignUpBody}>
            <div className={classes.header}>
              <Button onClick={() => nextPath("../Login")}> Login </Button>
              Sign Up
            </div>
            <div className={classes.inputField}>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={nameFlag}
                helperText={nameError}
                fullWidth
                className={classes.input}
                label="Full Name"
              />
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
            <div className={classes.inputField}>
              <TextField
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                error={mobileFlag}
                helperText={mobileError}
                fullWidth
                className={classes.input}
                label="Mobile"
                type="number"
              />
            </div>
            <Button
              fullWidth
              className={classes.regButton}
              onClick={submit}
              variant="contained"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
