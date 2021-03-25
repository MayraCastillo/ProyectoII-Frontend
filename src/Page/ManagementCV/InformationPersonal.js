import React, { useState, useEffect, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import axios from 'axios';

import { PaisesContext } from './CurriculumVitaeContext/PaisesContext';
import { HojaDeVidaContext } from './CurriculumVitaeContext/HojaDeVidaContext';

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 200,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
	button: {
		margin: theme.spacing(1),
	},
}));

export default function InformationPersonal() {
	const classes = useStyles();
	const [paisData, setPaisData] = React.useState([]);
	const [paisSeleccionado, setPaisSeleccionado] = useState();

	const { paises } = useContext(PaisesContext);
	/*{
		console.log(paises);
	}*/
	const { guardarInformacionPersonal } = useContext(HojaDeVidaContext);

	const [datos_generales, modificarDatosGenerales] = React.useState({
		nombres: '',
		apellidos: '',
		tipoDocumento: '',
		numeroDocumento: '',
		pais: '',
		departamento: '',
		ciudad: '',
		direccion: '',
		telefono: '',
		correo: '',
	});
	const {
		nombres,
		apellidos,
		tipoDocumento,
		numeroDocumento,
		pais,
		departamento,
		ciudad,
		direccion,
		telefono,
		correo,
	} = datos_generales;

	const obtenerInfo = (e) => {
		//console.log(e.target.name, e.target.value);

		modificarDatosGenerales({
			...datos_generales,
			[e.target.name]: e.target.value,
		});
		console.log(datos_generales);
	};
	const paisSelecionadoChangeHandler = (e) => {
		setPaisSeleccionado(e.target.value);
		modificarDatosGenerales({
			...datos_generales,
			pais: e.target.value,
		});
		//console.log(e.target.value);
		//console.log(paisSeleccionado);
	};
	useEffect(() => {
		console.log(paisSeleccionado);
		console.log(datos_generales);
	}, [paisSeleccionado]);

	useEffect(() => {
		//	console.log(paisSeleccionado);
		//	console.log(datos_generales);
		guardarInformacionPersonal(datos_generales);
	}, [datos_generales]);

	return (
		<>
			<form className={classes.root} autoComplete="off">
				<br />
				<div>
					<Divider />
					<Typography variant="h6" gutterBottom>
						Datos Personales:
					</Typography>

					<TextField
						margin="normal"
						label="Nombres"
						name="nombres"
						value={nombres}
						fullWidth
						variant="outlined"
						onChange={obtenerInfo}
					/>
					<TextField
						margin="normal"
						label="Apellidos"
						name="apellidos"
						value={apellidos}
						fullWidth
						variant="outlined"
						onChange={obtenerInfo}
					/>
					<FormControl variant="outlined" className={classes.formControl}>
						<InputLabel id="demo-simple-select-outlined-label">
							Tipo de Documento
						</InputLabel>
						<Select value={tipoDocumento} label="Tipo de Documento">
							<MenuItem value="">
								<em>Atrás</em>
							</MenuItem>
							<MenuItem value={10}>Tarjeta Identidad</MenuItem>
							<MenuItem value={20}>Cédula Ciudadanía</MenuItem>
							<MenuItem value={30}>Cédula Extranjería</MenuItem>
						</Select>
					</FormControl>
					<TextField
						margin="normal"
						label="Numero Documento"
						name="numeroDocumento"
						value={numeroDocumento}
						fullWidth
						variant="outlined"
						onChange={obtenerInfo}
					/>
					<br />
					<br />
					<Divider />
					<Typography variant="h6" gutterBottom>
						Lugar de Residencia:
					</Typography>

					<FormControl variant="outlined" className={classes.formControl}>
						<InputLabel htmlFor="outlined-pais-simple">País</InputLabel>
						<Select
							native
							name="pais"
							value={paisSeleccionado}
							onChange={paisSelecionadoChangeHandler}
						>
							<option aria-label="None" key="-1" value="" />
							{paises.map((paisContext) => (
								<option key={paisContext.paisId} value={paisContext.nombre}>
									{paisContext.nombre}
								</option>
							))}
						</Select>
					</FormControl>

					<TextField
						id="outlined-helperText"
						label="Departamento"
						helperText="Some important text"
						variant="outlined"
						onChange={obtenerInfo}
					/>
					<TextField
						id="outlined-helperText"
						label="Ciudad"
						helperText="Some important text"
						variant="outlined"
						onChange={obtenerInfo}
					/>
					<TextField
						id="outlined-helperText"
						label="Dirección"
						name="direccion"
						value={direccion}
						helperText="Some important text"
						variant="outlined"
						onChange={obtenerInfo}
					/>
					<br />
					<br />
					<Divider />
					<Typography variant="h6" gutterBottom>
						Información de Contacto:
					</Typography>
					<TextField
						id="outlined-helperText"
						label="Teléfono"
						name="telefono"
						value={telefono}
						helperText="Some important text"
						variant="outlined"
						onChange={obtenerInfo}
					/>
					<TextField
						id="outlined-helperText"
						label="Correo Electrónico"
						name="correo"
						value={correo}
						helperText="Some important text"
						variant="outlined"
						onChange={obtenerInfo}
					/>
				</div>
			</form>
		</>
	);
}
