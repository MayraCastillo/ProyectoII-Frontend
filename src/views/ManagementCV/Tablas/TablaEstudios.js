import React, { useEffect } from 'react';

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
import CalificacionEstrellas from '../Calificacion/CalificacionEstrellas';

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

const TablaEstudios = (props) => {
	//console.log(props);
	const classes = useStyles();

	const eliminar = (estudio) => {
		if (estudio.nombreTitulo === '') {
			props.eliminarEstudio(estudio.id);
		}
	};

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell align="center">Titulo</StyledTableCell>
						<StyledTableCell align="center">Institución</StyledTableCell>
						<StyledTableCell align="center">Tiempo</StyledTableCell>
						<StyledTableCell align="center">Tipo</StyledTableCell>
						<StyledTableCell align="center">Calificación</StyledTableCell>
						<StyledTableCell align="center">Acciones</StyledTableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{props.estudios.length > 0 ? (
						props.estudios.map((estudio) => (
							<StyledTableRow key={estudio.id} style={{ textAlign: 'center' }}>
								<StyledTableCell component="th" scope="row">
									{estudio.nombreTitulo}
								</StyledTableCell>
								<StyledTableCell align="center">
									{estudio.entidad}
								</StyledTableCell>

								<StyledTableCell align="center">{estudio.tipo}</StyledTableCell>
								<StyledTableCell align="center">
									{estudio.tiempo}
								</StyledTableCell>
								<StyledTableCell align="center" readonly>
									{
										<CalificacionEstrellas
											calificacion={estudio.calificacion}
											modoLectura={false}
										/>
									}
								</StyledTableCell>
								<StyledTableCell align="center">
									<IconButton
										aria-label="editar"
										color="primary"
										onClick={() => {
											props.editRow(estudio);
											props.setModoEditar(true);
										}}
									>
										<EditIcon />
									</IconButton>{' '}
									<IconButton
										aria-label="delete"
										color="secondary"
										onClick={() => {
											props.eliminarEstudio(estudio.id);
											eliminar(estudio);
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
								Sin estudios registrados
							</StyledTableCell>
						</tr>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TablaEstudios;
