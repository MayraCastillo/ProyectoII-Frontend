import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Modal from "@material-ui/core/Modal";
import swal from 'sweetalert';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';


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
            height: 600,
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
        }

    }));

function getModalStyle() {
    const top = 60;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
}


export default function ModuloTerceros(props){
   const classes = useStyles();
  
   const [modalStyle] = React.useState(getModalStyle);
   const [open, setOpen] = React.useState(false);
   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(10);

   const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

   const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    
   const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    const [terceros, setTerceros] = React.useState([]);
    const [paises, setPaises] = React.useState([]);
    const [dptos, setDptos] = React.useState([]);
    const [ciudades, setCiudades] = React.useState([]);
    const [listTerceros, setListTerceros] = React.useState([]);
    const [nameNombre, setNameNombre] = React.useState('');
    const [nameDireccion, setNameDireccion] = React.useState('');
    const [nameCorreo, setNameCorreo] = React.useState('');
    const [nameTelefono, setNameTelefono] = React.useState('');
    const [nameTipo, setNameTipo] = React.useState('');
    const [nameCiudad, setNameCiudad] = React.useState('');
    const [namePais, setNamePais] = React.useState('');
    const [nameDpto, setNameDpto] = React.useState('');

    const url = "http://localhost:8091/";
    
    React.useEffect(() => {
        //cargarPaises();
        cargarDeptos();
        cargarTerceros();
        //cargarMunicipios();
        cargarTipos();
    }, []);
    
    /*
    const cargarPaises = async() => {
        await axios.get(url+'listarPaises')
        .then((response) => {
            //setState({terceros: response.data});
            setPaises(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    };
    */

    const cargarDeptos = async() => {
        await axios.get(url+'listarDepartamentosPorPais/1')
        .then((response) => {
            //setState({terceros: response.data});
           
            setDptos(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    };



    const cargarTerceros = async() => {
        await axios.get(url+'listarTerceros')
                .then((response) => {
                    //setState({terceros: response.data});
                    setListTerceros(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
    };
    
    const cargarMunicipios = async(id) => {
        await axios.get(url+'listarMunicipiosPorDepartamento/'+id)
                .then((response) => {
                    //setState({municipios: response.data});
                    setCiudades(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
    };

    const cargarTipos = async() => {
        await axios.get(url+'listarTipoTerceros')
                .then((response) => {
                    //setState({tipoTerceros: response.data});
                    setTerceros(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
    };

    const handleMunicipios = (evt) => {
        setNameDpto(evt.target.value);
        cargarMunicipios();
        evt.preventDefault();
    } 


    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        swal("Información","registrando "+nameNombre, "info");
        axios.post(url+'crearTercero/', {
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
            swal("Éxito", "Se registró exitosamente el tercero: "+nameNombre, "success");
            handleClose();
            cargarTerceros();
        })
          .catch((error) => {
                console.log(error);
                swal("Error", "NO se pudo registrar", "error");
            })

    }
    
    
    
    
    
      const body = (
            <div style={modalStyle} className={classes.paper} align="center">
                <br/>
                <Typography variant="h3" color="primary" gutterBottom  align ="center">
                    Registrar Tercero
                </Typography>
                <br/>
                <br/>
                <form className={classes.form} onSubmit={handleSubmit}>
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

                 

                        <FormControl required variant="outlined" className={classes.list}>
                            <InputLabel id="demo-simple-select-outlined-label">Departamento</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                className={classes.selectEmpty}
                                onChange={(e) => cargarMunicipios(e.target.value)}
                                >
                                <MenuItem value="">
                                   <em>None</em>
                                </MenuItem>
                                
                                {dptos.map((dpto) => (
                                <MenuItem value={dpto.departamentoId}>{dpto.nombre}</MenuItem>
                                                ))}
                                
                            </Select>
                        </FormControl>

                        <br/>
                        <br/>      
                        <FormControl required variant="outlined" className={classes.list}>
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
            
            
            
                        <FormControl required variant="outlined" className={classes.list}>
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
                                <MenuItem value={tercero.tipoTerceroId}>{tercero.abreviacion}</MenuItem>
                                                ))}
                            </Select>
                        </FormControl>
                        
                                
                    </div>
                    
                    <br/>
            
                    <div style={{marginTop: "18px"}}>
                    <FormControl>
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
                    </FormControl>
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
                                           
                                           
                                           
                                              <TableContainer className={classes.container}>  
                    <Table stickyHeader className={classes.table} size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell  className={classes.head} align="center">
                                    <Typography variant="body1" gutterBottom align ="center">
                                        Id
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" className={classes.head} >
                                    <Typography variant="body1" gutterBottom align ="center">
                                        Nombre
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" className={classes.head} >
                                    <Typography variant="body1" gutterBottom align ="center">
                                        Dirección
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" className={classes.head} >
                                    <Typography variant="body1" gutterBottom align ="center">
                                        Teléfono
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" className={classes.head} >
                                    <Typography variant="body1" gutterBottom align ="center">
                                        Ciudad
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" className={classes.head} >
                                    <Typography variant="body1" gutterBottom align ="center">
                                        Tipo
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" className={classes.head} >
                                    <Typography variant="body1" gutterBottom align ="center">
                                        Sigla
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" className={classes.head} >
                                    <Typography variant="body1" gutterBottom align ="center">
                                        Correo
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listTerceros.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    return (
                                <TableRow hover  tabIndex={-1} key={row.id}>
                
                                    <TableCell align="center">
                                        <Typography variant="body1" gutterBottom align ="center">
                                            {row.terceroId}
                                        </Typography>
                                    </TableCell>
                
                                    <TableCell align="center">
                                        <Typography variant="body1" gutterBottom align ="center">
                                            {row.nombre}
                                        </Typography>
                                    </TableCell>
                
                                    <TableCell align="center">
                                        <Typography variant="body1" gutterBottom align ="center">
                                            {row.direccion}
                                        </Typography>
                                    </TableCell>
                
                                    <TableCell align="center">
                                        <Typography variant="body1" gutterBottom align ="center">
                                            {row.telefono}
                                        </Typography>
                                    </TableCell>
                
                                    <TableCell align="center">
                                        <Typography variant="body1" gutterBottom align ="center">
                                            {row.municipio.nombre}
                                        </Typography>
                                    </TableCell>
                
                                    <TableCell align="center">
                                        <Typography variant="body1" gutterBottom align ="center">
                                            {row.tipoTercero.nombre}
                                        </Typography>
                                    </TableCell>
                
                                    <TableCell align="center">
                                        <Typography variant="body1" gutterBottom align ="center">
                                            {row.tipoTercero.abreviacion}
                                        </Typography>
                                    </TableCell>
                
                                    <TableCell align="center">
                                        <Typography variant="body1" gutterBottom align ="center">
                                            {row.correo}
                                        </Typography>
                                    </TableCell>
                
                                </TableRow>
                                            );
                                })}
            
            
            
            
            
                        </TableBody>
                    </Table>
                </TableContainer> 
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, listTerceros.length]}
                    component="div"
                    count={listTerceros.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
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


