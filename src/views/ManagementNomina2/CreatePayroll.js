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
import GridItem from '../../components/Grid/GridItem';
import GridContainer from '../../components/Grid/GridContainer';
import Axios from 'axios';
import swal from 'sweetalert';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import PayrollData from './PayrollData';
import {PayrollProvider, usePayroll} from "../../Context/PayrollContext";

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

    modalEditar : {
		position: 'absolute',
		width: '60%',
		backgroundColor: theme.palette.background.paper,
		border: '1px solid #000',
		boxShadow: theme.shadows[5],
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

const baseURL = `http://localhost:8091/`;

function createData(idEmployee, nameEmployee, emailEmployee, statusEmployee, 
    workingHours, extraHoursDO, extraHoursNO, extraHoursDDF, extraHoursNDF,
    surchargesNO, surchargesDDF, surchargesNDF, facSalC, facSalB, facSalAE, facSalOF,
    facNoSalC, facNoSalB, facNoSalAE, facNoSalOF) {

	return {idEmployee, nameEmployee, emailEmployee, statusEmployee, 
        workingHours, extraHoursDO, extraHoursNO, extraHoursDDF, extraHoursNDF,
        surchargesNO, surchargesDDF, surchargesNDF, facSalC, facSalB, facSalAE, facSalOF,
        facNoSalC, facNoSalB, facNoSalAE, facNoSalOF};    
}

export default function CreatePayroll() {
	const styles = useStyles();
	const classes = useStyles();
    const [value, setValue] = React.useState(0);
	const [data, setData] = useState([]);
	const [modalCreate, setModalCreate] = useState(false);
	const [modalEditar, setModalEditar] = useState(false);
	const [contractDataSelect, setContractDataSelect] = useState({
        idEmployee: 0, nameEmployee: '', emailEmployee: '', statusEmployee: '', 
        workingHours: 0, extraHoursDO: 0, extraHoursNO: 0, extraHoursDDF: 0, extraHoursNDF: 0,
        surchargesNO: 0, surchargesDDF: 0, surchargesNDF: 0, facSalC: 0, facSalB: 0, facSalAE: 0, 
        facSalOF: 0, facNoSalC: 0, facNoSalB: 0, facNoSalAE: 0, facNoSalOF: 0,
	});

	const listContractGET = async () => {
        let urlListContract = baseURL+'/listarContratosPorEstado/124';
		await Axios.get(urlListContract)
			.then((response) => {
                handleAddContractData(response.data);
                if(response.data.length == 0){
					swal({
						title: 'No hay registros disponibles',
						text: 'No existen contratos registrados en el sistema',
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
	
    const handleAddContractData = (Contracts) => {
		let dataAux = [];
        for (const index in Contracts) {
            const contractAux = createData(
                Contracts[index].contratoPk.empleado.numeroDocumento,
                Contracts[index].contratoPk.empleado.nombres + " " +
                Contracts[index].contratoPk.empleado.apellidos,
                Contracts[index].contratoPk.empleado.correo,
                Contracts[index].estado,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            dataAux.push(contractAux);
        }
        setData(dataAux);
	};

	const handleChangeText = (e) => {
		const { name, value } = e.target;
        setContractDataSelect((prevState) => ({
			...prevState,
			[name]: parseInt(value, 10),
		}));
	};

	const abrirCerrarModalEditar = () => {
		setModalEditar(!modalEditar);
	};

    const abrirCerrarModalCreate = () => {
		setModalCreate(!modalCreate);
	};

	const selectContract = (contractSelect) => {
        setContractDataSelect(contractSelect);
		abrirCerrarModalEditar();
	};

	const bodyCreate = (
		<div className={styles.modal}>
			<h3>Agregar un Parámetro</h3	>
			<p>Digite por favor la información necesaria para agregar el parámetro:</p>
			<br />
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

	const bodyEditar = (
        <div className={styles.modalEditar}>
		    <PayrollData />
        </div>
	);
	
	async function addParameterPOST() {
		/*let response;
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
				url: baseURL+'/crear-parametro',
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
				//listParametersGET();
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
		}*/
	};
	
	useEffect(() => {
		listContractGET();
	}, []);

	return (
		<PayrollProvider value={"Hola"} >
		<div className={styles.root}>
			<GridContainer>
                <GridItem xs={12} sm={12} md={12}>
					<Typography variant="h4" component="h2" gutterBottom style={{marginBottom: '1em', color:"#154c79"}}>
						<b>Generar Nóminas</b>
					</Typography>

					<p>Descripción si se ve necesaria q</p><br></br>
					<div align="right">
					<Button 
						variant="contained"
						color="primary"
						size="large"
						startIcon={<AddCircleIcon />}
						onClick={() => abrirCerrarModalCreate()}
					>GENERAR NÓMINA
					</Button></div>

					<TableContainer component={Paper} style={{marginTop:"20px"}}>
						<Table size="small" aria-label="a dense table">
							<TableHead>
								<TableRow>
									<StyledTableCell>ID del Empleado</StyledTableCell>
									<StyledTableCell>Nombre del Empleado</StyledTableCell>
									<StyledTableCell>Correo Electrónico</StyledTableCell>
                                    <StyledTableCell>Estado</StyledTableCell>
									<StyledTableCell>Acciones</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data.map((contract) => (
									<StyledTableRow hover key={contract.idEmployee}>
										<StyledTableCell>{contract.idEmployee}</StyledTableCell>
										<StyledTableCell>{contract.nameEmployee} </StyledTableCell>
										<StyledTableCell>{contract.emailEmployee}</StyledTableCell>
                                        <StyledTableCell>{contract.statusEmployee}</StyledTableCell>
										<StyledTableCell>
											<Button
												startIcon={<Edit />}
												//style={{marginRight:"18px"}}
												onClick={() => selectContract(contract)}
											>
											</Button>
										</StyledTableCell>
									</StyledTableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<br></br>
					<p id="message"></p>
					<br></br>
					<br></br>
                </GridItem>

				<Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
                    {bodyEditar}
				</Modal>
                <Modal open={modalCreate} onClose={abrirCerrarModalCreate}>
					{bodyCreate}
				</Modal>
			</GridContainer>
        </div>
		</PayrollProvider>
	);
}
