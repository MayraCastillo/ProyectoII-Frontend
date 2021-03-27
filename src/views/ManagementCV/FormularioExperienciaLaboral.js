import React from 'react';
import { ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import Button from '@material-ui/core/Button';

import swal from 'sweetalert'; // Para poder realizar alertas
const styles = () => ({
	ocultar: {
		display: 'none',
	},
});

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
			console.log(datos_generales);
			agregarExperienciaLaboral(datos_generales);
			swal({
				title: 'Experiencia Laboral editada',
				text: 'La Experiencia Laboral se ha editado con éxito',
				icon: 'success',
				button: 'Aceptar',
				timer: '3000',
			});
			mostrarModal();
			/*
			editRow(datos_generales);
			swal({
				title: 'Título registradossss',
				text: 'El título se registro con éxito',
				icon: 'success',
				button: 'Aceptar',
				timer: '3000',
			});*/
			return;
		} else {
			agregarExperienciaLaboral(datos_generales);
			swal({
				title: 'Experiencia Laboral registrada',
				text: 'La experiencia laboral se ha registrado con éxito',
				icon: 'success',
				button: 'Aceptar',
				timer: '3000',
			});

			mostrarModal();
			return;
		}

		//console.log(data);
	};

	return (
		<div>
			<ModalHeader style={{ justifyContent: 'center' }}>
				<div id="ocultarTitulo">
					{modoEditar === false ? (
						<h3>Registrando Experiencia Laboral </h3>
					) : (
						<h3>Editando Experiencia Laboral</h3>
					)}
				</div>
			</ModalHeader>

			<ModalBody>
				<form>
					<input
						style={{ display: 'none' }}
						className="form-control"
						name="id"
						value={id}
						type="text"
						readOnly
					/>

					<label>Nombre de la Empresa:</label>
					<input
						className="form-control"
						name="nombreEmpresa"
						value={nombreEmpresa}
						onChange={obtenerInfo}
						type="text"
					/>

					<label>Cargo que desempeñó:</label>
					<input
						className="form-control"
						name="cargoEmpresa"
						value={cargoEmpresa}
						onChange={obtenerInfo}
						type="text"
					/>
					<label>Contacto:</label>
					<input
						className="form-control"
						name="contacto"
						value={contacto}
						onChange={obtenerInfo}
						type="text"
					/>

					<label>Calificación:</label>
					<input
						className="form-control"
						name="calificacion"
						value={calificacion}
						onChange={obtenerInfo}
						type="number"
					/>

					<label>Teléfono de la Empresa:</label>
					<input
						className="form-control"
						name="telefonoEmpresa"
						type="text"
						value={telefonoEmpresa}
						onChange={obtenerInfo}
					/>

					<label>Tiempo:</label>
					<input
						className="form-control"
						name="tiempo"
						value={tiempo}
						onChange={obtenerInfo}
						type="text"
					/>

					<Button
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

			<ModalFooter></ModalFooter>
		</div>
	);
};

export default FormularioExperienciaLaboral;
