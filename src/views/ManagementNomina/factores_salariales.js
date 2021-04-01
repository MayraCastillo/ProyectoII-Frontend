import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor:'#3949ab',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    marginTop:'20px',
    '&:nth-of-type(odd)': {
        backgroundColor:"#EDE7F6"
    },
  },
}))(TableRow);

function createData(contratoid, empleado, comisiones, bonificaciones, auxilios,viaticos,otros,tipo) {
  return { contratoid,empleado,comisiones,bonificaciones,auxilios,viaticos,otros,tipo };
}

const rows = [
  createData(1, 'Jane Doe', 6000,2400,3000,1200,3400,'SALARIAL'),
  createData(2,'Mark Twain', 9400, 3700, 4390,1200,7890,'SALARIAL'),
  createData(3, 'Alan Parker', 1600, 2400, 6000,2340,5678,'NO SALARIAL'),
  createData(4,'Dallas Jones', 3980, 6700, 4334,4989,3245,'NO SALARIAL'),
  createData(5,'Dorian Gray', 16780, 4900, 3950,6780,7990,'SALARIAL'),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    backgroundColor:"#EDE7F6"
  },
});

export default function Factores() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h4" color="primary" align="center" gutterBottom>
        Factores Salariales y No Salariales
      </Typography>
      <br/>

    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">ID Contrato</StyledTableCell>
            <StyledTableCell align="center">Empleado</StyledTableCell>
            <StyledTableCell align="center">Comisiones</StyledTableCell>
            <StyledTableCell align="center">Bonificaciones</StyledTableCell>
            <StyledTableCell align="center">Auxilio Extra</StyledTableCell>
            <StyledTableCell align="center">Viáticos</StyledTableCell>
            <StyledTableCell align="center">Otros</StyledTableCell>
            <StyledTableCell align="center">Tipo</StyledTableCell>
            <StyledTableCell align="center">Acciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.contratoid}>
              <StyledTableCell component="th" scope="row" align="center">
                {row.contratoid}
              </StyledTableCell>
            
              <StyledTableCell align="center">{row.empleado}</StyledTableCell>
              <StyledTableCell align="center">{row.comisiones}</StyledTableCell>
              <StyledTableCell align="center">{row.bonificaciones}</StyledTableCell>
              <StyledTableCell align="center">{row.auxilios}</StyledTableCell>
              <StyledTableCell align="center">{row.viaticos}</StyledTableCell>
              <StyledTableCell align="center">{row.otros}</StyledTableCell>
              <StyledTableCell align="center">{row.tipo}</StyledTableCell>
              <StyledTableCell align="center">
              <IconButton  
                            variant="contained" 
                            color="primary" 
                            type="submit" 
                            //onClick={handleSubmit} 
                            size="small"
                            className={classes.button}
                            
                            >
                           < EditIcon / >
                        </IconButton>
                </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
