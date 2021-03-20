import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles( (theme) => ({
  root: {
     marginLeft:"100px",
     marginRight:"50px",
     marginTop:"90px",
     
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
      marginRight:"14px",
      width: '35ch',
    },
  },

  formControl: {
    marginRight:"14px",
    minWidth: 132,
  },

  table: {
     minWidth: 650,
     marginTop: "100px",
     border: '0.1px solid #000000',
  },

  bordered:{
    border: '0.1px solid #000000'
  },

  container:{
    marginTop: "100px"
  }

}));


function createData(nit, name, dir, tel, city, type) {
  return { nit, name, dir, tel, city, type };
}

const rows = [
  createData('100', 'Sena', 'Alto cauca', '8388482','Popayán' ,'CCF'),
 createData('200', 'ICBF', 'Calle 20', '650863','Cali' ,'CCF'),
 createData('300', 'ESAP', 'Cra 12', '56789','Cúcuta','ARL'),
];



export default function Entidad() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    tipo: '',
    ciudad: 'hai',
  });

const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <div className={classes.root}>
      <Typography variant="h3" component="h2" gutterBottom style={{marginBottom:'1em'}}>
        Información Terceros
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

            <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Dirección"
          variant="outlined"
        />
      </div>
 
      <div style={{marginTop:"18px"}}>
     

        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Teléfono"
          variant="outlined"
        />

        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Correo"
          variant="outlined"
        />

          <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-ciudad-native-simple">Ciudad</InputLabel>
        <Select
          native
          value={state.ciudad}
          onChange={handleChange}
          label="ciudad"
          inputProps={{
            name: 'ciudad',
            id: 'outlined-ciudad-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={'Armenia'}>Armenia</option>
          <option value={'Pasto'}>Pasto</option>
          <option value={'Popayán'}>Popayán</option>
        </Select>
      </FormControl>

         <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-tipo-native-simple">Tipo</InputLabel>
        <Select
          native
          value={state.tipo}
          onChange={handleChange}
          label="Tipo"
          inputProps={{
            name: 'tipo',
            id: 'outlined-tipo-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={'EPS'}>EPS</option>
          <option value={'AFP'}>AFP</option>
          <option value={'CCF'}>CCF</option>
        </Select>
      </FormControl>

      </div>

       <div style={{marginTop:"18px"}}>
      
      </div>
     


      </form> 
       

       <Divider style={{marginTop:"18px",marginBottom:'1em'}} />
      
      <Button variant="contained" color="primary" size="large" startIcon={<CancelIcon />} style={{marginRight:"18px"}}>
        Cancelar
      </Button>
      <Button variant="contained" color="secondary" size="large" startIcon={<SaveIcon />}>
      Guardar
      </Button>

    
      <Table stickyHeader className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="center">Nit</TableCell>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Dirección</TableCell>
            <TableCell align="center">Teléfono</TableCell>
            <TableCell align="center">Ciudad</TableCell>
            <TableCell align="center">Tipo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow hover key={row.name}>
              <TableCell component="th" scope="row" align="center">
                {row.nit}
              </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.dir}</TableCell>
              <TableCell align="center">{row.tel}</TableCell>
              <TableCell align="center">{row.city}</TableCell>
              <TableCell align="center">{row.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    
    </div>
  );
}
