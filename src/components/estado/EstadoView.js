import React, {useState, useEffect} from "react";
import {getEstados, postEstado} from '../../services/estadoEquipoService';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export const EstadoView = () => {

    const [valoresForm, setValoresForm] =  useState({});
    const {nombre = '', estado = ''} = valoresForm;

    const [estadoEquipos, setEstados] = useState([]);

    const resetHandleOnSubmit = () => {
        setValoresForm("");
    }

    const listarEstados = async () => {
        try {
            Swal.fire({
              allowOutsideClick: false,
              text: "Cargando..."
            });
            Swal.showLoading();
            const {data} = await getEstados();
            console.log(data);
            setEstados(data);
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();
        }
    }
    
      useEffect(() => {
        listarEstados();
      }, []);

    const handleOnChange = ({target}) => {
        const { name, value} = target;
        setValoresForm({...valoresForm, [name]: value});
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const estadoEquipo = {
            nombre, estado,  
        }

        console.log(estadoEquipo);

        try {
            Swal.fire({
                allowOutsideClick: false,
                text: "Cargando..."
            });
            Swal.showLoading();
            const {data} = await postEstado(estadoEquipo);
            console.log(data);
            Swal.close();

            const MySwal = (Swal);

            await MySwal.fire({
                title: "Hecho",
                text: "¡Estado de equipo creado con éxito!",
                icon: 'success'
            })

            resetHandleOnSubmit();
            listarEstados();

        } catch (error) {
            console.log(error);
            Swal.close();

            let mensaje;
            if (error && error.response && error.response.data) {
                mensaje = error.response.data;
            } else {
                mensaje = '¡Ocurrió un error!, por favor intentelo de nuevo...';
            }
            Swal.fire('Error:', mensaje, 'error');
        }
    }

    return (
        <div className='container-fluid mt-3 mb-2'>
            <div className='card'>
                <div className='card-header'>
                    <h5 className='card-title'>Crear nuevo estado de equipo</h5>
                </div>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-md-9'>
                            <form onSubmit={(e) => handleOnSubmit(e)}>
                            <div className="row">
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Nombre:</label>
                                        <input type="text" name="nombre" 
                                            required
                                            minLength={2}
                                            value={nombre} 
                                            onChange={(e) => handleOnChange(e)}
                                            className="form-control"/>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Estado:</label>
                                        <select className="form-select"
                                            required
                                            onChange={(e) => handleOnChange(e)}
                                            name="estado"
                                            value={estado}>
                                            <option value="">Seleccione...</option>
                                                <option value="Activo">Activo</option>
                                                <option value="Inactivo">Inactivo</option>
                                        </select>
                                    </div>
                                </div>
                            </div>   
                            <div className='row'>
                                <div className='col'>
                                    <button type="submit" className="btn btn-success">Guardar</button>
                                </div>
                            </div>
                            </form>    
                        </div>
                    </div>
                    <div>
                        <hr></hr>
                    </div>
                    <div>
                    
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col"></th>
                            <th scope="col">Nombre:</th>
                            <th scope="col">Estado:</th>
                            <th scope="col"></th>
                            <th scope="col"><center>Modificar/Eliminar registro:</center></th>
                            </tr>
                        </thead>
                            {
                                estadoEquipos.map((estadoEquipo) => {
                                    return (
                                        <tbody>
                                            <tr>
                                            <th scope="row">
                                            {
                                                
                                            }       
                                            </th>
                                            <td>{estadoEquipo.nombre}</td>
                                            <td>{estadoEquipo.estado}</td>
                                            <td></td>
                                            <td>  
                                                <center><Link to={`estados/edit/${estadoEquipo._id}`}>Editar...</Link></center>    
                                            </td>
                                            </tr> 
                                        </tbody>
                                    )
                                })
                            }
                    </table>    
                    </div>
                </div>
            </div>
        </div>
    )
}