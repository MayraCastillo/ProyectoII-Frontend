import React from 'react';
import { useEffect, useState } from 'react';
import GridItem from '../../components/Grid/GridItem';
import GridContainer from '../../components/Grid/GridContainer';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
	TableContainer, Table, TableHead, TableBody, TableRow, TableCell,
	Modal, Button, TextField,
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';

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
    head: {
        backgroundColor: "#3949ab",
        color: theme.palette.common.white,
    },
    buttonCancel: {
		color: 'white',
		backgroundColor: "rgb(220,53,69)",
	},
}));

export default function PreviewPayroll(props) {
    const classes = useStyles();
	return (
		<div>
			<h3 style={{color: '#3F51B5'}}>Nóminas Generadas</h3>
            {props.dataNomina.length ?
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
						</TableRow>
					</TableHead>
		
        			<TableBody>
						{props.dataNomina.map((nomina) => (
							<StyledTableRow hover key={nomina.contrato.contratoPk.empleado.numeroDocumento}>
                                <StyledTableCell>
                                    <Checkbox
                                        name="status"
                                        //onChange={() => handleChangeCheckbox2(nomina.contrato.contratoId)}
                                        color="primary"
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
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
            : null}
            <br /><br />
            <div align="right">
                    <div>
                    <Button 
                        variant="contained"
                        color="primary"
                        //startIcon={<AddCircleIcon />}
                        style={{marginRight:"18px"}}
                        //onClick={() => selectContract(nominaRecalcular, 'RECALCULAR')}
                    >Recalcular Nómina
                    </Button>

                    <Button
                        className={classes.buttonCancel} 
                        variant="contained"
                        color="secondary"
                        //startIcon={<CancelIcon />}
                        //onClick={() => abrirCerrarModalNomina()}
                    >Guardar
                    </Button>
                </div> 
            </div>
        </div>
	);
}
