import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {getInventarioById, putInventario, deleteInventario, getInventarios } from '../../services/inventarioService';
import {getUsuarios} from '../../services/usuarioService';
import {getMarcas} from '../../services/marcaService';
import {getTipos} from '../../services/tipoEquipoService';
import {getEstados} from '../../services/estadoEquipoService';
import Swal from 'sweetalert2';

export const InventarioUpdate = () => {
    
    const {inventarioId = ''} = useParams();
    const history = useHistory();

    const [inventario, setInventario] = useState({});
    const [valoresForm, setValoresForm] =  useState({});

    const [usuarios, setUsuarios] =  useState([]);
    const [marcas, setMarcas] =  useState([]);
    const [tipos, setTipos] =  useState([]);
    const [estados, setEstados] =  useState([]);
    
    const {serial = '', modelo = '', descripcion = '', color = '', foto = '', 
            fechaCompra='', precio= '', usuario, marca, tipo, estado} = valoresForm;

    const listarUsuarios = async () => {
        try {
            const {data} = await getUsuarios();
            setUsuarios(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        listarUsuarios();
        }, []);

        
    const listarMarcas = async () => { 
        try {
            const {data} = await getMarcas();
            setMarcas(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }    
    }
    
    useEffect(() => {
        listarMarcas();
    }, []);
    
    const listarTipos = async () => {  
        try {
            const {data} = await getTipos();
            setTipos(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
        
    useEffect(() => {
        listarTipos();
    }, []);

    const listarEstados = async () => {  
        try {
            const {data} = await getEstados();
            setEstados(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarEstados();
    }, []); 

    const listarInventario = async () => {
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: "Cargando..."
              });
            Swal.showLoading();
            const {data} = await getInventarioById(inventarioId);
            console.log(data); 
            setInventario(data);
            Swal.close();
        } catch (error) {
            console.log(error); 
            Swal.close();
        }
    }

    useEffect(() => {
        listarInventario();
      }, [inventarioId]);

    useEffect(() => {

        setValoresForm({
            serial: inventario.serial,
            modelo: inventario.modelo,
            descripcion: inventario.descripcion,
            color: inventario.color,
            foto: inventario.foto,
            fechaCompra: inventario.fechaCompra,
            precio: inventario.precio,
            usuario: inventario.usuario,
            marca: inventario.marca,
            tipo: inventario.tipoEquipo,
            estado: inventario.estadoEquipo,
        });
        
    }, [inventario]);

    const handleOnChange = ({target}) => {
        const { name, value} = target;
        setValoresForm({...valoresForm, [name]: value});
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const inventario = {
            serial, modelo, descripcion, color, foto,
             fechaCompra, precio,
             usuario:{
                _id: usuario
             },
             marca: {
                _id: marca
             },
             tipoEquipo: {
                _id: tipo
             },
             estadoEquipo: {
                _id: estado
             }
        }

        console.log(inventario);

        try {
            Swal.fire({
                allowOutsideClick: false,
                text: "Cargando..."
            });
            Swal.showLoading();
            const {data} = await putInventario(inventarioId, inventario);
            console.log(data);
            Swal.close();

            const MySwal = (Swal);

            await MySwal.fire({
                title: "Hecho",
                text: "¡Inventario actualizado con éxito!",
                icon: 'success',
            })

            listarInventario();

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
                title: '¿De verdad quieres eliminar este inventario?',
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
                    const {data} = await deleteInventario(inventarioId, inventario);
                    console.log(data);

                    const MySwal = (Swal);

                    await MySwal.fire('¡Inventario eliminado con éxito!', '', 'success'); 
                    
                    history.push('/');

                } else if (result.isDenied) {
                    Swal.fire('¡El inventario no se eliminó!', '', 'info')
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
                <h5 className='card-title'>Detalles del activo (Modificar/Eliminar)</h5>
            </div>
            <div className='card-body'>
                <div className='row'>
                    <div className='col-md-3'>
                        <img src={inventario?.foto}/>
                    </div>
                    <div className='col-md-9'>
                        <form onSubmit={(e) => handleOnSubmit(e)}>
                        <div className="row">
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Serial:</label>
                                    <input type="text" name="serial" 
                                        required
                                        minLength={3}
                                        value={serial} 
                                        onChange={(e) => handleOnChange(e)}
                                        className="form-control"/>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Modelo:</label>
                                    <input type="text" name="modelo" 
                                        required
                                        value={modelo} 
                                        onChange={(e) => handleOnChange(e)}
                                        className="form-control"/>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Descripción:</label>
                                    <input type="text" name="descripcion" 
                                        required
                                        value={descripcion} 
                                        onChange={(e) => handleOnChange(e)}
                                        className="form-control"/>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Color:</label>
                                    <input type="text" name="color" 
                                        required
                                        value={color} 
                                        onChange={(e) => handleOnChange(e)}
                                        className="form-control"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Foto:</label>
                                    <input type="url" name="foto" 
                                        required
                                        value={foto} 
                                        onChange={(e) => handleOnChange(e)}
                                        className="form-control"/>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Fecha de compra:</label>
                                    <input type="date" name="fechaCompra" 
                                        onChange={(e) => handleOnChange(e)}
                                        value={fechaCompra} className="form-control"/>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Precio:</label>
                                    <input type="number" name="precio" 
                                        required
                                        value={precio} 
                                        onChange={(e) => handleOnChange(e)}
                                        className="form-control"/>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Usuario:</label>
                                    <select className="form-select" 
                                        onChange={(e) => handleOnChange(e)}
                                        name='usuario'
                                        value={usuario}>
                                        <option value="">Seleccione...</option>
                                        {
                                            usuarios.map(({_id, nombre}) => {
                                                return <option key={_id} value={_id}>
                                                    {nombre}
                                                </option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Marca:</label>
                                    <select className="form-select"  
                                        onChange={(e) => handleOnChange(e)}
                                        name="marca"
                                        value={marca}>
                                        <option value="">Seleccione...</option>
                                        {
                                            marcas.map(({_id, nombre}) => {
                                                return <option key={_id} value={_id}>
                                                    {nombre}
                                                </option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Tipo de equipo:</label>
                                    <select className="form-select" 
                                        onChange={(e) => handleOnChange(e)}
                                        name="tipo"
                                        value={tipo}>
                                        <option value="">Seleccione...</option>
                                        {
                                            tipos.map(({_id, nombre}) => {
                                                return <option key={_id} value={_id}>
                                                    {nombre}
                                                </option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Estado de equipo:</label>
                                    <select className="form-select" 
                                        onChange={(e) => handleOnChange(e)}
                                        name="estado"
                                        value={estado}>                                       
                                        <option value="">Seleccione...</option>
                                        {
                                            estados.map(({_id, nombre}) => {
                                                return <option key={_id} value={_id}>
                                                    {nombre}
                                                </option>
                                            })
                                        }
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
