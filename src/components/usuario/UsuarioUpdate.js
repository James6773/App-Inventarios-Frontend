import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {getUsuarioById, putUsuario, deleteUsuario} from '../../services/usuarioService';
import Swal from 'sweetalert2';

export const UsuarioUpdate = () => {

    const {usuarioId} = useParams();
    const history = useHistory();

    const [usuario, setUsuario] = useState([]);

    const [valoresForm, setValoresForm] =  useState({});
    const {nombre = '', email = '', estado = ''} = valoresForm;

    const listarUsuario = async () => {
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: "Cargando..."
              });
            Swal.showLoading();
            const {data} = await getUsuarioById(usuarioId);
            console.log(data); 
            setUsuario(data);
            Swal.close();
        } catch (error) {
            console.log(error); 
            Swal.close();
        }
    }

    useEffect(() => {
        listarUsuario();
      }, [usuarioId]);

    useEffect(() => {
       
        setValoresForm({
            nombre: usuario.nombre,
            email: usuario.email,
            estado: usuario.estado,
        });

    }, [usuario]);

    const handleOnChange = ({target}) => {
        const { name, value} = target;
        setValoresForm({...valoresForm, [name]: value});
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const usuario = {
            nombre, email, estado,  
        }

        console.log(usuario);

        try {
            Swal.fire({
                allowOutsideClick: false,
                text: "Cargando..."
            });
            Swal.showLoading();
            const {data} = await putUsuario(usuarioId, usuario);
            console.log(data);
            Swal.close();

            const MySwal = (Swal);

            await MySwal.fire({
                title: "Hecho",
                text: "¡Usuario actualizado con éxito!",
                icon: 'success'
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
                title: '¿De verdad quieres eliminar este usuario?',
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
                    const {data} = await deleteUsuario(usuarioId, usuario);
                    console.log(data);

                    const MySwal = (Swal);

                    await MySwal.fire('¡Usuario eliminado con éxito!', '', 'success'); 

                    history.push('/usuarios');

                } else if (result.isDenied) {
                    Swal.fire('¡El usuario no se eliminó!', '', 'info')
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
                <h5 className='card-title'>Editar usuario</h5>
            </div>
            <div className='card-body'>
                <div className='row'>
                    <div className='col-md-12'>
                        <form onSubmit={(e) => handleOnSubmit(e)}>
                            <div className="row">
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Nombre:</label>
                                        <input type="text" name="nombre" 
                                            required
                                            minLength={1}
                                            value={nombre} 
                                            onChange={(e) => handleOnChange(e)}
                                            className="form-control"/>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Email:</label>
                                        <input type="email" name="email" 
                                            required
                                            value={email} 
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
                                        <button type="submit" className="btn btn-danger" 
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


