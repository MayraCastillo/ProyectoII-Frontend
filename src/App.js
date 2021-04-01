import './assets/css/App.css';
import CssBaseline from '@material-ui/core/CssBaseline';

import ModuloTerceros from './components/moduloTerceros';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

//Views
import Main from './main.js';
import VerNomina from './views/ManagementNomina/ver_nomina';
import VerPlanilla from './views/ManagementNomina/planilla';
import Curriculum from './views/ManagementCV/CreateCV2';
import Employees from './views/ManagementEmp/crear_empleado';
import Accounts from './views/ManagementAccount/crear_cuenta';
import Configuration from './views/ManagementConfig/crear_config';
import Entidad from './views/ManagementConfig/Terceros/crear_entidad';
import LegalParameters from './views/ManagementConfig/LegalParameters/LegalParameters';
import ActiveParameters from './views/ManagementEmp/ActiveEmployees';
import InactiveParameters from './views/ManagementEmp/InactiveEmployees';
import Nominas from './views/ManagementNomina/nominas';

const styles = makeStyles({
	root: {
		display: 'flex',
		marginLeft: '6em',
		marginRight: '1em',
		align: 'center',

		background: '#ffffff',
	},
	content: {
		display: 'flex',
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
					<Route path="/gestion_hv" component={Curriculum} />
					<Route path="/gestion_empleados" component={Employees} />
					<Route path="/ver_nomina" component={VerNomina} />
					<Route path="/ver_planilla" component={Nominas} />
					<Route path="/gestion_cuentas" component={Accounts} />
					<Route path="/configuracion" component={Configuration} />
					<Route path="/crear_entidad" component={ModuloTerceros} />
					<Route path="/crear_entidad" component={Entidad} />
					<Route path="/parametros_legales" component={LegalParameters} />
					<Route path="/empleados_activos" component={ActiveParameters} />
					<Route path="/empleados_inactivos" component={InactiveParameters} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
