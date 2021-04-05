import React from 'react';
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
	const classes = useStyles();

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
			</StyledTableCell>
		</StyledTableRow>
	));
};

export default Registros;
