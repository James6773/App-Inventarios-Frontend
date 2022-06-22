import React, {useState, useEffect} from "react";
import {getMarcas, postMarca} from '../../services/marcaService';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export const MarcaView = () => {
   
    const [valoresForm, setValoresForm] =  useState({});
    const {nombre = '', estado = ''} = valoresForm;

    const [marcas, setMarcas] = useState([]);

    const resetHandleOnSubmit = () => {
        setValoresForm("");
    }

    const listarMarcas = async () => {
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: "Cargando..."
            });
            Swal.showLoading();
            const {data} = await getMarcas();
            console.log(data);
            setMarcas(data);
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();
        }
      }
    
      useEffect(() => {
        listarMarcas();
      }, []);

    const handleOnChange = ({target}) => {
        const { name, value} = target;
        setValoresForm({...valoresForm, [name]: value});
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const marca = {
            nombre, estado,  
        }

        console.log(marca);

        try {
            Swal.fire({
                allowOutsideClick: false,
                text: "Cargando..."
            });
            Swal.showLoading();
            const {data} = await postMarca(marca);
            console.log(data);
            Swal.close();

            const MySwal = (Swal);

            await MySwal.fire({
                title: "Hecho",
                text: "¡Marca creada con éxito!",
                icon: 'success'
            })
            
            resetHandleOnSubmit();
            listarMarcas();
            
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
                    <h5 className='card-title'>Crear nueva marca</h5>
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
                    <div className="scrollme">
                        <table className="table table-stripped">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre:</th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th scope="col">Estado:</th>
                                
                                
                                <th scope="col"><center>Modificar/Eliminar registro:</center></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    marcas.length > 0 &&  marcas.map((marca, index) => {
                                        return (
                                                <tr>
                                                <th scope="row">{index + 1}</th>
                                                <td>{marca.nombre}</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>{marca.estado}</td>
                                                <td>  
                                                    <center><Link to={`marcas/edit/${marca._id}`}>Editar...</Link></center>    
                                                </td>
                                                </tr> 
                                        )
                                    })
                                }
                            </tbody>    
                        </table>    
                    </div>
                </div>
            </div>
        </div>
    )
}