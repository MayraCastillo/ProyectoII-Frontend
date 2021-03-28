import React, { useContext, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

//import 'bootstrap/dist/css/bootstrap.min.css';
import Container from '@material-ui/core/Container';
import Modal from '@material-ui/core/Modal';

import shortid from 'shortid';
import TablaEstudios from './Tablas/TablaEstudios';
import FormularioEstudio from './Formularios/FormularioEstudio';
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
		padding: theme.spacing(2, '35%', 3),
		top: '50%',
		left: '50%',
		//transform: 'translate(-50%, -50%)',
	},
}));

export default function EstudiosRealizados() {
	const classes = useStyles();
	const [modal, setModal] = React.useState(false);
	const [modalEditar, setModalEditar] = React.useState(false);
	const handleClose = () => {
		setModal(false);
	};
	const { setEstudios, estudios, estudioEditar, setEstudioEditar } = useContext(
		HojaDeVidaContext
	);
	const initialFormState = {
		id: null,
		nombreTitulo: '',
		entidad: '',
		calificacion: '',
		tipo: '',
		tiempo: '',
	};

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
		//console.log(estudioEditar);
		setEstudioEditar({
			id: estudioEditar.id,
			nombreTitulo: estudioEditar.nombreTitulo,
			entidad: estudioEditar.entidad,
			calificacion: estudioEditar.calificacion,
			tipo: estudioEditar.tipo,
			tiempo: estudioEditar.tiempo,
		});
	};
	//const [bandera, setBandera] = React.useState(false);
	const tituloRepetido = (nuevoEstudio) => {
		let bandera = false;
		estudios.forEach((element) => {
			if (
				element.nombreTitulo.toLowerCase() ==
				nuevoEstudio.nombreTitulo.toLowerCase()
			) {
				console.log('Encontrado');
				bandera = true;
			}
		});
		return bandera;
	};

	//Agregar Estudio
	const agregarEstudio = (nuevoEstudio) => {
		let registroExitoso = false;
		console.log(nuevoEstudio);
		if (modalEditar === true) {
			const indice = estudios.findIndex((elemento, indice) => {
				if (elemento.id === nuevoEstudio.id) {
					estudios[indice] = nuevoEstudio;
					return true;
				}
			});
			registroExitoso = true;
		} else {
			if (!tituloRepetido(nuevoEstudio)) {
				console.log('Pasamos derecho');
				nuevoEstudio.id = shortid.generate();
				setEstudios([...estudios, nuevoEstudio]);
				registroExitoso = true;
			}

			//console.log(nuevoEstudio);
		}
		return registroExitoso;
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
	useEffect(() => {
		setEstudios(estudios.filter((estudio) => estudio.id !== ''));
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
				>
					Agregar Título
				</Button>
			</div>
			<br />

			<Container style={{ paddingLeft: '1px' }}>
				<TablaEstudios
					estudios={estudios}
					eliminarEstudio={eliminarEstudio}
					editRow={editRow}
					setModoEditar={setModoEditar}
				/>
			</Container>

			<Grid xs={6} sm={3}>
				<Modal open={modal} className={classes.paper} onClose={handleClose}>
					<FormularioEstudio
						agregarEstudio={agregarEstudio}
						mostrarModal={mostrarModal}
						camposFormulario={estudioEditar}
						modoEditar={modalEditar}
						setModoEditar={setModoEditar}

						//editRow={editRow}
					/>
				</Modal>
			</Grid>
		</Container>
	);
}
