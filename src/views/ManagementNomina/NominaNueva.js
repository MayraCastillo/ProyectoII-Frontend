import React from 'react';
import { useEffect, useState } from 'react';

// @material-ui/core components
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Edit } from '@material-ui/icons';
import {
	TableContainer, Table, TableHead, TableBody, TableRow, TableCell,
	Modal, Button, TextField,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';

// core components
import GridItem from '../../components/Grid/GridItem';
import GridContainer from '../../components/Grid/GridContainer';
import Axios from 'axios';
import swal from 'sweetalert';
import Checkbox from '@material-ui/core/Checkbox';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import SaveIcon from '@material-ui/icons/Save';
import ReplayIcon from '@material-ui/icons/Replay';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: '#154c79',
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

const useStyles = makeStyles((theme) => ({
    root: {
       	marginTop:"100px",
		width: '80%',
		margin: 'auto',
		textAlign: 'center',
    },

	buttonCancel: {
		color: 'white',
		backgroundColor: "rgb(220,53,69)",
	},

	modal: {
		position: 'absolute',
		width: '60%',
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
        textAlign: 'center',
	},

    modalNomina : {
		position: 'absolute',
		width: '80%',
		backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
		border: '1px solid #000',
		boxShadow: theme.shadows[5],
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
        maxHeight: '610px',
        overflowY: 'scroll',
	},

    modalEditar : {
		position: 'absolute',
		width: '60%',
		backgroundColor: theme.palette.background.paper,
		border: '1px solid #000',
		boxShadow: theme.shadows[5],
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
        padding: theme.spacing(0, 0, 3),
	},

    modalCreate: {
		position: 'absolute',
		width: '500px',
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(3, 6, 5),
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
        textAlign: 'center',
	},

	iconos: {
		cursor: 'pointer',
	},

	inputMaterial: {
		width: '100%',
	},

    panel: {
        padding: theme.spacing(0, 4, 3),
        textAlign: 'center',
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
    table: {
		minWidth: 700,
	},
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const baseURL = `http://localhost:8091/`;

function createData(status, idContract, baseSalary, idEmployee, nameEmployee, emailEmployee, statusEmployee, 
    workingHours, extraHoursDO, extraHoursNO, extraHoursDDF, extraHoursNDF,
    surchargesNO, surchargesDDF, surchargesNDF, facSalC, facSalB, facSalAE, facSalV, facSalOF,
    facNoSalC, facNoSalB, facNoSalAE, facNoSalV, facNoSalOF) {

	return {status, idContract, baseSalary, idEmployee, nameEmployee, emailEmployee, statusEmployee, 
        workingHours, extraHoursDO, extraHoursNO, extraHoursDDF, extraHoursNDF,
        surchargesNO, surchargesDDF, surchargesNDF, facSalC, facSalB, facSalAE, facSalV, facSalOF,
        facNoSalC, facNoSalB, facNoSalAE, facNoSalV, facNoSalOF};    
}

function createDataNomina(status, detalleNomina) {
	return {status, detalleNomina};    
}

export default function CreatePayroll() {
	const styles = useStyles();
	const classes = useStyles();
    const [value, setValue] = React.useState(0);
	const [data, setData] = useState([]);
    const [buttonGenerarNomina, setButtonGenerarNomina] = useState(false);
    const [buttonGuardarNomina, setButtonGuardarNomina] = useState(false);
    const [buttonRecalcularNomina, setButtonRecalcularNomina] = useState(false);

    const [nominaRecalcular, setNominaRecalcular] = useState({});

    const [inputChecked, setInputChecked] = useState('EDITAR');

	const [modalCreate, setModalCreate] = useState(false);
	const [modalEditar, setModalEditar] = useState(false);
    const [modalNomina, setModalNomina] = useState(false);
	const [contractDataSelect, setContractDataSelect] = useState({
        status: false, idEmployee: 0, nameEmployee: '', emailEmployee: '', statusEmployee: '', 
        workingHours: 0, extraHoursDO: 0, extraHoursNO: 0, extraHoursDDF: 0, extraHoursNDF: 0,
        surchargesNO: 0, surchargesDDF: 0, surchargesNDF: 0, facSalC: 0, facSalB: 0, facSalAE: 0, 
        facSalV: 0, facSalOF: 0, facNoSalC: 0, facNoSalB: 0, facNoSalAE: 0, facNoSalV: 0, facNoSalOF: 0,
	});

    const [fechaActual, setFechaActual] = useState("");
    const [fechaNominaInicial, setFechaNominaInicial] = useState("");
    const [fechaNominaFinal, setFechaNominaFinal] = useState("");
    const [descNomina, setDescNomina] = useState("");
    
    const [dataNomina, setDataNomina] = useState([]);
    
    const editDatosContactConfirmate = () => {
        if (contractDataSelect.workingHours < 0 || contractDataSelect.extraHoursDO < 0 ||
            contractDataSelect.extraHoursNO < 0 || contractDataSelect.extraHoursDDF < 0 ||
            contractDataSelect.extraHoursNDF < 0 || contractDataSelect.surchargesNO < 0 ||
            contractDataSelect.surchargesDDF < 0 || contractDataSelect.surchargesNDF < 0 ||
            contractDataSelect.facSalC < 0 || contractDataSelect.facSalB < 0 ||
            contractDataSelect.facSalAE < 0 || contractDataSelect.facSalV < 0 ||
            contractDataSelect.facSalOF < 0 || contractDataSelect.facNoSalC < 0 ||
            contractDataSelect.facNoSalB < 0 || contractDataSelect.facNoSalAE < 0 ||
            contractDataSelect.facNoSalV < 0 || contractDataSelect.facNoSalOF < 0) {
            
            swal({
                title: 'Dato Ingresado Inválido',
                text: 'No ha sido posible guardar los datos ingresados. \nLos datos ingresados NO pueden ser negativos',
                icon: 'error',
                button: 'Aceptar',
                timer: '5000',
            });
            return false;
        }
        return true;
    };

    const generarNominaConfirmate = () => {
        if (!descNomina.trim() || !fechaNominaInicial.trim() || !fechaNominaFinal.trim()){
            swal({
                title: 'Campo vacío',
                text: 'No ha sido posible generar la nómina. \nEs necesario que complete todos los campos',
                icon: 'error',
                button: 'Aceptar',
                timer: '5000',
            });
            return false;
        }
        return true;
    };

    const getCurrentDate = () => {
        let currentDate = new Date();
        setFechaActual(currentDate.toISOString().slice(0,10));
    }
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

	const listContractGET = async () => {
        let urlListContract = baseURL+'/listarContratos/123';
		await Axios.get(urlListContract)
			.then((response) => {
                handleAddContractData(response.data);
                if(response.data.length == 0){
					swal({
						title: 'No hay registros disponibles',
						text: 'No existen contratos registrados en el sistema',
						icon: 'error',
						button: 'Aceptar',
						timer: '5000',
					});
					document.getElementById('message').innerHTML = 'No hay registros disponibles';
				}else{
					document.getElementById('message').innerHTML = '';
				}
			})
			.catch((error) => {
				console.log(error);
                /*swal({
					title: 'Contratos no Encontrados',
					text: 'No ha sido posible realizar listar los contratos de la empresa. Inténtelo mas tarde',
					icon: 'error',
					button: 'Aceptar',
					timer: '5000',
				});*/
		});
	};

    const generarNomina = () => {;
        if(generarNominaConfirmate()){
            for (const index in data) {
                if(data[index].status === true){
                    generarNominaPOST(data[index]);
                }
            }
        }
    }

    const guardarNomina = () => {
        
        if(generarNominaConfirmate()){
            for (const index in data) {
                if(data[index].status === true){
                    guardarNominaPOST(data[index]);
                }
            }
        }

        swal({
            title: "Nóminas Guardadas",
            text: "Las nómina seleccionadas han sido guardadas de manera correcta",
            icon: "success",
            button: "Aceptar",
        }).then((value) => {
            window.location.href = '/listar_nominas';
        });
        setButtonGuardarNomina(false);
    }

    const generarNominaPOST = (datosContrato) => {
        var authOptions = {
            method: 'POST',
            url: 'http://localhost:8093/parametros/generarDetalleNomina',
            data: {
                salarioBase: datosContrato.baseSalary,
                contratoId: datosContrato.idContract,
                registroHoras:{
                    horasTrabajadas: datosContrato.workingHours,
                    extrasDiurnoOrdinaro: datosContrato.extraHoursDO,
                    extrasNoturnoOrdinario: datosContrato.extraHoursNO,
                    extrasDominicalFestivoDiurno: datosContrato.extraHoursDDF,
                    extrasDominicalFestivoNoturno: datosContrato.extraHoursNDF,
                    recargoNoturno: datosContrato.surchargesNO,
                    recargoDiurnoDominicalFestivo: datosContrato.surchargesDDF,
                    recargoNoturnoDominicalFestivo: datosContrato.surchargesNDF
                },

                factoresSalariales:{
                    comisiones: datosContrato.facSalC,
                    bonificaciones: datosContrato.facSalB,
                    auxilioExtra: datosContrato.facSalAE,
                    viaticos: datosContrato.facSalV,
                    otros: datosContrato.facSalOF
                },

                factoresNoSalariales:{
                    comisiones: datosContrato.facNoSalC,
                    bonificaciones: datosContrato.facNoSalB,
                    auxilioExtra: datosContrato.facNoSalAE,
                    viaticos: datosContrato.facNoSalV,
                    otros: datosContrato.facNoSalOF
                },

                nomina:{  
                    fechaInicio: fechaNominaInicial,
                    fechaFin: fechaNominaFinal,
                    detalle: descNomina,
                    estado:"GENERADA"
                }
            },
            json: true,
        };
        Axios(authOptions)
        .then(function (response) {
            if(inputChecked === 'EDITAR'){
                dataNomina.push(createDataNomina(false, response.data));
                swal({
                    title: "Nómina Generada",
                    text: "La nómina ha sido generada de manera correcta",
                    icon: "success",
                    button: "Aceptar",
                }).then((value) => {
                    abrirCerrarModalNomina();
                });
            }else if(inputChecked === 'RECALCULAR'){
                handleChangeNominaData(response.data);
                swal({
                    title: "Nómina Recalculada",
                    text: "La nómina ha sido calculada nuevamente de manera correcta",
                    icon: "success",
                    button: "Aceptar",
                    timer: '5000',
                })
                setButtonGuardarNomina(false);
                setButtonRecalcularNomina(false);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
	};

    /*const guardarNominaPOST = (nomina) => {
        var authOptions = {
            method: 'POST',
            url: 'http://localhost:8093/parametros/guardarDetalleNomina',
            data: nomina,
            json: true,
        };
        Axios(authOptions)
        .then(function (response) {
            console.log("EXITO");
        })
        .catch(function (error) {
            console.log(error);
        });
	};*/

    const guardarNominaPOST = (datosContrato) => {
        var authOptions = {
            method: 'POST',
            url: 'http://localhost:8093/parametros/guardarDetalleNomina',
            data: {
                salarioBase: datosContrato.baseSalary,
                contratoId: datosContrato.idContract,
                registroHoras:{
                    horasTrabajadas: datosContrato.workingHours,
                    extrasDiurnoOrdinaro: datosContrato.extraHoursDO,
                    extrasNoturnoOrdinario: datosContrato.extraHoursNO,
                    extrasDominicalFestivoDiurno: datosContrato.extraHoursDDF,
                    extrasDominicalFestivoNoturno: datosContrato.extraHoursNDF,
                    recargoNoturno: datosContrato.surchargesNO,
                    recargoDiurnoDominicalFestivo: datosContrato.surchargesDDF,
                    recargoNoturnoDominicalFestivo: datosContrato.surchargesNDF
                },

                factoresSalariales:{
                    comisiones: datosContrato.facSalC,
                    bonificaciones: datosContrato.facSalB,
                    auxilioExtra: datosContrato.facSalAE,
                    viaticos: datosContrato.facSalV,
                    otros: datosContrato.facSalOF
                },

                factoresNoSalariales:{
                    comisiones: datosContrato.facNoSalC,
                    bonificaciones: datosContrato.facNoSalB,
                    auxilioExtra: datosContrato.facNoSalAE,
                    viaticos: datosContrato.facNoSalV,
                    otros: datosContrato.facNoSalOF
                },

                nomina:{  
                    fechaInicio: fechaNominaInicial,
                    fechaFin: fechaNominaFinal,
                    detalle: descNomina,
                    estado:"GENERADA"
                }
            },
            json: true,
        };
        console.log(authOptions);
        Axios(authOptions)
        .then(function (response) {
            console.log("EXITO");
        })
        .catch(function (error) {
            console.log(error);
        });
	};

    const handleAddContractData = (Contracts) => {
		let dataAux = [];
        for (const index in Contracts) {
            const contractAux = createData(
                false,
                Contracts[index].contratoId,
                Contracts[index].salarioBase,
                Contracts[index].contratoPk.empleado.numeroDocumento,
                Contracts[index].contratoPk.empleado.nombres + " " +
                Contracts[index].contratoPk.empleado.apellidos,
                Contracts[index].contratoPk.empleado.correo,
                Contracts[index].estado,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            dataAux.push(contractAux);
        }
        setData(dataAux);
	};

    const handleChangeContractData = () => {
        if(editDatosContactConfirmate()){
            let dataAux = [];
            for (const index in data) {
                if(data[index].idEmployee === contractDataSelect.idEmployee){
                    dataAux.push(contractDataSelect);
                }else{
                    dataAux.push(data[index]);
                }
            }
            setData(dataAux);
            if(inputChecked==='RECALCULAR'){
                generarNominaPOST(contractDataSelect);
            }
        }
        abrirCerrarModalEditar();
	};

	const handleChangeText = (e) => {
        const { name, value } = e.target;
        if(value.length > 0){
            setContractDataSelect((prevState) => ({
                ...prevState,
                [name]: parseInt(value, 10),
            }));
        }
    };

    const handleChangeCheckbox = (contractSelectId) => {
        let dataAux = [];
        setButtonGenerarNomina(false);
        for (const index in data) {
            if(data[index].idEmployee === contractSelectId){
                const contractAux = createData(
                    !data[index].status, 
                    data[index].idContract, data[index].baseSalary, data[index].idEmployee,
                    data[index].nameEmployee, data[index].emailEmployee, data[index].statusEmployee,
                    data[index].workingHours, data[index].extraHoursDO, data[index].extraHoursNO,
                    data[index].extraHoursDDF, data[index].extraHoursNDF, data[index].surchargesNO,
                    data[index].surchargesDDF, data[index].surchargesNDF, data[index].facSalC,
                    data[index].facSalB, data[index].facSalAE, data[index].facSalV, data[index].facSalOF,
                    data[index].facNoSalC, data[index].facNoSalB, data[index].facNoSalAE, 
                    data[index].facNoSalV, data[index].facNoSalOF);  
                dataAux.push(contractAux);
                if(contractAux.status){
                    setButtonGenerarNomina(true);
                }
            }else{
                dataAux.push(data[index]);
                if(data[index].status){
                    setButtonGenerarNomina(true);
                }
            }
        }
        setData(dataAux);
	};

    const handleChangeCheckbox2 = (contractSelectId, optionSelected) => {
        
        for (const index in data) {
            if(data[index].idEmployee === contractSelectId){
                setNominaRecalcular(data[index]);
            }
        }

        let indice = 0;
        let dataNominaAux = [];
        setButtonGuardarNomina(false);
        setButtonRecalcularNomina(false);
        for (const index in dataNomina) {
            if(dataNomina[index].detalleNomina.contrato.contratoPk.empleado.numeroDocumento === contractSelectId){
                const detNominaAux = createDataNomina(
                    !dataNomina[index].status, 
                    dataNomina[index].detalleNomina);  
                dataNominaAux.push(detNominaAux);
                if(detNominaAux.status){
                    setButtonGuardarNomina(true);
                    indice++;
                }
            }else{
                dataNominaAux.push(dataNomina[index]);
                if(dataNomina[index].status){
                    setButtonGuardarNomina(true);
                    indice++;
                }
            }
        }
        if(indice === 1){
            setButtonRecalcularNomina(true);
        }
        setDataNomina(dataNominaAux);
	};

    const handleChangeNominaData = (nominaRecalculada) => {
        const dataNominaAux = [];
        for (const index in dataNomina) {
            if(dataNomina[index].detalleNomina.contrato.contratoId === nominaRecalculada.contrato.contratoId){
                dataNominaAux.push(createDataNomina(false, nominaRecalculada));
            }else {
                dataNominaAux.push(dataNomina[index]);
            }
        }
        setDataNomina(dataNominaAux);
	};

	const abrirCerrarModalEditar = () => {
		setModalEditar(!modalEditar);
	};

    const abrirCerrarModalCreate = () => {
		setModalCreate(!modalCreate);
	};

    const abrirCerrarModalNomina = () => {
		setModalNomina(!modalNomina);
	};

	const selectContract = (contractSelect, opcion) => {
        setInputChecked(opcion);
        setContractDataSelect(contractSelect);
		abrirCerrarModalEditar();
	};

	const bodyCreate = (
		<div className={styles.modalCreate}>
            <div style={{width: '90%', margin: 'auto'}}>
                <Typography variant="h4" component="h2" gutterBottom style={{marginBottom: '1em', color:"#154c79"}}>
					<b>Generar Nómina</b>
				</Typography>
                
                <GridContainer style={{textAlign: 'left'}}>
                    <GridItem xs={12} sm={12} md={7}>
                        <TextField
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            size="small"
                            onChange={(e) => setDescNomina(e.target.value)}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={5} style={{marginTop: '20px'}}>
                        <b>Descripción de la Nómina</b>
                    </GridItem>
                    
                    <GridItem xs={12} sm={12} md={7}>
                        <input 
                            className="input-fecha"
                            type="date"
                            min= {fechaActual}
                            onChange={(e) => setFechaNominaInicial(e.target.value)}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={5} style={{marginTop: '20px'}}>
                        <b>Fecha Inicial de la Nómina</b>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={7}>
                        <input 
                            className="input-fecha"
                            type="date"
                            min= {fechaNominaInicial}
                            onChange={(e) => setFechaNominaFinal(e.target.value)}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={5} style={{marginTop: '20px'}}>
                        <b>Fecha Final de la Nómina</b>
                    </GridItem>
                </GridContainer>
                <br /><br />
                <Button 
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => generarNomina()}
                >GENERAR NÓMINA
                </Button>
            </div>
		</div>
	);

	const bodyEditar = (
        <div className={styles.modalEditar}>
		    <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" style={{backgroundColor:"#154c79"}}>
                <Tab label="HORAS LABORALES" {...a11yProps(0)} />
                <Tab label="FACTORES SALARIALES" {...a11yProps(1)} />
                <Tab label="FACTORES NO SALARIALES" {...a11yProps(2)} />
                </Tabs>
            </AppBar>

            <TabPanel value={value} index={0} className={classes.panel}>
                <h3 style={{color:"#154c79"}}>Horas Laboradas de {contractDataSelect.nameEmployee} </h3>
                <div>
                    <GridContainer>
                    <GridItem xs={12} sm={12} md={4} style={{marginTop: '10px'}}>
                        <b>Horas Laborales</b>
                        <TextField
                            fullWidth
                            name="workingHours"
                            margin="normal"
                            label="Horas Laborales"
                            variant="outlined"
                            size="small"
                            onChange={handleChangeText}
                            value={contractDataSelect.workingHours}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={4} style={{marginTop: '10px'}}>
                        <b>Horas Extras</b>
                        <TextField
                            fullWidth
                            name="extraHoursDO"
                            margin="normal"
                            label="Diurno Ordinario"
                            variant="outlined"
                            size="small"
                            onChange={handleChangeText}
                            value={contractDataSelect.extraHoursDO}
                        />
                        <TextField
                            fullWidth
                            name="extraHoursNO"
                            margin="normal"
                            label="Nocturno Ordinario"
                            variant="outlined"
                            size="small"
                            onChange={handleChangeText}
                            value={contractDataSelect.extraHoursNO}
                        />
                        <TextField
                            fullWidth
                            name="extraHoursDDF"
                            margin="normal"
                            label="Diurno Dom. y Fest."
                            variant="outlined"
                            size="small"
                            onChange={handleChangeText}
                            value={contractDataSelect.extraHoursDDF}
                        />
                        <TextField
                            fullWidth
                            name="extraHoursNDF"
                            margin="normal"
                            label="Nocturno Dom. y Fest."
                            variant="outlined"
                            size="small"
                            onChange={handleChangeText}
                            value={contractDataSelect.extraHoursNDF}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={4} style={{marginTop: '10px'}}>
                        <b>Recargos</b>
                        <TextField
                            fullWidth
                            name="surchargesNO"
                            margin="normal"
                            label="Nocturno Ordinario"
                            variant="outlined"
                            size="small"
                            onChange={handleChangeText}
                            value={contractDataSelect.surchargesNO}
                        />
                        <TextField
                            fullWidth
                            name="surchargesDDF"
                            margin="normal"
                            label="Diurno Dom. y Fest."
                            variant="outlined"
                            size="small"
                            onChange={handleChangeText}
                            value={contractDataSelect.surchargesDDF}
                        />
                        <TextField
                            fullWidth
                            name="surchargesNDF"
                            margin="normal"
                            label="Nocturno Dom. y Fest."
                            variant="outlined"
                            size="small"
                            onChange={handleChangeText}
                            value={contractDataSelect.surchargesNDF}
                        />
                    </GridItem>
                </GridContainer>
                </div>
            </TabPanel>

            <TabPanel value={value} index={1} className={classes.panel}>
                <h3 style={{color: '#154c79'}}>Factores Salariales de {contractDataSelect.nameEmployee}</h3>
                <div style={{width: '50%', margin: 'auto'}}>
                <GridContainer style={{textAlign: 'left'}}>
                    <GridItem xs={12} sm={12} md={5} style={{marginTop: '20px'}}>
                        <b>Comisiones</b>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={7}>
                        <TextField
                            fullWidth
                            name="facSalC"
                            margin="normal"
                            variant="outlined"
                            size="small"
                            onChange={handleChangeText}
                            value={contractDataSelect.facSalC}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={5} style={{marginTop: '20px'}}>
                        <b>Bonificaciones</b>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={7}>
                        <TextField
                            fullWidth
                            name="facSalB"
                            margin="normal"
                            variant="outlined"
                            size="small"
                            onChange={handleChangeText}
                            value={contractDataSelect.facSalB}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={5} style={{marginTop: '12px'}}>
                        <b>Auxilio Extra</b>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={7}>
                        <TextField
                            fullWidth
                            name="facSalAE"
                            margin="normal"
                            variant="outlined"
                            size="small"
                            onChange={handleChangeText}
                            value={contractDataSelect.facSalAE}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={5} style={{marginTop: '12px'}}>
                        <b>Viáticos</b>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={7}>
                        <TextField
                            fullWidth
                            name="facSalV"
                            margin="normal"
                            variant="outlined"
                            size="small"
                            onChange={handleChangeText}
                            value={contractDataSelect.facSalV}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={5} style={{marginTop: '20px'}}>
                        <b>Otros Factores</b>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={7}>
                        <TextField
                            fullWidth
                            name="facSalOF"
                            margin="normal"
                            variant="outlined"
                            size="small"
                            onChange={handleChangeText}
                            value={contractDataSelect.facSalOF}
                        />
                    </GridItem>
                </GridContainer>
                </div>
            </TabPanel>

            <TabPanel value={value} index={2} className={classes.panel}>
                <h3 style={{color: '#154c79'}}>Factores No Salariales de {contractDataSelect.nameEmployee}</h3>
                <div style={{width: '50%', margin: 'auto'}}>
                <GridContainer style={{textAlign: 'left'}}>
                    <GridItem xs={12} sm={12} md={5} style={{marginTop: '20px'}}>
                        <b>Comisiones</b>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={7}>
                        <TextField
                            fullWidth
                            name="facNoSalC"
                            margin="normal"
                            variant="outlined"
                            size="small"
                            onChange={handleChangeText}
                            value={contractDataSelect.facNoSalC}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={5} style={{marginTop: '20px'}}>
                        <b>Bonificaciones</b>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={7}>
                        <TextField
                            fullWidth
                            name="facNoSalB"
                            margin="normal"
                            variant="outlined"
                            size="small"
                            onChange={handleChangeText}
                            value={contractDataSelect.facNoSalB}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={5} style={{marginTop: '12px'}}>
                        <b>Auxilio Extra</b>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={7}>
                        <TextField
                            fullWidth
                            name="facNoSalAE"
                            margin="normal"
                            variant="outlined"
                            size="small"
                            onChange={handleChangeText}
                            value={contractDataSelect.facNoSalAE}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={5} style={{marginTop: '12px'}}>
                        <b>Viáticos</b>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={7}>
                        <TextField
                            fullWidth
                            name="facNoSalV"
                            margin="normal"
                            variant="outlined"
                            size="small"
                            onChange={handleChangeText}
                            value={contractDataSelect.facNoSalV}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={5} style={{marginTop: '20px'}}>
                        <b>Otros Factores</b>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={7}>
                        <TextField
                            fullWidth
                            name="facNoSalOF"
                            margin="normal"
                            variant="outlined"
                            size="small"
                            onChange={handleChangeText}
                            value={contractDataSelect.facNoSalOF}
                        />
                    </GridItem>
                </GridContainer>    
                </div>
            </TabPanel>

            <div align="right" style={{marginRight: '60px'}}>
            {inputChecked==='EDITAR' ? (
                <div>
                    <Button 
                        variant="contained"
                        color="primary"
                        startIcon={<AddCircleIcon />}
                        style={{marginRight:"18px"}}
                        onClick={handleChangeContractData}
                    >Guardar
                    </Button>

                    <Button
                        className={styles.buttonCancel} 
                        variant="contained"
                        color="secondary"
                        startIcon={<CancelIcon />}
                        onClick={() => abrirCerrarModalEditar()}
                    >Cancelar
                    </Button>
                </div>
            ) : inputChecked==='RECALCULAR' ? (
                <div>
                    <Button 
                        variant="contained"
                        color="primary"
                        startIcon={<AddCircleIcon />}
                        style={{marginRight:"18px"}}
                        onClick={handleChangeContractData}
                    >Recalcular
                    </Button>

                    <Button
                        className={styles.buttonCancel} 
                        variant="contained"
                        color="secondary"
                        startIcon={<CancelIcon />}
                        onClick={() => abrirCerrarModalEditar()}
                    >Cancelar
                    </Button>
                </div>
            ) : null}  
            </div>
        </div>
	);

    const bodyNomina = (
		<div className={styles.modalNomina}>
            <Typography variant="h4" component="h2" gutterBottom style={{textAlign:"center", marginBottom: '1em', color:"#154c79"}}>
                <b>Nóminas Generadas</b>
            </Typography>
            <p>A continuación se presentan una vista previa de las nóminas generadas de los empleados seleccionados anteriormente.</p>
            <ol>
                <li>En caso de haber cometido algún error al digitar las horas laboradas por el empleado, puede 
                    seleccionar al empleado y presionar el boto "RECALCULAR NÓMINA" para editar nuevamente sus horas 
                    laboradas, factores salariales y no salariales.
                </li>
                <li>En caso de no observar ningún error en las nóminas generadas y desea guardarlas, seleccione 
                   las nominas generadas y presione el botón "GUARDAR".
                </li>
            </ol>
            
            {dataNomina.length ?
            <TableContainer style={{marginTop: '20px'}}>
            <Table className={styles.table} aria-label="customized table">
					<TableHead>
						<TableRow>
                            <StyledTableCell></StyledTableCell>
							<StyledTableCell>Nombre del Empleado</StyledTableCell>
							<StyledTableCell>No. de Identidad</StyledTableCell>
							<StyledTableCell>Cargo</StyledTableCell>
                            <StyledTableCell>Sueldo Básico</StyledTableCell>
							<StyledTableCell>Horas Laboradas</StyledTableCell>
                            <StyledTableCell>Básico Devengado</StyledTableCell>
                            <StyledTableCell>Auxilio de Transporte</StyledTableCell>
                            <StyledTableCell>Horas Extras</StyledTableCell>
                            <StyledTableCell>Recargos</StyledTableCell>
                            <StyledTableCell>Comisiones</StyledTableCell>
                            <StyledTableCell>Otros Ingresos (Salarial)</StyledTableCell>
                            <StyledTableCell>Otros Ingresos (No Salarial)</StyledTableCell>
							<StyledTableCell>Total Devengado</StyledTableCell>
                            <StyledTableCell>Salud</StyledTableCell>
                            <StyledTableCell>Pensión</StyledTableCell>
                            <StyledTableCell>Fondo Salarial Pensional</StyledTableCell>
                            <StyledTableCell>Total Deducciones</StyledTableCell>
                            <StyledTableCell>Neto Pagado</StyledTableCell>
						</TableRow>
					</TableHead>
		
        			<TableBody>
						{dataNomina.map((nomina) => (
							<StyledTableRow hover key={nomina.detalleNomina.contrato.contratoPk.empleado.numeroDocumento}>
                                <StyledTableCell>
                                    <Checkbox
                                        name="status"
                                        onChange={() => handleChangeCheckbox2(nomina.detalleNomina.contrato.contratoPk.empleado.numeroDocumento)}
                                        color="primary"
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        checked={nomina.status}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>{nomina.detalleNomina.contrato.contratoPk.empleado.nombres}</StyledTableCell>
                                <StyledTableCell>{nomina.detalleNomina.contrato.contratoPk.empleado.numeroDocumento}</StyledTableCell>
                                <StyledTableCell>Vendedor</StyledTableCell>
                                <StyledTableCell>{nomina.detalleNomina.contrato.salarioBase}</StyledTableCell>
                                <StyledTableCell>{nomina.detalleNomina.registroHoras.horasTrabajadas}</StyledTableCell>
                                <StyledTableCell>{nomina.detalleNomina.basicoDevengado} </StyledTableCell>
                                <StyledTableCell>{nomina.detalleNomina.auxilioTransporte}</StyledTableCell>
                                <StyledTableCell>{nomina.detalleNomina.horasExtras} </StyledTableCell>
                                <StyledTableCell>{nomina.detalleNomina.recargos}</StyledTableCell>
                                <StyledTableCell>{nomina.detalleNomina.comisiones}</StyledTableCell>
                                <StyledTableCell>{nomina.detalleNomina.otrosIngresoSalarial} </StyledTableCell>
                                <StyledTableCell>{nomina.detalleNomina.otrosIngresoNoSalarial}</StyledTableCell>
                                <StyledTableCell>{nomina.detalleNomina.totalDevengado} </StyledTableCell>
                                <StyledTableCell>{nomina.detalleNomina.saludEmpleado} </StyledTableCell>
                                <StyledTableCell>{nomina.detalleNomina.pensionEmpleado}</StyledTableCell>
                                <StyledTableCell>{nomina.detalleNomina.fondoSolidaridadPensional} </StyledTableCell>
                                <StyledTableCell>{nomina.detalleNomina.totalDeducciones}</StyledTableCell>
                                <StyledTableCell>{nomina.detalleNomina.totalDevengado}</StyledTableCell>
							</StyledTableRow>
						))}
				    </TableBody>
				</Table>
	    	</TableContainer>
            : null}
            <br /><br />
            <div style={{display: 'flex', justifyContent: 'right'}}>
                {buttonRecalcularNomina ?
                    <Button 
                        variant="contained"
                        color="primary"
                        startIcon={<ReplayIcon />}
                        style={{marginRight:"18px"}}
                        onClick={() => selectContract(nominaRecalcular, 'RECALCULAR')}
                    >RECALCULAR NÓMINA
                    </Button>
                : 
                    <Button 
                        disabled
                        variant="contained"
                        startIcon={<ReplayIcon />}
                        style={{marginRight:"18px"}}
                    >RECALCULAR NÓMINA
                    </Button>
                }
                {buttonGuardarNomina ?
                    <Button
                        className={classes.buttonCancel} 
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={() => guardarNomina()}
                    >GUARDAR
                    </Button>
                : 
                    <Button
                        disabled
                        variant="contained"
                        startIcon={<SaveIcon />}
                    >GUARDAR
                    </Button>
                }
            </div>
		</div>
	);
	
	useEffect(() => {
		listContractGET();
        getCurrentDate();
	}, []);

	return (
		<div className={styles.root}>
			<GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Typography variant="h4" component="h2" gutterBottom style={{marginBottom: '1em', color:"#154c79"}}>
                        <b>Generar Nómina</b>
                    </Typography>

                    <div style={{textAlign: 'left'}}>
                        <p><b>Para generar una nueva nómina:</b></p>
                        <ol>
                            <li>Edite (En el botón de acciones) las horas laboradas, los factores salariales y no salariales 
                                del empleado (o los empleados) a los cuales se le generará su pago correspondiente.</li>
                            <li>Seleccione el cuadro correspondiente a cada uno de empleados que se les generará su nómina.</li>
                            <li>Presione el botón "GENERAR NÓMINA" y complete los datos solicitados.</li>
                        </ol>
                    </div>

					<br></br>

                    {data.length ?
                    <div>
                        <div align="right">
                            {buttonGenerarNomina ?
                                <Button 
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    startIcon={<AddCircleIcon />}
                                    onClick={() => abrirCerrarModalCreate()}
                                >GENERAR NÓMINA
                                </Button>
                            : 
                                <Button 
                                    disabled
                                    variant="contained"
                                    size="large"
                                    startIcon={<AddCircleIcon />}
                                >GENERAR NÓMINA
                                </Button>
                            }
                        </div>
                        
                        <TableContainer style={{marginTop: '20px'}}>
                            <Table className={styles.table} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell></StyledTableCell>
                                        <StyledTableCell>ID del Empleado</StyledTableCell>
                                        <StyledTableCell>Nombre del Empleado</StyledTableCell>
                                        <StyledTableCell>Correo Electrónico</StyledTableCell>
                                        <StyledTableCell>Estado</StyledTableCell>
                                        <StyledTableCell>Acciones</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((contract) => (
                                        <StyledTableRow hover key={contract.idEmployee}>
                                            <StyledTableCell>
                                                <Checkbox
                                                    name="status"
                                                    onChange={() => handleChangeCheckbox(contract.idEmployee)}
                                                    color="primary"
                                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                    checked={contract.status}
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell>{contract.idEmployee}</StyledTableCell>
                                            <StyledTableCell>{contract.nameEmployee} </StyledTableCell>
                                            <StyledTableCell>{contract.emailEmployee}</StyledTableCell>
                                            <StyledTableCell>{contract.statusEmployee}</StyledTableCell>
                                            <StyledTableCell>
                                                <Button
                                                    startIcon={<Edit />}
                                                    //style={{marginRight:"18px"}}
                                                    onClick={() => selectContract(contract, 'EDITAR')}
                                                >
                                                </Button>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    : null}
					<br></br>
					<br></br>
                </GridItem>

				<Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
                    {bodyEditar}
				</Modal>
                <Modal open={modalCreate} onClose={abrirCerrarModalCreate}>
					{bodyCreate}
				</Modal>
                <Modal open={modalNomina} onClose={abrirCerrarModalNomina}>
					{bodyNomina}
				</Modal>
			</GridContainer>
        </div>
	);
}
