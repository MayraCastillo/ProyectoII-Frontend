import React, { useContext, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
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

export default function Referencias() {
	const classes = useStyles();
	const {
		referencias_Familiares_Context,
		referencias_Familiares_rf2_Context,
		referencias_Personales_rp1_Context,
		referencias_Personales_rp2_Context,
		obtenerInfoRefFamiliaresRF1,
		obtenerInfoRefFamiliaresRF2,
		obtenerInfoRefPersonales1,
		obtenerInfoRefPersonales2,
		guardarHV,
		limpiarDatosHV,
	} = useContext(HojaDeVidaContext);

	const { nombresRF1, apellidosRF1, telefonoRF1, parentescoRF1 } =
		referencias_Familiares_Context;

	//REFERENCIAS FAMILIARES 2

	const { nombresRF2, apellidosRF2, telefonoRF2, parentescoRF2 } =
		referencias_Familiares_rf2_Context;

	{
		{
			console.log(referencias_Familiares_rf2_Context);
		}
	}
	//Referencias_Personales_1

	const { nombresRP1, apellidosRP1, telefonoRP1 } =
		referencias_Personales_rp1_Context;

	//Referencias_Personales_2

	const { nombresRP2, apellidosRP2, telefonoRP2 } =
		referencias_Personales_rp2_Context;

	return (
		<>
			<form className={classes.root} autoComplete="off">
				<br />
				<div>
					<Divider />
					<Typography variant="h6" gutterBottom>
						Referencias Familiares:
					</Typography>

					<TextField
						inputProps={{ maxlength: 20 }}
						margin="normal"
						label="Nombres*"
						name="nombresRF1"
						defaultValue={referencias_Familiares_Context.nombresRF1}
						value={referencias_Familiares_Context.nombresRF1}
						fullWidth
						variant="outlined"
						helperText="Este campo es obligatorio*"
						onChange={obtenerInfoRefFamiliaresRF1}
					/>
					<TextField
						inputProps={{ maxlength: 20 }}
						margin="normal"
						name="apellidosRF1"
						label="Apellidos*"
						defaultValue={referencias_Familiares_Context.apellidosRF1}
						value={referencias_Familiares_Context.apellidosRF1}
						fullWidth
						variant="outlined"
						helperText="Este campo es obligatorio*"
						onChange={obtenerInfoRefFamiliaresRF1}
					/>
					<TextField
						margin="normal"
						label="Teléfono*"
						name="telefonoRF1"
						defaultValue={referencias_Familiares_Context.telefonoRF1}
						value={referencias_Familiares_Context.telefono}
						fullWidth
						variant="outlined"
						type="number"
						helperText="Este campo es obligatorio*"
						onChange={obtenerInfoRefFamiliaresRF1}
					/>
					<TextField
						inputProps={{ maxlength: 20 }}
						margin="normal"
						label="Parentesco*"
						name="parentescoRF1"
						defaultValue={referencias_Familiares_Context.parentescoRF1}
						value={referencias_Familiares_Context.parentesco}
						fullWidth
						variant="outlined"
						helperText="Este campo es obligatorio*"
						onChange={obtenerInfoRefFamiliaresRF1}
					/>
					<br />
					<TextField
						inputProps={{ maxlength: 20 }}
						margin="normal"
						label="Nombres"
						name="nombresRF2"
						defaultValue={referencias_Familiares_rf2_Context.nombresRF2}
						value={referencias_Familiares_rf2_Context.nombresRF2}
						fullWidth
						variant="outlined"
						onChange={obtenerInfoRefFamiliaresRF2}
					/>
					<TextField
						inputProps={{ maxlength: 20 }}
						margin="normal"
						label="Apellidos"
						name="apellidosRF2"
						defaultValue={referencias_Familiares_rf2_Context.apellidosRF2}
						value={referencias_Familiares_rf2_Context.apellidosRF2}
						fullWidth
						variant="outlined"
						onChange={obtenerInfoRefFamiliaresRF2}
					/>
					<TextField
						margin="normal"
						label="Teléfono"
						name="telefonoRF2"
						defaultValue={referencias_Familiares_rf2_Context.telefonoRF2}
						value={referencias_Familiares_rf2_Context.telefono}
						fullWidth
						type="number"
						variant="outlined"
						onChange={obtenerInfoRefFamiliaresRF2}
					/>
					<TextField
						inputProps={{ maxlength: 20 }}
						margin="normal"
						label="parentesco"
						name="parentescoRF2"
						defaultValue={referencias_Familiares_rf2_Context.parentescoRF2}
						value={referencias_Familiares_rf2_Context.parentesco}
						fullWidth
						variant="outlined"
						onChange={obtenerInfoRefFamiliaresRF2}
					/>

					<Typography variant="h6" gutterBottom>
						Referencias Personales:
					</Typography>
					<TextField
						inputProps={{ maxlength: 20 }}
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
						inputProps={{ maxlength: 20 }}
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
						inputProps={{ maxlength: 20 }}
						margin="normal"
						label="Nombres"
						name="nombresRP2"
						value={nombresRP2}
						fullWidth
						variant="outlined"
						onChange={obtenerInfoRefPersonales2}
					/>
					<TextField
						inputProps={{ maxlength: 20 }}
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

					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<Button
							data-cy="btn-guardar-hv"
							startIcon={<SaveIcon />}
							color="primary"
							variant="contained"
							style={{ margin: '12px' }}
							onClick={guardarHV}
						>
							Agregar Hoja de Vida
						</Button>

						<Button
							startIcon={<CancelIcon />}
							color="secondary"
							variant="contained"
							style={{ margin: '12px' }}
							onClick={limpiarDatosHV}
						>
							Cancelar Registro
						</Button>
					</div>
				</div>
			</form>
		</>
	);
}
