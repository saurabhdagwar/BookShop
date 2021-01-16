import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Services from "../../Services/productServices";
import "./displayBooks.css";
import bookImg from "../../assets/Image11.png"
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const services = new Services();

const useStyles = makeStyles((theme) => ({
    bookName:{
        fontSize: "17px",
        fontWeight: "bold"
    },
    bookAuthor:{
        fontSize: "14px"
    },
    bookQuantity:{
        fontSize: "14px"
    },
    bookPrize:{
        fontSize: "15px",
        fontWeight: "bold"
    },
    addToBagButton:{
        padding: "6px 8px 6px 8px",
        margin: "5px",
        width: "90px",
        fontSize: "10px",
        backgroundColor: "#A03037",
        color: "#ffff"
    },
    wishListButton:{
        padding: "6px 8px 6px 8px",
        margin: "5px",
        width: "90px",
    }
}))

export default function DisplayNotes() {
    const classes = useStyles();
    const [books, setBooks] = React.useState([]);

    React.useEffect(() => {
        getAllBooks();
      }, []);
    
    const getAllBooks = () => {
        services.getBooks()
        .then((data) => {
            console.log(data.data.result);
            setBooks(data.data.result);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="displayBook" >
        {books.map((data) => (
            <div className="bookContainer">
                    <div className="imageContainer">
                        <img className="bookImage" src={bookImg} alt=""/>
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
                        <div className="buttonContainer">
                        <Button variant="contained" className={classes.addToBagButton}> Add To Bag </Button>
                        <Button variant="outlined" className={classes.wishListButton}> WishList </Button>
                        </div>
                    </div>

            </div>
        ))}
    </div>

    )
}