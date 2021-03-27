import React, { useContext } from 'react';
import { ModalBody } from 'reactstrap';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

import swal from 'sweetalert'; // Para poder realizar alertas
import CalificacionEstrellas from '../Calificacion/CalificacionEstrellas';
//import { HojaDeVidaContext } from '../CurriculumVitaeContext/HojaDeVidaContext'; //Para acceder a la tabla

const useStyles = makeStyles((theme) => ({
	ocultar: {
		display: 'none',
	},
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

const FormularioEstudio = ({
	mostrarModal,
	agregarEstudio,
	modoEditar,
	camposFormulario,
	setModoEditar,
}) => {
	const classes = useStyles();
	const [datos_generales, modificarDatosGenerales] = React.useState({
		id: camposFormulario.id,
		nombreTitulo: camposFormulario.nombreTitulo,
		entidad: camposFormulario.entidad,
		calificacion: camposFormulario.calificacion,
		tipo: camposFormulario.tipo,
		tiempo: camposFormulario.tiempo,
	});
	const {
		id,
		nombreTitulo,
		entidad,
		calificacion,
		tipo,
		tiempo,
	} = datos_generales;

	const obtenerInfoEstudiosRealizados = (e) => {
		modificarDatosGenerales({
			...datos_generales,
			[e.target.name]: e.target.value,
		});
	};

	/* 

	const [datos_generales, modificarDatosGenerales] = useState({
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
	*/

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
		<div className={classes.paper}>
			<ModalBody>
				<div id="ocultarTitulo">
					{modoEditar === false ? (
						<h3>Registrando Estudio </h3>
					) : (
						<h3>Editando Estudio</h3>
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
						label="Título"
						name="nombreTitulo"
						value={nombreTitulo}
						fullWidth
						variant="outlined"
						onChange={obtenerInfoEstudiosRealizados}
					/>
					<TextField
						margin="normal"
						label="Institución"
						name="entidad"
						value={entidad}
						fullWidth
						variant="outlined"
						onChange={obtenerInfoEstudiosRealizados}
					/>

					<TextField
						margin="normal"
						label="Calificacion"
						name="calificacion"
						value={calificacion}
						fullWidth
						variant="outlined"
						type="number"
						onChange={obtenerInfoEstudiosRealizados}
					/>

					<TextField
						margin="normal"
						label="Tipo"
						name="tipo"
						value={tipo}
						fullWidth
						variant="outlined"
						onChange={obtenerInfoEstudiosRealizados}
					/>

					<TextField
						margin="normal"
						label="Tiempo"
						name="tiempo"
						value={tiempo}
						fullWidth
						variant="outlined"
						onChange={obtenerInfoEstudiosRealizados}
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
		</div>
	);
};

export default FormularioEstudio;
