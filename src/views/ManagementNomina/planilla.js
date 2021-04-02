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
import Divider from "@material-ui/core/Divider";
import Modal from "@material-ui/core/Modal";
import swal from 'sweetalert';
import EditIcon from '@material-ui/icons/Edit';

const styles = makeStyles ({
  root: {
    //marginLeft:"9%",
    marginRight:"25%",
    marginRight:"10%",
    marginTop:"1px",
    padding:"100px",
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

});

function createData(contratoId, empleadoId,empleadoNom,empleadoApe,tipoContrato,salario,comisiones,auxilio) {
  return {contratoId, empleadoId, empleadoNom, empleadoApe,tipoContrato,salario,comisiones,auxilio };
}

const rows = [
  createData(1, 305,'Ana', 'Pérez','Término fijo',3000,2500,1000),
  createData(2, 452, 'Isabel', 'Allende','Término fijo',2340, 1233, 2000),
  createData(3, 262,'Héctor', 'Habad','Término fijo',1000,3450,9873),
  createData(4, 159, 'Cristian', 'Meier','Término fijo',3400,2789,9234),
  createData(5, 356, 'Mayra', 'Banks','Término fijo',4500,3450,8574),
  createData(6, 408,'Pedro', 'Coral','Término fijo',12300,34566,9000),
  createData(7, 237,'Thomas', 'Edison','Término fijo',134500,45670,85339),
  createData(8, 375, 'Jeremías', 'Patel','Término fijo',20230,23456,87373),
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
  { id: 'contratoId', numeric: true, disablePadding: true, label: 'Id contrato' },
  { id: 'empleadoId', numeric: true, disablePadding: false, label: 'Id empleado' },
  { id: 'empleadoNom', numeric: false, disablePadding: false, label: 'Nombre empleado' },
  { id: 'tipoContrato', numeric: false, disablePadding: false, label: 'Tipo de contrato' },
  { id: 'horasT', numeric: true, disablePadding: false, label: 'Horas trabajadas'},
  { id: 'rno', numeric: true, disablePadding: false, label: 'Recargo Nocturno Ordinario'},
  { id: 'edo', numeric: true, disablePadding: false, label: 'Extra Diurno Ordinario'},
  { id: 'eno', numeric: true, disablePadding: false, label: 'Extra Nocturno Ordinario'},
  { id: 'ddf', numeric: true, disablePadding: false, label: 'Extra Diurno Domingos y Festivos'},
  { id: 'endf', numeric: true, disablePadding: false, label: 'Extra Nocturno Domingos y Festivos'},
  { id: 'rndf', numeric: true, disablePadding: false, label: 'Recargo Nocturno Domingos y Festivos'},
  { id: 'rddf', numeric: true, disablePadding: false, label: 'Recargo Diurno Domingos y Festivos'},
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
        <TableCell padding="checkbox">
          <Checkbox
            className={classes.head}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'todos los contratos seleccionados' }}
          />
        </TableCell>
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
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="secondary" variant="h4" component="div" align="center">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} color="primary" variant="h4" id="tableTitle" component="div" align="center">
          Contratos Activos
        </Typography>
      )}

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
  const top = 90;
  const left = 50;

  return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`
  };
}

export default function Horas() {
  const classes = styles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const body = (
    <div style={modalStyle} className={classes.paper} align="center">
          <CrearNomina/>
    </div>
    )

const handleOpen = () => {
    setOpen(true);
};

const handleClose = () => {
    setOpen(false);
};

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.contratoId);
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

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

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
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.contratoId);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.contratoId)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none" align="center">
                        {row.contratoId}
                      </TableCell>
                   
                      <TableCell align="center">{row.empleadoId}</TableCell>
                      <TableCell align="center">{row.empleadoNom}</TableCell>
                      <TableCell align="center">{row.tipoContrato}</TableCell>
                      <TableCell align="center">{row.horasT}</TableCell>
                      <TableCell align="center">{row.rno}</TableCell>
                      <TableCell align="center">{row.edo}</TableCell>
                      <TableCell align="center">{row.eno}</TableCell>
                      <TableCell align="center">{row.ddf}</TableCell>
                      <TableCell align="center">{row.endf}</TableCell>
                      <TableCell align="center">{row.rndf}</TableCell>
                      <TableCell align="center">{row.rddf}</TableCell>
                      <TableCell align="center">
                      <IconButton  
                            variant="contained" 
                            color="primary" 
                            type="submit" 
                            onClick={handleOpen}
                            //onClick={handleSubmit} 
                            size="small"
                            className={classes.button}
                            
                            >
                           < EditIcon / >
                        </IconButton>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                        >
                          {body}
                        </Modal>
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Compactar tabla"
      />
    </div>
  );
}
