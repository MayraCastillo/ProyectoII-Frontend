import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import GridItem from '../../components/Grid/GridItem';
import GridContainer from '../../components/Grid/GridContainer';
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
		marginTop:"100px",
		width: '100%',
		margin: 'auto',
		textAlign: 'center',
	},
	rootBody: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
		},

		backgroundColor: theme.palette.background.paper,
		width: '120%',
		flexFlow: 1,
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

	//seccion del select
	const [state, setState] = React.useState({
		filtro: '',
	});
	const [buscarDocumento, setBuscarDocumento] = React.useState('');
	const [filtrados, setFiltrados] = React.useState([]);

	const handleFiltrados = (e) => {
		const hojasActualizadas = hojasDeVida.filter(
			(item) => item.numeroDocumento.toString().indexOf(e.target.value) !== -1
		);
		setFiltrados(hojasActualizadas);
		console.log(filtrados);
	};

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

	useEffect(() => {
		const peticionGetFiltarDocumento = () => {
			let response;
			var authOptions = {
				method: 'GET',
				url:
					`http://localhost:8092/hojas-vida/buscar-por-id/` + buscarDocumento,
				data: {
					buscarDocumento: buscarDocumento,
				},

				json: true,
			};
			//console.log(authOptions);
			axios(authOptions).then(function (response) {
				console.log(response.data);
				setHojasDeVida(response.data);
			});
		};
		{
			console.log(hojasDeVida);
		}
		peticionGetFiltarDocumento();
	}, [buscarDocumento]);
	const handleChange = (event) => {
		setBuscarDocumento(event.target.value);
	};
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
		<div className={classes.root}>
			<GridContainer>
				<GridItem xs={12} sm={12} md={12}>
					<Typography variant="h4" component="h2" gutterBottom style={{marginBottom: '1em', color:"#154c79"}}>
						<b>Listado de Hojas de Vida</b>
					</Typography>
				</GridItem>
			</GridContainer>

			<Container maxWidth="lg" className={classes.rootBody}>
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
						onChange={handleFiltrados}
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
						filtrados={filtrados}
					/>
				</Grid>
			</Container>
		</div>
	);
}
