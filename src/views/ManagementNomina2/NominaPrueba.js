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

import PayrollData from './PayrollData';
import {PayrollProvider, usePayroll} from "../../Context/PayrollContext";

const StyledTableCell = withStyles((theme) => ({
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
		width: '60%',
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
		width: '90%',
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
    }
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

function createData(idContract, baseSalary, idEmployee, nameEmployee, emailEmployee, statusEmployee, 
    workingHours, extraHoursDO, extraHoursNO, extraHoursDDF, extraHoursNDF,
    surchargesNO, surchargesDDF, surchargesNDF, facSalC, facSalB, facSalAE, facSalV, facSalOF,
    facNoSalC, facNoSalB, facNoSalAE, facNoSalV, facNoSalOF) {

	return {idContract, baseSalary, idEmployee, nameEmployee, emailEmployee, statusEmployee, 
        workingHours, extraHoursDO, extraHoursNO, extraHoursDDF, extraHoursNDF,
        surchargesNO, surchargesDDF, surchargesNDF, facSalC, facSalB, facSalAE, facSalV, facSalOF,
        facNoSalC, facNoSalB, facNoSalAE, facNoSalV, facNoSalOF};    
}

export default function CreatePayroll() {
	const styles = useStyles();
	const classes = useStyles();
    const [value, setValue] = React.useState(0);
	const [data, setData] = useState([]);
	const [modalCreate, setModalCreate] = useState(false);
	const [modalEditar, setModalEditar] = useState(false);
    const [modalNomina, setModalNomina] = useState(false);
	const [contractDataSelect, setContractDataSelect] = useState({
        idEmployee: 0, nameEmployee: '', emailEmployee: '', statusEmployee: '', 
        workingHours: 0, extraHoursDO: 0, extraHoursNO: 0, extraHoursDDF: 0, extraHoursNDF: 0,
        surchargesNO: 0, surchargesDDF: 0, surchargesNDF: 0, facSalC: 0, facSalB: 0, facSalAE: 0, 
        facSalOF: 0, facNoSalC: 0, facNoSalB: 0, facNoSalAE: 0, facNoSalOF: 0,
	});

    const [fechaActual, setFechaActual] = useState("");
    const [fechaNominaInicial, setFechaNominaInicial] = useState("");
    const [fechaNominaFinal, setFechaNominaFinal] = useState("");
    const [descNomina, setDescNomina] = useState("");
    
    const [dataNomina, setDataNomina] = useState([]);

    const getCurrentDate = () => {
        let currentDate = new Date();
        setFechaActual(currentDate.toISOString().slice(0,10));
    }
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

	const listContractGET = async () => {
        let urlListContract = baseURL+'/listarContratosPorEstado/124';
		await Axios.get(urlListContract)
			.then((response) => {
                console.log(response.data);
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
		});
	};

    const generarNomina = () => {
        for (const index in data) {
            generarNominaPOT(data[index]);
        }
    }

    const generarNominaPOT = (datosContrato) => {
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
        //console.log(authOptions);
        console.log("Peticion");
        console.log(authOptions);
        Axios(authOptions)
        .then(function (response) {
            console.log("Respuesta");
            console.log(response.data);
            console.log("Data Nomina");
            dataNomina.push(response.data);
            swal({
                title: "Nómina Generada",
                text: "La nómina ha sido generada de manera correcta",
                icon: "success",
                button: "Aceptar",
                timer: '5000',
            });
        })
        .catch(function (error) {
            console.log(error);
        });
        console.log(dataNomina);
        abrirCerrarModalNomina();
	};
	
    const handleAddContractData = (Contracts) => {
		let dataAux = [];
        for (const index in Contracts) {
            const contractAux = createData(
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
		let dataAux = [];
        for (const index in data) {
            if(data[index].idEmployee === contractDataSelect.idEmployee){
                dataAux.push(contractDataSelect);
            }else{
                dataAux.push(data[index]);
            }
        }
        setData(dataAux);
	};

	const handleChangeText = (e) => {
		const { name, value } = e.target;
        setContractDataSelect((prevState) => ({
			...prevState,
			[name]: parseInt(value, 10),
		}));
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

	const selectContract = (contractSelect) => {
        setContractDataSelect(contractSelect);
		abrirCerrarModalEditar();
	};

	const bodyCreate = (
		<div className={styles.modal}>
			<h3 style={{color: '#3F51B5'}}>Generar Nómina</h3>
            <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Descripción de la Nómina"
                        variant="outlined"
                        size="small"
                        onChange={(e) => setDescNomina(e.target.value)}
                    />
                </GridItem>

				<GridItem xs={12} sm={12} md={4}>
					<input 
						className="input-fecha"
						type="date"
						min= {fechaActual}
						onChange={(e) => setFechaNominaInicial(e.target.value)}
					/>
				</GridItem>

                <GridItem xs={12} sm={12} md={4}>
					<input 
						className="input-fecha"
						type="date"
						min= {fechaNominaInicial}
						onChange={(e) => setFechaNominaFinal(e.target.value)}
					/>
				</GridItem> 
            </GridContainer>
            <br /><br />
            <Button 
						variant="contained"
						color="primary"
						size="large"
						//startIcon={<AddCircleIcon />}
						onClick={() => generarNomina()}
					>GENERAR NÓMINA
					</Button>
		</div>
	);

	const bodyEditar = (
        <div className={styles.modalEditar}>
		    <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="HORAS LABORALES" {...a11yProps(0)} />
                <Tab label="FACTORES SALARIALES" {...a11yProps(1)} />
                <Tab label="FACTORES NO SALARIALES" {...a11yProps(2)} />
                </Tabs>
            </AppBar>

            <TabPanel value={value} index={0} className={classes.panel}>
                <h3 style={{color: '#3F51B5'}}>Horas Laboradas de </h3>
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
                <h3 style={{color: '#3F51B5'}}>Factores Salariales de </h3>
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
                <h3 style={{color: '#3F51B5'}}>Factores No Salariales de </h3>
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
                        <b>Auxilio Extra Viáticos</b>
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

            <div align="right">
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
        </div>
	);

    const bodyNomina = (
		<div className={styles.modalNomina}>
			<h3 style={{color: '#3F51B5'}}>Nóminas Generadas</h3>
            <TableContainer className={classes.container} component={Paper} style={{marginTop:"20px"}}>
				<Table className={classes.table} size="small" aria-label="a dense table">
					<TableHead>
						<TableRow>
                            <StyledTableCell className={classes.head} >   </StyledTableCell>
							<StyledTableCell className={classes.head} >NOMBRE DEL EMPLEADO</StyledTableCell>
							<StyledTableCell className={classes.head} >CEDULA</StyledTableCell>
							<StyledTableCell className={classes.head} >CARGO</StyledTableCell>
                            <StyledTableCell className={classes.head} >SUELDO BASICO ASIGNADO</StyledTableCell>
							<StyledTableCell className={classes.head} >HORAS LABORADOS</StyledTableCell>
                            <StyledTableCell className={classes.head} >BASICO DEVENGADO</StyledTableCell>
                            <StyledTableCell className={classes.head} >AUXILIO DE TRANSPORTE</StyledTableCell>
                            <StyledTableCell className={classes.head} >HORAS EXTRAS</StyledTableCell>
                            <StyledTableCell className={classes.head} >RECARGOS</StyledTableCell>
                            <StyledTableCell className={classes.head} >COMISIONES</StyledTableCell>
                            <StyledTableCell className={classes.head} >OTROS INGRESO (SALARIAL)</StyledTableCell>
                            <StyledTableCell className={classes.head} >OTROS INGRESOS (NO SALARIAL)</StyledTableCell>
							<StyledTableCell className={classes.head} >TOTAL DEVENGADO</StyledTableCell>
                            <StyledTableCell className={classes.head} >SALUD EMPLEADO EPS</StyledTableCell>
                            <StyledTableCell className={classes.head} >PENSION EMPLEADO AFP</StyledTableCell>
                            <StyledTableCell className={classes.head} >FONDO SOLIDARIDAD PENSIONAL</StyledTableCell>
                            <StyledTableCell className={classes.head} >TOTAL DEDUCCIONES</StyledTableCell>
                            <StyledTableCell className={classes.head} >NETO PAGADO</StyledTableCell>
                            <StyledTableCell className={classes.head} >FIRMA</StyledTableCell>
						</TableRow>
					</TableHead>
		
        			<TableBody>
						{dataNomina.map((nomina) => (
							<StyledTableRow hover key={nomina.contrato.contratoPk.empleado.numeroDocumento}>
                                <StyledTableCell>
                                    <Checkbox
                                        //indeterminate={numSelected > 0 && numSelected < rowCount}
                                        //checked={rowCount > 0 && numSelected === rowCount}
                                        //onChange={onSelectAllClick}
                                        //inputProps={{ 'aria-label': 'select all desserts' }}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>{nomina.contrato.contratoPk.empleado.nombres}</StyledTableCell>
                                <StyledTableCell>{nomina.contrato.contratoPk.empleado.numeroDocumento}</StyledTableCell>
                                <StyledTableCell>Vendedor</StyledTableCell>
                                <StyledTableCell>{nomina.contrato.salarioBase}</StyledTableCell>
                                <StyledTableCell>{nomina.registroHoras.horasTrabajadas}</StyledTableCell>
                                <StyledTableCell>{nomina.basicoDevengado} </StyledTableCell>
                                <StyledTableCell>{nomina.auxilioTransporte}</StyledTableCell>
                                <StyledTableCell>{nomina.horasExtras} </StyledTableCell>
                                <StyledTableCell>{nomina.recargos}</StyledTableCell>
                                <StyledTableCell>{nomina.comisiones}</StyledTableCell>
                                <StyledTableCell>{nomina.otrosIngresoSalarial} </StyledTableCell>
                                <StyledTableCell>{nomina.otrosIngresoNoSalarial}</StyledTableCell>
                                <StyledTableCell>{nomina.totalDevengado} </StyledTableCell>
                                <StyledTableCell>{nomina.saludEmpleado} </StyledTableCell>
                                <StyledTableCell>{nomina.pensionEmpleado}</StyledTableCell>
                                <StyledTableCell>{nomina.fondoSolidaridadPensional} </StyledTableCell>
                                <StyledTableCell>{nomina.totalDeducciones}</StyledTableCell>
                                <StyledTableCell>{nomina.totalDevengado}</StyledTableCell>
							</StyledTableRow>
						))}
				    	</TableBody>
						</Table>
					</TableContainer>

            <br /><br />
            <Button 
				variant="contained"
				color="primary"
				size="large"
				//startIcon={<AddCircleIcon />}
				onClick={() => abrirCerrarModalNomina()}
			>GUARDAR
			</Button>
		</div>
	);
	
	async function addParameterPOST() {
		/*let response;
		if (!nameParameter.trim()) {
			swal({
				title: 'Campo vacío',
				text: 'No ha sido posible realizar el registro. \nEl nombre del parámetro no puede estar vacío',
				icon: 'error',
				button: 'Aceptar',
				timer: '5000',
			});
			return;
		}

		if (!valueParameter.trim()) {
			swal({
				title: 'Campo vacío',
				textAlign: 'Center',
				text: 'No ha sido posible realizar el registro. \nEl valor del parámetro no puede estar vacío',
				icon: 'error',
				button: 'Aceptar',
				timer: '5000',
			});
			return;
		}
		
		if (!(valueParameter > 0)) {
			swal({
				title: 'Dato Inválido',
				text: 'No ha sido posible realizar el registro. \nEl valor del parámetro no puede ser menor a cero',
				icon: 'error',
				button: 'Aceptar',
				timer: '5000',
			});
			return;
		}

		if(nameParameter.trim() && valueParameter.trim() && valueParameter > 0){
			var authOptions = {
				method: 'POST',
				url: baseURL+'/crear-parametro',
				data: {
					nombre: nameParameter,
					valor: valueParameter,
				},
				json: true,
			};
			await Axios(authOptions)
			.then(function (response) {
				swal({
					title: "Parámetro Agregado",
					text: "El parámetro ha sido registrado de manera correcta",
					icon: "success",
					button: "Aceptar",
					timer: '5000',
				});
				abrirCerrarModalCreate();
				//listParametersGET();
			})
			.catch(function (error) {
				swal({
					title: 'Parámetro no Agregado',
					text: 'No ha sido posible realizar el registro. El parametro ya existe',
					icon: 'error',
					button: 'Aceptar',
					timer: '5000',
				});
			});
		}*/
	};
	
	useEffect(() => {
		listContractGET();
        getCurrentDate();
	}, []);

	return (
		<div className={styles.root}>
			<GridContainer>
                <GridItem xs={12} sm={12} md={12}>
					<Typography variant="h4" component="h2" >
						GENERAR NÓMINA
					</Typography><br></br>

					<p>Descripción si se ve necesaria q</p><br></br>
					<div align="right">
					<Button 
						variant="contained"
						color="primary"
						size="large"
						startIcon={<AddCircleIcon />}
						onClick={() => abrirCerrarModalCreate()}
					>GENERAR NÓMINA
					</Button></div>

					<TableContainer className={classes.container} component={Paper} style={{marginTop:"20px"}}>
						<Table className={classes.table} size="small" aria-label="a dense table">
							<TableHead>
								<TableRow>
									<StyledTableCell className={classes.head} >ID del Empleado</StyledTableCell>
									<StyledTableCell className={classes.head} >Nombre del Empleado</StyledTableCell>
									<StyledTableCell className={classes.head} >Correo Electrónico</StyledTableCell>
                                    <StyledTableCell className={classes.head} >Estado</StyledTableCell>
									<StyledTableCell className={classes.head} >Acciones</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data.map((contract) => (
									<StyledTableRow hover key={contract.idEmployee}>
										<StyledTableCell>{contract.idEmployee}</StyledTableCell>
										<StyledTableCell>{contract.nameEmployee} </StyledTableCell>
										<StyledTableCell>{contract.emailEmployee}</StyledTableCell>
                                        <StyledTableCell>{contract.statusEmployee}</StyledTableCell>
										<StyledTableCell>
											<Button
												startIcon={<Edit />}
												//style={{marginRight:"18px"}}
												onClick={() => selectContract(contract)}
											>
											</Button>
										</StyledTableCell>
									</StyledTableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<br></br>
					<p id="message"></p>
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
