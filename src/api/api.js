import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3001", // Change to deployed backend URL
});

export default instance;
