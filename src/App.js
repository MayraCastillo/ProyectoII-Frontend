import './App.css';
import CssBaseline from "@material-ui/core/CssBaseline";
import Main from "./main.js";
import CustomizedTable from "./components/crear_nomina";
import Curriculum from "./components/crear_hv";
import Employees from "./components/crear_empleado";
import Accounts from "./components/crear_cuenta";
import Configuration from "./components/crear_config";
import ModuloTerceros from "./components/moduloTerceros";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles({
  root: {
    display: "flex",
    marginLeft:"3em",
    alignItems: "center",
    width:'100%',
    background: '#ffffff',
  },
  content: {
    display: "flex",
    flexGrow: 1,
    padding: "3px",
    marginLeft:"70px"
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
            <Route path="/gestion_empleados" component={Employees}/>
            <Route path="/gestion_nomina" component={CustomizedTable}/>
            <Route path="/gestion_cuentas" component={Accounts}/>
            <Route path="/configuracion" component={Configuration}/>
            <Route path="/crear_entidad" component={ModuloTerceros}/>
        </Switch>
       </Router>
    </div>
  );
}

export default App;
