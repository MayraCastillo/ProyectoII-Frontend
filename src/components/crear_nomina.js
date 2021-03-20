import * as React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import BusinessIcon from '@material-ui/icons/Business';
import SecurityIcon from '@material-ui/icons/Security';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import PaymentIcon from '@material-ui/icons/Payment';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import CancelIcon from '@material-ui/icons/Cancel';
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from '@material-ui/core/TablePagination';


const columns = [
   { field: 'Nombre', headerName: 'Nombre del empleado',headerClassName: 'super-app-theme--header', width: 198, align: 'center'},
   { field: 'Identificación', headerName: 'Identificación',headerClassName: 'super-app-theme--header', width: 140, align: 'center' },
   { field: 'Tiempo', headerName: 'Tiempo',headerClassName: 'super-app-theme--header', width: 110, align: 'center' },
  {
    field: 'Diuror',
    headerName: 'Diurno ordinario',
    headerClassName: 'super-app-theme--header',
    type: 'number',
    width: 180,
    align: 'center',
  },
 
  {
    field: 'Nocturnor',
    headerName: 'Nocturno ordinario',
    headerClassName: 'super-app-theme--header',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 180,
    align: 'center',
    valueGetter: (params) =>
      `${params.getValue('Nombre del empleado') || ''} ${params.getValue('Identificación') || ''}`,
  },

  {
    field: 'Diurno_dom_fes',
    headerName: 'Diurno domingos y festivos',
    headerClassName: 'super-app-theme--header',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 250,
    align: 'center',
    valueGetter: (params) =>
      `${params.getValue('Nombre del empleado') || ''} ${params.getValue('Identificación') || ''}`,
  },

   { field: 'Recargo_nocturno', headerName: 'Recargo nocturno', headerClassName: 'super-app-theme--header', width: 200, align: 'center'},
     { field: 'Recargo_diurno_domfes', headerName: 'Recargo diurno domingos y festivos',headerClassName: 'super-app-theme--header', width: 250, align: 'center' },
       { field: 'Recargo_nocturno_domfes', headerName: 'Recargo nocturno domingos y festivos',headerClassName: 'super-app-theme--header', width: 250, align: 'center' },
         { field: 'otros_pagos', headerName: 'Otros pagos', headerClassName: 'super-app-theme--header',width: 130, align: 'center' },
    { field: 'total', headerName: 'Sueldo total', headerClassName: 'super-app-theme--header',width: 130, align: 'center'},
];

const rows = [
  { id: 1, Nombre:'Jane Doe', Identificación:104567, Tiempo:34 , Diuror:1200, Nocturnor:2400, Diurno_dom_fes:3400, Recargo_nocturno:500, Recargo_diurno_domfes:100, Recargo_nocturno_domfes:250, otros_pagos:6000, total:998000 },
  { id: 2, Nombre:'Erick Hampton', Identificación:104567, Tiempo:34 , Diuror:1200, Nocturnor:2400, Diurno_dom_fes:3400, Recargo_nocturno:500, Recargo_diurno_domfes:100, Recargo_nocturno_domfes:250, otros_pagos:6000, total:998000 },
  { id: 3, Nombre:'Dorian Gray', Identificación:104567, Tiempo:34 , Diuror:1200, Nocturnor:2400, Diurno_dom_fes:3400, Recargo_nocturno:500, Recargo_diurno_domfes:100, Recargo_nocturno_domfes:250, otros_pagos:6000, total:998000 },
  { id: 4, Nombre:'Marty Mcfly', Identificación:104567, Tiempo:34 , Diuror:1200, Nocturnor:2400, Diurno_dom_fes:3400, Recargo_nocturno:500, Recargo_diurno_domfes:100, Recargo_nocturno_domfes:250, otros_pagos:6000, total:998000 },
  { id: 5, Nombre:'Elle Duncan', Identificación:104567, Tiempo:34 , Diuror:1200, Nocturnor:2400, Diurno_dom_fes:3400, Recargo_nocturno:500, Recargo_diurno_domfes:100, Recargo_nocturno_domfes:250, otros_pagos:6000, total:998000 },
  { id: 6, Nombre:'Demsell Washington', Identificación:104567, Tiempo:34 , Diuror:1200, Nocturnor:2400, Diurno_dom_fes:3400, Recargo_nocturno:500, Recargo_diurno_domfes:100, Recargo_nocturno_domfes:250, otros_pagos:6000, total:998000 },
  { id: 7, Nombre:'James Cameron', Identificación:104567, Tiempo:34 , Diuror:1200, Nocturnor:2400, Diurno_dom_fes:3400, Recargo_nocturno:500, Recargo_diurno_domfes:100, Recargo_nocturno_domfes:250, otros_pagos:6000, total:998000 },


];


const styles = makeStyles ({
  root: {
    marginLeft:"2%",
    marginRight:"10%",
    marginTop:"90px",
    
    alignItems: "center",
    width:'100%',
    background: '#ffffff',
  },

  table: {
    minWidth: 5,
    display:"flex",
 
    backgroundColor:"#EDE7F6",
    alignItems:"center",
  },

  header:{
    backgroundColor: '#3f51b5',
    color: '#ffff',
    borderTopWidth: 0.1,
    borderColor: "white",
    borderStyle: "solid",
    borderRightWidth: 0.1,
    borderLeftWidth: 0.1,
  },

  container: {
    maxHeight: 400,
    width:'100%'
  }

});



export default function CustomizedTable() {
  const classes = styles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className={classes.root}>
         <Typography paragraph>
             <Typography variant="h3">Nómina</Typography>
          </Typography>
          <Typography paragraph>YYYY-MM-DD</Typography>
       
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                >
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.field];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      
     <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
         <Divider style={{marginTop:"18px",marginBottom:'1em'}} />
      
      <Button variant="contained" color="primary" size="large" startIcon={<CancelIcon />} style={{marginRight:"18px"}}>
        Cancelar
      </Button>
      <Button variant="contained" color="secondary" size="large" startIcon={<SaveIcon />} style={{marginRight:"18px"}}>
      Guardar
      </Button>

       <Button variant="contained" color="primary" size="large" startIcon={<AutorenewIcon />}>
      Generar
      </Button>
    </div>
  );
}
