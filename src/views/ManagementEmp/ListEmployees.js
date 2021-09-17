import React from 'react';
import { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import GridItem from '../../components/Grid/GridItem';
import GridContainer from '../../components/Grid/GridContainer';
import Axios from 'axios';
import swal from 'sweetalert';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles((theme) => ({
    root: {
       	marginTop:"100px",
		width: '80%',
		margin: 'auto',
		textAlign: 'center',
    },

	table: {
		minWidth: 700,
	},
}));

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: '#154c79',
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

const baseURL = `http://localhost:8091/`;

export default function ListEmployees() {
	const styles = useStyles();
	const [data, setData] = useState([]);
	const [estadoEmpleado, setEstadoEmpleado] = useState('');

	const listContractGET = async () => {
        let urlListContract = baseURL+'/listarContratos/123';
		await Axios.get(urlListContract)
			.then((response) => {
                console.log(response.data);
                setData(response.data);
                if(response.data.length == 0){
					swal({
						title: 'No hay registros disponibles',
						text: 'No existen contratos registrados en el sistema',
						icon: 'error',
						button: 'Aceptar',
						timer: '5000',
					});
				}
			})
			.catch((error) => {
				console.log(error);
		});
	};

	useEffect(() => {
		listContractGET();
	}, []);

	const handleChange = (event) => {
		setEstadoEmpleado(event.target.value);
	};

	return (
		<div className={styles.root}>
			<GridContainer>
				<GridItem xs={12} sm={12} md={12}>
					<Typography variant="h4" component="h2" gutterBottom style={{marginBottom: '1em', color:"#154c79"}}>
						<b>Listado de Empleados</b>
					</Typography>
				</GridItem>

				<GridItem xs={12} sm={12} md={12} style={{textAlign: 'justify'}} >
					<TextField
						id="outlined-select-currency-native"
						select
						label="Filtrado por estado"
						value={estadoEmpleado}
						onChange={handleChange}
						helperText="Por favor, seleccione una opción"
						variant="outlined"
					>
						<MenuItem key={0} value={'enPrueba'}>En Prueba</MenuItem>
						<MenuItem key={1} value={'activo'}>Activo</MenuItem>
						<MenuItem key={2} value={'inactivo'}>Inactivo</MenuItem>
					</TextField>

					<TextField style={{ marginLeft:30 }}
						id="outlined-basic"
						label="Buscar por identificación"
						variant="outlined"
						//value={buscarDocumento}
						//onChange={handleFiltrados}
					/>

					<Button variant="contained" size="large" style={{ marginTop: 7, marginLeft: 30 }}>
						Buscar
					</Button>
				</GridItem>

                <GridItem xs={12} sm={12} md={12} style={{ marginTop: 20 }}>
				{data.length > 0 ? (
				<TableContainer component={Paper}>
					<Table className={styles.table} aria-label="customized table">
						<TableHead>
							<TableRow>
								<StyledTableCell align="center">Nombres y Apellidos</StyledTableCell>
								<StyledTableCell align="center">Número Documento</StyledTableCell>
								<StyledTableCell align="center">Teléfono</StyledTableCell>
								<StyledTableCell align="center">Correo</StyledTableCell>
								<StyledTableCell align="center">Estado</StyledTableCell>
								<StyledTableCell align="center">Acciones</StyledTableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{data.map((Employee) => (
								<StyledTableRow key={Employee.contratoId}>
									<StyledTableCell>{Employee.contratoPk.empleado.nombres} {Employee.contratoPk.empleado.apellidos}</StyledTableCell>
									<StyledTableCell align="center">{Employee.contratoPk.empleado.numeroDocumento}</StyledTableCell>
									<StyledTableCell align="center">{Employee.contratoPk.empleado.telefono}</StyledTableCell>
									<StyledTableCell align="center">{Employee.contratoPk.empleado.correo}</StyledTableCell>
									<StyledTableCell align="center">{Employee.estado}</StyledTableCell>
									<StyledTableCell align="center">
										<IconButton
											aria-label="editar"
											color="primary"
											//style={{color: '#010080'}}
											onClick={() => {
												//	props.editRow(estudio);
												//	props.setModoEditar(true);
											}}
										><EditIcon />
										</IconButton>

										<IconButton
											aria-label="delete"
											//color="action"
											onClick={() => {
												//	props.eliminarEstudio(estudio.id);
												//	eliminar(estudio);
											}}
										><VisibilityIcon />
										</IconButton>

										<IconButton
											aria-label="delete"
											//style={{color: '#A20000'}}
											color="secondary"
											onClick={() => {
												//	props.eliminarEstudio(estudio.id);
												//	eliminar(estudio);
											}}
										><DeleteIcon />
										</IconButton>
									</StyledTableCell>
								</StyledTableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				) : (
					<p>No hay Empleados Registrados</p> 
				)}
				</GridItem>
			</GridContainer>
		</div>
	);
};
