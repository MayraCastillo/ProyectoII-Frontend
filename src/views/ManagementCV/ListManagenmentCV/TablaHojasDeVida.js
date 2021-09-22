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
import Registros from './Registros';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: '#307672',
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

const TablaHojasDeVida = ({ hojasDeVida, filtrados }) => {
	//console.log(props);
	const classes = useStyles();

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
						<Registros
							registros={filtrados.length != 0 ? filtrados : hojasDeVida}
						/>
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
