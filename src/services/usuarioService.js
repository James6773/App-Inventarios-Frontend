import { axiosInstance } from '../helpers/axios-config';

const getUsuarios = () => {
    return axiosInstance.get('usuario', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const postUsuario = (data) => {
    return axiosInstance.post('usuario', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const putUsuario = (usuarioId, data) => {
    return axiosInstance.put(`usuario/${usuarioId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    }); 
}

const getUsuarioById = (usuarioId) => {
    return axiosInstance.get(`usuario/${usuarioId}`, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const deleteUsuario = (usuarioId) => {
    return axiosInstance.delete(`usuario/${usuarioId}`, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}


export {
    getUsuarios, postUsuario, putUsuario, getUsuarioById, deleteUsuario
}