import React from 'react';
import { useEffect, useState } from 'react';

// @material-ui/core components
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Edit, RepeatOneSharp } from '@material-ui/icons';
import {
	TableContainer, Table, TableHead, TableBody, TableRow, TableCell,
	Modal, Button, TextField,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';

// core components
import GridItem from '../../components/Grid/GridItem';
import GridContainer from '../../components/Grid/GridContainer';
import Axios from 'axios';
import swal from 'sweetalert'; 

const StyledTableCell = withStyles((theme) => ({
	head: {
	  backgroundColor: theme.palette.common.black,
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
		width: 500,
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


const baseUrl = `http://localhost:8091/`;

export default function ActiveEmployees() {
	const styles = useStyles();
	const [data, setData] = useState([]);
	const [modalCreate, setModalCreate] = useState(false);

	//const classes = useStyles();
	//const [nameParameter, setNameParameter] = React.useState('');
	//const [valueParameter, setValueParameter] = React.useState('');

	/*const [modalEditar, setModalEditar] = useState(false);
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
	};

    const abrirCerrarModalCreate = () => {
		setModalCreate(!modalCreate);
	};

	const selectParameter = (consola) => {
		setLegalParameter(consola);
		abrirCerrarModalEditar();
	};

	const bodyCreate = (
		<div className={styles.modal}>
			<h4 style={{marginRight:"18px"}} >Agregar Parametro</h4>
			<p>Digite los datos correspondientes</p>
			<TextField
				name="nameParameter"
				className={styles.inputMaterial}
				variant="outlined"
				label="Nombre del Parametro"
				onChange={(e) => setNameParameter(e.target.value)}
			/>
			<br />
			<br />
			<TextField
				name="valueParameter"
				className={styles.inputMaterial}
				variant="outlined"
				label="Valor del Parametro"
				onChange={(e) => setValueParameter(e.target.value)}
			/>
			<br />
			<br />
			<div align="right">
				<Button 
					variant="contained"
					color="primary"
					startIcon={<AddCircleIcon />}
					style={{marginRight:"18px"}}
					//onClick={addParameterPOST}
				>Agregar
				</Button>

				<Button 
					variant="contained"
					color="secondary"
					startIcon={<CancelIcon />}
					onClick={() => abrirCerrarModalCreate()}
				>Cancelar
				</Button>
			</div>
		</div>
	);

	const bodyEditar = (
		<div className={styles.modal}>
			<h3>Editar Parametro</h3>
			<TextField
				name="nameParameter"
				className={styles.inputMaterial}
				variant="outlined"
				label="Nombre del Parametro"
				onChange={handleChange}
				value={legalParameter && legalParameter.nameParameter}
			/>
			<br />
			<br />
			<TextField
				name="valueParameter"
				className={styles.inputMaterial}
				variant="outlined"
				label="Valor del Parametro"
				onChange={handleChange}
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

	//async function listParametersGET() {
	const listActiveEmployeesGET = async () => {
		await Axios.get(baseUrl+"listarEmpleadosPorEstado/ACTIVO")
			.then((response) => {
				setData(response.data);
				if(response.data.length == 0){
					swal({
						title: 'No hay registros disponibles',
						text: 'No existen empleados activos en el sistema',
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
		listActiveEmployeesGET();
	}, []);

	
	return (
		<div className={styles.root}>
			<GridContainer>
                <GridItem xs={12} sm={12} md={12}>
					<Typography variant="h3" component="h2" >
						Empleados Activos
					</Typography><br />

					<p>Descripción si se ve necesaria q</p><br />

					<TableContainer component={Paper} style={{marginTop:"20px"}}>
						<Table size="small" aria-label="a dense table">
							<TableHead>
								<TableRow>
									<StyledTableCell>ID</StyledTableCell>
									<StyledTableCell>Nombres</StyledTableCell>
                                    <StyledTableCell>Apellidos</StyledTableCell>
									<StyledTableCell>Telefono</StyledTableCell>
									<StyledTableCell>Correo</StyledTableCell>
									<StyledTableCell></StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data.map((Employee) => (
									<StyledTableRow hover key={Employee.numeroDocumento}>
										<StyledTableCell>{Employee.numeroDocumento}</StyledTableCell>
										<StyledTableCell>{Employee.nombres}</StyledTableCell>
										<StyledTableCell>{Employee.apellidos}</StyledTableCell>
										<StyledTableCell>{Employee.telefono}</StyledTableCell>
										<StyledTableCell>{Employee.correo}</StyledTableCell>
										<StyledTableCell>
											<Button
												startIcon={<Edit />}
												//style={{marginRight:"18px"}}
												//onClick={() => selectParameter(Employee)}
											></Button>
											<Button
												startIcon={<PersonAddDisabledIcon />}
												//style={{marginRight:"18px"}}
												//onClick={() => selectParameter(Employee)}
											></Button>
											<Button
												startIcon={<VisibilityIcon />}
												//style={{marginRight:"18px"}}
												//onClick={() => selectParameter(Employee)}
											></Button>
										</StyledTableCell>
									</StyledTableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<br />
					<p id="message"></p>
                </GridItem>

				<Modal 
				//open={modalEditar} onClose={abrirCerrarModalEditar}
				>
					{//bodyEditar
					}
				</Modal>
                <Modal 
				//open={modalCreate} onClose={abrirCerrarModalCreate}
				>
					{//bodyCreate
					}
				</Modal>
			</GridContainer>
			<br></br>
        </div>
	);
}
