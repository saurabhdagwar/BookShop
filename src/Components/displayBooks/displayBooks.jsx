import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Services from "../../Services/productServices";
import bookImg from "../../assets/Image11.png";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import "./displayBooks.css";
const services = new Services();

const useStyles = makeStyles((theme) => ({
  bookName: {
    fontSize: "13px",
    fontWeight: "bold",
  },
  bookAuthor: {
    fontSize: "12px",
  },
  bookQuantity: {
    fontSize: "12px",
  },
  bookPrize: {
    fontSize: "13px",
    fontWeight: "bold",
  },
  addToBagButton: {
    padding: "3px 4px 3px 4px",
    margin: "5px",
    width: "85px",
    fontSize: "11px",
    backgroundColor: "#A03037",
    color: "#ffff",
    borderRadius: "2px",
  },
  wishListButton: {
    padding: "3px 4px 3px 4px",
    margin: "5px",
    width: "80px",
    fontSize: "13px",
    borderRadius: "2px",
    fontWeight: "bold",
  },
  optionSelect: {
    padding: "5px 5px",
  },
}));

export default function DisplayNotes() {
  const classes = useStyles();
  const [books, setBooks] = React.useState([]);
  const [addToBag, setAddToBag] = React.useState(false);
  const [filter, setFilter] = React.useState(0);
  const [sort, setSort] = React.useState({ type: "" });
  const [anchorEl, setAnchorEl] = React.useState(null);

  React.useEffect(() => {
    getAllBooks();
  }, []);

  const getAllBooks = () => {
    services
      .getBooks()
      .then((data) => {
        setBooks(data.data.result);
        console.log(books);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    setSort({
      ...sort,
      [name]: event.target.value,
    });
  };

  const addedToBag = (e, data) => {
    e.stopPropagation();
    const id = data._id;
    services
      .addToCart(id)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="displayBook">
      <span className="topContent">
        <div>Books {books.length}</div>
        <div>
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              className={classes.optionSelect}
              native
              value={sort.type}
              onChange={handleChange}
              inputProps={{
                name: "type",
              }} >
              <option value={0} onClick={() => setFilter(0)}>Sort by relevance</option>
              <option value={1} onClick={() => setFilter(1)}>Price: low to high</option>
              <option value={2} onClick={() => setFilter(2)}>Price: high to low</option>
              <option value={3} onClick={() => setFilter(3)}>Newest Arrival</option>
            </Select>
          </FormControl>
        </div>
      </span>
      <div className="allBooks">
        {(books.sort((a, b) => (a.price > b.price) ? -1 : 1))
        .map((data) => (
          <div className="bookContainer">
            <div className="imageContainer">
              <img className="bookImage" src={bookImg} alt="" />
            </div>
            <div className="infoContainer">
              <Typography className={classes.bookName}>
                {data.bookName}
              </Typography>
              <Typography className={classes.bookAuthor}>
                {data.author}
              </Typography>
              <Typography className={classes.bookQuantity}>
                {data.quantity}
              </Typography>
              <Typography className={classes.bookPrize}>
                Rs. {data.price}
              </Typography>
            </div>
            <div className="buttonContainer">
              <Button
                variant="contained"
                onClick={(e) => addedToBag(e, data)}
                className={classes.addToBagButton}
              >
                Add To Bag
              </Button>
              <Button variant="outlined" className={classes.wishListButton}>
                WishList
              </Button>
            </div>
            <div className="descClass">
              <Typography className={classes.bookName}>Book Detail</Typography>
              {data.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
