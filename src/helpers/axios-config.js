import axios from 'axios';

const axiosInstance = axios.create ({
    baseURL: 'https://inventory-web-backend.herokuapp.com/'
});

export {
    axiosInstance
}