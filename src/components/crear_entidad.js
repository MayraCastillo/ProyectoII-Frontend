import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles({
  root: {
     marginLeft:"100px",
     marginRight:"40px",
     marginTop:"90px",
     marginBottom:"60px",
     padding:"100px",
     alignItems: "center",
     background: '#ffffff',
     borderWidth: 2,
    '& .super-app-theme--header': {
      backgroundColor: '#ffffff',
      color: '#ffff',
      display: "flex"
    },

    '& .MuiTextField-root': {
      marginRight:"10px",
      width: '35ch',
    },
  },
});

export default function Entidad() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h3" component="h2" gutterBottom style={{marginBottom:'1em'}}>
        Crear Entidad
      </Typography>
      <form>
       <div>
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Nit"
          variant="outlined"
        />

        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Nombre"
          variant="outlined"
        />
      </div>
 
      <div style={{marginTop:"18px"}}>
         <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Dirección"
          variant="outlined"
        />

        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Teléfono"
          variant="outlined"
        />
      </div>


       <div style={{marginTop:"18px",marginBottom:'1em'}}>
         <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Periodicidad de pago"
          variant="outlined"
        />
      </div>

      </form> 
       <Divider style={{marginTop:"18px",marginBottom:'1em'}} />
      <Button variant="contained" color="primary" size="large" startIcon={<CancelIcon />} style={{marginRight:"18px"}}>
        Cancelar
      </Button>
      <Button variant="contained" color="secondary" size="large" startIcon={<SaveIcon />}>
      Guardar
      </Button>
    </div>
  );
}
