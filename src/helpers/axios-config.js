import axios from 'axios';

const axiosInstance = axios.create ({
    baseURL: 'http://localhost:4000/'
});

export {
    axiosInstance
}

//http://localhost:4000/

//https://inventory-web-backend.herokuapp.com/
