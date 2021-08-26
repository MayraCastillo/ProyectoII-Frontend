import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import InformationPersonal from './InformationPersonal';
import EstudiosRealizados from './EstudiosRealizados';

import HojaDeVidaContextProvider from './CurriculumVitaeContext/HojaDeVidaContext';

import Referencias from './Referencias';
import ExperienciaLaboral from './ExperienciaLaboral';
import GridItem from '../../components/Grid/GridItem';
import GridContainer from '../../components/Grid/GridContainer';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		width: '120%',
		flexFlow: 1,
		marginTop: '100px',
		margin: 'auto',
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
}));

export default function CreateCV2() {
	const classes = useStyles();
	const theme = useTheme();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index) => {
		setValue(index);
	};

	return (
		<HojaDeVidaContextProvider>
			<div className={classes.root}>
				<GridContainer>
					<GridItem xs={12} sm={12} md={12}>
						<Typography variant="h4" component="h2" gutterBottom style={{marginBottom: '1em', color:"#154c79"}}>
							<b>Registrar Hoja de Vida</b>
						</Typography>
					</GridItem>
				</GridContainer>
				
				<AppBar position="static" color="default">
					<Tabs
						value={value}
						onChange={handleChange}
						indicatorColor="primary"
						textColor="primary"
						variant="fullWidth"
					>
						<Tab label="Información Personal" />
						<Tab label="Estudios Realizados" />
						<Tab label="Experiencia Laboral" />
						<Tab label="Referencias" />
					</Tabs>
				</AppBar>
				{value === 0 && <InformationPersonal />}
				{value === 1 && <EstudiosRealizados />}
				{value === 2 && <ExperienciaLaboral />}
				{value === 3 && <Referencias />}
			</div>
		</HojaDeVidaContextProvider>
	);
}
