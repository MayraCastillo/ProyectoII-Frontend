import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
//import axios from 'axios';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Grid, InputLabel } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import swal from 'sweetalert';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import EditIcon from '@material-ui/icons/Edit';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const useStyles = makeStyles((theme) => ({
    root: {
        marginRight:"40px",
        align: "center",
        background: '#ffffff',
        borderWidth: 2,
        padding: theme.spacing(2)
    },

    table: {
        minWidth: 650,
        border: '0.1px solid #000000',
    },

    bordered: {
        border: '0.1px solid #000000'
    },

    container: {
        maxHeight: 440,
        backgroundColor: '#EDE7F6'
    },
    head: {
        backgroundColor: "#3949ab",
        color: theme.palette.common.white,
    },
    button:{
        width:'8%',
        padding:'0.98%'
    },
    icon:{
       color:"#3700B"
    }

}));


export default function BuscarTercero(){
    const classes = useStyles();
    const url = "http://localhost:8091/";
    const [nit, setNit] = React.useState('');
    const [nameNombre, setNameNombre] = React.useState('');
    const [nameDireccion, setNameDireccion] = React.useState('');
    const [nameCorreo, setNameCorreo] = React.useState('');
    const [nameTelefono, setNameTelefono] = React.useState('');
    const [nameTipo, setNameTipo] = React.useState('');
    const [prueba, setPrueba] = React.useState({
        nit:"",
        municipio:{
            municipio_id:"",
            departamento:{
                departamentoId:"",
                pais:{
                    paisId:"",
                    nombre:""
                },
                nombre:"",
                codigo:""
            },
            codigo:"",
            nombre:""
        },
        nombre:"",
        direccion:"",
        correo:"",
        telefono:"",
        tipoTercero:{
            tipoTerceroId:"",
            nombre:"",
            abreviacion:""
        },
        estado:""
    });
    const buscarTercero = async(nit) => {
        //alert("searching")
        await axios.get(url+'buscarTerceroPorNit/'+nit)
        .then((response) => {
            //setPrueba(response.data);
            //alert(response.data.nombre);
            setNameNombre(response.data.nombre);
            setNameTipo(response.data.tipoTercero.abreviacion);
            setNameDireccion(response.data.direccion);
            setNameTelefono(response.data.telefono);
            setNameCorreo(response.data.correo);
        })
        .catch((error) => {
            //alert(error)
            console.log(error);
        })
    };

    const handleSubmit = (evt) => {
        //alert("form handle")
        evt.preventDefault();
        buscarTercero(nit);
        
    }

    
    const infoTercero = (
        <div>
            <Typography>{nameNombre}</Typography>
            <Typography>{nameTipo}</Typography>
            <Typography>{nameDireccion}</Typography>
            <Typography>{nameTelefono}</Typography>
        </div>
    );


    return(
        <div>
            <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
                <Grid item xs={2}>
                <Typography>Buscar Tercero</Typography>
                </Grid>

                <Grid item xs={3}>
                <FormControl variant="outlined" color="primary">
                <InputLabel htmlFor="outlined-adornment-password">Nit</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type="text"
            onChange={(e) => setNit(e.target.value)}
            endAdornment={
              <InputAdornment position="end" className={classes.icon} variant="filled">
                <IconButton
                  aria-label="toggle password visibility"
                  type="submit" 
                  //onMouseDown={handleMouseDownPassword}
                  edge="end"
                  className={classes.icon}
                >
                 <SearchIcon className={classes.icon} />
                </IconButton>
              </InputAdornment>
            }
            labelWidth={90}
          />
          
        </FormControl>

                </Grid>

            </Grid>
            
            <br/>
            <br/>
            </form>

            

        </div>
    );
}