import axiosInstance from "axios";

const axios = axiosInstance.create({
    // baseURL: "http://localhost:8000",
    // baseURL: "http://192.168.1.9:8000",
    // baseURL: "https://nikah.hillindo-digital.com",
    baseURL: "https://pastinikah.id",
});

export default axios;