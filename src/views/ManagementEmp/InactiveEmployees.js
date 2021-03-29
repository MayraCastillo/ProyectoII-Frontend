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
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CancelIcon from '@material-ui/icons/Cancel';
import VisibilityIcon from '@material-ui/icons/Visibility';

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

export default function GestionPlatos() {
	const styles = useStyles();
	const [data, setData] = useState([]);
	
	/*const classes = useStyles();
	const [modalEnable, setModalEnable] = useState(false);
	

    const abrirCerrarModalEnable = () => {
		setModalEnable(!modalEnable);
	};

	const bodyEnable = (
		<div className={styles.modal}>
			<h4 style={{marginRight:"18px"}} >Habilitar Personal</h4>
			<p>¿Está seguro que quiere habilitar este empleado?</p>
			<br />
			<br />
			<div align="right">
				<Button 
					variant="contained"
					color="primary"
					startIcon={<PersonAddIcon />}
					style={{marginRight:"18px"}}
					//onClick={addParameterPOST}
				>Habilitar
				</Button>

				<Button 
					variant="contained"
					color="secondary"
					startIcon={<CancelIcon />}
					onClick={() => abrirCerrarModalEnable()}
				>Cancelar
				</Button>
			</div>
		</div>
	);*/

	//async function listParametersGET() {
	const listInactiveEmployeesGET = async () => {
		await Axios.get(baseUrl+"listarEmpleadosPorEstado/INACTIVO")
			.then((response) => {
				setData(response.data);
				if(response.data.length == 0){
					swal({
						title: 'No hay registros disponibles',
						text: 'No existen empleados inactivos en el sistema',
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
		listInactiveEmployeesGET();
	}, []);

	
	return (
		<div className={styles.root}>
			<GridContainer>
                <GridItem xs={12} sm={12} md={12}>
					<Typography variant="h3" component="h2" >
						Empleados Inactivos
					</Typography><br></br>

					<p>Descripción si se ve necesaria q</p><br></br>

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
												startIcon={<PersonAddIcon />}
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
                    <br></br>
					<p id="message"></p>
                </GridItem>

                <Modal 
				//open={modalEnable} onClose={abrirCerrarModalEnable}
				>
					{//bodyEnable
					}
				</Modal>
			</GridContainer>
            <br></br>
        </div>
	);
}
