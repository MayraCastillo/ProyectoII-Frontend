import React from 'react';
import { useEffect, useState } from 'react';

// @material-ui/core components
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Edit } from '@material-ui/icons';
import {
	TableContainer, Table, TableHead, TableBody, TableRow, TableCell,
	Modal, Button, TextField,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';

// core components
import GridItem from '../../../components/Grid/GridItem';
import GridContainer from '../../../components/Grid/GridContainer';
import Axios from 'axios';
import swal from 'sweetalert';


const StyledTableCell = withStyles((theme) => ({
	head: {
	  backgroundColor: '#154c79',
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
}))(TableRow);

const useStyles = makeStyles((theme) => ({
    root: {
       	marginTop:"100px",
		width: '60%',
		margin: 'auto',
		textAlign: 'center',
    },

	buttonCancel: {
		color: 'white',
		backgroundColor: "rgb(220,53,69)",
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

	inputMaterial: {
		width: '100%',
	},
}));

const baseUrl = `http://localhost:8093/parametros`;

export default function LegalParameter() {
	const styles = useStyles();
	const classes = useStyles();
	const [data, setData] = useState([]);
	const [nameParameter, setNameParameter] = React.useState('');
	const [valueParameter, setValueParameter] = React.useState('');
	const [modalCreate, setModalCreate] = useState(false);

	/*const [formValues, setFormValues] = useState();
	const [modalEditar, setModalEditar] = useState(false);
	const [legalParameter, setLegalParameter] = useState({
		idParameter: '',
		nameParameter: '',
		valueParameter: 0.0,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setLegalParameter((prevState) => ({
			...prevState,
			[name]: value,
		}));
		console.log(legalParameter);
	};

	const abrirCerrarModalEditar = () => {
		setModalEditar(!modalEditar);
	};*/

    const abrirCerrarModalCreate = () => {
		setModalCreate(!modalCreate);
	};

	/*const selectParameter = (consola) => {
		setLegalParameter(consola);
		abrirCerrarModalEditar();
	};*/

	const bodyCreate = (
		<div className={styles.modal}>
			<h3>Agregar un Parámetro</h3	>
			<p>Digite por favor la información necesaria para agregar el parámetro:</p>
			<br />
			<TextField
				required
				name="nameParameter"
				className={styles.inputMaterial}
				variant="outlined"
				label="Nombre del Parametro"
				onChange={(e) => setNameParameter(e.target.value)}
			/>
			<br /><br />
			<TextField
				required
				name="valueParameter"
				type="Number"
				className={styles.inputMaterial}
				variant="outlined"
				label="Valor del Parametro"
				onChange={(e) => setValueParameter(e.target.value)}
			/>
			<br /><br />
			<div align="right">
				<Button 
					variant="contained"
					color="primary"
					startIcon={<AddCircleIcon />}
					style={{marginRight:"18px"}}
					onClick={addParameterPOST}
				>Agregar
				</Button>

				<Button
					className={styles.buttonCancel} 
					variant="contained"
					color="secondary"
					startIcon={<CancelIcon />}
					onClick={() => abrirCerrarModalCreate()}
				>Cancelar
				</Button>
			</div>
		</div>
	);

	/*const bodyEditar = (
		<div className={styles.modal}>
			<h3>Editar Parametro</h3>
			<TextField
				name="nameParameter"
				className={styles.inputMaterial}
				variant="outlined"
				label="Nombre del Parametro"
				//onChange={handleChange}
				value={legalParameter && legalParameter.nameParameter}
			/>
			<br />
			<br />
			<TextField
				name="valueParameter"
				className={styles.inputMaterial}
				variant="outlined"
				label="Valor del Parametro"
				//onChange={handleChange}
				value={legalParameter && legalParameter.valueParameter}
			/>
			<br />
			<br />
			<div align="right">
				<Button 
					variant="contained"
					color="primary"
					startIcon={<Edit />}
					style={{marginRight:"18px"}}
					//onClick={() => abrirCerrarModalCreate()}
				>Editar
				</Button>

				<Button 
					variant="contained"
					color="secondary"
					startIcon={<CancelIcon />}
					onClick={() => abrirCerrarModalEditar()}
				>Cancelar
				</Button>
			</div>
		</div>
	);*/
	
	async function addParameterPOST() {
		let response;
		if (!nameParameter.trim()) {
			swal({
				title: 'Campo vacío',
				text: 'No ha sido posible realizar el registro. \nEl nombre del parámetro no puede estar vacío',
				icon: 'error',
				button: 'Aceptar',
				timer: '5000',
			});
			return;
		}

		if (!valueParameter.trim()) {
			swal({
				title: 'Campo vacío',
				textAlign: 'Center',
				text: 'No ha sido posible realizar el registro. \nEl valor del parámetro no puede estar vacío',
				icon: 'error',
				button: 'Aceptar',
				timer: '5000',
			});
			return;
		}
		
		if (!(valueParameter > 0)) {
			swal({
				title: 'Dato Inválido',
				text: 'No ha sido posible realizar el registro. \nEl valor del parámetro no puede ser menor a cero',
				icon: 'error',
				button: 'Aceptar',
				timer: '5000',
			});
			return;
		}

		if(nameParameter.trim() && valueParameter.trim() && valueParameter > 0){
			var authOptions = {
				method: 'POST',
				url: baseUrl+'/crear-parametro',
				data: {
					nombre: nameParameter,
					valor: valueParameter,
				},
				json: true,
			};
			await Axios(authOptions)
			.then(function (response) {
				swal({
					title: "Parámetro Agregado",
					text: "El parámetro ha sido registrado de manera correcta",
					icon: "success",
					button: "Aceptar",
					timer: '5000',
				});
				abrirCerrarModalCreate();
				listParametersGET();
			})
			.catch(function (error) {
				swal({
					title: 'Parámetro no Agregado',
					text: 'No ha sido posible realizar el registro. El parametro ya existe',
					icon: 'error',
					button: 'Aceptar',
					timer: '5000',
				});
			});
		}
	};

	//async function listParametersGET() {
	const listParametersGET = async () => {
		await Axios.get(baseUrl)
			.then((response) => {
				setData(response.data);
				if(response.data.length == 0){
					swal({
						title: 'No hay registros disponibles',
						text: 'No existen parámetros registrados en el sistema',
						icon: 'error',
						button: 'Aceptar',
						timer: '5000',
					});
					document.getElementById('message').innerHTML = 'No hay registros disponibles';
				}else{
					document.getElementById('message').innerHTML = '';
				}
			})
			.catch((error) => {
				console.log(error);
		});
	};
	
	useEffect(() => {
		listParametersGET();
	}, []);

	return (
		<div className={styles.root}>
			<GridContainer>
                <GridItem xs={12} sm={12} md={12}>
					<Typography variant="h3" component="h2" >
						Parámetros Legales
					</Typography><br />

					<p>Descripción si se ve necesaria q</p><br />
					<div align="right">
					<Button 
						variant="contained"
						color="primary"
						size="large"
						startIcon={<AddCircleIcon />}
						onClick={() => abrirCerrarModalCreate()}
					>Agregar Parametro
					</Button></div>

					<TableContainer component={Paper} style={{marginTop:"20px"}}>
						<Table size="small" aria-label="a dense table">
							<TableHead>
								<TableRow>
									<StyledTableCell>ID</StyledTableCell>
									<StyledTableCell>Nombre del Parametro</StyledTableCell>
									<StyledTableCell>Valor</StyledTableCell>
									<StyledTableCell></StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data.map((parameter) => (
									<StyledTableRow hover key={parameter.parametroId}>
										<StyledTableCell>{parameter.parametroId}</StyledTableCell>
										<StyledTableCell>{parameter.nombre}</StyledTableCell>
										<StyledTableCell>{parameter.valor}</StyledTableCell>
										<StyledTableCell>
											<Button
												startIcon={<Edit />}
												//style={{marginRight:"18px"}}
												//onClick={() => selectParameter(parameter)}
											>
											</Button>
										</StyledTableCell>
									</StyledTableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<br />
					<p id="message"></p>
					<br />
					<br />
                </GridItem>

				<Modal 
				//open={modalEditar} onClose={abrirCerrarModalEditar}
				>
					{//bodyEditar
					}
				</Modal>
                <Modal open={modalCreate} onClose={abrirCerrarModalCreate}>
					{bodyCreate}
				</Modal>
			</GridContainer>
        </div>
	);
}
