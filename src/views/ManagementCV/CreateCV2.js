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
				<Typography variant="h6" gutterBottom style={{ textAlign: 'center' }}>
					GESTION HOJA DE VIDA
				</Typography>
				<AppBar position="static" color="default">
					<Tabs
						value={value}
						onChange={handleChange}
						indicatorColor="primary"
						textColor="primary"
						variant="fullWidth"
					>
						<Tab
							data-cy="tab-informacion-personal"
							label="Información Personal"
						/>
						<Tab
							data-cy="tab-estudios-realizados"
							label="Estudios Realizados"
						/>
						<Tab
							data-cy="tab-experiencia-laboral"
							label="Experiencia Laboral"
						/>
						<Tab data-cy="tab-referencias" label="Referencias" />
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
