import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import CrearNomina from './crear_nomina';
import Extras from './recargos';
import Divider from "@material-ui/core/Divider";
import Modal from "@material-ui/core/Modal";
import swal from 'sweetalert';
import EditIcon from '@material-ui/icons/Edit';
import Acciones from './acciones';
import axios from 'axios';

const styles = makeStyles((theme) => ({
  root: {
    //marginLeft:"9%",
    marginRight:"25%",
    marginRight:"10%",
    marginTop:"18px",
  
    alignItems: "center",
    width:'100%',
    background: '#ffffff',
  },

  table: {
    minWidth:5,
    //display:"flex",
 
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
  },
  paper: {
    width: '100%',
    marginBottom:"2%",
  },
  
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  
  head: {
    backgroundColor:'#3949ab',
    color:'#ffff',
  },

  modal:{
    position: "absolute",
    width: 1000,
    height: 500,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(0, 0, 0)
  }

}));

function createData(empleadoId,empleadoNom,empleadoApe) {
  return {empleadoId, empleadoNom, empleadoApe};
}

const rows = [
  createData(305,'Ana', 'Pérez'),
  createData(452, 'Isabel', 'Allende'),
  createData(262,'Héctor', 'Habad'),
  createData(159, 'Cristian', 'Meier'),
  createData(356, 'Mayra', 'Banks'),
  createData(408,'Pedro', 'Coral'),
  createData(237,'Thomas', 'Edison')
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'empleadoId', numeric: true, disablePadding: false, label: 'Id empleado' },
  { id: 'empleadoNom', numeric: false, disablePadding: false, label: 'Nombre empleado' },
  { id: 'correo', numeric: false, disablePadding: false, label: 'Correo Electrónico' },
  { id: 'estado', numeric: false, disablePadding: false, label: 'Estado del contrato' },
  { id: 'accion', numeric: false, disablePadding: false, label: 'Acciones'},
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow  className={classes.head}>
      
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            className={classes.head}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;
 
  return (
    <Toolbar
      className={clsx(classes.root)}
    >
      
        <Typography className={classes.title} color="primary" variant="h4" id="tableTitle" component="div" align="center">
          Contratos
        </Typography>
      

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

/*const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));*/

function getModalStyle() {
  const top = 40;
  const left = 50;

  return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`
  };
}

export default function Horas() {
  const classes = styles();
  const url = "http://localhost:8091/";
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [empleadoId, setEmpleadoId] = React.useState('');
  const [empleadoNom, setEmpleadoNom] = React.useState('');
  const [empleadoSal, setEmpleadoSal] = React.useState('');
  const [contratoId, setContratoId] = React.useState('');

const handleModal = (contrato) => {
    
  setEmpleadoId(contrato.contratoPk.empleado.numeroDocumento);
    
  setEmpleadoNom(contrato.contratoPk.empleado.nombres+ " " +contrato.contratoPk.empleado.apellidos);
  
  setEmpleadoSal(contrato.salarioBase);
  
  setContratoId(contrato.contratoId);

  openCloseModal();
   
};



const openCloseModal = () => {
    setOpen(!open);
};

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.contratoPk.empleado.numeroDocumento);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;
  const [contratos, setContratos] = React.useState([]);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, contratos.length - page * rowsPerPage);

  const body = (
    <div style={modalStyle} className={classes.modal} align="center">
          <Acciones idEmpleado={empleadoId} nomEmpleado={empleadoNom} salario={empleadoSal} idcontrato={contratoId}/>
    </div>
    )
  
  const cargarContratos = async() => {
    await axios.get(url+'listarContratosPorEstado/123')
    .then((response) => {
        setContratos(response.data);
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    })
};

React.useEffect(() => {
  cargarContratos();
}, []);

  return (
    <div className={classes.root}>
      
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={contratos.length}
            />
            <TableBody>
              {stableSort(contratos, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((contrato, index) => {
                  const isItemSelected = isSelected(contrato.contratoPk.empleado.numeroDocumento);
                 

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, contrato.contratoPk.empleado.numeroDocumento)}
                      tabIndex={-1}
                      key={contrato.contratoPk.empleado.numeroDocumento}
                    >
                      
                      <TableCell component="th" scope="row" padding="none" align="center">
                        {contrato.contratoPk.empleado.numeroDocumento}
                      </TableCell>
                      <TableCell align="center">{contrato.contratoPk.empleado.nombres} {contrato.contratoPk.empleado.apellidos}</TableCell>
                      <TableCell align="center">{contrato.contratoPk.empleado.correo}</TableCell>
                      <TableCell align="center">{contrato.estado}</TableCell>
                      <TableCell align="center">
                      <IconButton  
                            variant="contained" 
                            color="primary" 
                            type="submit" 
                            
                            onClick={()=> handleModal(contrato)}
                            //onClick={handleSubmit} 
                            size="small"
                            className={classes.button}
                            
                            >
                           < EditIcon / >
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={contratos.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
        <Modal
          open={open}
          onClose={openCloseModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
        {body}
        </Modal>
    </div>
  );
}
