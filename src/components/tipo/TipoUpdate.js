import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {deleteTipo, getTipoById, putTipo} from '../../services/tipoEquipoService';
import Swal from 'sweetalert2';

export const TipoUpdate = () => {
 
    const {tipoEquipoId} = useParams();
    const history = useHistory();

    const [tipoEquipo, setTipo] = useState([]);

    const [valoresForm, setValoresForm] =  useState({});
    const {nombre = '', estado = ''} = valoresForm;

    const listarTipo = async () => {
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: "Cargando..."
              });
            Swal.showLoading();
            const {data} = await getTipoById(tipoEquipoId);
            console.log(data); 
            setTipo(data);
            Swal.close();
        } catch (error) {
            console.log(error); 
            Swal.close();
        }
    }

    useEffect(() => {
        listarTipo();
      }, [tipoEquipoId]);

    useEffect(() => {
       
        setValoresForm({
            nombre: tipoEquipo.nombre,
            estado: tipoEquipo.estado,
        });

    }, [tipoEquipo]);

    const handleOnChange = ({target}) => {
        const { name, value} = target;
        setValoresForm({...valoresForm, [name]: value});
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const tipoEquipo = {
            nombre, estado,  
        }

        console.log(tipoEquipo);

        try {
            Swal.fire({
                allowOutsideClick: false,
                text: "Cargando..."
            });
            Swal.showLoading();
            
            const {data} = await putTipo(tipoEquipoId, tipoEquipo);
            console.log(data);
            Swal.close();

            const MySwal = (Swal);

            await MySwal.fire({
                title: "Hecho",
                text: "¡Tipo de equipo actualizado con éxito!",
                icon: 'success'
            })

            listarTipo();
    
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
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

    const handleOnDelete = async (e) => {
        e.preventDefault();

        try {
            Swal.fire({
                allowOutsideClick: false,
                text: "Cargando..."
            });
            Swal.showLoading();
            Swal.close();
            
            Swal.fire({
                title: '¿De verdad quieres eliminar este tipo de equipo?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Sí',
                denyButtonText: 'Cancelar',
                cancelButtonText: '',
                customClass: {
                actions: 'my-actions',
                cancelButton: 'order-3',
                confirmButton: 'order-1',
                denyButton: 'order-2',
                }
            }).then( async (result) => {
                if (result.isConfirmed) {
                    const {data} = await deleteTipo(tipoEquipoId, tipoEquipo);
                    console.log(data);

                    const MySwal = (Swal);

                    await MySwal.fire('¡Tipo de equipo eliminado con éxito!', '', 'success'); 

                    history.push('/tipos');

                } else if (result.isDenied) {
                    Swal.fire('¡El tipo de equipo no se eliminó!', '', 'info')
                }
            })

        } catch (error) {
            console.log(error);
            console.log(error.response.data);
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
                <h5 className='card-title'>Editar tipo de equipo</h5>
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
                                <div className='d-grid gap-2 d-md-block'>
                                    <div>
                                        <button type="submit" className="btn btn-success">Guardar cambios</button>
                                        <span>      </span>
                                        <button type="delete" className="btn btn-danger" 
                                            onClick={(e) => handleOnDelete(e)}>Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
  )
}
