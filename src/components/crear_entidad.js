import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Terceros from './terceros';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Modal from "@material-ui/core/Modal";
import swal from 'sweetalert';


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
            minWidth: 100,
            size: 'medium'
        },

        table: {
            minWidth: 650,
            marginTop: "100px",
            size: "medium",
            border: '0.1px solid #000000',
        },

        bordered: {
            border: '0.1px solid #000000'
        },

        container: {
            marginTop: "100px"
        },

        list: {
            width: "21.5%",
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
            width: 580,
            height: 450,
            backgroundColor: theme.palette.background.paper,
            border: "2px solid #000",
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3)
        },

        button: {
            marginRight: "14px"
        },

        title: {
            color: "#8c9eff"
        }

    }));

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
}

export default function Entidad (){
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState({
        municipio: "",
        nombre: "",
        correo: "",
        direccion: "",
        telefono: "",
        tipo: "",
        municipios: [],
        tipoTerceros: [],
        listadoTerceros:[]
    });

    const [terceros, setTerceros] = React.useState([]);
    const [ciudades, setCiudades] = React.useState([]);
    const [listTerceros, setListTerceros] = React.useState([]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };




    React.useEffect(() => {
        cargarTerceros();
        cargarMunicipios();
        cargarTipos();
    }, []
            );

    const renderMunicipios = state.municipios && state.municipios.map((municipio) => (
                <MenuItem value={municipio.municipio_id}>
                    {municipio.nombre}
                </MenuItem>
                ));

        
    const cargarTerceros = async() => {
        await axios.get('http://localhost:8091/listarTerceros')
                .then((response) => {
                    setState({listadoTerceros: response.data});
                    setListTerceros(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
    };

    const handleSubmit = (evt) => {

        setState({nombre: nameNombre});
        setState({direccion: nameDireccion});
        setState({correo: nameCorreo});
        setState({telefono: nameTelefono});
        setState({tipo: nameTipo});
        setState({municipio: nameCiudad});
        evt.preventDefault();

       
        axios.post('http://localhost:8091/crearTercero/', {
            municipio: {
                municipio_id: nameCiudad
            },
            nombre: nameNombre,
            direccion: nameDireccion,
            correo: nameCorreo,
            telefono: nameTelefono,
            tipoTercero: {
                tipoTerceroId: nameTipo
            }
        }).then(response => {
            swal("Éxito", "Se registró exitosamente el tercero: "+response.text(), "success");
            handleClose();
        })
                .catch((error) => {
                    console.log(error);
                    swal("Error", "NO se pudo registrar", "error");
                })

    }

    const [nameNombre, setNameNombre] = React.useState('');
    const [nameDireccion, setNameDireccion] = React.useState('');
    const [nameCorreo, setNameCorreo] = React.useState('');
    const [nameTelefono, setNameTelefono] = React.useState('');
    const [nameTipo, setNameTipo] = React.useState('');
    const [nameCiudad, setNameCiudad] = React.useState('');


    const cargarMunicipios = async() => {
        await axios.get('http://localhost:8091/listarMunicipios')
                .then((response) => {
                    setState({municipios: response.data});
                    setCiudades(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
    };

    const cargarTipos = async() => {
        await axios.get('http://localhost:8091/listarTipoTerceros')
                .then((response) => {
                    setState({tipoTerceros: response.data});
                    setTerceros(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
    };

    const body = (
            <div style={modalStyle} className={classes.paper} align="justify">
                <Typography variant="h3" color="primary" gutterBottom  align ="center">
                    Registrar Tercero
                </Typography>
            
                <form>
                    <div>
                        <TextField
                            required
                            id="outlined-required"
                            className={classes.formControl}
                            size="medium"
                            label="Nombre"
                            value={nameNombre}
                            onChange={(e) => setNameNombre(e.target.value)}
                            variant="outlined"
                            />
            
                        <TextField
                            required
                            id="outlined-required"
                            className={classes.formControl}
                            label="Direccion"
                            onChange={(e) => setNameDireccion(e.target.value)}
                            variant="outlined"
                            />
                    </div>
            
                    <div style={{marginTop: "18px"}}>      
                        <TextField
                            required
                            id="outlined-required"
                            className={classes.formControl}
                            label="Teléfono"
                            onChange={(e) => setNameTelefono(e.target.value)}
                            variant="outlined"
                            />
            
                        <TextField
                            required
                            id="outlined-required"
                            className={classes.formControl}
                            label="Correo"
                            onChange={(e) => setNameCorreo(e.target.value)}
                            variant="outlined"
                            />
                    </div>
            
            
                    <div style={{marginTop: "18px"}}>
                        <FormControl variant="outlined" className={classes.list}>
                            <InputLabel id="demo-simple-select-outlined-label">Ciudad</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                className={classes.selectEmpty}
                                onChange={(e) => setNameCiudad(e.target.value)}
                                >
                                <MenuItem value="">
                                   <em>None</em>
                                </MenuItem>
                                
                                {ciudades.map((ciudad) => (
                                <MenuItem value={ciudad.municipio_id}>{ciudad.nombre}</MenuItem>
                                                ))}
                                
                            </Select>
                        </FormControl>
            
            
            
                        <FormControl variant="outlined" className={classes.list}>
                            <InputLabel id="demo-simple-select-outlined-label">Tipo</InputLabel>
                            <Select
            
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                className={classes.selectEmpty}
                                onChange={(e) => setNameTipo(e.target.value)}
                                >
                                <MenuItem value="">
                                <em>None</em>
                                </MenuItem>
                                {terceros.map((tercero) => (
                                <MenuItem value={tercero.tipoTerceroId}>{tercero.abrevicion}</MenuItem>
                                                ))}
                            </Select>
                        </FormControl>
            
                    </div>
            
            
            
            
                    <div style={{marginTop: "18px"}}>
                        <Button  
                            variant="contained" 
                            color="primary" 
                            type="submit" 
                            onClick={handleSubmit} 
                            size="large"
                            className={classes.button}
                            startIcon={ < SaveIcon / > }
                            >
                            Guardar
                        </Button>
            
                        <Button  
                            variant="contained" 
                            color="secondary" 
                            type="submit" 
                            onClick={handleClose}
                            size="large"
                            className={classes.button}
                            startIcon={ < SaveIcon / > }
                            >
                            Cancelar
                        </Button>
            
                    </div>
            
            
            
                </form> 
            </div>
                                        );


                                return (
                                        <div className={classes.root} align="center">
                                            <Typography variant="h3" color="primary" component="h2" gutterBottom style={{marginBottom: '1em'}} align ="center">
                                                Información Terceros
                                            </Typography>
                                            <Terceros
                                                
                                            />
                                            <div align="left">
                                                <IconButton type="button" onClick={handleOpen} className={classes.add}>
                                                    <AddCircleIcon className={classes.icon} />
                                                </IconButton>
                                                <Modal
                                                    open={open}
                                                    onClose={handleClose}
                                                    aria-labelledby="simple-modal-title"
                                                    aria-describedby="simple-modal-description"
                                                    >
                                                    {body}
                                                </Modal>
                                            </div>
                                        </div>
                                        );
                            }
