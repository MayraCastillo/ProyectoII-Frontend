import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    root: {
       marginTop:"5px",
       marginLeft:"50px",
       marginRight:"50px",
       background: '#ffffff',
       padding:"100px",
      
    },
    textField: {
      marginLeft: "10px",
      marginRight: "10px",
      width: "20ch",
    }
  
  });

  
  export default function Extras(){
    const classes = useStyles();

    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
    
    return(

      <div className={classes.root}>
      <Typography variant="h4" component="h4" color="primary" align="center" gutterBottom>
        Recargos y Horas Extra
      </Typography>
      <br/>

      <form noValidate autoComplete="off">
      <Typography variant="h5" component="h5" color="primary" align="center" gutterBottom>
        Horas Extras
      </Typography>
      <br/>
        <TextField
          required
          className={classes.textField}
          id="outlined-required"
          label="Diurno Ordinario"
          defaultValue="Hello World"
          variant="outlined"
        />
         <TextField
          required
          className={classes.textField}
          id="outlined-required"
          label="Nocturno Ordinario"
          defaultValue="Hello World"
          variant="outlined"
        />

<TextField
          required
          className={classes.textField}
          id="outlined-required"
          label="Diurno Domingos y Festivos"
          defaultValue="Hello World"
          variant="outlined"
        />

<TextField
          required
          className={classes.textField}
          id="outlined-required"
          label="Nocturno Domingos y Festivos"
          defaultValue="Hello World"
          variant="outlined"
        />
          <br/>
          <br/>
 <Typography variant="h5" component="h5" color="primary" align="center" gutterBottom>
        Recargos
      </Typography>
      <br/>
<TextField
          required
          className={classes.textField}
          id="outlined-required"
          label="Nocturno Ordinario"
          defaultValue="Hello World"
          variant="outlined"
        />
<TextField
          required
          className={classes.textField}
          id="outlined-required"
          label="Diurno Domingos y Festivos"
          defaultValue="Hello World"
          variant="outlined"
        />

<TextField
          required
          className={classes.textField}
          id="outlined-required"
          label="Nocturno Domingos y Festivos"
          defaultValue="Hello World"
          variant="outlined"
        />

      </form>
      </div>
    );

  }