import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import GridItem from '../../components/Grid/GridItem';
import GridContainer from '../../components/Grid/GridContainer';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import {Button, TableContainer, Table, TableHead} from '@material-ui/core';
import {TableBody, TableRow, TableCell, Modal} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import Axios from 'axios';
import swal from 'sweetalert';

const StyledTableCell = withStyles((theme) => ({
	head: {
	  backgroundColor: '#3F51B5',
	  //backgroundColor: theme.palette.common.black,
	  color: theme.palette.common.white,
	},
	body: {
	  fontSize: 14,
	},
  }))(TableCell);
  
const StyledTableRow = withStyles((theme) => ({
	root: {
	  '&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	  },
	},
}))(TableRow)

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop:"100px",
    width: '78%',
    margin: 'auto',
    textAlign: 'center',
    //backgroundColor: '#154c79',
  },

  modal: {
	position: 'absolute',
	width: 400,
	backgroundColor: theme.palette.background.paper,
	border: '2px solid #000',
	boxShadow: theme.shadows[5],
	padding: theme.spacing(2, 4, 3),
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
  },
  iconos: {
	cursor: 'pointer',
  },
  buttonCancel: {
	color: 'white',
	backgroundColor: "rgb(220,53,69)",
  },
}));

const baseURL = `http://localhost:8091`;

