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
    const [modalStart, setModalStart] = useState(true);
    const [modalConfirmate, setModalConfirmate] = useState(false);
    const [dataTarifaARL, setDataTarifaARL] = useState([]);
	const [data, setData] = useState([]);

    const [indice, setIndice] = useState(0);
    const [opciones, setOpciones] = useState([]);
    const [opcionSeleccionada, setOpcionSeleccionada] = useState(0); 
    const [opcStringSeleccionado, setOpcStringSeleccionado] = useState('');
    
    const [show, setShow] = useState(true);
    const [newObligation, setNewObligation] = useState('(OBLIGACIÓN)');
    const [newClause, setNewClause] = useState('(CLAUSULA)');

	
    //Introduction
    const [nameEmployer, setNameEmployer] = useState('(NOMBRE DEL EMPLEADOR)');
    const [addressEmployer, setAddressEmployer] = useState('(DOMICILIO DEL EMPLEADOR)');
    const [nameCompany, setNameCompany] = useState('(NOMBRE DE LA EMPRESA)');
    const [nitCompany, setnitCompany] = useState('(NIT DE LA EMPRESA)');
    const [nameEmployee, setNameEmployee] = useState('(NOMBRE DEL TRABAJADOR)');
    const [addressEmployee, setAddressEmployee] = useState('(DOMICILIO DEL TRABAJADOR)');
    
    //Clauses
    const [positionEmployee, setPositionEmployee] = useState('(CARGO DEL TRABAJADOR)');
    const [obligationsEmployer, setObligationsEmployer] = useState([]);
    const [obligationsEmployee, setObligationsEmployee] = useState([]);
    const [addressCompany, setAddressCompany] = useState('(LUGAR DE TRABAJO)');
    const [scheduleEmployee, setScheduleEmployee] = useState('(JORNADA DE TRABAJO)');
    const [salaryNumEmployee, setSalaryNumEmployee] = useState('(SALARIO EN NÚMEROS)');
    const [salaryStringEmployee, setSalaryStringEmployee] = useState('(SALARIO EN LETRAS)');
    const [paymentPeriodicity, setPaymentPeriodicity] = useState('(PERIODICIDAD DE PAGO)');
    const [wayToPay, setWayToPay] = useState('(FORMA DE PAGO)');
    const [contractDuration, setContractDuration] = useState('(DURACIÓN DEL CONTRATO)');
    const [directionEmployer, setDirectionEmployer] = useState('(DIRECCIÓN DEL EMPLEADOR)');
    const [directionEmployee, setDirectionEmployee] = useState('(DIRECCIÓN DEL TRABAJADOR)');
    const [clauses, setClauses] = useState([]);

    const [wayToPayAux, setWayToPayAux] = useState('');
    const [bankAccountNumber, setBankAccountNumber] = useState('(NÚMERO DE CUENTA BANCARIA)');
    const [nameBank, setNameBank] = useState('(NOMBRE DEL BANCO)');
    const [accountHolder, setAccountHolder] = useState('(TITULAR DE LA CUENTA)');
    const [addressPayment, setAddressPayment] = useState('(DIRECCIÓN DE PAGO)');
    const [otherMeansPayment, setOtherMeansPayment] = useState('(OTRA FORMA DE PAGO)');

    //Firms
    const [idEmployer, setIdEmployer] = useState('(ID DEL EMPLEADOR)');
    const [idEmployee, setIdEmployee] = useState('(ID DEL TRABAJADOR)');

    const [fechaInicioContrato, setFechaInicioContrato] = useState('');
    const [fechaFinContrato, setFechaFinContrato] = useState('');
    const [fechaInicioPrueba, setFechaInicioPrueba] = useState('');
    const [fechaFinPrueba, setFechaFinPrueba] = useState('');
    const [idNivelRiesgo, setIdNivelRiesgo] = useState('');

    const bodyStart = (
		<div className={styles.modal2}>
            <div style={{textAlign:"Center"}}>
                <Typography variant="h5" component="h2"> 
                    <b>CONTRATO LABORAL A TÉRMINO FIJO</b>
                </Typography><br />

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
                <TextField
					required
					fullWidth
					margin="normal"
					variant="outlined"
					size="small"
					type="date"
					onChange={(e) => setFechaInicioContrato(e.target.value)}
			    />
            </GridItem>

            <GridItem xs={12} sm={12} md={6}>
                Fecha Fin
                <TextField
					required
					fullWidth
					margin="normal"
					variant="outlined"
					size="small"
					type="date"
					onChange={(e) => setFechaFinContrato(e.target.value)}
			    />
            </GridItem>
            
            <GridItem xs={12} sm={12} md={12} style={{marginTop: '30px'}}>
                <b>Periodo de prueba</b>
            </GridItem>

            <GridItem xs={12} sm={12} md={6}>
                Fecha Inicio
                <TextField
					required
					fullWidth
					margin="normal"
					variant="outlined"
					size="small"
					type="date"
					onChange={(e) => setFechaInicioPrueba(e.target.value)}
			    />
            </GridItem>

            <GridItem xs={12} sm={12} md={6}>
                Fecha Fin
                <TextField
					required
					fullWidth
					margin="normal"
					variant="outlined"
					size="small"
					type="date"
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
        changeIndex("Siguiente");
	};

    const CancelConfirmateContract = () => {
		abrirCerrarModalConfirmate();
        changeIndex("Volver");
	};

    const defineWayToPay = (i) => {
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
    };

    const changeIndex = (operation) => {
        console.log(opcStringSeleccionado);
        if(indice == 16){
            setPaymentPeriodicity(opcStringSeleccionado);
        }
        if(indice == 17){
            setWayToPayAux(opcStringSeleccionado);
        }

        if(indice == 21 || indice == 22 || indice == 23){
            defineWayToPay(indice);
        }

        if(operation == 'Siguiente'){
            if((indice == 8 || indice == 10 || indice == 27) &&  opcionSeleccionada == 0){
                setIndice(indice+2);
                conditionals(indice+2);
            }else if(indice == 9 || indice == 11 || indice == 28){
                if(indice == 9){addObligationsEmployer();}
                else if(indice ==11){addObligationsEmployee();}
                else{addClauses()}
                setIndice(indice-1);
                conditionals(indice-1);
            }else if(indice == 17 &&  wayToPayAux == "Mediante pago en efectivo"){
                setIndice(indice+5);
                conditionals(indice+5);
            }else if(indice == 17 && wayToPayAux == "Otra forma de pago"){
                setIndice(indice+6);
                conditionals(indice+6);
            }else if(indice == 21){
                setIndice(indice+3);
                conditionals(indice+3);
            }else if(indice == 22){
                setIndice(indice+2);
                conditionals(indice+2);
            }else{
                setIndice(indice+1);
                conditionals(indice+1);
            }
        }else{
            if(indice == 10 || indice == 12 || indice == 29){
                if(opcionSeleccionada == 0){ setIndice(indice-2); conditionals(indice-2);}
                else{ setIndice(indice-1); conditionals(indice-1);}
            }else if(indice == 22){
                setIndice(indice-5);
                conditionals(indice-5);
            }else if(indice == 23){
                setIndice(indice-6);
                conditionals(indice-6);
            }else if(indice == 24 && wayToPayAux == "Mediante pago en efectivo"){
                setIndice(indice-2);
                conditionals(indice-2);
            }else if(indice == 24 && wayToPayAux == "Mediante depósito en cuenta bancaria"){
                setIndice(indice-3);
                conditionals(indice-3);
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
                setShow(true);
                nota = notaEmpleador; 
                mensaje = "Digite el nombre completo de la persona empleadora";
                document.getElementById('datoIngresado').value = nameEmployer;
                break;
            case 2: 
                setShow(true);
                nota = notaEmpleador; 
                mensaje = "Digite el municipio de domicilio de la persona empleadora";
                document.getElementById('datoIngresado').value = addressEmployer;
                break;
            case 3:
                setShow(true);
                nota = notaEmpleador; 
                mensaje = "Digite el nombre de la empresa que representa la persona empleadora";
                document.getElementById('datoIngresado').value = nameCompany;
                break;
            case 4:
                setShow(true);
                nota = notaEmpleador; 
                mensaje = "Digite el NIT de la empresa que representa la persona empleadora. Sin comas, puntos, ni guiones";
                document.getElementById('datoIngresado').value = nitCompany;
                break;
            case 5:
                setShow(true);
                nota = notaTrabajador; 
                mensaje = "Digite el nombre completo de la persona trabajadora";
                document.getElementById('datoIngresado').value = nameEmployee;
                break;
            case 6: 
                setShow(true);
                nota = notaTrabajador; 
                mensaje = "Digite el municipio de domicilio de la persona trabajadora";
                document.getElementById('datoIngresado').value = addressEmployee;
                break;
            
            //Clauses
            case 7: 
                setShow(true);
                nota = notaTrabajador; 
                mensaje = "Digite el cargo a desempeñar por parte del trabajador";
                var txtData = document.querySelector("input");
                txtData.setAttribute("id", "datoIngresado");
                document.getElementById('datoIngresado').value = positionEmployee;
                break;
            case 8: 
                setShow(false);
                nota = notaEmpleador; 
                mensaje = "¿Desea agregar otra obligación a cargo del empleador?";
                setOpciones([{id: 0, nombre: 'No'}, {id: 1, nombre: 'Si'}]);
                break;
            case 9: 
                setShow(true);
                nota = notaEmpleador; 
                mensaje = "Digite la obligación adicional del empleador que desea agregar";
                var txtData = document.querySelector("input");
                txtData.setAttribute("id", "datoIngresado");
                document.getElementById('datoIngresado').value = newObligation;
                break;
            case 10: 
                setShow(false);
                nota = notaTrabajador; 
                mensaje = "¿Desea agregar otra obligación a cargo del trabajador?";
                setOpciones([{id: 0, nombre: 'No'}, {id: 1, nombre: 'Si'}]);
                break;
            case 11: 
                setShow(true);
                nota = notaTrabajador; 
                mensaje = "Digite la obligación adicional del trabajador que desea agregar";
                var txtData = document.querySelector("input");
                txtData.setAttribute("id", "datoIngresado");
                document.getElementById('datoIngresado').value = newObligation;
                break;
            case 12: 
                setShow(true);
                nota = notaTrabajador; 
                mensaje = "Digite la dirección actual donde el trabajador prestará el servicio";
                var txtData = document.querySelector("input");
                txtData.setAttribute("id", "datoIngresado");
                document.getElementById('datoIngresado').value = addressCompany;
                break;
            
            case 13: 
                setShow(true);
                nota = notaHorario; 
                mensaje = "Digite el horario en el cual el trabajador cumplirá las actividades."+ 
                          "<br />Ejemplo: Lunes a viernes en el horario de 8:00am a 5:00pm";
                document.getElementById('datoIngresado').value = scheduleEmployee;
                break;

            case 14: 
                setShow(true);
                nota = notaSalario; 
                mensaje = "Digite el salario que percibirá la parte trabajadora (EN NÚMEROS)";
                document.getElementById('datoIngresado').value = salaryNumEmployee;
                break;

            case 15: 
                setShow(true);
                nota = notaSalario; 
                mensaje = "Digite el salario que percibirá la parte trabajadora (EN LETRAS)";
                var txtData = document.querySelector("input");
                txtData.setAttribute("id", "datoIngresado");
                document.getElementById('datoIngresado').value = salaryStringEmployee;
                break;

            case 16: 
                setShow(false);
                nota = notaSalario; 
                mensaje = "¿Con que periodicidad se pagará el salario al trabajador?";
                setOpciones([{id: 1, nombre: 'Diaria'}, {id: 2, nombre: 'Semanal'},
                             {id: 3, nombre: 'Quincenal'}, {id: 4, nombre: 'Mensual'}]);
                break;

            case 17: 
                setShow(false);
                mensaje = "La forma de pago se realizará de la siguiente manera:";
                setOpciones([{id: 1, nombre: 'Mediante depósito en cuenta bancaria'},
                             {id: 2, nombre: 'Mediante pago en efectivo'},
                             {id: 3, nombre: 'Otra forma de pago'}]);
                break;

            case 18: 
                setShow(false);
                mensaje = "Digite el salario que percibirá la parte trabajadora (en letras)";
                setOpciones([{id: 0, nombre: 'Corriente'}, {id: 1, nombre: 'De ahorro'}]);
                break;

            case 19: 
                setShow(true);
                mensaje = "Digite el número de la cuenta bancaria donde se hará el pago del salario del trabajador";
                var txtData = document.querySelector("input");
                txtData.setAttribute("id", "datoIngresado");
                document.getElementById('datoIngresado').value = bankAccountNumber;
                break;

            case 20: 
                setShow(true);
                mensaje = "Digite el banco al que pertenece la cuenta bancaria";
                document.getElementById('datoIngresado').value = nameBank;
                break;

            case 21: 
                setShow(true);
                mensaje = "Digite el nombre del titular de la cuenta bancaria en la cual se va a realizar el pago del trabajador";
                document.getElementById('datoIngresado').value = accountHolder;
                break;
            
            case 22: 
                setShow(true);
                mensaje = "Digite el nombre del municipio y dirección donde se realizará el pago";
                var txtData = document.querySelector("input");
                txtData.setAttribute("id", "datoIngresado");
                document.getElementById('datoIngresado').value = addressPayment;
                break;

            case 23: 
                setShow(true);
                mensaje = "Digite de manera clara y precisa cuál será la manera de pago. Recuerde que el contenido y la eficacia que sea por usted redactado, son de su exclusiva responsabilidad";
                var txtData = document.querySelector("input");
                txtData.setAttribute("id", "datoIngresado");
                document.getElementById('datoIngresado').value = otherMeansPayment;
                break;

            case 24: 
                setShow(true);
                nota = notaDuración; 
                mensaje = "Digite la duración del contrato (EN DÍAS)";
                document.getElementById('datoIngresado').value = contractDuration;
                break;
            
            case 25: 
                setShow(true);
                nota = notaEmpleador; 
                mensaje = "Digite la dirección del empleador";
                document.getElementById('datoIngresado').value = directionEmployer;
                break;

            case 26: 
                setShow(true);
                nota = notaTrabajador; 
                mensaje = "Digite la dirección del trabajador";
                var txtData = document.querySelector("input");
                txtData.setAttribute("id", "datoIngresado");
                document.getElementById('datoIngresado').value = directionEmployee;
                break;

            case 27: 
                setShow(false);
                nota = notaClausulas; 
                mensaje = "¿Desea agregar una cláusula adicional al presente contrato?";
                setOpciones([{id: 0, nombre: 'No'}, {id: 1, nombre: 'Si'}]);
                break;
            
            case 28: 
                setShow(true);
                nota = notaClausulas; 
                mensaje = "Digite la obligación adicional del trabajador que desea agregar";
                var txtData = document.querySelector("input");
                txtData.setAttribute("id", "datoIngresado");
                document.getElementById('datoIngresado').value = newClause;
                break;
            
            case 29: 
                setShow(true);
                nota = notaEmpleador; 
                mensaje = "Digite el número de identificación del empleador";
                var txtData = document.querySelector("input");
                txtData.setAttribute("id", "datoIngresado");
                document.getElementById('datoIngresado').value = idEmployer;
                break;

            case 30: 
                setShow(true);
                nota = notaEmpleador; 
                mensaje = "Digite el número de identificación del trabajador";
                document.getElementById('datoIngresado').value = idEmployee;
                break;
                
            case 31:
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
            case 5: setNameEmployee(texto); break;
            case 6: setAddressEmployee(texto); break;

            case 7: setPositionEmployee(texto); break;
            case 9: setNewObligation(texto); break;
            case 11: setNewObligation(texto); break;
            case 12: setAddressCompany(texto); break;
            case 13: setScheduleEmployee(texto); break;
            case 14: setSalaryNumEmployee(texto); break;
            case 15: setSalaryStringEmployee(texto); break;
            case 19: setBankAccountNumber(texto); break;
            case 20: setNameBank(texto); break;
            case 21: setAccountHolder(texto); break;
            case 22: setAddressPayment(texto); break;
            case 23: setOtherMeansPayment(texto); break;
            case 24: setContractDuration(texto); break;
            case 25: setDirectionEmployer(texto); break;
            case 26: setDirectionEmployee(texto); break;
            case 28: setNewClause(texto); break;
            
            case 29: setIdEmployer(texto); break;
            case 30: setIdEmployee(texto); break;
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

    useEffect(() => {
        getListTarifaARL();
    },[]);

    async function addContractConfirm() {
        let bandera = false;
        if (!nameEmployer.trim() || !addressEmployer.trim() || !nameCompany.trim() || 
            !nitCompany.trim() || !nameEmployee.trim() || !addressEmployee.trim() || 
            !positionEmployee.trim() || !addressCompany.trim() || !scheduleEmployee.trim() || 
            !salaryNumEmployee.trim() || !salaryStringEmployee.trim()|| !paymentPeriodicity.trim() ||
            !wayToPay.trim()|| !contractDuration.trim() || !directionEmployer.trim() || 
            !directionEmployee.trim()|| !idEmployer.trim() || !idEmployee.trim() ||
            !fechaInicioContrato.trim()|| !fechaFinContrato.trim() || !fechaInicioPrueba.trim() ||
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
                        //numeroDocumento: 123
                    },
                    empresa:{
                        nit: 124
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
                salarioBase:1200000

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
                    });
                    window.location.href = '/';
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

                        {show ? (
                            <input
                                required
                                id="datoIngresado"
                                size="small"
                                style={{width: '60%'}}
                                variant="outlined"
                                onChange={(e) => dataCollection(e.target.value)}
                            />
                        ) : (
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
                        )}    
                        <br /><br />

                        <div>
                            <Button 
                                variant="contained"
                                color="primary"
                                style={{marginRight:"18px", width: '110px'}}
                                onClick={() => changeIndex("Volver")}
                            >Volver
                            </Button>

                            <Button
                                variant="contained"
                                color="primary"
                                style={{width: '110px'}}
                                onClick={() => changeIndex("Siguiente")}
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
                    salaryStringEmployee= {salaryStringEmployee}
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
