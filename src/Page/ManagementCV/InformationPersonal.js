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

	const [paisSeleccionado, setPaisSeleccionado] = useState();
	const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState();
	const [municipioSeleccionado, setMunicipioSeleccionado] = useState();
	const [tipoDocumentoSeleccionado, setTipoDocumento] = useState();

	const {
		guardarInformacionPersonal,
		paises,
		paisSeleccionadoContext,
		departamentos,
		municipios,
	} = useContext(HojaDeVidaContext);

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
	const departamentoSelecionadoChangeHandler = (e) => {
		setDepartamentoSeleccionado(e.target.value);
		modificarDatosGenerales({
			...datos_generales,
			departamento: e.target.value,
		});
		console.log('Departamento id: ' + e.target.value);
		//	console.log(datos_generales);
	};

	const municipioSelecionadoChangeHandler = (e) => {
		setMunicipioSeleccionado(e.target.value);
		modificarDatosGenerales({
			...datos_generales,
			ciudad: e.target.value,
		});
		console.log('municipio id: ' + e.target.value);
		//	console.log(datos_generales);
	};
	const tipoDocumentoChangeHandler = (e) => {
		setMunicipioSeleccionado(e.target.value);
		modificarDatosGenerales({
			...datos_generales,
			tipoDocumento: e.target.value,
		});
		console.log('tipo documento: ' + e.target.value);
		//	console.log(datos_generales);
	};

	useEffect(() => {
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
						<Select
							value={tipoDocumentoSeleccionado}
							label="Tipo de Documento"
							onChange={tipoDocumentoChangeHandler}
						>
							<MenuItem value="">
								<em>Atrás</em>
							</MenuItem>
							<MenuItem value={'TARJETA_IDENTIDAD'}>Tarjeta Identidad</MenuItem>
							<MenuItem value={'CEDULA'}>Cédula Ciudadanía</MenuItem>
							<MenuItem value={'CEDULA_EXTRANJERIA'}>
								Cédula Extranjería
							</MenuItem>
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
								<option key={paisContext.paisId} value={paisContext.paisId}>
									{paisContext.nombre}
								</option>
							))}
						</Select>
					</FormControl>

					<FormControl variant="outlined" className={classes.formControl}>
						<InputLabel htmlFor="outlined-departamento-simple">
							Departamento
						</InputLabel>
						<Select
							native
							name="departamentos"
							value={departamentoSeleccionado}
							onChange={departamentoSelecionadoChangeHandler}
						>
							<option aria-label="None" key="-1" value="" />
							{departamentos.map((departamentoContext) => (
								<option
									key={departamentoContext.departamentoId}
									value={departamentoContext.departamentoId}
								>
									{departamentoContext.nombre}
								</option>
							))}
						</Select>
					</FormControl>

					<FormControl variant="outlined" className={classes.formControl}>
						<InputLabel htmlFor="outlined-municipio-simple">
							Município
						</InputLabel>
						<Select
							native
							name="municipios"
							value={municipioSeleccionado}
							onChange={municipioSelecionadoChangeHandler}
						>
							<option aria-label="None" key="-1" value="" />
							{municipios.map((municipioContext) => (
								<option
									key={municipioContext.municipioId}
									value={municipioContext.municipioId}
								>
									{municipioContext.nombre}
								</option>
							))}
						</Select>
					</FormControl>

					<TextField
						id="outlined-helperText"
						label="Dirección"
						name="direccion"
						fullWidth
						value={direccion}
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
