import { axiosInstance } from '../helpers/axios-config';

const getEstados = () => {
    return axiosInstance.get('estado-equipo', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const postEstado = (data) => {
    return axiosInstance.post('estado-equipo', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const putEstado = (estadoEquipoId, data) => {
    return axiosInstance.put(`estado-equipo/${estadoEquipoId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    }); 
}

const getEstadoById = (estadoEquipoId) => {
    return axiosInstance.get(`estado-equipo/${estadoEquipoId}`, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const deleteEstado = (estadoEquipoId) => {
    return axiosInstance.delete(`estado-equipo/${estadoEquipoId}`, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

export {
    getEstados, postEstado, putEstado, getEstadoById, deleteEstado
}