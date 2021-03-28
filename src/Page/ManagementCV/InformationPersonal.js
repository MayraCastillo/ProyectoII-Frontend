import React, { useState, useEffect, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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

	const {
		informacionPersonalContext,
		obtenerInfo,
		tipoDocumentoChangeHandler,
		paisSelecionadoChangeHandler,
		departamentoSelecionadoChangeHandler,
		municipioSelecionadoChangeHandler,
		paises,
		departamentos,
		municipios,
	} = useContext(HojaDeVidaContext);

	const {
		nombres,
		apellidos,
		tipoDocumento,
		numeroDocumento,
		pais,
		departamento,
		municipio,
		direccion,
		telefono,
		correo,
	} = informacionPersonalContext;
	{
		console.log(paises);
	}

	return (
		<Container maxWidth="lg">
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
							value={tipoDocumento}
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
						<InputLabel id="demo-simple-select-outlined-label">País</InputLabel>
						<Select
							label="País"
							value={pais}
							onChange={paisSelecionadoChangeHandler}
						>
							<option aria-label="None" key="" value="" />
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
							label="Departamento"
							value={departamento}
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
							label="Município"
							value={municipio}
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
						type="number"
					/>
					<TextField
						id="outlined-helperText"
						label="Correo Electrónico"
						name="correo"
						type="email"
						value={correo}
						helperText="Some important text"
						variant="outlined"
						onChange={obtenerInfo}
					/>
				</div>
			</form>
		</Container>
	);
}
