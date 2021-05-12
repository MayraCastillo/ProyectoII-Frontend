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
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import Modal from "@material-ui/core/Modal";
import swal from 'sweetalert';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import BuscarTercero from './buscarTercero';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Actualizar from './actualizarTercero';
import { GridLinkOperator, XGrid } from '@material-ui/x-grid';
import { DataGrid, GridToolbar, GridCellParams, GridRowParams, GridRowsProp,
    useGridApiRef } from '@material-ui/data-grid';
import { id } from 'date-fns/locale';


const useStyles = makeStyles((theme) => ({
        root: {
            marginTop: "70px",
            width: "100%",
            padding: "5px",
            alignItems: "center",
            background: '#ffffff',
            border:0,
            '& .super-app-theme--header': {
                backgroundColor: '#0f4c75',
                color: '#ffff',
                display: "flex",
                borderBottom:'1px solid #BDBDBD',
                borderLeft: '1px solid #BDBDBD'
                
            },
            '& .MuiDataGrid-iconSeparator': {
                display: 'none',
              },

            '& .MuiTextField-root': {
                marginRight: "14px",
                width: '35ch',
            },

            '& .bordered-cell':{
                borderBottom:'1px solid #BDBDBD',
                borderLeft: '1px solid #BDBDBD',
                borderRight:'1px solid #BDBDBD'
            }
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
            color: "#0f4c75",
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
            marginRight: "14px",
            backgroundColor: "#0f4c75"
        },

        cancel:{
            marginRight: "14px",
            backgroundColor: "#ec0101"
        },

        accept:{
            marginRight: "14px",
            backgroundColor: "#0f4c75"
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
            backgroundColor: '#d0e8f2',
            fontSize: 18
        },
        head: {
            backgroundColor: "#0f4c75",
            color: theme.palette.common.white,
        },

        form:{
            marginLeft:"8px"
        },

        title:{
            color: "#0f4c75",
            fontWeight: 450,
            fontSize: 34
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
   const apiRef = useGridApiRef();
   const [modalStyle] = React.useState(getModalStyle);
   const [open, setOpen] = React.useState(false);
   const [openE, setOpenE] = React.useState(false);
   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(10);
   const [bandera, setBandera] = React.useState(false);

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

    const handleOpenE = () => {
        setOpenE(true);
    };

    const handleCloseE = () => {
        setOpenE(false);
        cargarTerceros();
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
    const [nit, setNit] = React.useState('');
    const [ nitT, setNitT] = React.useState('');
    const [ nombreT, setNombreT] = React.useState('');
    const [ correoT, setcorreoT] = React.useState('');
    const [ direccionT, setDireccionT] = React.useState('');
    const [ estadoT, setEstadoT] = React.useState('');
    const [ telefonoT, setTelefonoT] = React.useState('');
    
    const columns = [
        {
            field: 'nit_ter', 
            numeric:true, 
            headerName: 'Nit', 
            width:90, 
            align:'center',
            headerClassName: 'super-app-theme--header',
            cellClassName: 'bordered-cell',
        },
        
        {
            field: 'nombre', 
            numeric:false, 
            headerName:'Nombre', 
            width:420, 
            align:'center',
            headerClassName: 'super-app-theme--header',
            cellClassName: 'bordered-cell',
        },
        
        {
            field: 'direccion', 
            numeric:false, 
            headerName:'Dirección', 
            width:250, 
            align:'center',
            headerClassName: 'super-app-theme--header',
            cellClassName: 'bordered-cell',
        },

        {
            field: 'correo', 
            numeric:false, 
            headerName:'Correo', 
            width:250, 
            align:'center',
            headerClassName: 'super-app-theme--header',
            cellClassName: 'bordered-cell',
        },
        
        { 
            field: 'telefono', 
            numeric:true, 
            headerName:'Teléfono', 
            width:150, 
            align:'center',
            headerClassName: 'super-app-theme--header',
            cellClassName: 'bordered-cell',
        },

        {
            field: 'tipo', 
            numeric:false, 
            headerName:'Tipo', 
            width:550, 
            align:'center',
            headerClassName: 'super-app-theme--header',
            cellClassName: 'bordered-cell',
        },
        
        {
            field: 'sigla', 
            numeric:false, 
            headerName:'Sigla', 
            width:105, 
            align:'center',
            headerClassName: 'super-app-theme--header',
            cellClassName: 'bordered-cell',
        },

        {
            field: 'estado', 
            numeric:false, 
            headerName:'Estado', 
            width:130, 
            align:'center',
            headerClassName: 'super-app-theme--header',
            cellClassName: 'bordered-cell',
        },

        {
            field: 'acciones',
            numeric: false,
            headerName:'Acciones',
            width:150,
            align:'center',
            headerClassName: 'super-app-theme--header',
            cellClassName: 'bordered-cell',
            renderCell: (params: GridCellParams) => (
                <IconButton className={classes.icon} onClick={handleOpenE}>
                    <EditIcon className={classes.add}/>
                </IconButton>
            )
        }

    ];
    
  
    
    const rows = return_rows();

    

    function create_data(nit_ter, nomb, dir, cor, tel, tip, sig, es){
        return {id: nit_ter, nit_ter: nit_ter, nombre: nomb, direccion:dir ,correo:cor, telefono: tel, tipo: tip, sigla:sig, estado:es}
    }

    function return_rows(){
        const rows = [];
        
        for (const key in listTerceros) {
            rows.push(create_data(listTerceros[key].nit, listTerceros[key].nombre, listTerceros[key].direccion, 
                listTerceros[key].correo, listTerceros[key].telefono, listTerceros[key].tipoTercero.nombre, 
                listTerceros[key].tipoTercero.abreviacion, listTerceros[key].estado));
        }

        return rows;
    }

    

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

    const handleFilaSeleccionada = (fil) => {
        //alert(fil[0].id)
        const id_fila = fil.selectionModel[0];
        console.log(id_fila);
        var nit, nom, cor, tel, dir, es;
        for (const key in rows) {
           //console.log("ciclo for "+rows[key].nit_ter);
           if(rows[key].nit_ter == id_fila){
            console.log("datos encontrados");
            nit = rows[key].id;
            nom = rows[key].nombre;
            cor = rows[key].correo;
            tel = rows[key].telefono;
            dir = rows[key].direccion;
            es  = rows[key].estado;
            break;
           }
        }
        setNitT(nit);
        setNombreT(nom);
        setcorreoT(cor);
        setDireccionT(dir);
        setTelefonoT(tel);
        setEstadoT(es);
        if(es === "ACTIVO"){
            //alert(true)
            setBandera(true);
        }
        //alert(bandera)
        console.log(nit+" - "+nom+" - "+cor+" - "+tel+" - "+dir+" - "+es);
    }

    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        //swal("Información","registrando "+nameNombre, "info");
        axios.post(url+'crearTercero/', {
            nit: nit,
            municipio: {
                municipio_id: nameCiudad
            },
            nombre: nameNombre,
            direccion: nameDireccion,
            correo: nameCorreo,
            telefono: nameTelefono,
            tipoTercero: {
                tipoTerceroId: nameTipo
            },
            estado:'ACTIVO'
        }).then(response => {
            //alert(response.status);
            console.log(response.status);
            if(response.status==208){
                swal("Advertencia", "El tercero "+nameNombre+" ya esta registrado", "warning");
            }else{
                swal("Éxito", "Se registró exitosamente el tercero: "+nameNombre, "success");
            }
            handleClose();
            cargarTerceros();
        })
          .catch((error) => {
                console.log(error.response.data.status);
                if(error.response.data.status===500){
                    console.log("correo en formato incorrecto");
                    swal("Advertencia", "Correo en formato incorrecto ", "warning");
                }else{
                    swal("Error", "NO se pudo registrar el tercero ", "error");
                }
                
            })

    }
    
    
    
    
    
      const body = (
            <div style={modalStyle} className={classes.paper} align="center">
                <br/>
                <Typography variant="h5" className={classes.title} gutterBottom  align ="center">
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
                            label="Nit"
                            //value={nameNombre}
                            onChange={(e) => setNit(e.target.value)}
                            variant="outlined"
                            />

                        <TextField
                            required
                            id="outlined-required"
                            className={classes.formControl}
                            size="medium"
                            label="Nombre"
                            //value={nameNombre}
                            onChange={(e) => setNameNombre(e.target.value)}
                            variant="outlined"
                            />
            
                       
                    </div>
            
                    <div style={{marginTop: "18px"}}>    
                    <TextField
                            required
                            id="outlined-required"
                            className={classes.formControl}
                            label="Direccion"
                            onChange={(e) => setNameDireccion(e.target.value)}
                            variant="outlined"
                            />

                        <TextField
                            required
                            id="outlined-required"
                            className={classes.formControl}
                            label="Teléfono"
                            onChange={(e) => setNameTelefono(e.target.value)}
                            variant="outlined"
                            />
            
                      
                    </div>
            
            
                    <div style={{marginTop: "18px"}}>

                    <TextField
                            required
                            id="outlined-required"
                            className={classes.formControl}
                            label="Correo"
                            onChange={(e) => setNameCorreo(e.target.value)}
                            variant="outlined"
                            />

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
                            className={classes.cancel}
                            startIcon={ < CancelIcon / > }
                            >
                            Cancelar
                        </Button>
            
                    </div>
            
            
            
                </form> 
            </div>
        );
        
        const body_actualizar = (
            <div style={modalStyle} className={classes.paper} align="center">
                <Actualizar 
                    nit={nitT} 
                    nombre={nombreT} 
                    correo={correoT} 
                    direccion={direccionT}
                    telefono= {telefonoT}
                    estado={estadoT}
                    band = {bandera}
                />
            </div>
        );

        const filterModel = {
            items: [
              { columnField: 'nit', operatorValue: 'contains', value: '123' },
              { columnField: 'nombre', operatorValue: 'startsWith', value: 'tercero' },
            ],
            linkOperator: GridLinkOperator.Or,
          };
        
          const { data } = {
              terceros
          }

         
         
        
     return (
                                        <div className={classes.root} align="center">
                                            <br/>
                                            <br/>
                                            <Typography variant="h5" className={classes.title} component="h2" gutterBottom style={{marginBottom: '1em'}} align ="center">
                                                Información Terceros
                                            </Typography>
                                                <br/>
                                                <br/>
                                                <div>
                                                  
                                                   <div style={{ height: 440, width: "100%" }}>
                                                   <DataGrid 
                                                        rows={rows} 
                                                        columns={columns} 
                                                        pageSize={5} 
                                                        className={classes.container}
                                                        //showCellRightBorder
                                                        //onRowSelected={handleRow}
                                                        //onRowSelected={(x) => handleFilaSeleccionada(x.api.current.getSelectedRows())}
                                                        onSelectionModelChange={itm => handleFilaSeleccionada(itm)}
                                                        components={{
                                                            Toolbar: GridToolbar,
                                                          }}

                                                        componentsProps={{
                                                            toolbar: {
                                                              apiRef
                                                            },
                                                          }}
                                                    />
                                                    <Typography>Total de filas: {rows.length}</Typography>
                                                   </div>
                                                </div>
                                                <br/>
                                                <br/>
                                          
                                                  
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
                                            <div align="left">
                                            <Modal
                                                    open={openE}
                                                    onClose={handleCloseE}
                                                    aria-labelledby="simple-modal-title"
                                                    aria-describedby="simple-modal-description"
                                                    >
                                                  {body_actualizar}
                                        </Modal>
                                        </div>
                                        </div>
                                        );
}


