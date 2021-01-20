import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Services from "../../Services/productServices";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import bookImg from "../../assets/Image11.png";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import "./cart.css";

const services = new Services();

const useStyles = makeStyles((theme) => ({
  bookName: {
    fontSize: "13px",
    fontWeight: "bold",
  },
  bookAuthor: {
    fontSize: "12px",
  },
  bookPrize: {
    fontSize: "13px",
    fontWeight: "bold",
  },
  countInput: {
    border: "1px lightgray solid",
    width: "15%",
    height: "30px",
  },
  countButton: {
    height: "5px",
    margin: "5px",
    border: "1px solid lightgray",
    width: "5px",
  },
  placeButton: {
    height: "40px",
    position: "relative",
  },
  inputField: {
    border: "1px solid lightgray",
    borderRadius: "5px",
    padding: "5px",
  },
  inputAdderss: {
    border: "1px solid lightgray",
    borderRadius: "5px",
    padding: "5px",
    minHeight: "43px",
  },
  radioGroup:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
}));

export default function Cart(props) {
  const classes = useStyles();
  const [books, setBooks] = React.useState([]);
  const [detailForm, setDetailForm] = React.useState(false);
  const [summaryField, setSummaryField] = React.useState(false);
  const [value, setValue] = React.useState("Home");

  React.useEffect(() => {
    allCartItem();
  }, []);

  const allCartItem = () => {
    services
      .getCartItem()
      .then((data) => {
        console.log(data.data.result);
        setBooks(data.data.result);
        props.setTotalCartItem(data.data.result.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const CartBooks = () => {
    return (
      <div className="cartItem">
        {books.map((data) => (
          <div className="cartBookItem">
            <img className="cartBookImage" src={bookImg} alt="" />
            <div className="infoContainer">
              <Typography className={classes.bookName}>
                {data.product_id.bookName}
              </Typography>
              <Typography className={classes.bookAuthor}>
                {data.product_id.author}
              </Typography>
              <Typography className={classes.bookPrize}>
                Rs. {data.product_id.price}
              </Typography>
              <div className="countItem">
                <IconButton className={classes.countButton}>-</IconButton>
                <InputBase
                  className={classes.countInput}
                  value={data.product_id.quantity}
                />
                <IconButton className={classes.countButton}>+</IconButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const CustomerDetailsForm = () => {
    return (
      <>
        <span className="inlineField">
          <div className="inputField">
            Full Name
            <InputBase className={classes.inputField} placeholder="Full Name" />
          </div>
          <div className="inputField">
            Mobile Number
            <InputBase
              className={classes.inputField}
              placeholder="Mobile Number"
            />
          </div>
        </span>
        <span className="inlineField">
          <div className="inputAdderssField">
            Address
            <InputBase
              className={classes.inputAdderss}
              placeholder="Adderss"
              multiline
              fullWidth
            />
          </div>
        </span>
        <span className="inlineField">
          <div className="inputField">
            City/Town
            <InputBase className={classes.inputField} placeholder="City/Town" />
          </div>
          <div className="inputField">
            State
            <InputBase className={classes.inputField} placeholder="State" />
          </div>
        </span>
        <span className="inlineField">
          <div className="inputField">
            Type
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={value}
                onChange={handleChange}
                className={classes.radioGroup}
              >
                <FormControlLabel
                  value="Home"
                  control={<Radio />}
                  label="Home"
                />
                <FormControlLabel
                  value="Work"
                  control={<Radio />}
                  label="Work"
                />
                <FormControlLabel
                  value="Other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </span>
      </>
    );
  };

  const CheckoutItem = () => {

    return (
      <div className="cartItem">
      {books.map((data) => (
        <div className="cartBookItem">
          <img className="cartBookImage" src={bookImg} alt="" />
          <div className="infoContainer">
            <Typography className={classes.bookName}>
              {data.product_id.bookName}
            </Typography>
            <Typography className={classes.bookAuthor}>
              {data.product_id.author}
            </Typography>
            <Typography className={classes.bookPrize}>
              Rs. {data.product_id.price}
            </Typography>
          </div>
        </div>
      ))}
    </div>
    )
  } 

  return (
    <div className="cartBody">
      <div className="cartContainer">
        My Cart ({books.length})
        <CartBooks />
        <div className="blockButton">
          <Button
            variant="contained"
            color="primary"
            className={classes.placeButton}
            onClick={() => setDetailForm(true)}
          >
            PLACE ORDER
          </Button>
        </div>
      </div>
      <div className="cartContainer">
        Customer Details
      { detailForm ? <>
        <CustomerDetailsForm />
        <div className="blockButton">
          <Button
            variant="contained"
            color="primary"
            className={classes.placeButton}
            onClick={() => setSummaryField(true)}
          >
            CONTINUE
          </Button>
        </div> </> : "" }
      </div>

      <div className="cartContainer">Order Summary
        {summaryField ? 
      <>
      <CheckoutItem />
      <div className="blockButton">
          <Button
            variant="contained"
            color="primary"
            className={classes.placeButton}
          >
           CHECKOUT
          </Button>
        </div>
        </> : ""}
      </div>
    </div>
  );
}
