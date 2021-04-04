import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles({
    root: {
       marginTop:"2px",
       marginLeft:"10px",
       marginRight:"10px",
       background: '#ffffff',
       padding:"0px",
      
    },
   /* textField: {
      marginLeft: "10px",
      marginRight: "10px",
      marginBottom:'15px',
      width: "35ch",
    },*/

    big:{
      marginLeft: "5px",
      marginRight: "5px",
      marginBottom:'15px',
      width: "32ch",
      
    },

    small:{
      marginLeft: "7px",
      //marginRight: "5px",
      marginBottom:'15px',
      width: "22ch",
    },

    button:{
      height: 50
    }
  
  });

  
  export default function Extras(props){
    const classes = useStyles();

    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
    
    return(

      <div className={classes.root} align="justify">
      <Typography variant="h5" component="h4" color="primary" align="justify" gutterBottom>
        Registro de Horas Laboradas
      </Typography>
      <Typography variant="body1" component="h6" color="inherit" align="justify" gutterBottom>
        Identificación: {props.emp.idEmpleado} - Nombre: {props.emp.nomEmpleado} 
        <br/>
        Salario base: ${props.emp.salario}
      </Typography>
      <br/>

      <form noValidate autoComplete="off">
        
            <div>
              <Grid>
              <Typography variant="h6" component="h6" color="primary" align="left" gutterBottom>
                Horas Trabajadas
            </Typography>
                <Grid container item xs>
               
            <TextField
                required
                className={classes.small}
                id="outlined-required"
                label="Número de horas"
                variant="outlined"
                size="small"
            />
                </Grid>
          
          <Grid xs>
          <Typography variant="h6" component="h6" color="primary" align="justify" gutterBottom>
                Horas Extras
            </Typography>
          
            <TextField
                required
                className={classes.small}
                id="outlined-required"
                label="Diurno Ordinario"
                variant="outlined"
                size="small"
            />
              <TextField
          required
          className={classes.small}
          id="outlined-required"
          label="Nocturno Ordinario"
          variant="outlined"
          size="small"
        />
          </Grid>
           
              </Grid>
          
            </div>
           
<div>
<TextField
          required
          className={classes.small}
          id="outlined-required"
          label="Diurno Dom y Fes"
          variant="outlined"
          size="small"
        />
        <TextField
          required
          className={classes.small}
          id="outlined-required"
          label="Nocturno Dom y Fes"
          variant="outlined"
          size="small"
        />
  
  </div>            


<div>
<Typography variant="h6" component="h6" color="primary" align="left" gutterBottom>
        Recargos
      </Typography>
<TextField
          required
          className={classes.small}
          id="outlined-required"
          label="Nocturno Ordinario"
          variant="outlined"
          size="small"
        />
<TextField
          required
          className={classes.small}
          id="outlined-required"
          label="Diurno Dom y Fes"
          variant="outlined"
          size="small"
        />

<TextField
          required
          className={classes.small}
          id="outlined-required"
          label="Nocturno Dom y Fes"
          variant="outlined"
          size="small"
        />

</div>
<br/>
<Button variant="contained" color="primary" type="submit" gutterBottom>Guardar</Button>
      </form>
      <br/>
      </div>
    );

  }