export default function CreateEmployee() {

  const classes = useStyles();
  const [data, setData] = useState([]);
  const [dataDep, setDataDep] = useState([]);
  const [dataMun, setDataMun] = useState([{municipio_id: '', nombre:''}]);
  const [dataBanco, setDataBanco] = useState([]);
  const [dataTipoTerceros, setDataTipoTerceros] = useState([]);
  const [dataTercerosByTipo, setDataTercerosByTipo] = useState([]);
  const [dataTerceros, setDataTerceros] = useState([]);

  const [departament, setDepartament] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [banco, setBanco] = useState('');
  const [tipoTercero, setTipoTercero] = useState('');
  const [tipoNombre, setTipoNombre] = useState('');
  const [idTercero, setIdTercero] = useState(0);
  const [nomTercero, setNomTercero] = useState('');
  const [fechaVinculacion, setFechaVinculacion] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [tipoCuentaBancaria, setTipoCuentaBancaria] = useState('');

  const [tipoDocEmpleado, setTipoDocEmpleado] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [idMunicipio, setIdMunicipio] = useState(0);
  const [correoEmpleado, setCorreoEmpleado] = useState('');
  const [idBanco, setIdBanco] = useState(0);
  const [numCuentaBancaria, setNumCuentaBancaria] = useState('');
  const [tipoCuentaEmpleado, setTipoCuentaEmpleado] = useState('');
  const [fechaExpiracion, setFechaExpiracion] = useState('');
  
  const styles = useStyles();
  const [state, setState] = useState({});
  const [modalConfirmacion, setModalConfirmacion] = useState(false);

  const handleChange = (event) => {
	setState({ ...state, [event.target.name]: event.target.checked });
  };

  const bodyConfirmacion = (
	<div className={styles.modal}>
		<h3>Registrar Empleado</h3	>
		<p>¿Esta seguro que desea registrar este empleado?</p>
		<br /><br />
		<div align="right">
			<Button 
				variant="contained"
				color="primary"
				startIcon={<AddCircleIcon />}
				style={{marginRight:"18px"}}
				onClick={addEmpleadoPOST}
			>Registrar
			</Button>

			<Button
				className={styles.buttonCancel} 
				variant="contained"
				color="secondary"
				startIcon={<CancelIcon />}
				onClick={() => abrirCerrarModalConfirmacion()}
			>Cancelar
			</Button>
		</div>
	</div>
  );

  const getInfoByID = () => {
	let baseURLHV = 'http://localhost:8092/hojas-vida/buscar-por-id/';
	let urlGetInfoByID = baseURLHV+localStorage.getItem('idNewEmployee');
	 Axios.get(urlGetInfoByID)
		.then((response) => {
			console.log(response.data)
			setData(response.data)
		})
		.catch((error) => {
			console.log(error);
	});
  };

  const getListDep = () => {
	let urlGetListDep = baseURL+'/listarDepartamentos';
	 Axios.get(urlGetListDep)
		.then((response) => {
			console.log(response.data)
			setDataDep(response.data)
		})
		.catch((error) => {
			console.log(error);
	});
  };

  const getListMun = (departamentoId) => {
	let urlGetListMun = baseURL+'/listarMunicipiosPorDepartamento/'+departamentoId;
	 Axios.get(urlGetListMun)
		.then((response) => {
			console.log(response.data)
			setDataMun(response.data)
		})
		.catch((error) => {
			console.log(error);
	});
  };

  const getListBanc = () => {
	let urlGetListBanc = baseURL+'/listarBancos';
	 Axios.get(urlGetListBanc)
		.then((response) => {
			console.log(response.data)
			setDataBanco(response.data)
		})
		.catch((error) => {
			console.log(error);
	});
  };

  const getListTiposTerceros = () => {
	let urlGetListTiposTerceros = baseURL+'/listarTipoTerceros';
	 Axios.get(urlGetListTiposTerceros)
		.then((response) => {
			console.log(response.data)
			setDataTipoTerceros(response.data)
		})
		.catch((error) => {
			console.log(error);
	});
  };

  const getListTercerosByTipo = (tipoId, tipoNombre) => {
	  setTipoNombre(tipoNombre);
	  let urlGetListTercerosByTipo = baseURL+'/listarTercerosPorTipo/'+tipoId;
	  Axios.get(urlGetListTercerosByTipo)
		.then((response) => {
			console.log(response.data)
			setDataTercerosByTipo(response.data)
		})
		.catch((error) => {
			console.log(error);
	});
  };

  const agregarTercero = () => {
	let bandera = false;

	if (tipoTercero.length == 0 || idTercero.length == 0 || !fechaVinculacion.trim()) {
		bandera = true;
		swal({
			title: 'Campo vacío',
			text: 'No ha sido posible realizar la acción. \nEs necesario que complete todos los campos para agregar un tercero',
			icon: 'error',
			button: 'Aceptar',
			timer: '5000',
		});
		return;
	}

	for (const index in dataTerceros) {
		if(dataTerceros[index].idTipo === tipoTercero){
			bandera = true;
			swal({
				title: 'Tercero no agregado',
				text: 'No ha sido posible realizar la acción. \nEl empleado ya se encuentra vinculado a un tercero de este tipo',
				icon: 'error',
				button: 'Aceptar',
				timer: '5000',
			});
			return;
		}
	}
	
	if(!bandera){
		const nuevoTercero = {
			id: idTercero,
			nombre: nomTercero,
			idTipo: tipoTercero,
			tipo: tipoNombre,
			fecha: fechaVinculacion,
		}
		setDataTerceros([...dataTerceros, nuevoTercero]);
	}
  };

  const eliminarTercero = (idTerceroEliminar) => {
	const tercerosActualizados = dataTerceros.filter((indiceTercero) => indiceTercero.id !== idTerceroEliminar)
	setDataTerceros(tercerosActualizados);
  };

  useEffect(() => {
	getInfoByID();
	getListDep();
	getListBanc();
	getListTiposTerceros();
  },[]);

  async function addEmpleadoConfirm() {
	let bandera = false;

	if (tipoDocumento.length == 0 || !fechaNacimiento.trim() || departament.length == 0 || 
		municipio.length == 0 || !correoEmpleado.trim() || banco.length == 0 || 
		!numCuentaBancaria.trim() || tipoCuentaBancaria.length == 0 || !fechaExpiracion.trim() || 
		tipoTercero.length == 0 || idTercero.length == 0 || !fechaVinculacion.trim()) {
		bandera = true;
		swal({
			title: 'Campo vacío',
			text: 'No ha sido posible realizar el registro. \nEs necesario que complete todos los campos',
			icon: 'error',
			button: 'Aceptar',
			timer: '5000',
		});
		return;
	}

	if (!(numCuentaBancaria > 0)) {
		bandera = true;
		swal({
			title: 'Dato Inválido',
			text: 'No ha sido posible realizar el registro. \nEl número de la cuenta bancaría no puede ser menor a cero',
			icon: 'error',
			button: 'Aceptar',
			timer: '5000',
		});
		return;
	}

	if (dataTerceros.length == 0) {
		bandera = true;
		swal({
			title: 'Campo Vacío',
			text: 'No ha sido posible realizar el registro. \nEs necesario que agregue los terceros a los que el empleado se encuentra vinculado',
			icon: 'error',
			button: 'Aceptar',
			timer: '5000',
		});
		return;
	}

	if(!bandera){
		abrirCerrarModalConfirmacion();
	}
  };

  const abrirCerrarModalConfirmacion = () => {
	setModalConfirmacion(!modalConfirmacion);
  };

  	async function addEmpleadoPOST() {
		let response;
		var authOptions = {
			method: 'POST',
			url: baseURL+'/crearEmpleado',
			data: {
				numeroDocumento: data.numeroDocumento,
				municipio: {
					municipio_id: idMunicipio
				},
				nombres: data.nombres,
				apellidos: data.apellidos,
				fecha_nacimiento: fechaNacimiento,
				tipoDocumento: tipoDocEmpleado,
				telefono: data.telefono,
				direccion: data.direccion,
				correo: correoEmpleado
			},
			json: true,
		};
		await Axios(authOptions)
		.then(function (response) {
			if(response.status == 201){
				swal({
					title: "Empleado Registrado",
					text: "El empleado ha sido registrado de manera correcta",
					icon: "success",
					button: "Aceptar",
					timer: '5000',
				});
				addRelacionEmpBancoPOST();
				for (const index in dataTerceros) {
					addRelacionEmpTercerosPOST(dataTerceros[index]);
				}
				window.location.href = '/crear_contrato';
			}
			if(response.status == 208){
				swal({
					title: 'Empleado no Registrado',
					text: 'No ha sido posible realizar el registro. \nEl número de identificación ingresado ya se encuentra en uso',
					icon: 'error',
					button: 'Aceptar',
					timer: '5000',
				});
			}
		})
		.catch(function (error) {
			console.log(error);
			swal({
				title: 'Empleado no Registrado',
				text: 'No ha sido posible realizar el registro. \nHa ocurrido un error en el sistema. Inténtelo nuevamente',
				icon: 'error',
				button: 'Aceptar',
				timer: '5000',
			});
		});
	
  };

  function addRelacionEmpBancoPOST() {
	var authOptions = {
		method: 'POST',
		url: baseURL+'/crearRelacionEmpleadosBancos',
		data: {
			empleado_banco_pk: 
			{
        		empleado:{
            		numeroDocumento: data.numeroDocumento
        		},
        		banco:{
            		bancoId: idBanco
       			},
        		numeroCuenta: numCuentaBancaria
    		},
    		tipoCuenta: tipoCuentaEmpleado,
    		fecha: fechaExpiracion
		},
		json: true,
	};
	console.log(authOptions);
	Axios(authOptions)
		.then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
	  
  };
 
  function addRelacionEmpTercerosPOST(terceroAux) {
	var authOptions = {
		method: 'POST',
		url: baseURL+'/crearRelacionEmpleadosTerceros',
		data: {
			empleadoTeceroPk:
    		{
        		tercero:{
            		terceroId: terceroAux.id
        		},
        		empleado:{
            		numeroDocumento: data.numeroDocumento
        		}
    		},
    		fechaVinculacion: terceroAux.fecha
		},
		json: true,
	};
	console.log(authOptions);
	Axios(authOptions)
		.then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
	
  };

  return (
    <div className={classes.root}>
		<Typography variant="h3" component="h2" gutterBottom>
			Registrar Empleado
		</Typography>
      	<br />
			<GridContainer style={{textAlign: 'left'}}>
				<GridItem xs={12} sm={12} md={12} style={{marginTop: '10px'}}>
					<Typography variant="body2" component="p">
						<b>INFORMACIÓN PERSONAL DEL EMPLEADO</b>
						<br />Ingrese la información personal del aspirante a quien desea contratar:
					</Typography>
				</GridItem>
				
				<GridItem xs={12} sm={12} md={12}>
					<TextField
						required
						fullWidth
						margin="normal"
						label="Nombre Completo"
						variant="outlined"
						size="small"
						onChange={handleChange}
						value={data.nombres + " " + data.apellidos}
					/>
				</GridItem>

				<GridItem xs={12} sm={12} md={6}>
					<FormControl fullWidth required variant="outlined" size="small" margin="normal">
                        <InputLabel>Tipo de Documento</InputLabel>
                            <Select
								value={tipoDocumento}
                                onChange={(e) => setTipoDocumento(e.target.value)}
                                label="Tipo de Documento"
                            >
								<MenuItem value=""><em></em></MenuItem>
								<MenuItem 
									onClick={() => setTipoDocEmpleado("Cédula de Ciudadanía")} 
									value={1}>Cédula de Ciudadanía
								</MenuItem>
								<MenuItem 
									onClick={() => setTipoDocEmpleado("Cédula de Extranjería")} 
									value={2}>Cédula de Extranjería
								</MenuItem>
								<MenuItem 
									onClick={() => setTipoDocEmpleado("Pasaporte")} 
									value={3}>Pasaporte
								</MenuItem>
                            </Select>
                        </FormControl>
				</GridItem>

				<GridItem xs={12} sm={12} md={6}>
					<TextField
						required
						fullWidth
						margin="normal"
						label="Número de Documento"
						variant="outlined"
						type="number"
						size="small"
						onChange={handleChange}
						value={""+data.numeroDocumento}
					/>
				</GridItem>

				<GridItem xs={12} sm={12} md={6}>
					<TextField
						required
						fullWidth
						margin="normal"
						//label="Fecha de Nacimiento"
						variant="outlined"
						size="small"
						type="date"
						onChange={(e) => setFechaNacimiento(e.target.value)}
					/>
				</GridItem>

				<GridItem xs={12} sm={12} md={6}>
					<TextField
						required
						fullWidth
						margin="normal"
						label="Telefono"
						type="number"
						variant="outlined"
						size="small"
						onChange={handleChange}
						value={""+data.telefono}
					/>
				</GridItem>

				<GridItem xs={12} sm={12} md={2}>
					<p>Lugar de Residencia*</p>
				</GridItem>

				<GridItem xs={12} sm={12} md={4}>
					<FormControl fullWidth required variant="outlined" size="small" margin="normal" >
						<InputLabel>Departamento</InputLabel>
						<Select
							value={departament}
							onChange={(e) => setDepartament(e.target.value)}
							label="Departamento"
						>
						<MenuItem value=""><em></em></MenuItem>
						{dataDep.map((dep) => (
							<MenuItem 
								onClick={() => getListMun(dep.departamentoId)}
								value={dep.departamentoId}>{dep.nombre}
							</MenuItem>
						))}
						</Select>
					</FormControl>
				</GridItem>

				<GridItem xs={12} sm={12} md={6}>
					<FormControl fullWidth required variant="outlined" size="small" margin="normal">
						<InputLabel>Municipio</InputLabel>
						<Select
							value={municipio}
							onChange={(e) => setMunicipio(e.target.value)}
							label="Municipio"
						>
						<MenuItem value=""><em></em></MenuItem>
						{dataMun.map((mun) => (
							<MenuItem 
								onClick={() => setIdMunicipio(mun.municipio_id)}
								value={mun.municipio_id}>{mun.nombre}
							</MenuItem>
						))}
						</Select>
					</FormControl>
				</GridItem>

				<GridItem xs={12} sm={12} md={12}>
					<TextField
						required
						fullWidth
						margin="normal"
						label="Direccion"
						variant="outlined"
						size="small"
						onChange={handleChange}
						value={""+data.direccion}
					/>
				</GridItem>

				<GridItem xs={12} sm={12} md={12}>
					<TextField
						required
						fullWidth
						margin="normal"
						label="Correo Electrónico"
						type="email"
						variant="outlined"
						size="small"
						onChange={(e) => setCorreoEmpleado(e.target.value)}
					/>
				</GridItem>

				<GridItem xs={12} sm={12} md={12} style={{marginTop: '50px'}}>
					<Typography variant="body2" component="p">
						<b>INFORMACIÓN BANCARÍA DEL EMPLEADO</b>
						<br />Ingrese la información bancaría del aspirante a quien desea contratar:
					</Typography>
				</GridItem>

				<GridItem xs={12} sm={12} md={6}>
					<FormControl fullWidth required variant="outlined" size="small" margin="normal" >
						<InputLabel>Banco</InputLabel>
						<Select
							value={banco}
							onChange={(e) => setBanco(e.target.value)}
							label="Banco"
						>
							<MenuItem value=""><em></em></MenuItem>
							{dataBanco.map((indiceBanco) => (
								<MenuItem 
									onClick={() => setIdBanco(indiceBanco.bancoId)}
									value={indiceBanco.bancoId}>{indiceBanco.nombre}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</GridItem>

				<GridItem xs={12} sm={12} md={6}>
					<TextField
						required
						fullWidth
						margin="normal"
						label="Número de Cuenta"
						variant="outlined"
						type="number"
						size="small"
						onChange={(e) => setNumCuentaBancaria(e.target.value)}
					/>
				</GridItem>

				<GridItem xs={12} sm={12} md={6}>
					<FormControl fullWidth required variant="outlined" size="small" margin="normal" >
						<InputLabel>Tipo de Cuenta</InputLabel>
						<Select
							value={tipoCuentaBancaria}
							onChange={(e) => setTipoCuentaBancaria(e.target.value)}
							label="Tipo de Cuenta"
						>
							<MenuItem value=""><em></em></MenuItem>
							<MenuItem onClick={() => setTipoCuentaEmpleado("Corriente")} value={1}>Corriente</MenuItem>
							<MenuItem onClick={() => setTipoCuentaEmpleado("Ahorro")} value={2}>Ahorro</MenuItem>
						</Select>
					</FormControl>
				</GridItem>

				<GridItem xs={12} sm={12} md={6}>
					<TextField
						required
						fullWidth
						margin="normal"
						//label="Fecha de Expiracion"
						variant="outlined"
						size="small"
						type="date"
						onChange={(e) => setFechaExpiracion(e.target.value)}
					/>
				</GridItem>

				<GridItem xs={12} sm={12} md={12} style={{marginTop: '50px'}}>
					<Typography variant="body2" component="p">
						<b>INFORMACIÓN DE TERCEROS DEL EMPLEADO</b>
						<br />Ingrese la información de los terceros a lo que el aspirante a quien desea contratar se ecuentra vinculado.
						<br /><b>Nota</b>: El empleado solo puede estar vinculado a un tercero según el tipo del mismo.
					</Typography>
				</GridItem>

				<GridItem xs={12} sm={12} md={3}>
					<FormControl fullWidth required variant="outlined" size="small" margin="normal" >
						<InputLabel>Tipos de Terceros</InputLabel>
						<Select
							value={tipoTercero}
							onChange={(e) => setTipoTercero(e.target.value)}
							label="Tipos de Terceros"
						>
						<MenuItem value=""><em></em></MenuItem>
						{dataTipoTerceros.map((tipoTercero) => (
							<MenuItem 
								onClick={() => getListTercerosByTipo(tipoTercero.tipoTerceroId, tipoTercero.nombre)}
								value={tipoTercero.tipoTerceroId}>{tipoTercero.nombre}
							</MenuItem>
						))}
						</Select>
					</FormControl>
				</GridItem>

				<GridItem xs={12} sm={12} md={3}>
					<FormControl fullWidth required variant="outlined" size="small" margin="normal">
						<InputLabel>Terceros</InputLabel>
						<Select
							value={idTercero}
							onChange={(e) => setIdTercero(e.target.value)}
							label="Terceros"
						>
						<MenuItem value=""><em></em></MenuItem>
						{dataTercerosByTipo.map((tercero) => (
							<MenuItem 
								onClick={() => setNomTercero(tercero.nombre)}
								value={tercero.terceroId}>{tercero.nombre}
							</MenuItem>
						))}
						</Select>
					</FormControl>
				</GridItem>

				<GridItem xs={12} sm={12} md={3}>
					<TextField
						required
						fullWidth
						margin="normal"
						//label="Fecha de Vinculacion"
						variant="outlined"
						size="small"
						type="date"
						onChange={(e) => setFechaVinculacion(e.target.value)}
					/>
				</GridItem>

				<GridItem fullWidth xs={12} sm={12} md={3} style={{marginTop:"15px"}}>
					<Button
						variant="contained"
						color="primary"
						size="large"
						startIcon={<AddCircleIcon />}
						onClick={() => agregarTercero()}
					>Agregar Tercero
					</Button>
				</GridItem>

				<GridItem xs={12} sm={12} md={12}>
				<TableContainer component={Paper} style={{marginTop:"20px"}}>
					<Table size="small" aria-label="a dense table">
						<TableHead>
							<TableRow>
								<StyledTableCell>Nombre de Tercero</StyledTableCell>
								<StyledTableCell>Tipo</StyledTableCell>
								<StyledTableCell>Fecha de Vinculación</StyledTableCell>
								<StyledTableCell></StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{dataTerceros.map((indiceTercero) => (
								<StyledTableRow hover key={indiceTercero.id}>
									<StyledTableCell>{indiceTercero.nombre}</StyledTableCell>
									<StyledTableCell>{indiceTercero.tipo}</StyledTableCell>
									<StyledTableCell>{indiceTercero.fecha}</StyledTableCell>
									<StyledTableCell>
										<Button
											startIcon={<DeleteIcon />}
											//style={{marginRight:"18px"}}
											onClick={() => eliminarTercero(indiceTercero.id)}
										>
										</Button>
									</StyledTableCell>
								</StyledTableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				</GridItem>

				<br /><br />

				<GridItem xs={12} sm={12} md={12} style={{marginTop: '50px'}}>
					<Button 
						fullWidth
						type="submit"
						variant="contained"
						color="primary"
						size="large"
						//startIcon={<AddCircleIcon />}
						onClick={addEmpleadoConfirm}
						>Registrar Empleado
					</Button>
				</GridItem>
				<Modal open={modalConfirmacion} onClose={abrirCerrarModalConfirmacion}>
					{bodyConfirmacion}
				</Modal>
			</GridContainer>
		<br /><br />
    </div>
  );
}
