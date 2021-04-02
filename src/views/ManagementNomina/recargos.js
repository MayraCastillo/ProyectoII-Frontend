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

      <div className={classes.root} align="center">
      <Typography variant="h4" component="h4" color="primary" align="center" gutterBottom>
        Registro de Horas Laboradas
      </Typography>
      <Typography variant="h5" component="h4" color="secondary" align="center" gutterBottom>
        Empleado 
      </Typography>
      <br/>

      <form noValidate autoComplete="off">
      <div align="center">
      <TextField
          required
          className={classes.small}
          id="outlined-required"
          label="Horas trabajadas"
          variant="outlined"
        />
      </div>

      <div align="justify">
      <Typography variant="h6" component="h6" color="primary" align="center" gutterBottom>
        Horas Extras
      </Typography>
      <br/>
        <TextField
          required
          className={classes.small}
          id="outlined-required"
          label="Diurno Ordinario"
          variant="outlined"
        />
         <TextField
          required
          className={classes.small}
          id="outlined-required"
          label="Nocturno Ordinario"
          variant="outlined"
        />

<TextField
          required
          className={classes.small}
          id="outlined-required"
          label="Diurno Dom y Fes"
          variant="outlined"
        />

<TextField
          required
          className={classes.small}
          id="outlined-required"
          label="Nocturno Dom y Fes"
          variant="outlined"
        />
      
 <Typography variant="h6" component="h6" color="primary" align="center" gutterBottom>
        Recargos
      </Typography>
      <br/>
<TextField
          required
          className={classes.small}
          id="outlined-required"
          label="Nocturno Ordinario"
          variant="outlined"
        />
<TextField
          required
          className={classes.big}
          id="outlined-required"
          label="Diurno Domingos y Festivos"
          variant="outlined"
        />

<TextField
          required
          className={classes.big}
          id="outlined-required"
          label="Nocturno Domingos y Festivos"
          variant="outlined"
        />

</div>
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
                            Guardar
                        </Button>

      </form>
      </div>
    );

  }