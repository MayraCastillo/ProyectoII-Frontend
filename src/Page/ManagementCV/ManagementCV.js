import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import MenuItem from '@material-ui/core/MenuItem';
import Axios from 'axios';

//FIN SELECT
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
const columns = [
	{ id: 'name', label: 'Nombre', minWidth: 170 },
	{ id: 'code', label: 'Apellido', minWidth: 100 },
	{
		id: 'population',
		label: 'Identificación',
		minWidth: 170,
		align: 'right',
		format: (value) => value.toLocaleString('en-US'),
	},
	{
		id: 'size',
		label: 'Estado',
		minWidth: 170,
		align: 'right',
		format: (value) => value.toLocaleString('en-US'),
	},
];

function createData(name, code, population, size) {
	return { name, code, population, size };
}

const rows = [
	createData('Colombia', 'IN', 1324171354, 3287263),
	createData('China', 'CN', 1403500365, 9596961),
	createData('Italy', 'IT', 60483973, 301340),
	createData('United States', 'US', 327167434, 9833520),
	createData('Canada', 'CA', 37602103, 9984670),
	createData('Australia', 'AU', 25475400, 7692024),
	createData('Germany', 'DE', 83019200, 357578),
	createData('Ireland', 'IE', 4857000, 70273),
	createData('Mexico', 'MX', 126577691, 1972550),
	createData('Japan', 'JP', 126317000, 377973),
	createData('France', 'FR', 67022000, 640679),
	createData('United Kingdom', 'GB', 67545757, 242495),
	createData('Russia', 'RU', 146793744, 17098246),
	createData('Nigeria', 'NG', 200962417, 923768),
	createData('Brazil', 'BR', 210147125, 8515767),
];

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
	container: {
		maxHeight: 440,
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));
const baseUrl = `http://localhost:8091/listarMunicipios	`;
export default function ManagementCV() {
	const classes = useStyles();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	//seccion del select
	const [state, setState] = React.useState({
		filtro: '',
	});

	//PETICION
	const peticionGet = async () => {
		await Axios.get(baseUrl)
			.then((response) => {
				//setData(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	useEffect(() => {
		peticionGet();
	}, []);
	//FIN PETICION
	const handleChange = (event) => {
		const name = event.target.name;
		setState({
			...state,
			[name]: event.target.value,
		});
	};
	//Segundo select
	const [currency, setCurrency] = React.useState('EUR');
	const handleChangeC = (event) => {
		setCurrency(event.target.value);
	};

	const currencies = [
		{
			value: 'USD',
			label: 'Prospecto',
		},

		{
			value: 'BTC',
			label: 'En Prueba',
		},
		{
			value: 'JPY',
			label: 'Empleado',
		},

		{
			value: '',
			label: 'Ninguno',
		},
		{
			value: 'EUR',
			label: ' ',
		},
	];
	// fin seccion del select

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper className={classes.root}>
			<Typography variant="h6" gutterBottom>
				GESTION HOJA DE VIDA
			</Typography>

			<TextField
				id="standard-select-currency"
				select
				label="Filtrado por Estado"
				value={currency}
				onChange={handleChangeC}
				helperText="Por favor, seleccione una opción"
				variant="outlined"
			>
				{currencies.map((option) => (
					<MenuItem key={option.value} value={option.value}>
						{option.label}
					</MenuItem>
				))}
			</TextField>
			<TextField
				id="outlined-basic"
				label="Buscar por identificación"
				variant="outlined"
			/>

			<Button variant="contained" size="large" style={{ margin: 20 }}>
				Buscar
			</Button>
			<Button
				variant="contained"
				size="large"
				color="primary"
				style={{ marginLeft: '30%' }}
				onClick={() => peticionGet()}
			>
				Nuevo
			</Button>

			<TableContainer className={classes.container}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row) => {
								return (
									<TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
										{columns.map((column) => {
											const value = row[column.id];
											return (
												<TableCell key={column.id} align={column.align}>
													{column.format && typeof value === 'number'
														? column.format(value)
														: value}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}
