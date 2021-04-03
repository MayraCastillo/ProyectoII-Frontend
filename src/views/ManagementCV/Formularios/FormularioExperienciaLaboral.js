import React from 'react';
import { ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import CalificacionEstrellas from '../Calificacion/CalificacionEstrellasExperienciaLaboral';

import TextField from '@material-ui/core/TextField';
import swal from 'sweetalert'; // Para poder realizar alertas
const styles = makeStyles((theme) => ({
	ocultar: {
		display: 'none',
	},
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(0, 4, 1),
	},
}));

const FormularioExperienciaLaboral = ({
	mostrarModal,
	agregarExperienciaLaboral,
	modoEditar,
	camposFormulario,
	setModoEditar,
}) => {
	const classes = styles();
	const [datos_generales, modificarDatosGenerales] = React.useState({
		nombreEmpresa: camposFormulario.nombreEmpresa,
		cargoEmpresa: camposFormulario.cargoEmpresa,
		calificacion: camposFormulario.calificacion,
		telefonoEmpresa: camposFormulario.telefonoEmpresa,
		tiempo: camposFormulario.tiempo,
		id: camposFormulario.id,
		contacto: camposFormulario.contacto,
	});
	const {
		nombreEmpresa,
		cargoEmpresa,
		calificacion,
		telefonoEmpresa,
		tiempo,
		contacto,
		id,
	} = datos_generales;

	const obtenerInfo = (e) => {
		//console.log(e.target.name, e.target.value);
		modificarDatosGenerales({
			...datos_generales,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = () => {
		if (!nombreEmpresa.trim()) {
			swal({
				title: 'Campo vacío',
				text: 'El nombre de la empresa no puede estar vacío',
				icon: 'error',
				button: 'Aceptar',
				timer: '5000',
			});
			return;
		}
		if (!cargoEmpresa.trim()) {
			swal({
				title: 'Campo vacío',
				text: 'La cargo en la empresa no puede estar vacío',
				icon: 'error',
				button: 'Aceptar',
				timer: '3000',
			});
			return;
		}
		if (!calificacion.trim()) {
			swal({
				title: 'Campo vacío',
				text: 'La calificación no puede estar vacía',
				icon: 'error',
				button: 'Aceptar',
				timer: '3000',
			});
			return;
		}

		if (!telefonoEmpresa.trim()) {
			swal({
				title: 'Campo vacío',
				text: 'El telefono de la empresa no puede estar vacío',
				icon: 'error',
				button: 'Aceptar',
				timer: '3000',
			});
			return;
		}
		if (!tiempo.trim()) {
			swal({
				title: 'Campo vacío',
				text: 'El tiempo no puede estar vacío',
				icon: 'error',
				button: 'Aceptar',
				timer: '3000',
			});
			return;
		}
		if (!contacto.trim()) {
			swal({
				title: 'Campo vacío',
				text: 'El contacto no puede estar vacío',
				icon: 'error',
				button: 'Aceptar',
				timer: '3000',
			});
			return;
		}

		if (modoEditar === true) {
			//console.log(modoEditar);
			//console.log(datos_generales);
			agregarExperienciaLaboral(datos_generales);
			swal({
				title: 'Experiencia Laboral editada',
				text: 'La Experiencia Laboral se ha editado con éxito',
				icon: 'success',
				button: 'Aceptar',
				timer: '3000',
			});
			mostrarModal();

			return;
		} else {
			if (agregarExperienciaLaboral(datos_generales)) {
				swal({
					title: 'Experiencia Laboral registrada',
					text: 'La experiencia laboral se ha registrado con éxito',
					icon: 'success',
					button: 'Aceptar',
					timer: '3000',
				});
			} else {
				swal({
					title: 'Datos Repetidos',
					text: 'Esta experiencia laboral ya se encuentra registrada',
					icon: 'warning',
					timer: '10000',
				});
			}

			mostrarModal();
			return;
		}

		//console.log(data);
	};

	return (
		<Container>
			<ModalBody className={classes.paper}>
				<div id="ocultarTitulo">
					{modoEditar === false ? (
						<h3>Registrando Experiencia Laboral </h3>
					) : (
						<h3>Editando Experiencia Laboral</h3>
					)}
				</div>
				<form>
					<input
						style={{ display: 'none' }}
						className="form-control"
						name="id"
						value={id}
						type="text"
						readOnly
					/>

					<TextField
						margin="normal"
						label="Nombre de la Empresa"
						name="nombreEmpresa"
						value={nombreEmpresa}
						fullWidth
						variant="outlined"
						onChange={obtenerInfo}
					/>

					<TextField
						margin="normal"
						label="Cargo que desempeñó"
						name="cargoEmpresa"
						value={cargoEmpresa}
						fullWidth
						variant="outlined"
						onChange={obtenerInfo}
					/>

					<TextField
						margin="normal"
						label="Contacto"
						name="contacto"
						value={contacto}
						fullWidth
						variant="outlined"
						onChange={obtenerInfo}
					/>

					<TextField
						style={{ display: 'none' }}
						margin="normal"
						label="Calificación"
						name="calificacion"
						value={calificacion}
						fullWidth
						variant="outlined"
						type="number"
						onChange={obtenerInfo}
					/>

					<TextField
						margin="normal"
						label="Teléfono de la Empresa"
						name="telefonoEmpresa"
						value={telefonoEmpresa}
						fullWidth
						variant="outlined"
						onChange={obtenerInfo}
					/>

					<TextField
						margin="normal"
						label="Tiempo"
						name="tiempo"
						value={tiempo}
						fullWidth
						variant="outlined"
						onChange={obtenerInfo}
					/>
					<Container maxWidth="sm" style={{ backgroundColor: '#F2F2F2' }}>
						<label>
							<strong>Califique esta Experiencia Laboral:</strong>
						</label>
						<CalificacionEstrellas
							calificacion={calificacion}
							obtenerInfo={obtenerInfo}
						/>
					</Container>

					<Button
						endIcon={<Icon>send</Icon>}
						color="primary"
						variant="contained"
						style={{ margin: '12px' }}
						onClick={() => {
							onSubmit();
							setModoEditar(false);
						}}
					>
						{modoEditar === false ? <div>Registrar</div> : <div>Editar</div>}
					</Button>

					<Button
						startIcon={<DeleteIcon />}
						color="secondary"
						variant="contained"
						onClick={() => {
							setModoEditar(false);
							mostrarModal();
							document.getElementById('ocultarTitulo').innerHTML = '';
						}}
					>
						Cancelar
					</Button>
				</form>
			</ModalBody>
		</Container>
	);
};

export default FormularioExperienciaLaboral;
