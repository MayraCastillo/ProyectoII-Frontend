import React, { useState, useEffect, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import swal from 'sweetalert'; // Para poder realizar alertas
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';

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
		guardarInformacionPersonal,
		obtenerInfo,
		tipoDocumentoChangeHandler,
		paisSelecionadoChangeHandler,
		departamentoSelecionadoChangeHandler,
		municipioSelecionadoChangeHandler,
		paises,
		departamentos,
		municipios,
		validarTelefono,
		bloquearBlur,
		peticionGet,
		peticionGetDepartamentos,
		peticionGetMunicipios,
	} = useContext(HojaDeVidaContext);

	const {
		nombres,
		apellidos,
		tipoDocumento,
		numeroDocumento,
		paisId,
		departamentoId,
		municipioId,
		direccion,
		telefono,
		correo,
	} = informacionPersonalContext;

	const validarExistenciaDocumento = (numeroDocumento) => {
		let response;
		var authOptions = {
			method: 'GET',
			url: `http://localhost:8092/hojas-vida/buscar-por-id/` + numeroDocumento,
			data: {
				numero_documento: numeroDocumento,
			},
			json: true,
		};
		//console.log(authOptions);
		axios(authOptions)
			.then(function (response) {
				console.log(response);
				if (response.data.numeroDocumento) {
					swal({
						title: 'Documento duplicado',
						text: 'Este documento ya se encuentra registrado',
						icon: 'warning',
						button: 'Aceptar',
						timer: '3000',
					}).then((result) => {
						guardarInformacionPersonal({
							...informacionPersonalContext,
							numeroDocumento: '',
						});
					});
					return;
				}
			})
			.catch(function (error) {});

		if (numeroDocumento.toString().length < 6) {
			swal({
				title: 'Tamaño Incorrecto',
				text: 'Este documento tiene un número de caracteres incorrecto',
				icon: 'warning',
				button: 'Aceptar',
				timer: '3000',
			}).then((result) => {
				guardarInformacionPersonal({
					...informacionPersonalContext,
					numeroDocumento: '',
				});
			});
			return;
		}
	};
	/*
useEffect(() => {
	if (bloquearBlur) {
		//peticionGet();
		peticionGetDepartamentos();
		departamentoSelecionadoChangeHandler(paisId);
		console.log(departamentoId, departamentos);
		
		//peticionGetMunicipios();
		municipioSelecionadoChangeHandler(departamentoId);
	}
}, [paisId, departamentoId]);
*/
	const ubicacionEditar = () => {
		console.log(paises);
		paisSelecionadoChangeHandler(paisId);
		console.log(paisId);
		console.log(departamentos);
	};

	useEffect(() => {
		console.log(informacionPersonalContext);
		if (bloquearBlur) {
			ubicacionEditar();
		}
	}, []);

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
						data-cy="input-informacion-personal-nombres"
						inputProps={{ maxlength: 20 }}
						margin="normal"
						label="Nombres"
						name="nombres"
						value={nombres}
						fullWidth
						variant="outlined"
						onChange={obtenerInfo}
						required
					/>
					<TextField
						data-cy="input-informacion-personal-apellidos"
						inputProps={{ maxlength: 20 }}
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
							data-cy="input-informacion-personal-tipoDoc"
							value={tipoDocumento}
							label="Tipo de Documento"
							onChange={tipoDocumentoChangeHandler}
							//disabled={bloquearBlur ? false : true}
						>
							<option value="">Seleccione</option>
							<option value={'TARJETA_IDENTIDAD'}>Tarjeta Identidad</option>
							<option value={'CEDULA'}>Cédula Ciudadanía</option>
							<option value={'CEDULA_EXTRANJERIA'}>Cédula Extranjería</option>
						</Select>
					</FormControl>
					<TextField
						data-cy="input-informacion-personal-numDocumento"
						margin="normal"
						label="Numero Documento"
						name="numeroDocumento"
						value={numeroDocumento}
						fullWidth
						variant="outlined"
						type="number"
						onChange={obtenerInfo}
						//disabled={bloquearBlur ? false : true}
						onBlur={() => {
							if (!bloquearBlur) {
								validarExistenciaDocumento(
									informacionPersonalContext.numeroDocumento
								);
							}
						}}
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
							data-cy="input-informacion-personal-pais"
							label="País"
							value={paisId}
							onChange={(e) => paisSelecionadoChangeHandler(e.target.value)}
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
							data-cy="input-informacion-personal-departamento"
							label="Departamento"
							value={departamentoId}
							onChange={(e) =>
								departamentoSelecionadoChangeHandler(e.target.value)
							}
						>
							<option aria-label="None" key="" value="" />
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
							data-cy="input-informacion-personal-municipio"
							label="Município"
							value={municipioId}
							onChange={(e) =>
								municipioSelecionadoChangeHandler(e.target.value)
							}
						>
							<option aria-label="None" key="" value="" />
							{municipios.map((municipioContext) => (
								<option
									key={municipioContext.municipio_id}
									value={municipioContext.municipio_id}
								>
									{municipioContext.nombre}
								</option>
							))}
						</Select>
					</FormControl>
					<TextField
						data-cy="input-informacion-personal-direccion"
						inputProps={{ maxlength: 40 }}
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
						data-cy="input-informacion-personal-telefono"
						id="outlined-helperText"
						label="Teléfono"
						name="telefono"
						value={telefono}
						helperText="Formato: 3xxxxxxxxx"
						variant="outlined"
						onChange={obtenerInfo}
						required
						type="number"
					/>
					<TextField
						data-cy="input-informacion-personal-correo"
						inputProps={{ maxlength: 30 }}
						id="outlined-helperText"
						label="Correo Electrónico"
						name="correo"
						type="email"
						value={correo}
						variant="outlined"
						onChange={obtenerInfo}
						onBlur={() =>
							validarExistenciaDocumento(informacionPersonalContext.correo)
						}
					/>
				</div>
			</form>
		</Container>
	);
}
