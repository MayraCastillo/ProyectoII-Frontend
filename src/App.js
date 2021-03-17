import './App.css';
import CssBaseline from "@material-ui/core/CssBaseline";
import Main from "./main.js";
import CustomizedTable from "./components/crear_nomina";
import Curriculum from "./components/crear_hv";
import Employees from "./components/crear_empleado";
import Accounts from "./components/crear_cuenta";
import Configuration from "./components/crear_config";
import Entidad from "./components/crear_entidad";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
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
            <Route path="/crear_entidad" component={Entidad}/>
        </Switch>
       </Router>
    </div>
  );
}

export default App;
