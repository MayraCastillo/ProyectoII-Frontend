import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import FormControl from '@material-ui/core/FormControl';
import swal from 'sweetalert';
import axios from 'axios';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "70px",
        width: "100%",
        padding: "50px",
        alignItems: "center",
        background: '#ffffff',
        borderWidth: 2,
        '& .super-app-theme--header': {
            backgroundColor: '#ffffff',
            color: '#ffff',
            display: "flex"
        },

        '& .MuiTextField-root': {
            marginRight: "14px",
            width: '35ch',
        },
    },

    formControl: {
        marginRight: "14px",
        width:"30ch",
        size: 'medium'
    },

    list: {
        width: "30ch",
        marginRight: "14px"
    },
    selectEmpty: {
        marginTop: theme.spacing(0),
    },
    add: {
        color: "#3700B3",
        marginLeft: "49px"
    },
    icon: {
        fontSize: "60px",
        boxShadow: 3,

    },
    paper: {
        position: "absolute",
        width: 700,
        height: 630,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    },

    button: {
        marginRight: "14px"
    },

    title:{
        color: "#0f4c75",
        fontWeight: 450,
        fontSize: 34
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

    form:{
        marginLeft:"8px"
    },

    accept:{
        marginRight: "14px",
        backgroundColor: "#0f4c75",
        color:"#ffffff"
    },

}));

const IOSSwitch = withStyles((theme) => ({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#3700B3',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#3700B3',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }))(({ classes, ...props }) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });


export default function Actualizar(props){
    const classes = useStyles();
    const [nameDireccion, setNameDireccion] = React.useState(props.direccion);
    const [nameCorreo, setNameCorreo] = React.useState(props.correo);
    const [nameTelefono, setNameTelefono] = React.useState(props.telefono);
    const [nameNombre, setNameNombre] = React.useState(props.nombre);
    const [nameEstado, setNameEstado] = React.useState(props.estado);
    //const [state, setState] = React.useState(props.band);
    
      const handleChange = (event) => {
        //alert(state)
        //alert("se checkeo: " +event.target.checked)
        //setState(event.target.value);
        setNameEstado(event.target.value);
            //alert("cambiando a true " + event.target.checked)
        

        //alert(nameEstado);
      };

    const url = "http://localhost:8091/";


    const handleSubmit = (evt) => {
        evt.preventDefault();
        //alert(nameTelefono)
        //swal("Información","registrando "+nameNombre, "info");
        axios.put(url+'actualizarTercero/'+props.nit, {           
            nombre: nameNombre,
            direccion: nameDireccion,
            correo: nameCorreo,
            telefono: nameTelefono,
            estado: nameEstado
        }).then(response => {
            //alert(response.status);
            console.log(response.status);
            if(response.status==208){
                swal("Advertencia", "El tercero "+nameNombre+" ya esta registrado", "warning");
            }else{
                swal("Éxito", "Se actualizó exitosamente el tercero: "+nameNombre, "success");
            }
            //handleClose();
            //cargarTerceros();
        })
          .catch((error) => {
                //console.log(error.response.data.status);
                console.log(error.message);
                if(error.message === "Network Error"){
                    swal("Error", "No se pudo acceder al sistema: "+error.message, "error");
                }else{
                     swal("Error", "NO se pudo actualizar el tercero:  " + error.response.data[0].message, "error");
                     console.log(error.response.data[0].message);
                }
            })

    }


    return(
        <div>
            <br/>
            <br/>
            <Typography variant="h5" className={classes.title} gutterBottom>Editar Tercero</Typography>
            <br/>
            <br/>
            <div>
                <form onSubmit={handleSubmit}>
                <div>
                        <TextField
                            required
                            id="outlined-required"
                            className={classes.formControl}
                            size="medium"
                            label="Nombre"
                            defaultValue={props.nombre}
                            onChange={(e) => setNameNombre(e.target.value)}
                            variant="outlined"
                        />

                        <TextField
                            required
                            id="outlined-required"
                            className={classes.formControl}
                            size="medium"
                            label="Correo"
                            defaultValue={props.correo}
                            onChange={(e) => setNameCorreo(e.target.value)}
                            variant="outlined"
                        />
                    </div>

                    <div  style={{marginTop: "18px"}}>
                        <TextField
                            required
                            id="outlined-required"
                            className={classes.formControl}
                            size="medium"
                            label="Dirección"
                            defaultValue={props.direccion}
                            onChange={(e) => setNameDireccion(e.target.value)}
                            variant="outlined"
                        />

                        <TextField
                            required
                            id="outlined-required"
                            className={classes.formControl}
                            size="medium"
                            label="Teléfono"
                            defaultValue={props.telefono}
                            onChange={(e) => setNameTelefono(e.target.value)}
                            variant="outlined"
                        />
                    </div>
                    <div  style={{marginTop: "18px"}}>
                    




<FormControl component="fieldset">
      <FormLabel component="legend">Estado</FormLabel>
      <RadioGroup  row aria-label="gender" name="gender1" value={nameEstado} onChange={handleChange}>
        <FormControlLabel value="ACTIVO" control={<Radio />} label="ACTIVO" />
        <FormControlLabel value="INACTIVO" control={<Radio />} label="INACTIVO" />
      </RadioGroup>
    </FormControl>
                        </div>
                       <br/>
                       <br/>
                        <div style={{marginTop: "18px"}}>
                    <FormControl>
                        <Button  
                            variant="contained" 
                            //color="primary" 
                            type="submit" 
                            //onClick={handleSubmit} 
                            size="large"
                            className={classes.accept}
                            startIcon={ < SaveIcon / > }
                            >
                            Guardar
                        </Button>
                    </FormControl>
                    </div>
                </form>
            </div>
        </div>


    );


}