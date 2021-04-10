import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CrearNomina from './crear_nomina';
import Horas from './planilla';
import Nomina from './info_nomina';
import Salarial from './salariales';
import NoSalarial from './nosalariales';
import Extras from './recargos';
import TextField from '@material-ui/core/TextField';
import { Grid, InputLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';
import axios from 'axios';
import Divider from '@material-ui/core/Divider';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor:'#ffffff',
    marginTop:'0px',
    marginRight:'0px'
  },
  container:{
      marginRight:'0%'
  },
  big:{
    marginLeft: "5px",
    marginRight: "5px",
    marginBottom:'15px',
    width: "20ch",
    
  },

  small:{
    marginLeft: "9px",
    marginRight: "9px",
    marginBottom:'15px',
    width: "20ch",
  },

  horas:{
    marginLeft:"7px",
    marginBottom:"15px",
    width:"10ch"
  },

  button:{
    height: 50
  },

  factores:{
    marginLeft:"30%",
    color:"#3d5afe"
  },
  horasLaboradas:{
    marginLeft:"6%"
  },
  derecha:{
    marginRight:"2%"
  },
  izquierda:{
    marginLeft:"2%",
    marginRight:"2%"
  }
}));

export default function Acciones(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [horasLaboradas, setHoras] = React.useState(0);
  const [recargoDDF, setRecargoDDF] = React.useState(0);
  const [recargoNOR, setRecargoNOR] = React.useState(0);
  const [recargoNDF, setRecargoNDF] = React.useState(0);
  const [extraDOR, setExtraDOR] = React.useState(0);
  const [extraNOR, setExtraNOR] = React.useState(0);
  const [extraNDF, setExtraNDF] = React.useState(0);
  const [extraDDF, setExtraDDF] = React.useState(0);
  const [bonificaciones_sal, setBonificaciones_sal]=React.useState(0);
  const [comisiones_sal, setComisiones_sal]= React.useState(0);
  const [auxilioExtra_sal, setAuxilioExtra_sal] = React.useState(0);
  const [viaticos_sal, setViaticos_sal] = React.useState(0);
  const [otros_sal, setOtros_sal] = React.useState(0);
  const [bonificaciones_nosal, setBonificaciones_nosal]=React.useState(0);
  const [comisiones_nosal, setComisiones_nosal]= React.useState(0);
  const [auxilioExtra_nosal, setAuxilioExtra_nosal] = React.useState(0);
  const [viaticos_nosal, setViaticos_nosal]= React.useState(0);
  const [otros_nosal, setOtros_nosal] = React.useState(0);
  const [fechaInicio, setFechaInicio] = React.useState('');
  const [fechaFin, setFechaFin]= React.useState('');
  const [detalle, setDetalle]=React.useState('');
  const url = "http://localhost:8093/";

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const handleSubmit = (evt) => {
    //alert(props.idcontrato+" - "+props.salario+" - "+extraNOR+" - "+comisiones_sal+" - "+comisiones_nosal+" - "+fechaInicio)
    //console.log(props.idcontrato);
    evt.preventDefault();
    if(fechaFin<fechaInicio || fechaInicio==='' || fechaFin===''){
      swal("Advertencia","El período para calcular la nómina es inválido", "warning");
    }else{

    axios.post(url+'parametros/crearNomina/', {
      salarioBase: 120000,
      contratoId: props.idcontrato,
      registroHoras:{
        contratoId: props.idcontrato,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        horasTrabajadas: horasLaboradas,
        extrasDiurnoOrdinaro: extraDOR,
        extrasNoturnoOrdinario: extraNOR,
        extrasDominicalFestivoDiurno: extraDDF,
        extrasDominicalFestivoNoturno: extraNDF,
        recargoNoturno: recargoNOR,
        recargoDiurnoDominicalFestivo: recargoDDF,
        recargoNoturnoDominicalFestivo: recargoNDF
      },
      factoresSalariales:{
        contratoId: props.idcontrato,
        comisiones: comisiones_sal,
        bonificaciones: bonificaciones_sal,
        auxilioExtra: auxilioExtra_sal,
        viaticos: viaticos_sal,
        otros: otros_sal,
        tipo: 'SALARIAL'
      },

      factoresNoSalariales:{
        contratoId: props.idcontrato,
        comisiones: comisiones_nosal,
        bonificaciones: bonificaciones_nosal,
        auxilioExtra: auxilioExtra_nosal,
        viaticos: viaticos_nosal,
        otros: otros_nosal,
        tipo: 'NO SALARIAL'
      },

      pagoNomina:{
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        detalle: detalle
      }


    })
    .then(response => {
        swal("Éxito", "Se registró exitosamente la nómina de: "+props.nomEmpleado, "success");
        //handleClose();
    })
      .catch((error) => {
            console.log(error);
            swal("Error", "No se pudo generar la nómina de "+props.nomEmpleado, "error");
        })
      }
}



  return (
    <div className={classes.root}>
      <AppBar position="static" align="center" className={classes.container}>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered  variant="fullWidth">
          <Tab label="Horas Laborales" {...a11yProps(0)} align="center"/>
          <Tab label="Factores Salariales" {...a11yProps(1)}  className={classes.container} align="center"/>
          <Tab label="Factores No Salariales" {...a11yProps(2)}  className={classes.container} align="center"/>
          <Tab label="Detalles de la Nómina" {...a11yProps(3)}  align="center"/>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} align="justify" className={classes.container}>
        <Typography variant="h6" color="primary" align="center" gutterBottom>Horas Laboradas de {props.nomEmpleado}</Typography>
        <br/>
        <Grid container className={classes.horasLaboradas}>
          <Grid  item xs={3}  spacing={3} align="center" className={classes.derecha}>
            <Typography variant="h6" align="center">Horas laborales</Typography>
            <br/>
            <Grid item align="center">
            <TextField
                required
                className={classes.small}
                id="outlined-required"
                label="horas"
                variant="outlined"
                type="number"
                InputProps={{ inputProps: { min: 0, max: 240 } }}
                size="small"
                onChange={(e)=> setHoras(e.target.value)}
                value={horasLaboradas}
            />
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs={3} spacing={3} className={classes.izquierda}>
            <Typography variant="h6" align="center">Horas Extra</Typography>
            <br/>
            <Grid item>
            <TextField
                required
                className={classes.small}
                id="outlined-required"
                label="Diurno Ordinario"
                variant="outlined"
                InputProps={{ inputProps: { min: 0, max: 240 } }}
                type="number"
                size="small"
                onChange={(e)=> setExtraDOR(e.target.value)}
                value={extraDOR}
            />
              <TextField
          required
          className={classes.small}
          id="outlined-required"
          label="Nocturno Ordinario"
          variant="outlined"
          InputProps={{ inputProps: { min: 0, max: 240 } }}
          type="number"
          size="small"
          onChange={(e)=> setExtraNOR(e.target.value)}
          value={extraNOR}
        />
            </Grid>
           
        <TextField
          required
          className={classes.small}
          id="outlined-required"
          label="Diurno Dom y Fes"
          variant="outlined"
          size="small"
          onChange={(e)=> setExtraDDF(e.target.value)}
          InputProps={{ inputProps: { min: 0, max: 240 } }}
          type="number"
          value={extraDDF}
        />
        <TextField
          required
          className={classes.small}
          id="outlined-required"
          label="Nocturno Dom y Fes"
          variant="outlined"
          size="small"
          type="number"
          InputProps={{ inputProps: { min: 0, max: 240 } }}
          onChange={(e)=> setExtraNDF(e.target.value)}
          value={extraNDF}
        />
          </Grid>
          <Divider orientation="vertical" flexItem />
        <Grid item xs={3} spacing={3} className={classes.izquierda}>
        <Typography variant="h6" align="center">
        Recargos
      </Typography>
    <br/>
    <Grid item> 
<TextField
          required
          className={classes.small}
          id="outlined-required"
          label="Nocturno Ordinario"
          variant="outlined"
          size="small"
          onChange={(e)=> setRecargoNOR(e.target.value)}
          InputProps={{ inputProps: { min: 0, max: 240 } }}
          type="number"
          value={recargoNOR}
        />
<TextField
          required
          className={classes.small}
          id="outlined-required"
          label="Diurno Dom y Fes"
          variant="outlined"
          size="small"
          onChange={(e)=> setRecargoDDF(e.target.value)}
          InputProps={{ inputProps: { min: 0, max: 240 } }}
          type="number"
          value={recargoDDF}
        />

<TextField
          required
          className={classes.small}
          id="outlined-required"
          label="Nocturno Dom y Fes"
          variant="outlined"
          size="small"
          onChange={(e)=> setRecargoNDF(e.target.value)}
          InputProps={{ inputProps: { min: 0, max: 240 } }}
          type="number"
          value={recargoNDF}
        />
</Grid>
        </Grid>
        </Grid>
     
      </TabPanel>
      <TabPanel value={value} index={1} align="center" className={classes.container}>
           <Typography variant="h6" color="primary">Factores Salariales de {props.nomEmpleado}</Typography>
          <form noValidate autoComplete="off" className={classes.container} align="center">
          
          <br/>
          <br/>
          <Grid className={classes.factores} container align="center">
          
            <Grid container item xs={2}>
            <InputLabel>Comisiones</InputLabel>
            <br/>
            <br/>
            <InputLabel>Bonificaciones</InputLabel>
            <br/>
            <br/>
            <InputLabel>Auxilio Extra</InputLabel>
            <br/>
            <br/>
            <InputLabel>Viáticos</InputLabel>
            <br/>
            <br/>
            <InputLabel>Otros Factores</InputLabel>
            </Grid>


            <Grid container item xs={3} spacing={2}>
            
            <TextField
              required
              className={classes.big}
              id="outlined-required"
              variant="outlined"
              onChange={(e)=> setComisiones_sal(e.target.value)}
              InputProps={{ inputProps: { min: 0 } }}
              type="number"
              value={comisiones_sal}
            />
            
             <TextField
              required
              className={classes.big}
              id="outlined-required"
              variant="outlined"
              onChange={(e)=> setBonificaciones_sal(e.target.value)}
              InputProps={{ inputProps: { min: 0 } }}
              type=" number"
              value={bonificaciones_sal}
            />
            
               <TextField
              required
              className={classes.big}
              id="outlined-required"
              variant="outlined"
              onChange={(e)=> setAuxilioExtra_sal(e.target.value)}
              InputProps={{ inputProps: { min: 0 } }}
              type="number"
              value={auxilioExtra_sal}
            />
              
              <TextField
              required
              className={classes.big}
              id="outlined-required"
              variant="outlined"
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              onChange={(e)=> setViaticos_sal(e.target.value)}
                value={viaticos_sal}
            />
          
          
    <TextField
              required
              className={classes.big}
              id="outlined-required"
              variant="outlined"
              onChange={(e)=> setOtros_sal(e.target.value)}
              InputProps={{ inputProps: { min: 0 } }}
              type="number"
              value={otros_sal}
            />
            </Grid>

          
          </Grid>
         
          </form>
      </TabPanel>
      <TabPanel value={value} index={2} align="center" className={classes.container}>
         <Typography variant="h6" color="primary">Factores No Salariales de {props.nomEmpleado}</Typography> 
         <form noValidate autoComplete="off" className={classes.container} align="justify">
        <br/>
        <br/>
        <Grid className={classes.factores} container align="center">
        <Grid container item xs={2}>
            <InputLabel>Comisiones</InputLabel>
            <br/>
            <br/>
            <InputLabel>Bonificaciones</InputLabel>
            <br/>
            <br/>
            <InputLabel>Auxilio Extra</InputLabel>
            <br/>
            <br/>
            <InputLabel>Viáticos</InputLabel>
            <br/>
            <br/>
            <InputLabel>Otros Factores</InputLabel>
            </Grid>

            <Grid container item xs={3} spacing={2}>
        <TextField
          required
          className={classes.big}
          id="outlined-required"
          variant="outlined"
          onChange={(e)=> setComisiones_nosal(e.target.value)}
          InputProps={{ inputProps: { min: 0 } }}
          type="number"
          value={comisiones_nosal}
        />
      <TextField
        required
        className={classes.big}
        id="outlined-required"
        variant="outlined"
        onChange={(e)=> setBonificaciones_nosal(e.target.value)}
        InputProps={{ inputProps: { min: 0 } }}
        type="number"
        value={bonificaciones_nosal}
      />

      <TextField
        required
        className={classes.big}
        id="outlined-required"
        variant="outlined"
        onChange={(e)=> setAuxilioExtra_nosal(e.target.value)}
        InputProps={{ inputProps: { min: 0 } }}
        type="number"
        value={auxilioExtra_nosal}
      />

<TextField
required
className={classes.big}
id="outlined-required"
variant="outlined"
onChange={(e)=> setViaticos_nosal(e.target.value)}
InputProps={{ inputProps: { min: 0 } }}
type="number"
value={viaticos_nosal}
/>

<TextField
required
className={classes.big}
id="outlined-required"
variant="outlined"
onChange={(e)=> setOtros_nosal(e.target.value)}
InputProps={{ inputProps: { min: 0 } }}
type="number"
value={otros_nosal}
/>
</Grid>
<br/>
<br/>
</Grid>
</form>
      </TabPanel>
      <TabPanel value={value} index={3} align="center" className={classes.container}>
          <Typography variant="h6" color="primary">Nómina del empleado {props.nomEmpleado}</Typography>
          <br/>
          <br/>
          <form noValidate autoComplete="off">
      <div>
        <TextField
          required
          className={classes.textField}
          id="outlined-required"
          label="Descripción de la nómina"
          variant="outlined"
          multiline
          rowsMax={4}
          onChange={(e)=> setDetalle(e.target.value)}
          value={detalle}
        />
       
       <TextField
       required
         id="date"
        label="Desde"
        type="date"
        variant="outlined"
       className={classes.big}
       InputLabelProps={{
         shrink: true,
       }}
       
       onChange={(e)=> setFechaInicio(e.target.value)}
       value={fechaInicio}
     />

<TextField
    required
    id="date"
    label="Hasta"
    type="date"
    variant="outlined"
    className={classes.big}
    InputLabelProps={{
      shrink: true,
    }}
    onChange={(e)=> setFechaFin(e.target.value)}
    value={fechaFin}
  />
<br/>
<br/>
<Button  
                            variant="contained" 
                            color="primary" 
                            type="submit" 
                            onClick={handleSubmit} 
                            size="large"
                            className={classes.button}
                            startIcon={ < SaveIcon / > }
                            >
                            Generar Nómina
                        </Button>
                         </div>
      </form>
      </TabPanel>
    </div>
  );
}
