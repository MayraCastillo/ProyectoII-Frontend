import './assets/css/App.css';
import CssBaseline from '@material-ui/core/CssBaseline';

import ModuloTerceros from './views/ManagementConfig/Terceros/terceros';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

//Views
import Main from './main.js';
import Curriculum from './views/ManagementCV/CreateCV2';
import CurriculumList from './views/ManagementCV/ManagementCV';
import CreateEmployee from './views/ManagementEmp/CreateEmployee';
import ListEmployees from './views/ManagementEmp/ListEmployees';
import VerNomina from './views/ManagementNomina/ver_nomina';
import VerPlanilla from './views/ManagementNomina/planilla';
import Accounts from './views/ManagementAccount/crear_cuenta';
import Configuration from './views/ManagementConfig/crear_config';
import Entidad from './views/ManagementConfig/Terceros/crear_entidad';
import LegalParameters from './views/ManagementConfig/LegalParameters/LegalParameters';
import Nominas from './views/ManagementNomina/nominas';
import Contract from './views/ManagementContract/CreateContract';
import Prueba from './views/Prueba';
import NuevaNomina from './views/ManagementNomina2/NominaPrueba';
import ListNominas from './views/ManagementNomina2/ListPayroll';

const styles = makeStyles({
	root: {
		display: 'flex',
		marginRight: '1em',
		marginLeft:"1em",
		align: 'center',

		background: '#ffffff',
		//background: '#fae3e3',
	},
	content: {
		//display: 'flex',
		flexGrow: 1,
		padding: '3px',
		marginLeft: '70px',
		
	},
});

function App() {
	const classes = styles();

	return (
		<div className={classes.root}>
			<Router>
				<CssBaseline />
				<Main />
				<Switch>
					<Route path="/" component={Main} exact />

					<Route path="/gestion_hoja_de_vida" component={Curriculum} />
					<Route path="/listar_hojas_de_vida" component={CurriculumList} />
					<Route path="/registrar_empleado" component={CreateEmployee} />
					<Route path="/listar_empleados" component={ListEmployees} />

					<Route path="/ver_nomina" component={VerNomina} />
					<Route path="/ver_planilla" component={VerPlanilla} />
					<Route path="/gestion_cuentas" component={Accounts} />
					<Route path="/configuracion" component={Configuration} />
					<Route path="/crear_entidad" component={ModuloTerceros} />
					<Route path="/crear_entidad" component={Entidad} />
					<Route path="/parametros_legales" component={LegalParameters} />
					<Route path="/crear_contrato" component={Contract} />
					
					<Route path="/prueba" component={Prueba} />
					<Route path="/nueva_nomina" component={NuevaNomina} />
					<Route path="/listar_nominas" component={ListNominas} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
