import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import VisibilityIcon from '@material-ui/icons/Visibility';
import swal from 'sweetalert'; // Para poder realizar alertas
import { HojaDeVidaContext } from '../CurriculumVitaeContext/HojaDeVidaContext';
import { useHistory } from 'react-router-dom';

import axios from 'axios';

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

const useStyles = makeStyles({
	table: {
		minWidth: 700,
	},
});

const Registros = ({ registros }) => {
	//console.log(props);
	const history = useHistory();
	const classes = useStyles();

	const { eliminarHojaDeVidaState, almacenarReferenciaHojaDeVida } = useContext(
		HojaDeVidaContext
	);

	const eliminarHV = (numeroDocumento) => {
		swal({
			title: 'Eliminar',
			text: '¿Estás seguro de que deseas eliminar esta hoja de vida?',
			icon: 'warning',
			buttons: ['No', 'Sí'],
		}).then((respuesta) => {
			if (respuesta) {
				let response;
				var authOptions = {
					method: 'DELETE',
					url: `http://localhost:8092/hojas-vida/` + numeroDocumento,
					data: {
						numero_documento: numeroDocumento,
					},
					json: true,
				};
				console.log(authOptions);
				axios(authOptions)
					.then(function (response) {})
					.catch(function (error) {
						console.log(error);
					});

				swal({
					text: 'La hoja de vida se ha eliminado con éxito',
					icon: 'success',
					button: 'Aceptar',
				}).then((respuesta) => {
					if (respuesta) {
						eliminarHojaDeVidaState(numeroDocumento);
					}
				});
			}
		});
	};

	return registros.map((hojaDeVida) => (
		<StyledTableRow
			key={hojaDeVida.numeroDocumento}
			style={{ textAlign: 'center' }}
		>
			<StyledTableCell component="th" scope="row">
				{hojaDeVida.nombres + ' ' + hojaDeVida.apellidos}
			</StyledTableCell>
			<StyledTableCell align="center">
				{hojaDeVida.numeroDocumento}
			</StyledTableCell>

			<StyledTableCell align="center">
				{hojaDeVida.estadoPersona}
			</StyledTableCell>

			<StyledTableCell align="center" style={{ display: 'flex' }}>
				<IconButton
					aria-label="editar"
					color="primary"
					onClick={() => almacenarReferenciaHojaDeVida(hojaDeVida)}
					//href="/gestion_hoja_de_vida"
					color="primary"
					variant="contained"
					size="small"
					style={{ margin: 20 }}
				>
					<EditIcon />
				</IconButton>
				<IconButton
					aria-label="delete"
					color="action"
					onClick={() => {
						console.log(hojaDeVida.numeroDocumento);

						//	props.eliminarEstudio(estudio.id);
						//	eliminar(estudio);
					}}
				>
					<VisibilityIcon />
				</IconButton>

				{hojaDeVida.estadoPersona !== 'ACTIVO' ? (
					<Button
						onClick={() =>
							localStorage.setItem('idNewEmployee', hojaDeVida.numeroDocumento)
						}
						href="/registrar_empleado"
						color="primary"
						variant="contained"
						size="small"
						style={{ margin: 20 }}
					>
						Contratar
					</Button>
				) : null}

				{hojaDeVida.estadoPersona === 'PROSPECTO' ? (
					<IconButton
						aria-label="delete"
						color="secondary"
						onClick={() => {
							eliminarHV(hojaDeVida.numeroDocumento);
						}}
					>
						<DeleteIcon />
					</IconButton>
				) : null}
			</StyledTableCell>
		</StyledTableRow>
	));
};

export default Registros;
