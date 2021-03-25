import React from 'react';
import { ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import swal from 'sweetalert'; // Para poder realizar alertas
import CalificacionEstrellas from './Calificacion/CalificacionEstrellas';
const styles = () => ({
	ocultar: {
		display: 'none',
	},
});

const FormularioEstudio = ({
	mostrarModal,
	agregarEstudio,
	modoEditar,
	camposFormulario,
	setModoEditar,
	editRow,
}) => {
	const classes = styles();
	const [datos_generales, modificarDatosGenerales] = React.useState({
		nombreTitulo: camposFormulario.nombreTitulo,
		entidad: camposFormulario.entidad,
		calificacion: camposFormulario.calificacion,
		tipo: camposFormulario.tipo,
		tiempo: camposFormulario.tiempo,
		id: camposFormulario.id,
	});
	const {
		nombreTitulo,
		entidad,
		calificacion,
		tipo,
		tiempo,
		id,
	} = datos_generales;

	const obtenerInfo = (e) => {
		//console.log(e.target.name, e.target.value);
		modificarDatosGenerales({
			...datos_generales,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = (e) => {
		if (!nombreTitulo.trim()) {
			console.log('esta vacio el titulo');
			swal({
				title: 'Campo vacío',
				text: 'El nombre del titulo no puede estar vacío',
				icon: 'error',
				button: 'Aceptar',
				timer: '5000',
			});
			return;
		}
		if (!entidad.trim()) {
			console.log('esta vacio el titulo');
			swal({
				title: 'Campo vacío',
				text: 'La entidad no puede estar vacía',
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

		if (!tipo.trim()) {
			swal({
				title: 'Campo vacío',
				text: 'El tipo no puede estar vacía',
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

		if (modoEditar === true) {
			//console.log(modoEditar);
			console.log(datos_generales);

			agregarEstudio(datos_generales);
			swal({
				title: 'Título editado',
				text: 'El título se editado con éxito',
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
			agregarEstudio(datos_generales);
			swal({
				title: 'Título registrado',
				text: 'El título se registro con éxito',
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
						<h3>Registrando Estudio </h3>
					) : (
						<h3>Editando Estudio</h3>
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

					<label>Titulo:</label>
					<input
						className="form-control"
						name="nombreTitulo"
						value={nombreTitulo}
						onChange={obtenerInfo}
						type="text"
					/>

					<label>Entidad:</label>
					<input
						className="form-control"
						name="entidad"
						value={entidad}
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

					<label>tipo:</label>
					<input
						className="form-control"
						name="tipo"
						type="text"
						value={tipo}
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
					<br />
					<Container maxWidth="sm" style={{ backgroundColor: '#F2F2F2' }}>
						<label>
							<strong>Califique este título:</strong>
						</label>
						<CalificacionEstrellas />
					</Container>
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

export default FormularioEstudio;
