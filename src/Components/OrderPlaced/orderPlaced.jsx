import React from "react";
import "./orderPlaced.css";
import placed from "../../assets/Placed.JPG";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: "18px",
  },
  shopingButton: {
    marginTop: "1%",
    backgroundColor: "",
  },
}));

export default function OrderPlaced(props) {
  const classes = useStyles();
  const random = Math.floor((Math.random() * 1000000 ) + 1);
  return (
    <div className="placedBody">
      <img className="successfulImage" src={placed} alt="" />
      <Typography className={classes.text}>
        hurry!!!your order is confirmed{" "}
      </Typography>
      <Typography className={classes.text}>
        {" "}
        the order id is #{random} save the order id for
      </Typography>
      <Typography className={classes.text}>future communication </Typography>

      <table className="orderTable">
        <tr>
          <th>Email Us</th>
          <th>Contact Us</th>
          <th>Address</th>
        </tr>
        <tr>
          <td>admin@bookstore.com</td>
          <td>+91 8163475881</td>
          <td>
            42, 14 main 15th Cross, Sector 4, opp to BDA complex near Kamarakom
            restaurent HSR layout Banglore 560034
          </td>
        </tr>
      </table>
      <Button
        className={classes.shopingButton}
        onClick={(e) => {
          props.nextPath(e, "../dashboard");
        }}
        variant="contained"
        color="primary"
      >
        CONTINUE SHOPPING
      </Button>
    </div>
  );
}
