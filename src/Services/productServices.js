import Axios from "./axoisServices";
const baseUrl = "https://backend-bookstore.herokuapp.com/bookstore_user";
const axios = new Axios();

export default class productServices {
  getBooks = () => {
    return axios.Get(`${baseUrl}/get/book`);
  };

  addToCart = (id) => {
    const user = localStorage.getItem("bookStoreToken")
    return axios.Post(`${baseUrl}/add_cart_item/${id}`,false,{
        headers: {
          "x-access-token": `${user}`,
        },
      });
  };

  getCartItem = () => {
    const user = localStorage.getItem("bookStoreToken")
    return axios.Get(`${baseUrl}/get_cart_item`,false,{
        headers: {
          "x-access-token": `${user}`,
        },
      });
  };
  
}
