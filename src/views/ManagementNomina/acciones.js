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
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';
import axios from 'axios';

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
    //marginRight: "5px",
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
  }
}));

export default function Acciones(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [horasLaboradas, setHoras] = React.useState('');
  const [recargoDDF, setRecargoDDF] = React.useState('');
  const [recargoNOR, setRecargoNOR] = React.useState('');
  const [recargoNDF, setRecargoNDF] = React.useState('');
  const [extraDOR, setExtraDOR] = React.useState('');
  const [extraNOR, setExtraNOR] = React.useState('');
  const [extraNDF, setExtraNDF] = React.useState('');
  const [extraDDF, setExtraDDF] = React.useState('');
  const [bonificaciones_sal, setBonificaciones_sal]=React.useState('');
  const [comisiones_sal, setComisiones_sal]= React.useState('');
  const [auxilioExtra_sal, setAuxilioExtra_sal] = React.useState('');
  const [viaticos_sal, setViaticos_sal] = React.useState('');
  const [otros_sal, setOtros_sal] = React.useState('');
  const [bonificaciones_nosal, setBonificaciones_nosal]=React.useState('');
  const [comisiones_nosal, setComisiones_nosal]= React.useState('');
  const [auxilioExtra_nosal, setAuxilioExtra_nosal] = React.useState('');
  const [viaticos_nosal, setViaticos_nosal]= React.useState('');
  const [otros_nosal, setOtros_nosal] = React.useState('');
  const [fechaInicio, setFechaInicio] = React.useState('');
  const [fechaFin, setFechaFin]= React.useState('');
  const [detalle, setDetalle]=React.useState('');
  const url = "http://localhost:8093/";

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const handleSubmit = (evt) => {
    alert(props.idcontrato+" - "+props.salario+" - "+extraNOR+" - "+comisiones_sal+" - "+comisiones_nosal+" - "+fechaInicio)
    console.log(props.idcontrato);
    evt.preventDefault();
    axios.post(url+'parametros/crearNomina/', {
      salarioBase: props.salario,
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
            swal("Error", "NO se pudo registrar"+error, "error");
        })

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
        <Typography variant="h6" color="primary" align="center">Horas Laboradas de {props.nomEmpleado}</Typography>
        <br/>
        <Grid container spacing={1}>
          <Grid item xs={4}  spacing={3}>
            Horas laborales:
            <br/>
            <br/>
            <Grid item>
            <TextField
                required
                className={classes.small}
                id="outlined-required"
                label="horas"
                variant="outlined"
                size="small"
                onChange={(e)=> setHoras(e.target.value)}
                value={horasLaboradas}
            />
            </Grid>
          </Grid>
          <Grid item xs={6} spacing={3}>
            Horas Extra: 
            <br/>
            <br/>
            <Grid item>
            <TextField
                required
                className={classes.small}
                id="outlined-required"
                label="Diurno Ordinario"
                variant="outlined"
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
          value={extraDDF}
        />
        <TextField
          required
          className={classes.small}
          id="outlined-required"
          label="Nocturno Dom y Fes"
          variant="outlined"
          size="small"
          onChange={(e)=> setExtraNDF(e.target.value)}
          value={extraNDF}
        />
          </Grid>

        <Grid item xs={3} sm={10} spacing={3}>
        <Typography variant="body1" align="left" gutterBottom>
        Recargos
      </Typography>
<TextField
          required
          className={classes.small}
          id="outlined-required"
          label="Nocturno Ordinario"
          variant="outlined"
          size="small"
          onChange={(e)=> setRecargoNOR(e.target.value)}
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
          value={recargoNDF}
        />

        </Grid>
        </Grid>
     
      </TabPanel>
      <TabPanel value={value} index={1} align="center" className={classes.container}>
           <Typography variant="h6" color="primary">Factores Salariales de {props.nomEmpleado}</Typography>
          <form noValidate autoComplete="off" className={classes.container}>
          <div align="justify">
          <br/>
            <TextField
              required
              className={classes.big}
              id="outlined-required"
              label="Comisiones"
              variant="outlined"
              onChange={(e)=> setComisiones_sal(e.target.value)}
              value={comisiones_sal}
            />
             <TextField
              required
              className={classes.big}
              id="outlined-required"
              label="Bonificaciones"
              variant="outlined"
              onChange={(e)=> setBonificaciones_sal(e.target.value)}
              value={bonificaciones_sal}
            />
    
    <TextField
              required
              className={classes.big}
              id="outlined-required"
              label="Auxilio Extra"
              variant="outlined"
              onChange={(e)=> setAuxilioExtra_sal(e.target.value)}
              value={auxilioExtra_sal}
            />
    
    <TextField
              required
              className={classes.big}
              id="outlined-required"
              label="Viáticos"
              variant="outlined"
              onChange={(e)=> setViaticos_sal(e.target.value)}
                value={viaticos_sal}
            />
    
    <TextField
              required
              className={classes.big}
              id="outlined-required"
              label="otros"
              variant="outlined"
              onChange={(e)=> setOtros_sal(e.target.value)}
                value={otros_sal}
            />
            
            </div>
          </form>
      </TabPanel>
      <TabPanel value={value} index={2} align="center" className={classes.container}>
         <Typography variant="h6" color="primary">Factores No Salariales de {props.nomEmpleado}</Typography> 
         <form noValidate autoComplete="off" className={classes.container} align="justify">
<br/>
<div>
<TextField
required
className={classes.big}
id="outlined-required"
label="Comisiones"
variant="outlined"
onChange={(e)=> setComisiones_nosal(e.target.value)}
value={comisiones_nosal}
/>
<TextField
required
className={classes.big}
id="outlined-required"
label="Bonificaciones"
variant="outlined"
onChange={(e)=> setBonificaciones_nosal(e.target.value)}
value={bonificaciones_nosal}
/>

<TextField
required
className={classes.big}
id="outlined-required"
label="Auxilio Extra"
variant="outlined"
onChange={(e)=> setAuxilioExtra_nosal(e.target.value)}
value={auxilioExtra_nosal}
/>

<TextField
required
className={classes.big}
id="outlined-required"
label="Viáticos"
variant="outlined"
onChange={(e)=> setViaticos_nosal(e.target.value)}
value={viaticos_nosal}
/>

<TextField
required
className={classes.big}
id="outlined-required"
label="otros"
variant="outlined"
onChange={(e)=> setOtros_nosal(e.target.value)}
value={otros_nosal}
/>
<br/>
<br/>
</div>
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
    id="date"
    label="Hasta"
    type="date"
    variant="outlined"
    defaultValue="2017-05-24"
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
