import axios from "axios";
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_KEY,
  "Content-Type": "multipart/form-data",
});

export default instance;
