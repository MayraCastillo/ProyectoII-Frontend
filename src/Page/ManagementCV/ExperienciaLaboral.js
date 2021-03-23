import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Divider } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Modal } from 'reactstrap';

import shortid from 'shortid';
import TablaExperienciaLaboral from './TablaExperienciaLaboral';
import FormularioExperienciaLaboral from './FormularioExperienciaLaboral';
import swal from 'sweetalert'; // Para poder realizar alertas

const baseUrl = `http://localhost:8090/api/productos/ver/2`;
const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '50ch',
		},
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
}));

export default function ExperienciaLaboral() {
	const classes = useStyles();

	const empresaData = [
		{
			id: '',
			nombreEmpresa: '',
			cargoEmpresa: '',
			telefonoEmpresa: '',
			tiempo: '',
			calificacion: '',
			contacto: '',
		},
	];

	const [arrayExperienciaLaboral, setarrayExperienciaLaboral] = React.useState(
		empresaData
	);
	const [modal, setModal] = React.useState(false);
	const [modalEditar, setModalEditar] = React.useState(false);

	const initialFormState = {
		id: null,
		nombreEmpresa: '',
		cargoEmpresa: '',
		telefonoEmpresa: '',
		tiempo: '',
		calificacion: '',
		contacto: '',
	};
	const [editarReferenciaLaboral, setEditarReferenciaLaboral] = React.useState(
		initialFormState
	);
	//Para entrar modo edicion
	const setModoEditar = (activarModo) => {
		if (activarModo === false) {
			setEditarReferenciaLaboral(initialFormState);
			setModalEditar(false);
		} else {
			setModalEditar(activarModo);
		}
	};

	//Editar Experiencia Laboral
	const editRow = (editarReferenciaLaboral) => {
		mostrarModal();
		setModoEditar(true);
		console.log(editarReferenciaLaboral);
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

	//Agregar Experiencia Laboral
	const agregarExperienciaLaboral = (nuevaExperienciaLaboral) => {
		console.log(nuevaExperienciaLaboral);
		if (modalEditar === true) {
			const indice = arrayExperienciaLaboral.findIndex((elemento, indice) => {
				if (elemento.id === nuevaExperienciaLaboral.id) {
					console.log('Encontrado ' + indice);
					arrayExperienciaLaboral[indice] = nuevaExperienciaLaboral;
					return true;
				}
			});
			//setarrayExperienciaLaboral([...arrayExperienciaLaboral, nuevaExperienciaLaboral]);
		} else {
			nuevaExperienciaLaboral.id = shortid.generate();
			setarrayExperienciaLaboral([
				...arrayExperienciaLaboral,
				nuevaExperienciaLaboral,
			]);
			console.log(nuevaExperienciaLaboral);
		}
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

	//Para abrir y cerrar modal
	const mostrarModal = () => {
		setModal(!modal);
	};

	return (
		<>
			<br />

			<div className={classes.sendData}>
				<Button
					onClick={() => {
						mostrarModal();
					}}
					variant="contained"
					color="primary"
					style={{ textAlign: 'center' }}
				>
					Agregar Experiencia Laboral
				</Button>
			</div>
			<br />
			<Divider />
			<Container>
				<TablaExperienciaLaboral
					arrayExperienciaLaboral={arrayExperienciaLaboral}
					eliminarExperienciaLaboral={eliminarExperienciaLaboral}
					editRow={editRow}
					setModoEditar={setModoEditar}
				/>
			</Container>

			<Modal isOpen={modal} style={{ marginTop: '70px' }}>
				<FormularioExperienciaLaboral
					agregarExperienciaLaboral={agregarExperienciaLaboral}
					mostrarModal={mostrarModal}
					camposFormulario={editarReferenciaLaboral}
					modoEditar={modalEditar}
					setModoEditar={setModoEditar}
					//editRow={editRow}
				/>
			</Modal>
		</>
	);
}
