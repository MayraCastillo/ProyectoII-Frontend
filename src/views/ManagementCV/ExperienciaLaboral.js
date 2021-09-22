import React, { useContext, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

//import 'bootstrap/dist/css/bootstrap.min.css';
import Container from '@material-ui/core/Container';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';

import shortid from 'shortid';
import TablaExperienciaLaboral from './Tablas/TablaExperienciaLaboral';
import FormularioExperienciaLaboral from './Formularios/FormularioExperienciaLaboral';
import swal from 'sweetalert'; // Para poder realizar alertas
import { HojaDeVidaContext } from './CurriculumVitaeContext/HojaDeVidaContext'; //Para acceder a la tabla

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '50ch',
		},
		flexGrow: 1,
	},
	appBar: {
		position: 'relative',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
	row: {
		display: 'flex',
		spacing: 10,
		marginBottom: 25,
	},
	item: {
		marginRight: '5%',
	},
	select: {
		width: '30%',
		marginRight: '5%',
	},
	selectRight: {
		width: '30%',
	},
	sendData: {
		width: '100%',
		flex: 1,
		justifyContent: 'flex-star',
		alignItems: 'flex-end',
		alignContent: 'flex-end',
		flexDirection: 'row',
		display: 'flex',
	},
	paper: {
		position: 'absolute',
		//width: 400,
		//backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(5, 55, 3),
	},
}));

export default function ExperienciaLaboral() {
	const classes = useStyles();
	const [modal, setModal] = React.useState(false);
	const [modalEditar, setModalEditar] = React.useState(false);
	const handleClose = () => {
		setModal(false);
	};
	const {
		arrayExperienciaLaboral,
		setarrayExperienciaLaboral,
		editarReferenciaLaboral,
		setEditarReferenciaLaboral,
	} = useContext(HojaDeVidaContext);

	const initialFormStateExpLab = {
		id: null,
		nombreEmpresa: '',
		cargoEmpresa: '',
		telefonoEmpresa: '',
		tiempo: '',
		calificacion: '',
		contacto: '',
	};

	//Para entrar modo edicion
	const setModoEditar = (activarModo) => {
		if (activarModo === false) {
			setEditarReferenciaLaboral(initialFormStateExpLab);
			setModalEditar(false);
		} else {
			setModalEditar(activarModo);
		}
	};

	//Editar Experiencia Laboral
	const editRow = (editarReferenciaLaboral) => {
		mostrarModal();
		setModoEditar(true);
		//console.log(editarReferenciaLaboral);
		setEditarReferenciaLaboral({
			id: editarReferenciaLaboral.id,
			nombreEmpresa: editarReferenciaLaboral.nombreEmpresa,
			cargoEmpresa: editarReferenciaLaboral.cargoEmpresa,
			telefonoEmpresa: editarReferenciaLaboral.telefonoEmpresa,
			calificacion: editarReferenciaLaboral.calificacion,
			tiempo: editarReferenciaLaboral.tiempo,
			contacto: editarReferenciaLaboral.contacto,
		});
	};
	const tituloRepetido = (nuevaExperienciaLaboral) => {
		let bandera = false;
		arrayExperienciaLaboral.forEach((element) => {
			if (
				element.cargoEmpresa.toLowerCase() ==
					nuevaExperienciaLaboral.cargoEmpresa.toLowerCase() &&
				element.nombreEmpresa.toLowerCase() ==
					nuevaExperienciaLaboral.nombreEmpresa.toLowerCase()
			) {
				console.log('Encontrado');
				bandera = true;
			}
		});
		return bandera;
	};

	//Agregar Experiencia Laboral
	const agregarExperienciaLaboral = (nuevaExperienciaLaboral) => {
		let registroExitoso = false;
		if (modalEditar === true) {
			const indice = arrayExperienciaLaboral.findIndex((elemento, indice) => {
				if (elemento.id === nuevaExperienciaLaboral.id) {
					arrayExperienciaLaboral[indice] = nuevaExperienciaLaboral;
					return true;
				}
			});
			registroExitoso = true;
			//setarrayExperienciaLaboral([...arrayExperienciaLaboral, nuevaExperienciaLaboral]);
		} else {
			if (!tituloRepetido(nuevaExperienciaLaboral)) {
				nuevaExperienciaLaboral.id = shortid.generate();
				setarrayExperienciaLaboral([
					...arrayExperienciaLaboral,
					nuevaExperienciaLaboral,
				]);
				registroExitoso = true;
			}
		}
		return registroExitoso;
	};
	//Eliminar Expriencia Laboral
	const eliminarExperienciaLaboral = (id) => {
		swal({
			title: 'Eliminar',
			text: '¿Estás seguro de que deseas eliminar esta Experiencia Laboral?',
			icon: 'warning',
			buttons: ['No', 'Sí'],
			timer: '10000',
		}).then((respuesta) => {
			if (respuesta) {
				setarrayExperienciaLaboral(
					arrayExperienciaLaboral.filter((estudio) => estudio.id !== id)
				);
				swal({
					text: 'La experiencia laboral se ha eliminado con éxito',
					icon: 'success',
				});
			}
		});
	};

	useEffect(() => {
		setarrayExperienciaLaboral(
			arrayExperienciaLaboral.filter(
				(arrayExperienciaLaboral) => arrayExperienciaLaboral.id !== ''
			)
		);
	}, []);
	//Para abrir y cerrar modal
	const mostrarModal = () => {
		setModal(!modal);
	};

	return (
		<Container maxWidth="lg" className={classes.root}>
			<br />
			<div xs={12}>
				<Button
					onClick={() => {
						mostrarModal();
					}}
					variant="contained"
					color="primary"
					style={{ textAlign: 'center' }}
					className="m-4"
					startIcon={<NoteAddIcon />}
				>
					Agregar Experiencia Laboral
				</Button>
			</div>
			<br />

			<Container>
				<TablaExperienciaLaboral
					arrayExperienciaLaboral={arrayExperienciaLaboral}
					eliminarExperienciaLaboral={eliminarExperienciaLaboral}
					editRow={editRow}
					setModoEditar={setModoEditar}
				/>
			</Container>

			<Modal open={modal} className={classes.paper} onClose={handleClose}>
				<FormularioExperienciaLaboral
					agregarExperienciaLaboral={agregarExperienciaLaboral}
					mostrarModal={mostrarModal}
					camposFormulario={editarReferenciaLaboral}
					modoEditar={modalEditar}
					setModoEditar={setModoEditar}
					//editRow={editRow}
				/>
			</Modal>
		</Container>
	);
}
