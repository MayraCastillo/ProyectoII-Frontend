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
       marginLeft:"50px",
       marginRight:"50px",
       background: '#ffffff',
       padding:"100px",
      
    },
    textField: {
      marginLeft: "10px",
      marginRight: "10px",
      width: "61ch",
    },
    
    date: {
      marginLeft: "10px",
      marginRight: "2px",
      width: "30ch",
    },

    button:{
      marginLeft:"10px",
      height:"56px"
    }
  
  });

  
  export default function Nomina(){
    const classes = useStyles();

    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
    
    return(

      <div className={classes.root}>
      <Typography variant="h4" component="h4" color="primary" align="center" gutterBottom>
        Detalles de la Nómina
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
      </form>
      </div>
    );

  }