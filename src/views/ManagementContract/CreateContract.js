import React from 'react';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {Button, Modal} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

// core components
import GridItem from '../../components/Grid/GridItem';
import GridContainer from '../../components/Grid/GridContainer';

import FixedTermContract from "./FixedTermContract";
import Axios from 'axios';
import swal from 'sweetalert';



const useStyles = makeStyles((theme) => ({
    root2: {
        padding: '20px',
        maxHeight: '510px',
        border: '1px solid #154c79',
        boxShadow: '2px 2px 10px #666',
    },

    root: {
       	marginTop:"100px",
		width: '90%',
        height: '510px',
		margin: 'auto',
		textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
    },

	buttonCancel: {
		color: 'white',
		backgroundColor: "rgb(220,53,69)",
	},

	modal: {
		position: 'absolute',
		width: 600,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	},
    modal2: {
		position: 'absolute',
		width: 800,
        height: 300,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: "Center",
	},
	iconos: {
		cursor: 'pointer',
	},

	inputMaterial: {
		width: '100%',
	},
}));

const baseURL = `http://localhost:8091`;

const notaEmpleador = "Empleador: Quien contrata. "+
                         "Tiene la obligación de remunerar al trabajador por sus servicios. "+
                         "Tiene la facultad de dar órdenes."

const notaTrabajador = "Trabajador: Prestará sus servicios de manera personal, "+
                          "y estará bajo la subordinación y dependencia de la empleadora."

const notaHorario = "Recordar que existe un máximo de horas para trabajar, que no puede exceder de 8 al día. "+
                    "De sobrepasarse dicho número, se deberán  conforme a ley horas extras,  recargos "+
                    "nocturnas y dominicales según sea el caso";

const notaSalario = "Recuerde que bajo ninguna circunstancia, la parte trabajadora podrá devengar un "+
                    "salario inferior al salario mínimo mensual legal vigente, el cual equivale para "+
                    "el año 2021 a los siguientes valores:<br />-Mensual: $908.526 pesos."+
                    "<br />-Quincenal: $454.263 pesos.<br />-Semanal: $227.131,5 pesos.<br />-Diarios: $30.284,2 pesos.";

const notaDuración = "Recuerde que si el contrato se celebró por menos de un año, puede ser prorrogado 3 "+
                     "veces por periodos iguales o inferiores al inicialmente pactado. Sin embargo, cuando "+
                     "el contrato se vaya a prorrogar por cuarta vez, se renovará por mínimo un año y así "+
                     "sucesivamente";

const notaClausulas = "Recuerde que dependiendo de la naturaleza del contrato, así como de las obligaciones "+
                      "que resultan del mismo, según lo acuerden las partes, podrán incluirse además de las "+
                      "mencionadas, cláusulas como: Periodo de prueba, Derechos de autor, Confidencialidad y Exclusividad.";

          

