import React from 'react';
//import { Table } from 'reactstrap';
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

const TablaExperienciaLaboral = (props) => {
	const classes = useStyles();
	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell align="center">
							Nombre de la Empresa
						</StyledTableCell>
						<StyledTableCell align="center">Teléfono</StyledTableCell>
						<StyledTableCell align="center">Contacto</StyledTableCell>
						<StyledTableCell align="center">Cargo</StyledTableCell>
						<StyledTableCell align="center">Tiempo</StyledTableCell>
						<StyledTableCell align="center">Calificación</StyledTableCell>
						<StyledTableCell align="center">Acciones</StyledTableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{props.arrayExperienciaLaboral.length > 0 ? (
						props.arrayExperienciaLaboral.map((experienciaLaboral) => (
							<StyledTableRow
								key={experienciaLaboral.id}
								style={{ textAlign: 'center' }}
							>
								<StyledTableCell component="th" scope="row">
									{experienciaLaboral.nombreEmpresa}
								</StyledTableCell>
								<StyledTableCell align="center">
									{experienciaLaboral.telefonoEmpresa}
								</StyledTableCell>
								<StyledTableCell align="center">
									{experienciaLaboral.contacto}
								</StyledTableCell>
								<StyledTableCell align="center">
									{experienciaLaboral.cargoEmpresa}
								</StyledTableCell>
								<StyledTableCell align="center">
									{experienciaLaboral.tiempo}
								</StyledTableCell>
								<StyledTableCell align="center">
									{experienciaLaboral.calificacion}
								</StyledTableCell>
								<StyledTableCell align="center">
									<IconButton
										aria-label="editar"
										color="primary"
										onClick={() => {
											props.editRow(experienciaLaboral);
											props.setModoEditar(true);
										}}
									>
										<EditIcon />
									</IconButton>{' '}
									<IconButton
										aria-label="delete"
										color="secondary"
										onClick={() => {
											props.eliminarExperienciaLaboral(experienciaLaboral.id);
										}}
									>
										<DeleteIcon />
									</IconButton>
								</StyledTableCell>
							</StyledTableRow>
						))
					) : (
						<tr>
							<td>Sin experiencia Laboral registrada</td>
						</tr>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TablaExperienciaLaboral;
