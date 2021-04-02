import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Nomina from "./info_nomina";
import Extras from "./recargos";
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles({
  root: {
     marginTop:"10px",
     marginLeft:"50px",
     marginRight:"50px",
     background: '#ffffff',
     
     align:"center"
    
  },
  textField: {
    marginLeft: "10px",
    marginRight: "10px",
    width: "30ch",
  },
  
  date: {
    marginLeft: "10px",
    marginRight: "10px",
    width: "30ch",
  },
  

});

export default function CrearNomina() {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  const [value, setValue] = React.useState('');


  return (
    <div className={classes.root}>
      <Typography variant="h3" component="h2" color="primary" align="center" gutterBottom>
        Crear Nómina
      </Typography>
      <br/>
      <form noValidate autoComplete="off">
        <TextField
          required
          className={classes.textField}
          id="outlined-required"
          label="Descripción de la nómina"
          defaultValue="Hello World"
          variant="outlined"
          multiline
          rowsMax={4}
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
</form>

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
      <br/>
    </div>
  );
}
