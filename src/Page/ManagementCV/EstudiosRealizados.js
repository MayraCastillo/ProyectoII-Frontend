import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components

import TextField from '@material-ui/core/TextField';
//import { toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import Button from '@material-ui/core/Button';

import { Divider } from '@material-ui/core';

import 'bootstrap/dist/css/bootstrap.min.css';
import {
	Table,
	Container,
	Modal,
	ModalBody,
	ModalHeader,
	FormGroup,
	ModalFooter,
} from 'reactstrap';
import Axios from 'axios';
import shortid from 'shortid';
import TablaEstudios from './TablaEstudios';
import FormularioEstudio from './FormularioEstudio';
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

export default function EstudiosRealizados() {
	const classes = useStyles();

	const dataPrueba = [
		{
			id: shortid.generate(),
			nombreTitulo: 'Ingeniero de Sistemas',
			entidad: 'Unicauca',
			calificacion: 4.6,
			tipo: 'virtual',
			tiempo: '5 años',
		},
		{
			id: shortid.generate(),
			nombreTitulo: 'Especilizacion en BD',
			entidad: 'Univalle',
			calificacion: 3.6,
			tipo: 'virtual',
			tiempo: '3 años',
		},
		{
			id: shortid.generate(),
			nombreTitulo: 'Maestria en la Computación',
			entidad: 'Unicauca',
			calificacion: 4.6,
			tipo: 'virtual',
			tiempo: '5 años',
		},
	];
	const estudioData = [
		{
			id: '',
			nombreTitulo: '',
			entidad: '',
			calificacion: '',
			tiempo: '',
			tipo: '',
		},
	];

	const [estudios, setEstudios] = React.useState(estudioData);
	const [modal, setModal] = React.useState(false);
	const [modalEditar, setModalEditar] = React.useState(false);

	const initialFormState = {
		id: null,
		nombreTitulo: '',
		entidad: '',
		calificacion: '',
		tipo: '',
		tiempo: '',
	};
	const [estudioEditar, setEstudioEditar] = React.useState(initialFormState);
	//Para entrar modo edicion
	const setModoEditar = (activarModo) => {
		if (activarModo === false) {
			setEstudioEditar(initialFormState);
			setModalEditar(false);
		} else {
			setModalEditar(activarModo);
		}
	};

	//Editar Estudios
	const editRow = (estudioEditar) => {
		mostrarModal();
		setModoEditar(true);
		console.log(estudioEditar);
		setEstudioEditar({
			id: estudioEditar.id,
			nombreTitulo: estudioEditar.nombreTitulo,
			entidad: estudioEditar.entidad,
			calificacion: estudioEditar.calificacion,
			tipo: estudioEditar.tipo,
			tiempo: estudioEditar.tiempo,
		});
	};

	//Agregar Estudio
	const agregarEstudio = (nuevoEstudio) => {
		console.log(nuevoEstudio);
		if (modalEditar === true) {
			const indice = estudios.findIndex((elemento, indice) => {
				if (elemento.id === nuevoEstudio.id) {
					console.log('Encontrado ' + indice);
					estudios[indice] = nuevoEstudio;
					return true;
				}
			});
			//setEstudios([...estudios, nuevoEstudio]);
		} else {
			nuevoEstudio.id = shortid.generate();
			setEstudios([...estudios, nuevoEstudio]);
			console.log(nuevoEstudio);
		}
	};
	//Eliminar Estudio
	const eliminarEstudio = (id) => {
		swal({
			title: 'Eliminar',
			text: '¿Estás seguro de que deseas eliminar este título?',
			icon: 'warning',
			buttons: ['No', 'Sí'],
			timer: '10000',
		}).then((respuesta) => {
			if (respuesta) {
				setEstudios(estudios.filter((estudio) => estudio.id !== id));
				swal({ text: 'El título se ha eliminado con éxito', icon: 'success' });
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
					Agregar Título
				</Button>
			</div>
			<br />
			<Divider />
			<Container>
				<TablaEstudios
					estudios={estudios}
					eliminarEstudio={eliminarEstudio}
					editRow={editRow}
					setModoEditar={setModoEditar}
				/>
			</Container>

			<Modal isOpen={modal} style={{ marginTop: '70px' }}>
				<FormularioEstudio
					agregarEstudio={agregarEstudio}
					mostrarModal={mostrarModal}
					camposFormulario={estudioEditar}
					modoEditar={modalEditar}
					setModoEditar={setModoEditar}
					//editRow={editRow}
				/>
			</Modal>
		</>
	);
}
