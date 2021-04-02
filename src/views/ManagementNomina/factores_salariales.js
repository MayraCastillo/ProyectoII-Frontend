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
import Divider from "@material-ui/core/Divider";
import Modal from "@material-ui/core/Modal";
import swal from 'sweetalert';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

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
  createData(1, 'Jane Doe', 6000,2400,3000,1200,3400,'SALARIAL')
];

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
    backgroundColor:"#EDE7F6"
  },
  modal:{
    position: "absolute",
    marginTop:"5px",
    marginLeft:"10px",
    width: 900,
    height: 550,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(0, 0, 0)
  },
  big:{
    marginLeft: "10px",
    marginRight: "10px",
    marginBottom:'15px',
    width: "18ch",
  },

  small:{
    marginLeft: "10px",
    marginRight: "10px",
    marginBottom:'15px',
    width: "22ch",
  },

  button:{
    height: 50,
    marginLeft: "10px"
  },

  container:{
    marginTop:"40px",
    marginLeft:"30px"
  }
}));

function getModalStyle() {
  const top = 60;
  const left = 60;

  return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`
  };
}

export default function Factores() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);


  const body = (
    <div style={modalStyle} className={classes.modal} align="center">
          <form noValidate autoComplete="off" className={classes.container}>
          <Typography variant="h4" component="h4" color="primary" align="center" gutterBottom>
            Factores Salariales y No Salariales
          </Typography>
          <Typography variant="h5" component="h4" color="secondary" align="center" gutterBottom>
            Empleado nombre - id
          </Typography>
      <div align="justify">
      <Typography variant="h6" component="h6" color="primary" align="center" gutterBottom>
        Factores Salariales
      </Typography>
      <br/>
        <TextField
          required
          className={classes.big}
          id="outlined-required"
          label="Comisiones"
          variant="outlined"
        />
         <TextField
          required
          className={classes.big}
          id="outlined-required"
          label="Bonificaciones"
          variant="outlined"
        />

<TextField
          required
          className={classes.big}
          id="outlined-required"
          label="Auxilio Extra"
          variant="outlined"
        />

<TextField
          required
          className={classes.big}
          id="outlined-required"
          label="Viáticos"
          variant="outlined"
        />

<TextField
          required
          className={classes.big}
          id="outlined-required"
          label="otros"
          variant="outlined"
        />
          <br/>
          <br/>

          <Typography variant="h6" component="h6" color="primary" align="center" gutterBottom>
        Factores No Salariales
      </Typography>
      <br/>
        <TextField
          required
          className={classes.big}
          id="outlined-required"
          label="Comisiones"
          variant="outlined"
        />
         <TextField
          required
          className={classes.big}
          id="outlined-required"
          label="Bonificaciones"
          variant="outlined"
        />

<TextField
          required
          className={classes.big}
          id="outlined-required"
          label="Auxilio Extra"
          variant="outlined"
        />

<TextField
          required
          className={classes.big}
          id="outlined-required"
          label="Viáticos"
          variant="outlined"
        />

<TextField
          required
          className={classes.big}
          id="outlined-required"
          label="otros"
          variant="outlined"
        />
          <br/>
          <br/>

          <Button  
                variant="contained" 
                color="primary" 
                type="submit" 
                //onClick={handleSubmit} 
                size="large"
                className={classes.button}
                startIcon={ < SaveIcon / > }
          >
              Guardar
          </Button>
        </div>
      </form>
    </div>
    )

const handleOpen = () => {
    setOpen(true);
};

const handleClose = () => {
    setOpen(false);
};



  return (
    <div className={classes.root} align="center">
      <Typography variant="h4" component="h4" color="primary" align="center" gutterBottom>
        Factores Salariales y No Salariales
      </Typography>
      <br/>

    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
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
                {row.empleado}
              </StyledTableCell>
            
            
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
                            onClick={handleOpen}
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
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
>
  {body}
</Modal>
    </div>
  );
}
