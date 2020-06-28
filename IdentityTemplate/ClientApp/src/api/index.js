import axios from "axios";

const instance = axios.create();

//do other things to axios, like intercept requests and add valid bearer token, etc.

export default instance;