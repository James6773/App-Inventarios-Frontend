import axios from 'axios';

const axiosInstance = axios.create ({
    baseURL: 'https://inventory-web-backend.herokuapp.com/'
});

export {
    axiosInstance
}

//https://localhost:4000/

//https://inventory-web-backend.herokuapp.com/
