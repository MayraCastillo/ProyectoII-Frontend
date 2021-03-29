import React, { useContext, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
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
		minWidth: 225,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
	button: {
		margin: theme.spacing(1),
	},
}));

export default function Referencias() {
	const classes = useStyles();
	const {
		referencias_Familiares_Context,
		guardarReferenciasFamiliaresRF1,
		referencias_Familiares_rf2_Context,
		guardarReferenciasFamiliaresRF2,
		referencias_Personales_rp1_Context,
		guardarReferenciasPersonales1,
		referencias_Personales_rp2_Context,
		guardarReferenciasPersonales2,
		guardarHV,
	} = useContext(HojaDeVidaContext);

	const [
		referencias_Familiares,
		modificarReferenciasFamiliaresRF1,
	] = React.useState({
		nombresRF1: '',
		apellidosRF1: '',
		telefonoRF1: '',
		parentescoRF1: '',
	});
	const {
		nombresRF1,
		apellidosRF1,
		telefonoRF1,
		parentescoRF1,
	} = referencias_Familiares;

	const obtenerInfoRefFamiliaresRF1 = (e) => {
		//console.log(e.target.name, e.target.value);
		modificarReferenciasFamiliaresRF1({
			...referencias_Familiares,
			[e.target.name]: e.target.value,
		});
		console.log(referencias_Familiares);
	};

	//REFERENCIAS FAMILIARES 2

	const [
		referencias_Familiares_rf2,
		modificarReferenciasFamiliaresRF2,
	] = React.useState({
		nombresRF2: '',
		apellidosRF2: '',
		telefonoRF2: '',
		parentescoRF2: '',
	});
	const {
		nombresRF2,
		apellidosRF2,
		telefonoRF2,
		parentescoRF2,
	} = referencias_Familiares_rf2;

	const obtenerInfoRefFamiliaresRF2 = (e) => {
		//console.log(e.target.name, e.target.value);
		modificarReferenciasFamiliaresRF2({
			...referencias_Familiares_rf2,
			[e.target.name]: e.target.value,
		});
		console.log(referencias_Familiares_rf2);
	};

	//Referencias_Personales_1

	const [
		referencias_Personales_rp1,
		modificarReferenciasPersonales1,
	] = React.useState({
		nombresRP1: '',
		apellidosRP1: '',
		telefonoRP1: '',
	});
	const { nombresRP1, apellidosRP1, telefonoRP1 } = referencias_Personales_rp1;

	const obtenerInfoRefPersonales1 = (e) => {
		//console.log(e.target.name, e.target.value);
		modificarReferenciasPersonales1({
			...referencias_Personales_rp1,
			[e.target.name]: e.target.value,
		});
		console.log(referencias_Personales_rp1);
	};
	//Referencias_Personales_2

	const [
		referencias_Personales_rp2,
		modificarReferenciasPersonales2,
	] = React.useState({
		nombresRP2: '',
		apellidosRP2: '',
		telefonoRP2: '',
	});
	const { nombresRP2, apellidosRP2, telefonoRP2 } = referencias_Personales_rp2;

	const obtenerInfoRefPersonales2 = (e) => {
		//console.log(e.target.name, e.target.value);
		modificarReferenciasPersonales2({
			...referencias_Personales_rp2,
			[e.target.name]: e.target.value,
		});
		console.log(referencias_Personales_rp2);
	};

	useEffect(() => {
		guardarReferenciasFamiliaresRF1(referencias_Familiares);
	}, [referencias_Familiares]);
	useEffect(() => {
		guardarReferenciasFamiliaresRF2(referencias_Familiares_rf2);
	}, [referencias_Familiares_rf2]);

	useEffect(() => {
		guardarReferenciasPersonales1(referencias_Personales_rp1);
	}, [referencias_Personales_rp1]);
	useEffect(() => {
		guardarReferenciasPersonales2(referencias_Personales_rp2);
	}, [referencias_Personales_rp2]);

	return (
		<>
			<form className={classes.root} autoComplete="off">
				<br />
				<div>
					<Divider />
					<Typography variant="h6" gutterBottom>
						Referencias Personales:
					</Typography>

					<TextField
						margin="normal"
						label="Nombres*"
						name="nombresRF1"
						value={nombresRF1}
						defaultValue={referencias_Familiares_rf2_Context.nombresRF1}
						fullWidth
						variant="outlined"
						helperText="Este campo es obligatorio*"
						onChange={obtenerInfoRefFamiliaresRF1}
					/>
					<TextField
						margin="normal"
						label="Apellidos*"
						name="apellidosRF1"
						value={apellidosRF1}
						fullWidth
						variant="outlined"
						helperText="Este campo es obligatorio*"
						onChange={obtenerInfoRefFamiliaresRF1}
					/>
					<TextField
						margin="normal"
						label="Teléfono*"
						name="telefonoRF1"
						value={telefonoRF1}
						fullWidth
						variant="outlined"
						type="number"
						helperText="Este campo es obligatorio*"
						onChange={obtenerInfoRefFamiliaresRF1}
					/>
					<TextField
						margin="normal"
						label="Parentezco*"
						name="parentescoRF1"
						value={parentescoRF1}
						fullWidth
						variant="outlined"
						helperText="Este campo es obligatorio*"
						onChange={obtenerInfoRefFamiliaresRF1}
					/>
					<br />
					<TextField
						margin="normal"
						label="Nombres"
						name="nombresRF2"
						value={nombresRF2}
						fullWidth
						variant="outlined"
						onChange={obtenerInfoRefFamiliaresRF2}
					/>
					<TextField
						margin="normal"
						label="Apellidos"
						name="apellidosRF2"
						value={apellidosRF2}
						fullWidth
						variant="outlined"
						onChange={obtenerInfoRefFamiliaresRF2}
					/>
					<TextField
						margin="normal"
						label="Teléfono"
						name="telefonoRF2"
						value={telefonoRF2}
						fullWidth
						type="number"
						variant="outlined"
						onChange={obtenerInfoRefFamiliaresRF2}
					/>
					<TextField
						margin="normal"
						label="parentesco"
						name="parentescoRF2"
						value={parentescoRF2}
						fullWidth
						variant="outlined"
						onChange={obtenerInfoRefFamiliaresRF2}
					/>

					<Typography variant="h6" gutterBottom>
						Referencias Personales:
					</Typography>
					<TextField
						margin="normal"
						label="Nombres*"
						name="nombresRP1"
						value={nombresRP1}
						fullWidth
						variant="outlined"
						helperText="Este campo es obligatorio*"
						onChange={obtenerInfoRefPersonales1}
					/>
					<TextField
						margin="normal"
						label="Apellidos*"
						name="apellidosRP1"
						value={apellidosRP1}
						fullWidth
						variant="outlined"
						helperText="Este campo es obligatorio*"
						onChange={obtenerInfoRefPersonales1}
					/>
					<TextField
						margin="normal"
						label="Teléfono*"
						name="telefonoRP1"
						value={telefonoRP1}
						fullWidth
						type="number"
						variant="outlined"
						helperText="Este campo es obligatorio*"
						onChange={obtenerInfoRefPersonales1}
					/>
					<br />
					<TextField
						margin="normal"
						label="Nombres"
						name="nombresRP2"
						value={nombresRP2}
						fullWidth
						variant="outlined"
						onChange={obtenerInfoRefPersonales2}
					/>
					<TextField
						margin="normal"
						label="Apellidos"
						name="apellidosRP2"
						value={apellidosRP2}
						fullWidth
						variant="outlined"
						onChange={obtenerInfoRefPersonales2}
					/>
					<TextField
						margin="normal"
						label="Teléfono"
						name="telefonoRP2"
						value={telefonoRP2}
						fullWidth
						type="number"
						variant="outlined"
						onChange={obtenerInfoRefPersonales2}
					/>

					<br />
					<Divider />
					<Button
						color="primary"
						variant="contained"
						style={{ margin: '12px' }}
						onClick={guardarHV}
					>
						Agregar Hoja de Vida
					</Button>

					<Button color="secondary" variant="contained">
						Cancelar
					</Button>
				</div>
			</form>
		</>
	);
}
