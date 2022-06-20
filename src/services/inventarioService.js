import { axiosInstance } from '../helpers/axios-config';

const getInventarios = () => {
    return axiosInstance.get('inventario', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const postInventario = (data) => {
    return axiosInstance.post('inventario', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const putInventario = (inventarioId, data) => {
    return axiosInstance.put(`inventario/${inventarioId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    }); 
}

const getInventarioById = (inventarioId) => {
    return axiosInstance.get(`inventario/${inventarioId}`, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const deleteInventario = (inventarioId) => {
    return axiosInstance.delete(`inventario/${inventarioId}`, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}


export {
    getInventarios, postInventario, putInventario, getInventarioById, deleteInventario 
}

