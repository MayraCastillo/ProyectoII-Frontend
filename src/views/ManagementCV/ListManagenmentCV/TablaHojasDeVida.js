import React from 'react';

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

const TablaHojasDeVida = ({ hojasDeVida, buscarDocumento }) => {
	//console.log(props);
	const classes = useStyles();
	/*
	const eliminar = (estudio) => {
		if (estudio.nombreTitulo === '') {
			props.eliminarEstudio(estudio.id);
		}
	};
*/
	console.log(typeof hojasDeVida);

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell align="center">
							Nombres y Apellidos
						</StyledTableCell>
						<StyledTableCell align="center">Número Documento</StyledTableCell>
						<StyledTableCell align="center">Estado</StyledTableCell>

						<StyledTableCell align="center">Acciones</StyledTableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{hojasDeVida.length > 0 ? (
						hojasDeVida.map((hojaDeVida) => (
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

								<StyledTableCell align="center">
									<IconButton
										aria-label="editar"
										color="primary"
										onClick={() => {
											//	props.editRow(estudio);
											//	props.setModoEditar(true);
										}}
									>
										<EditIcon />
									</IconButton>
									<IconButton
										aria-label="delete"
										color="action"
										onClick={() => {
											//	props.eliminarEstudio(estudio.id);
											//	eliminar(estudio);
										}}
									>
										<VisibilityIcon />
									</IconButton>
									<IconButton
										aria-label="delete"
										color="secondary"
										onClick={() => {
											//	props.eliminarEstudio(estudio.id);
											//	eliminar(estudio);
										}}
									>
										<DeleteIcon />
									</IconButton>
								</StyledTableCell>
							</StyledTableRow>
						))
					) : (
						<tr>
							<StyledTableCell maginLeft="5%">
								Sin hojas de vida registradas
							</StyledTableCell>
						</tr>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TablaHojasDeVida;
