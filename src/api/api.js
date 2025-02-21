import axios from "axios";

const instance = axios.create({
    baseURL: "https://bfhl-backend-kueu.onrender.com", 
});

export default instance;
