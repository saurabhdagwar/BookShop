import Axios from "./axoisServices";
const baseUrl = "https://backend-bookstore.herokuapp.com/bookstore_user"
const axios = new Axios();

export default class productServices {

    getBooks = () => {
       return axios.Get(`${baseUrl}/get/book`);
    }
    
}