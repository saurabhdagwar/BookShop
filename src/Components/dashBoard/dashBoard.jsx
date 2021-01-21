import React from "react"
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "../AppBar/AppBar"
import Books from "../displayBooks/displayBooks"
import Services from "../../Services/productServices";
import { Switch, Route} from "react-router-dom";
import ProtectedRoutes from "../../protectedRoutes.js";
import Cart from "../cart/cart"

const services = new Services();
const useStyles = makeStyles((theme) => ({
    dashboardMain:{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white"
    }
}))    

export default function Dashboard(props) {
    const classes = useStyles();
    const [show, setShow] = React.useState(false);
    const [cartBooks, setCartBooks] = React.useState([]);

    React.useEffect(() => {
        allCartItem();
      }, []);
    
      const allCartItem = () => {
        services
          .getCartItem()
          .then((data) => {
            console.log(data.data.result);
            setCartBooks(data.data.result);
          })
          .catch((err) => {
            console.log(err);
          });
      };

    return (
        <div className={classes.dashboardMain}>
            <AppBar totalCartItem={cartBooks.length} setShow={setShow}/>
            <Switch >
            <Route path="/dashboard" exact>
            <Books cartBooks={cartBooks} />
            </Route>
            <ProtectedRoutes path="/dashboard/cart" exact>
            <Cart cartBooks={cartBooks} />
            </ProtectedRoutes>
            </Switch>
            
        </div>
    )
}