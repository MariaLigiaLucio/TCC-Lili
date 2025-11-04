import axios from "axios";

const api = axios.create({
    baseURL: "https://tcc-classea.vercel.app/api",
});

export default api;
