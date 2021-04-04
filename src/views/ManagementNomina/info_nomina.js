import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles({
    root: {
       marginTop:"5px",
       //marginLeft:"20px",
       //marginRight:"10px",
       background: '#ffffff',
       //padding:"100px",
      
    },
    textField: {
      marginLeft: "5px",
      marginRight: "5px",
      width: "30ch",
    },

    small:{
      marginLeft: "5px",
      marginRight: "10px",
      width: "30ch",
    },
    
    date: {
      marginLeft: "5px",
      marginRight: "2px",
      width: "20ch",
    },

    button:{
      marginLeft:"10px",
      height:"56px"
    }
  
  });

  
  export default function Nomina(props){
    const classes = useStyles();

    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
    
    const [fechaInicio, setFechaInicio] = React.useState('');
    const [fechaFin, setFechaFin]= React.useState('');
    const [detalle, setDetalle]=React.useState('');

    return(

      <div className={classes.root} align="center">
      <Typography variant="h5" component="h4" color="primary" align="center" gutterBottom>
        Detalles de la Nómina
      </Typography>
      <Typography variant="body1" component="h5" color="inherit" align="center" gutterBottom>
        Nómina para el empleado {props.emp.nomEmpleado}
      </Typography>
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
       defaultValue="2017-05-24"
       className={classes.date}
       InputLabelProps={{
         shrink: true,
       }}
     />

<TextField
    id="date"
    label="Hasta"
    type="date"
    variant="outlined"
    defaultValue="2017-05-24"
    className={classes.date}
    InputLabelProps={{
      shrink: true,
    }}
  />
<br/>
<br/>
<Button  
                            variant="contained" 
                            color="primary" 
                            type="submit" 
                            //onClick={handleSubmit} 
                            size="large"
                            className={classes.button}
                            startIcon={ < SaveIcon / > }
                            >
                            Generar Nómina
                        </Button>
                         </div>
      </form>
      </div>
    );

  }