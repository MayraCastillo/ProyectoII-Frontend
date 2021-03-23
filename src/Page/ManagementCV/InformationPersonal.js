import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
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

export default function InformationPersonal() {
	const classes = useStyles();
	//	const [tipoDocumento, setTipoDocumento] = React.useState('');
	//	const [pais, setPais] = React.useState('');

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

	const handleChange = (event) => {
		//setTipoDocumento(event.target.value);
	};
	const handleChangePais = (event) => {
		//setPais(event.target.value);
	};

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
							value={tipoDocumento}
							onChange={handleChange}
							label="Tipo de Documento"
						>
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
						<InputLabel id="demo-simple-select-outlined-label">País</InputLabel>
						<Select value={pais} onChange={handleChangePais} label="País">
							<MenuItem value="">
								<em>Atrás</em>
							</MenuItem>

							<MenuItem value={0}>Argentina </MenuItem>
							<MenuItem value={1}>Belice </MenuItem>
							<MenuItem value={2}>Bolivia </MenuItem>
							<MenuItem value={3}>Brasil </MenuItem>
							<MenuItem value={4}>Canada </MenuItem>
							<MenuItem value={5}>Chile </MenuItem>
							<MenuItem value={6}>Colombia </MenuItem>
							<MenuItem value={7}>Costa Rica </MenuItem>
							<MenuItem value={8}>Cuba</MenuItem>
							<MenuItem value={9}>Ecuador </MenuItem>
							<MenuItem value={10}>El Salvador </MenuItem>
							<MenuItem value={11}>España </MenuItem>
							<MenuItem value={12}>Estados Unidos </MenuItem>
							<MenuItem value={13}>Groenlandia </MenuItem>
							<MenuItem value={14}>Guatemala </MenuItem>
							<MenuItem value={15}>Guayana Francesa </MenuItem>
							<MenuItem value={16}>Guyana </MenuItem>
							<MenuItem value={17}>Haiti</MenuItem>
							<MenuItem value={18}>Honduras </MenuItem>
							<MenuItem value={19}>Islas Malvinas </MenuItem>
							<MenuItem value={20}>Mexico</MenuItem>
							<MenuItem value={21}>Nicaragua </MenuItem>
							<MenuItem value={22}>Panama </MenuItem>
							<MenuItem value={23}>Paraguay </MenuItem>
							<MenuItem value={24}>Peru </MenuItem>
							<MenuItem value={25}>Puerto Rico</MenuItem>
							<MenuItem value={26}>Republica dominicana</MenuItem>
							<MenuItem value={27}>Surinam </MenuItem>
							<MenuItem value={28}>Uruguay </MenuItem>
							<MenuItem value={29}>Venezuela </MenuItem>
							<MenuItem value={30}>Otro/Other</MenuItem>
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
