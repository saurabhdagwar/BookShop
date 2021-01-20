import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Services from "../../Services/productServices";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import bookImg from "../../assets/Image11.png";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
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
    height: '40px',
    position: 'relative',
  },
}));

export default function Cart(props) {
  const classes = useStyles();
  const [books, setBooks] = React.useState([]);
  const [detailForm, setDetailForm] = React.useState();

  React.useEffect(() => {
    allCartItem();
  }, []);

  const allCartItem = () => {
    services
      .getCartItem()
      .then((data) => {
        console.log(data.data.result);
        setBooks(data.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
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

  return (
    <div className="cartBody">
      <div className="cartBlock">
        <div className="cartContainer">
          My Cart <CartBooks />
        </div>
        <Button
          variant="contained"
          color="primary"
          className={classes.placeButton}
        >
          Place Order
        </Button>
      </div>
      <div className="cartBlock">
        <div className="cartContainer">Customer Details</div>
      </div>
      <div className="cartBlock">
        <div className="cartContainer">Order Summary</div>
      </div>
    </div>
  );
}
