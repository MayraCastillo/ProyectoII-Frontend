import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';

//FIN SELECT
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Modal from '@material-ui/core/Modal';
import TablaHojasDeVida from './ListManagenmentCV/TablaHojasDeVida';

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
		},

		backgroundColor: theme.palette.background.paper,
		width: '120%',
		flexFlow: 1,
		marginTop: '90px',
		margin: 'auto',
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'star',
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

export default function ManagementCV() {
	const classes = useStyles();
	const [hojasDeVida, setHojasDeVida] = React.useState([]);

	const [buscarDocumento, setBuscarDocumento] = React.useState('');

	//PETICION

	useEffect(() => {
		const peticionGet = async () => {
			const url = `http://localhost:8092/hojas-vida/`;
			const hojasDeVida = await axios.get(url);
			setHojasDeVida(hojasDeVida.data);
		};
		peticionGet();
	}, []);

	//FIN PETICION

	//Segundo select
	const [currency, setCurrency] = React.useState('EUR');
	const handleChangeC = (event) => {
		setCurrency(event.target.value);
		console.log(event.target.value);
	};

	const currencies = [
		{
			value: 'PROSPECTO',
			label: 'Prospecto',
		},

		{
			value: 'PRUEBA',
			label: 'En Prueba',
		},
		{
			value: 'EMPLEADO',
			label: 'Empleado',
		},

		{
			value: '',
			label: 'atrás',
		},
	];
	// fin seccion del select

	return (
		<Container maxWidth="lg" className={classes.root}>
			<Grid xs={12} sm={12} maxWidth="lg">
				<Typography variant="h6" gutterBottom style={{ textAlign: 'center' }}>
					GESTION HOJA DE VIDA
				</Typography>
				<br />
			</Grid>

			<Grid xs={12} sm={3}>
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
			</Grid>
			<Grid xs={12} sm={3}>
				<TextField
					id="outlined-basic"
					label="Buscar por identificación"
					variant="outlined"
					//value={buscarDocumento}
					onChange={(e) => setBuscarDocumento(e.target.value)}
				/>
			</Grid>
			<Grid xs={12} sm={3}>
				<Button variant="contained" size="large" style={{ margin: 20 }}>
					Buscar
				</Button>
			</Grid>
			<Grid xs={12} sm={12}>
				<TablaHojasDeVida
					hojasDeVida={hojasDeVida}
					buscarDocumento={buscarDocumento}
				/>
			</Grid>
		</Container>
	);
}
