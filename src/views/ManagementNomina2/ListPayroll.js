import React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {Modal, Button} from '@material-ui/core';

import GridItem from '../../components/Grid/GridItem';
import GridContainer from '../../components/Grid/GridContainer';
import Axios from 'axios';
import swal from 'sweetalert';

import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';

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

const useRowStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },

  rootContainer: {
    marginTop:"100px",
    width: '90%',
    margin: 'auto',
    textAlign: 'center',
  },

  head: {
    backgroundColor: "#3949ab",
    color: theme.palette.common.white,
  },
}));

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      { date: '2020-01-05', customerId: '11091700', amount: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
    ],
  };
}

function createData2(payrollId, payrollDesc, DateStart, DateFinish, status, PayrollDet) {
  return {
    payrollId,
    payrollDesc,
    DateStart,
    DateFinish,
    status,
    PayrollDet,
  };
}

const baseURL = `http://localhost:8093/parametros`;

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [idContrato, setIdContrato] = useState("");
  const [idDetNomina, setIdDetNomina] = useState("");
  const [modalPagar, setModalPagar] = useState(false);

  /*const abrirCerrarModalPagar = (idContrato, idDetNomina) => {
    setIdContrato(idContrato);
    setIdDetNomina(idDetNomina);
		setModalPagar(!modalPagar);
	};

  const bodyPagar = (
		<div className={classes.modalCreate}>
            <div style={{width: '90%', margin: 'auto'}}>
                <h3 style={{color: '#3F51B5'}}>Pagar Nómina</h3>
                <p>¿esta seguro que desea pagar la nomina seleccionada?</p>

                <br /><br />
                <Button 
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => pagarNominaPOST()}
                >PAGAR NÓMINA
                </Button>
            </div>
		</div>
	);

  const pagarNominaPOST = () => {
    var authOptions = {
        method: 'POST',
        url: 'http://localhost:8093/parametros/pagarDetalleNominaEmpleado/',
        //data: nomina,
        json: true,
    };
    console.log(authOptions);
    Axios(authOptions)
    .then(function (response) {
        swal({
            title: "Nóminas Guardadas",
            text: "Las nómina seleccionadas han sido guardadas de manera correcta",
            icon: "success",
            button: "Aceptar",
        }).then((value) => {
            //abrirCerrarModalNomina();
        });
    })
    .catch(function (error) {
        console.log(error);
    });
  };*/

  
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{row.payrollId}</TableCell>
        <TableCell>{row.payrollDesc}</TableCell>
        <TableCell>{row.DateStart}</TableCell>
        <TableCell>{row.DateFinish}</TableCell>
        <TableCell>{row.status}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <div style={{maxWidth: "1080px", overflowX: 'scroll',}}>
              
              <Table size="small" aria-label="purchases">
                <TableHead>
					      	<TableRow>
                    <StyledTableCell className={classes.head} ></StyledTableCell>
                    <StyledTableCell className={classes.head} >ESTADO</StyledTableCell>
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
						      </TableRow>
				      	</TableHead>
                
                <TableBody>
						    {row.PayrollDet.map((detalleNomina) => (
							    <StyledTableRow hover key={detalleNomina.contrato.contratoPk.empleado.numeroDocumento}>
                    <StyledTableCell>
                      {detalleNomina.estado==='POR PAGAR' ? (
                        <AttachMoneyIcon 
                          //onClick = {abrirCerrarModalPagar()}/
                          />
                      ) : (
                        <MoneyOffIcon disable/>
                      )}  
                    </StyledTableCell>
                    <StyledTableCell>{detalleNomina.estado}</StyledTableCell>
                    <StyledTableCell>{detalleNomina.contrato.contratoPk.empleado.nombres}</StyledTableCell>
                    <StyledTableCell>{detalleNomina.contrato.contratoPk.empleado.numeroDocumento}</StyledTableCell>
                    <StyledTableCell>Vendedor</StyledTableCell>
                    <StyledTableCell>{detalleNomina.contrato.salarioBase}</StyledTableCell>
                    <StyledTableCell>{detalleNomina.registroHoras.horasTrabajadas}</StyledTableCell>
                    <StyledTableCell>{detalleNomina.basicoDevengado} </StyledTableCell>
                    <StyledTableCell>{detalleNomina.auxilioTransporte}</StyledTableCell>
                    <StyledTableCell>{detalleNomina.horasExtras} </StyledTableCell>
                    <StyledTableCell>{detalleNomina.recargos}</StyledTableCell>
                    <StyledTableCell>{detalleNomina.comisiones}</StyledTableCell>
                    <StyledTableCell>{detalleNomina.otrosIngresoSalarial} </StyledTableCell>
                    <StyledTableCell>{detalleNomina.otrosIngresoNoSalarial}</StyledTableCell>
                    <StyledTableCell>{detalleNomina.totalDevengado} </StyledTableCell>
                    <StyledTableCell>{detalleNomina.saludEmpleado} </StyledTableCell>
                    <StyledTableCell>{detalleNomina.pensionEmpleado}</StyledTableCell>
                    <StyledTableCell>{detalleNomina.fondoSolidaridadPensional} </StyledTableCell>
                    <StyledTableCell>{detalleNomina.totalDeducciones}</StyledTableCell>
                    <StyledTableCell>{detalleNomina.totalDevengado}</StyledTableCell>
							    </StyledTableRow>
						    ))}
				        </TableBody>
              </Table>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

export default function CollapsibleTable() {
  const classes = useRowStyles();
  const [data, setData] = useState([]);
  

  const listContractGET = async () => {
    let urlListContract = baseURL+'/listarNominas';
    await Axios.get(urlListContract)
        .then((response) => {
            console.log(response.data);
            //setData(response.data);
            let dataAux = [];
            for (const index in response.data) {
              const payrollAux = createData2(
                response.data[index].nominaId,
                response.data[index].detalle,
                response.data[index].fechaInicio,
                response.data[index].fechaFin,
                response.data[index].estado,
                response.data[index].listaDetalleNomina);
              dataAux.push(payrollAux);
            }
            setData(dataAux);
            console.log(data);

            if(response.data.length == 0){
                swal({
                    title: 'No hay registros disponibles',
                    text: 'No existen contratos registrados en el sistema',
                    icon: 'error',
                    button: 'Aceptar',
                    timer: '5000',
                });
            }
        })
        .catch((error) => {
            console.log(error);
    });
  };

  useEffect(() => {
    listContractGET();
  }, []);

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
    createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
    createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
  ];

  return (
    <div className={classes.rootContainer}>
			<GridContainer>
				<GridItem xs={12} sm={12} md={12}> HOLA MUNDO </GridItem>
        
        <GridItem xs={12} sm={12} md={12}>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Número de Nómina</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Fecha Inicio</TableCell>
                  <TableCell>Fecha Final</TableCell>
                  <TableCell>Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {console.log(rows)}
                {data.map((row) => (
                  <Row key={row.payrollId} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </GridItem>
      </GridContainer>
      
    </div>
  );
}
