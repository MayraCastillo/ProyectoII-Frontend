<<<<<<< HEAD
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Main from './main.js';
import CustomizedTable from './components/crear_nomina';
import Curriculum from './components/crear_hv';
import Employees from './components/crear_empleado';
import Accounts from './components/crear_cuenta';
import Configuration from './components/crear_config';
import Entidad from './components/crear_entidad';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
=======
import './assets/css/App.css';
import CssBaseline from "@material-ui/core/CssBaseline";


import ModuloTerceros from "./components/moduloTerceros";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
>>>>>>> 0f13c41b0836d7cbc8e19c11858d61af9a98333e
import { makeStyles } from '@material-ui/core/styles';
import gestionHV from './Page/ManagementCV/CreateCV2';

//Views
import Main from "./main.js";
import CrearNomina from "./views/ManagementNomina/crear_nomina";
import VerNomina from "./views/ManagementNomina/ver_nomina";
import VerPlanilla from "./views/ManagementNomina/planilla";
import Curriculum from "./views/ManagementCV/CreateCV2";
import Employees from "./views/ManagementEmp/crear_empleado";
import Accounts from "./views/ManagementAccount/crear_cuenta";
import Configuration from "./views/ManagementConfig/crear_config";
import Entidad from "./views/ManagementConfig/Terceros/crear_entidad";
import LegalParameters from "./views/ManagementConfig/LegalParameters/LegalParameters"
import ActiveParameters from "./views/ManagementEmp/ActiveEmployees"
import InactiveParameters from "./views/ManagementEmp/InactiveEmployees"

const styles = makeStyles({
<<<<<<< HEAD
	root: {
		display: 'flex',
		marginLeft: '3em',
		alignItems: 'center',
=======
  root: {
    display: "flex",
    marginLeft:"6em",
    marginRight:"1em",
    align:"center",
    
    background: '#ffffff',
  },
  content: {
    display: "flex",
    flexGrow: 1,
    padding: "3px",
    marginLeft:"70px"
  },
});
>>>>>>> 0f13c41b0836d7cbc8e19c11858d61af9a98333e

		width: '100%',
		background: '#ffffff',
	},
	content: {
		display: 'flex',
		flexGrow: 1,
		padding: '3px',
		marginLeft: '100px',
	},
});

function App() {
	const classes = styles();

<<<<<<< HEAD
	return (
		<div className={classes.root}>
			<Router>
				<CssBaseline />
				<Main />
				<Switch>
					<Route path="/" component={Main} exact />
					<Route path="/gestion_hv" component={gestionHV} />
					<Route path="/gestion_empleados" component={Employees} />
					<Route path="/gestion_nomina" component={CustomizedTable} />
					<Route path="/gestion_cuentas" component={Accounts} />
					<Route path="/configuracion" component={Configuration} />
					<Route path="/crear_entidad" component={Entidad} />
				</Switch>
			</Router>
		</div>
	);
=======
  return (
    <div className={classes.root}>
       <Router>
       <CssBaseline />
       <Main />
       <Switch>
            <Route path="/" component={Main} exact />
            <Route path="/gestion_hv" component={Curriculum} />
            <Route path="/gestion_empleados" component={Employees}/>
            <Route path="/crear_nomina" component={CrearNomina}/>
            <Route path="/ver_nomina" component={VerNomina}/>
            <Route path="/ver_planilla" component={VerPlanilla}/>
            <Route path="/gestion_cuentas" component={Accounts}/>
            <Route path="/configuracion" component={Configuration}/>
            <Route path="/crear_entidad" component={ModuloTerceros}/>
            <Route path="/crear_entidad" component={Entidad}/>
            <Route path="/parametros_legales" component={LegalParameters}/>
            <Route path="/empleados_activos" component={ActiveParameters}/>
            <Route path="/empleados_inactivos" component={InactiveParameters}/>
        </Switch>
       </Router>
    </div>
  );
>>>>>>> 0f13c41b0836d7cbc8e19c11858d61af9a98333e
}

export default App;