export default function CreateContract() {
	const styles = useStyles();
	const classes = useStyles();

    //Variables Auxiliares
    const [inputField, setInputField] = useState('TEXT');

    const [modalStart, setModalStart] = useState(true);
    const [modalConfirmate, setModalConfirmate] = useState(false);
    const [dataTarifaARL, setDataTarifaARL] = useState([]);
	const [data, setData] = useState([]);

    const [indice, setIndice] = useState(0);
    const [opciones, setOpciones] = useState([]);
    const [opcionSeleccionada, setOpcionSeleccionada] = useState(0); 
    const [opcStringSeleccionado, setOpcStringSeleccionado] = useState('');
    
    const [newObligation, setNewObligation] = useState('');
    const [newClause, setNewClause] = useState('');

	
    //Introduction
    const [nameEmployer, setNameEmployer] = useState('');
    const [addressEmployer, setAddressEmployer] = useState('');
    const [nameCompany, setNameCompany] = useState('');
    const [nitCompany, setnitCompany] = useState('');
    const [nameEmployee, setNameEmployee] = useState('');
    const [addressEmployee, setAddressEmployee] = useState('');
    
    //Clauses
    const [positionEmployee, setPositionEmployee] = useState('');
    const [obligationsEmployer, setObligationsEmployer] = useState([]);
    const [obligationsEmployee, setObligationsEmployee] = useState([]);
    const [addressCompany, setAddressCompany] = useState('');
    const [scheduleEmployee, setScheduleEmployee] = useState('');
    const [salaryNumEmployee, setSalaryNumEmployee] = useState('');
    const [paymentPeriodicity, setPaymentPeriodicity] = useState('');
    const [wayToPay, setWayToPay] = useState('');
    const [contractDuration, setContractDuration] = useState('');
    const [directionEmployer, setDirectionEmployer] = useState('');
    const [directionEmployee, setDirectionEmployee] = useState('');
    const [clauses, setClauses] = useState([]);

    //Firms
    const [idEmployer, setIdEmployer] = useState('');
    const [idEmployee, setIdEmployee] = useState('');

    const [fechaActual, setFechaActual] = useState("");
    const [fechaInicioContrato, setFechaInicioContrato] = useState('');
    const [fechaFinContrato, setFechaFinContrato] = useState('');
    const [fechaInicioPrueba, setFechaInicioPrueba] = useState('');
    const [fechaFinPrueba, setFechaFinPrueba] = useState('');
    const [idNivelRiesgo, setIdNivelRiesgo] = useState('');

    

    const bodyStart = (
		<div className={styles.modal2}>
            <div style={{textAlign:"Center"}}>
                <Typography variant="h5" component="h2" gutterBottom style={{marginBottom: '1em', color:"#154c79"}}>
					<b>CREAR CONTRATO LABORARL A TÉRMINO FIJO</b>
				</Typography>

                <Typography variant="body2" component="p">
                    A continuación ingrese la información correspondiente a todos y cada uno de los 
                    elementos requeridos y necesarios para la creación del contrato.
                </Typography><br />

                <Button 
                    variant="contained"
                    color="primary"
                    style={{marginRight:"18px", width: '110px'}}
                    onClick={() => startContract()}
                >Comenzar
                </Button>
            </div>
		</div>
	);

    const bodyConfirmate = (
		<div className={styles.modal}>
            <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <h3>Crear Contrato</h3	>
                <p>Para finalizar con el contrato, establezca los ultimos datos:</p>
            </GridItem>
            
            <GridItem xs={12} sm={12} md={12} style={{marginTop: '30px'}}>
                <b>Periodo de vigencia del contrato</b>
            </GridItem>

            <GridItem xs={12} sm={12} md={6}>
                Fecha Inicio
                <input 
					className="input-fecha"
					type="date"
					min= {fechaActual}
					onChange={(e) => setFechaInicioContrato(e.target.value)}
				/>
            </GridItem>

            <GridItem xs={12} sm={12} md={6}>
                Fecha Fin
                <input 
					className="input-fecha"
					type="date"
					min= {fechaInicioContrato}
					onChange={(e) => setFechaFinContrato(e.target.value)}
				/>
            </GridItem>
            
            <GridItem xs={12} sm={12} md={12} style={{marginTop: '30px'}}>
                <b>Periodo de prueba</b>
            </GridItem>

            <GridItem xs={12} sm={12} md={6}>
                Fecha Inicio
                <input 
					className="input-fecha"
					type="date"
					min= {fechaInicioContrato}
					onChange={(e) => setFechaInicioPrueba(e.target.value)}
				/>
            </GridItem>

            <GridItem xs={12} sm={12} md={6}>
                Fecha Fin
                <input 
					className="input-fecha"
					type="date"
					min= {fechaInicioPrueba}
					onChange={(e) => setFechaFinPrueba(e.target.value)}
				/>
            </GridItem>

            <GridItem xs={12} sm={12} md={12} style={{marginTop: '30px'}}>
                <b>Nivel de Riesgo</b>
            </GridItem>

            <GridItem xs={12} sm={12} md={6}>
                <FormControl fullWidth required variant="outlined" size="small" margin="normal">
                    <Select
						value={idNivelRiesgo}
                        onChange={(e) => setIdNivelRiesgo(e.target.value)}
                    >
					{dataTarifaARL.map((tarifa) => (
                        <MenuItem value={tarifa.arlId}>{tarifa.nivel}</MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </GridItem>
            </GridContainer>
			<br /><br />
			<div align="right">
				<Button 
					variant="contained"
					color="primary"
					style={{marginRight:"18px"}}
					onClick={() => addContractConfirm()}
				>Crear Contrato
				</Button>

				<Button
					className={styles.buttonCancel} 
					variant="contained"
					color="secondary"
					onClick={() => CancelConfirmateContract()}
				>Cancelar
				</Button>
			</div>
		</div>
	);

    const addObligationsEmployer = () => {
        setObligationsEmployer([...obligationsEmployer, newObligation]);
    };

    const addObligationsEmployee = () => {
        setObligationsEmployee([...obligationsEmployee, newObligation]);
    };

    const addClauses = () => {
        setClauses([...clauses, newClause]);
    };

    const abrirCerrarModalConfirmate = () => {
		setModalConfirmate(!modalConfirmate);
	};

    const abrirCerrarModalStart = () => {
		setModalStart(!modalStart);
	};
    
    const startContract = () => {
		abrirCerrarModalStart();
        changeIndex("SIGUIENTE");
	};

    const CancelConfirmateContract = () => {
		abrirCerrarModalConfirmate();
        changeIndex("VOLVER");
	};

    /*const defineWayToPay = (i) => {
        let aux = '';
        switch (i) {
            case 21:
                aux = 'Mediante transferencia a la cuenta '+opcStringSeleccionado+', número '+
                    bankAccountNumber+" de "+nameBank+" a nombre de "+accountHolder;
                break;
            case 22: 
                aux = 'Mediante pagos en efectivo, y de manera directa al TRABAJADOR en '+addressPayment;
                break;
            case 23: 
                aux = otherMeansPayment;
                break;
            default:
                console.log('Lo lamentamos. Ha ocurrido un error en el sistema');
        }
        setWayToPay(aux);
    };*/

    const getCurrentDate = () => {
        let currentDate = new Date();
        setFechaActual(currentDate.toISOString().slice(0,10));
    }

    const verificationInput = (indice) => {
        switch (indice) {
            case 0: return false;
            case 1: console.log(!nameEmployer.trim()); return !nameEmployer.trim(); break;
            case 2: return !addressEmployer.trim(); break;
            case 3: return !nameCompany.trim(); break;
            case 4: if(!(!nitCompany.trim())){
                        if(isNumberValide(nitCompany, "NUMDOC")){return false;}
                    }return true; break;
            
            case 5: return !positionEmployee.trim(); break;
            case 7: return !newObligation.trim(); break;
            case 9: return !newObligation.trim(); break;
            case 10: return !addressCompany.trim(); break;
            case 11: return !scheduleEmployee.trim(); break;
            case 13: if(!(!salaryNumEmployee.trim())){
                        if(isNumberValide(salaryNumEmployee, "SALARIO")){return false;}
                    }return true; break;

            case 14: if(!(!contractDuration.trim())){
                        if(isNumberValide(contractDuration, "DURACION")){return false;}
                    }return true; break;
            case 15: return !directionEmployer.trim(); break;
            case 16: return !directionEmployee.trim(); break;
            case 18: return !newClause.trim(); break;

            case 19: if(!(!idEmployer.trim())){
                        if(isNumberValide(idEmployer, "NUMDOC")){return false;}
                    }return true; break;
        }
    }

    const isNumberValide = (number, tipo) => {
        if (parseInt(number, 10)){
            if (tipo === "NUMDOC"){
                return parseInt(number, 10) > 9999999 && parseInt(number, 10) < 9999999999;
            }
            if (tipo === "SALARIO"){
                if(paymentPeriodicity === 'Diaria'){
                    return parseFloat(number) >= 30284.2;
                }else if(paymentPeriodicity === 'Semanal'){
                    return parseFloat(number) >= 227131.5;
                }else if(paymentPeriodicity === 'Quincenal'){
                    return parseFloat(number) >= 454263;
                }else if(paymentPeriodicity === 'Mensual'){
                    return parseFloat(number) >= 908526;
                }
                
            }if (tipo === "DURACION"){
                return parseInt(number, 10) > 0;
            }
            return false;
        }else{
            /*swal({
                title: 'Dato Inválido',
                text: 'No ha sido posible continuar con el contrato. \nEl dato ingresado debe ser númerico.',
                icon: 'error',
                button: 'Aceptar',
                timer: '5000',
            });*/
            return false;
        }
    }

    const changeIndex = (operation) => {
        
        if(indice == 12){
            setPaymentPeriodicity(opcStringSeleccionado);
        }

        if(operation == 'SIGUIENTE'){
            if(!verificationInput(indice)){
                if((indice == 6 || indice == 8 || indice == 17) &&  opcionSeleccionada == 0){
                    setIndice(indice+2);
                    conditionals(indice+2);
                }else if(indice == 7 || indice == 9 || indice == 18){
                    if(indice == 7){addObligationsEmployer();}
                    else if(indice == 9){addObligationsEmployee();}
                    else{addClauses(); setNewClause('');}
                    setNewObligation('');
                    setIndice(indice-1);
                    conditionals(indice-1);
                }else{
                    setIndice(indice+1);
                    conditionals(indice+1);
                }
            }else{
                swal({
                    title: 'Error al Crear el Contrato',
                    text: 'No ha sido posible continuar con el contrato. \nEs necesario que ingrese de manera correcta el dato solicitado',
                    icon: 'error',
                    button: 'Aceptar',
                    timer: '5000',
                });
                return;
            }
        }else{
            if(indice == 8 || indice == 10 || indice == 19){
                if(opcionSeleccionada == 0){ setIndice(indice-2); conditionals(indice-2);}
                else{ setIndice(indice-1); conditionals(indice-1);}
            }else{
                setIndice(indice-1);
                conditionals(indice-1);
            }
        };
	};

    const conditionals = (indice) => {
        let nota = "";
        let mensaje = "";
        
        switch (indice) {
            case 0:
                abrirCerrarModalStart();
                break;
            //Introduction
            case 1:
                setInputField('TEXT');
                nota = notaEmpleador; 
                mensaje = "Digite el nombre completo de la persona empleadora";
                document.getElementById('datoIngresado').value = nameEmployer;
                break;
            case 2:
                nota = notaEmpleador; 
                mensaje = "Digite el municipio de domicilio de la persona empleadora";
                document.getElementById('datoIngresado').value = addressEmployer;
                break;
            case 3:
                nota = notaEmpleador; 
                mensaje = "Digite el nombre de la empresa que representa la persona empleadora";
                document.getElementById('datoIngresado').value = nameCompany;
                break;
            case 4:
                nota = notaEmpleador; 
                mensaje = "Digite el NIT de la empresa que representa la persona empleadora. Sin comas, puntos, ni guiones";
                document.getElementById('datoIngresado').value = nitCompany;
                break;

            //Clauses
            case 5: 
                setInputField('TEXT');
                nota = notaTrabajador; 
                mensaje = "Digite el cargo a desempeñar por parte del trabajador";
                var txtData = document.querySelector("input");
                txtData.setAttribute("id", "datoIngresado");
                document.getElementById('datoIngresado').value = positionEmployee;
                break; 
            case 6: 
                setInputField('SELECT');
                nota = notaEmpleador; 
                mensaje = "¿Desea agregar otra obligación a cargo del empleador?";
                setOpciones([{id: 0, nombre: 'No'}, {id: 1, nombre: 'Si'}]);
                break;
            case 7: 
                setInputField('TEXT');
                nota = notaEmpleador; 
                mensaje = "Digite la obligación adicional del empleador que desea agregar";
                var txtData = document.querySelector("input");
                txtData.setAttribute("id", "datoIngresado");
                document.getElementById('datoIngresado').value = newObligation;
                break;
            case 8: 
                setInputField('SELECT');
                nota = notaTrabajador; 
                mensaje = "¿Desea agregar otra obligación a cargo del trabajador?";
                setOpciones([{id: 0, nombre: 'No'}, {id: 1, nombre: 'Si'}]);
                break;
            case 9: 
                setInputField('TEXT');
                nota = notaTrabajador; 
                mensaje = "Digite la obligación adicional del trabajador que desea agregar";
                var txtData = document.querySelector("input");
                txtData.setAttribute("id", "datoIngresado");
                document.getElementById('datoIngresado').value = newObligation;
                break;
            case 10: 
                setInputField('TEXT');
                nota = notaTrabajador; 
                mensaje = "Digite la dirección actual donde el trabajador prestará el servicio";
                var txtData = document.querySelector("input");
                txtData.setAttribute("id", "datoIngresado");
                document.getElementById('datoIngresado').value = addressCompany;
                break;
            
            case 11:
                setInputField('TEXT'); 
                nota = notaHorario; 
                mensaje = "Digite el horario en el cual el trabajador cumplirá las actividades."+ 
                          "<br />Ejemplo: Lunes a viernes en el horario de 8:00am a 5:00pm";
                var txtData = document.querySelector("input");
                txtData.setAttribute("id", "datoIngresado");
                document.getElementById('datoIngresado').value = scheduleEmployee;
                break;

            case 12: 
                setInputField('SELECT');
                nota = notaSalario; 
                mensaje = "¿Con que periodicidad se pagará el salario al trabajador?";
                setOpciones([{id: 1, nombre: 'Diaria'}, {id: 2, nombre: 'Semanal'},
                             {id: 3, nombre: 'Quincenal'}, {id: 4, nombre: 'Mensual'}]);
                break;

            case 13: 
                setInputField('TEXT');
                nota = notaSalario; 
                mensaje = "Digite el salario que percibirá la parte trabajadora (EN NÚMEROS)";
                var txtData = document.querySelector("input");
                txtData.setAttribute("id", "datoIngresado");
                document.getElementById('datoIngresado').value = salaryNumEmployee;
                break;

            case 14: 
                nota = notaDuración; 
                mensaje = "Digite la duración del contrato (EN DÍAS)";
                document.getElementById('datoIngresado').value = contractDuration;
                break;
            
            case 15:
                nota = notaEmpleador; 
                mensaje = "Digite la dirección del empleador";
                document.getElementById('datoIngresado').value = directionEmployer;
                break;
            
            case 16:
                setInputField('TEXT'); 
                nota = notaEmpleador; 
                mensaje = "Digite la dirección del empleado";
                var txtData = document.querySelector("input");
                txtData.setAttribute("id", "datoIngresado");
                document.getElementById('datoIngresado').value = directionEmployee;
                break;

            case 17: 
                setInputField('SELECT');
                nota = notaClausulas; 
                mensaje = "¿Desea agregar una cláusula adicional al presente contrato?";
                setOpciones([{id: 0, nombre: 'No'}, {id: 1, nombre: 'Si'}]);
                break;
            
            case 18: 
                setInputField('TEXT');
                nota = notaClausulas; 
                mensaje = "Digite la obligación adicional del trabajador que desea agregar";
                var txtData = document.querySelector("input");
                txtData.setAttribute("id", "datoIngresado");
                document.getElementById('datoIngresado').value = newClause;
                break;
            
            case 19: 
                setInputField('TEXT');
                nota = notaEmpleador; 
                mensaje = "Digite el número de identificación del empleador";
                var txtData = document.querySelector("input");
                txtData.setAttribute("id", "datoIngresado");
                document.getElementById('datoIngresado').value = idEmployer;
                break;
                
            case 20:
                abrirCerrarModalConfirmate();
                break;

            default:
              console.log('Lo lamentamos');
        }
        document.getElementById('message').innerHTML = mensaje;
        document.getElementById('note').innerHTML = nota;
    }

    const dataCollection = (texto) => {
        switch (indice) {
            case 1: setNameEmployer(texto); break;
            case 2: setAddressEmployer(texto); break;
            case 3: setNameCompany(texto); break;
            case 4: setnitCompany(texto); break;

            case 5: setPositionEmployee(texto); break;
            case 7: setNewObligation(texto); break;
            case 9: setNewObligation(texto); break;
            case 10: setAddressCompany(texto); break;
            case 11: setScheduleEmployee(texto); break;
            case 13: setSalaryNumEmployee(texto); break;
            
            case 14: setContractDuration(texto); break;
            case 15: setDirectionEmployer(texto); break;
            case 16: setDirectionEmployee(texto); break;
            case 18: setNewClause(texto); break;
            
            case 19: setIdEmployer(texto); break;
            default:
              console.log('Lo lamentamos');
        }
    }
           

    const getListTarifaARL = () => {
        let urlGetListTarifaARL = baseURL+'/listarTarifasArl';
        Axios.get(urlGetListTarifaARL)
          .then((response) => {
              setDataTarifaARL(response.data)
          })
          .catch((error) => {
              console.log(error);
      });
    };

    const getInfoByID = () => {
        let baseURLHV = 'http://localhost:8091/buscarEmpleadoPorNumeroDocumento/';
        let urlGetInfoByID = baseURLHV+localStorage.getItem('idNewEmployee');
        //let urlGetInfoByID = baseURLHV+'123';
        Axios.get(urlGetInfoByID)
            .then((response) => {
                console.log(response.data);
                setData(response.data);
                setNameEmployee(response.data.nombres+" "+response.data.apellidos);
                setAddressEmployee(response.data.municipio.nombre);
                setIdEmployee(""+response.data.numeroDocumento);
                for (const index in response.data.listaBancos){
                    if(response.data.listaBancos[index].estado === 'ACTIVO'){
                        setWayToPay('Mediante transferencia a la cuenta (de)'+
                        response.data.listaBancos[index].tipoCuenta+', número '+
                        response.data.listaBancos[index].empleado_banco_pk.numeroCuenta+' del '+
                        response.data.listaBancos[index].empleado_banco_pk.banco.nombre+' a nombre de '+
                        response.data.nombres+" "+response.data.apellidos);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
        });
    };

    useEffect(() => {
        getInfoByID();
        getListTarifaARL();
        getCurrentDate();
    },[]);

    async function addContractConfirm() {
        let bandera = false;
        if (!fechaInicioContrato.trim()|| !fechaFinContrato.trim() || !fechaInicioPrueba.trim() ||
            !fechaFinPrueba.trim()|| idNivelRiesgo.length == 0) {
            bandera = true;
            swal({
                title: 'Campo vacío',
                text: 'No ha sido posible crear el contrato. \nEs necesario que complete todos los campos',
                icon: 'error',
                button: 'Aceptar',
                timer: '5000',
            });
            return;
        }
    
        if(!bandera){
            addContractPOST();
        }
    };

    function addContractPOST() {
        var authOptions = {
            method: 'POST',
            url: baseURL+'/crearContrato',
            data: {
                contratoPk:
                {
                    empleado:{
                        numeroDocumento: parseInt(localStorage.getItem('idNewEmployee'))
                    },
                    empresa:{
                        nit: 123
                    },
                    fechaInicioContrato: fechaInicioContrato
                },
                tarifaArl:{
                    arlId: idNivelRiesgo
                },
                fechaFinContrato: fechaFinContrato,
                fechaIncioPrueba: fechaInicioPrueba,
                fechaFinPrueba: fechaFinPrueba,
                tipo: "Termino fijo",
                salarioBase: parseInt(salaryNumEmployee),
                estado: 'ACTIVO'
            },
            json: true,
        };
        console.log(authOptions);
        Axios(authOptions)
            .then(function (response) {
                if(response.status == 201){
                    swal({
                        title: "Contrato Creado",
                        text: "El contrato ha sido creado de manera correcta",
                        icon: "success",
                        button: "Aceptar",
                        timer: '5000',
                    }).then((value) => {
                        window.location.href = '/listar_empleados';
                    });
                }
                if(response.status == 208){
                    swal({
                        title: 'Contrato no Creado',
                        text: 'No ha sido posible crear e contrato. \nEl empleado ya cuenta con un contrato activo',
                        icon: 'error',
                        button: 'Aceptar',
                        timer: '5000',
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
      };

	return (
		<div className={styles.root}>
            <GridItem xs={12} sm={12} md={6}>
                <Card className={styles.root2} style={{padding: '20px'}}>
                    <CardContent>
                        <Typography variant="h5" component="h2"> 
                            <b>CONTRATO LABORAL A TÉRMINO FIJO</b>
                        </Typography><br />

                        <Typography id="message" variant="body2" component="p"> </Typography><br />

                        {inputField==='TEXT' ? (
                            <input 
                                required
                                id="datoIngresado"
                                className="input-text"
                                onChange={(e) => dataCollection(e.target.value)}
                            />
                        ) : inputField==='SELECT' ?(
                            <FormControl required id="opcionSeleccionada" style={{width: '60%', textAlign: 'left'}} variant="outlined" size="small">
                                <Select
                                    value={opcionSeleccionada}
                                    onChange={(e) => setOpcionSeleccionada(e.target.value)}
                                >
                                    {opciones.map((opcion) => (
                                        <MenuItem 
                                            onClick={() => setOpcStringSeleccionado(opcion.nombre)} 
                                            value={opcion.id}>{opcion.nombre} </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        ) : inputField==='DATE' ?(
                                <input 
                                className="input-fecha"
                                type="date"
                                //max= {fechaMinNacimiento}
                                //onChange={(e) => setFechaNacimiento(e.target.value)}
                                />
                        ) : null}    
                        <br /><br />

                        <div>
                            <Button 
                                variant="contained"
                                color="primary"
                                style={{marginRight:"18px", width: '110px'}}
                                onClick={() => changeIndex("VOLVER")}
                            >Volver
                            </Button>

                            <Button
                                variant="contained"
                                color="primary"
                                style={{width: '110px'}}
                                onClick={() => changeIndex("SIGUIENTE")}
                            >Siguiente
                            </Button>
                        </div><br />

                        <Typography id="note" variant="body2" component="p" color="textSecondary"> </Typography>
                    </CardContent>
                </Card>
            </GridItem>
                
            <GridItem xs={12} sm={12} md={6}>
                <FixedTermContract 
                    nameEmployer= {nameEmployer}
                    addressEmployer= {addressEmployer}
                    nameCompany= {nameCompany}
                    nitCompany= {nitCompany}
                    nameEmployee= {nameEmployee}
                    addressEmployee= {addressEmployee}

                    positionEmployee= {positionEmployee}
                    obligationsEmployer= {obligationsEmployer}
                    obligationsEmployee= {obligationsEmployee}
                    addressCompany= {addressCompany}
                    scheduleEmployee= {scheduleEmployee}
                    salaryNumEmployee= {salaryNumEmployee}
                    paymentPeriodicity= {paymentPeriodicity}
                    wayToPay= {wayToPay}
                    contractDuration= {contractDuration}
                    directionEmployer= {directionEmployer}
                    directionEmployee= {directionEmployee}
                    clauses= {clauses}

                    idEmployer= {idEmployer}
                    idEmployee= {idEmployee}
                />
            </GridItem>
            <Modal open={modalConfirmate} onClose={abrirCerrarModalConfirmate}>
				{bodyConfirmate}
			</Modal>
            <Modal open={modalStart} onClose={abrirCerrarModalStart}>
				{bodyStart}
			</Modal>
        </div>
	);
}
