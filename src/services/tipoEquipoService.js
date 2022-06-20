import { axiosInstance } from '../helpers/axios-config';

const getTipos = () => {
    return axiosInstance.get('tipo-equipo', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const postTipo = (data) => {
    return axiosInstance.post('tipo-equipo', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const putTipo = (tipoEquipoId, data) => {
    return axiosInstance.put(`tipo-equipo/${tipoEquipoId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    }); 
}

const getTipoById = (tipoEquipoId) => {
    return axiosInstance.get(`tipo-equipo/${tipoEquipoId}`, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const deleteTipo = (tipoEquipoId) => {
    return axiosInstance.delete(`tipo-equipo/${tipoEquipoId}`, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}


export {
    getTipos, postTipo, putTipo, getTipoById, deleteTipo
}