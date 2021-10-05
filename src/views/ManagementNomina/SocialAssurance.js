import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import Modal from "@material-ui/core/Modal";
import swal from 'sweetalert';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { GridLinkOperator, XGrid } from '@material-ui/x-grid';
import { DataGrid, GridToolbar,GridCellParams, GridRowParams, GridRowsProp,
    useGridApiRef } from '@material-ui/data-grid';
import { id } from 'date-fns/locale';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "70px",
        width: "100%",
        padding: "5px",
        alignItems: "center",
        background: '#ffffff',
        border:0,
        '& .super-app-theme--header': {
            backgroundColor: '#0f4c75',
            color: '#ffff',
            display: "flex",
            borderBottom:'1px solid #BDBDBD',
            borderLeft: '1px solid #BDBDBD'
            
        },
        '& .MuiDataGrid-iconSeparator': {
            display: 'none',
          },

        '& .MuiTextField-root': {
            marginRight: "14px",
            width: '35ch',
        },

        '& .bordered-cell':{
            borderBottom:'1px solid #BDBDBD',
            borderLeft: '1px solid #BDBDBD',
            borderRight:'1px solid #BDBDBD'
        },

        '& .MuiDataGrid-toolbar':{
            fontSize: "14px"
        },
        '& .MuiButton-root':{
            color:"#000000",
            fontSize: "20px"
        }
    },

    formControl: {
        marginRight: theme.spacing(1),
        width:"30ch",
        size: 'medium'
    },

    list: {
        width: "30ch",
        marginRight: "14px",
        marginTop: theme.spacing(0)
    },
    selectEmpty: {
        marginTop: theme.spacing(0),
    },
    add: {
        color: "#0f4c75",
        marginLeft: "49px"
    },
    icon: {
        fontSize: "60px",
        boxShadow: 3,

    },
    paper: {
        position: "absolute",
        width: 700,
        height: 630,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    },

    button: {
        marginRight: "14px",
        backgroundColor: "#0f4c75",
        color:"#ffffff",
        height:62
    },

    cancel:{
        marginRight: "14px",
        backgroundColor: "#ec0101"
    },

    accept:{
        marginRight: "14px",
        backgroundColor: "#0f4c75"
    },

    title: {
        color: "#8c9eff"
    },
    table: {
        minWidth: 650,
        border: '0.1px solid #000000',
    },

    bordered: {
        border: '0.1px solid #000000'
    },

    container: {
        maxHeight: 440,
        backgroundColor: '#d0e8f2',
        fontSize: 18
    },
    head: {
        backgroundColor: "#0f4c75",
        color: theme.palette.common.white,
    },

    form:{
        marginLeft:"8px"
    },

    title:{
        color: "#0f4c75",
        fontWeight: 450,
        fontSize: 34
    },

    label:{
        color: "#0f4c75",
        fontWeight: 450,
        fontSize: 18
    },

    gridContainer: {
        paddingLeft: "5px",
        paddingRight: "5px",
        //backgroundColor:"#e57373",
        width:"100%"
      },
    
      employee:{
          height:200,
          width:200,
          color: "#0f4c75",
          marginLeft:"10%"
      },

      feature:{
          width:200,
          height:70
      }

}));


export default function SocialAssurance(){
    const classes = useStyles();

    return(
        <div className={classes.root} align="center">
             <br/>
             <br/>
            <Typography 
                variant="h5" 
                className={classes.title} 
                component="h2" 
                gutterBottom 
                style={{marginBottom: '1em'}} 
                align ="center">
                Seguridad Social
            </Typography>
            <div style={{marginLeft:200}} align="center">
                <Grid container spacing={2}  className={classes.gridContainer}>
                    <Grid item xs={2} md={1} sm={2}>
                        <Typography>Contrato</Typography>
                    </Grid>
                    <Grid item xs={3} md={2} sm={2}>
                    <TextField
                        id="standard-number"
                        type="number"
                        variant="outlined"
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    </Grid>

                    <Grid item xs={3} md={3} sm={2}>
                        <Button 
                            className={classes.button}
                            variant="contained"
                            size="large"
                            style={{color:'#ffffff'}}
                        >
                         Buscar
                        </Button>
                    </Grid>
                </Grid>
                <br/>
                <br/>
                <br/>
                <Paper align="left">

                <Grid container spacing={2}  className={classes.gridContainer}>
                    <Grid item xs={3} md={2} sm={2}>
                        <AccountCircleIcon className={classes.employee}>
                        </AccountCircleIcon>
                    </Grid>

                    <Grid item xs={2} md={3} sm={2}>
                        <br/>
                        <br></br>
                       <Typography variant="h5">Full Name</Typography>
                       <Typography variant="h6">Identification</Typography>
                       <Typography>Job</Typography>
                    </Grid>

                    <Grid item xs={3}>
                    <br/>
                    <br/>
                        <Typography variant="h5" align="right">Estado</Typography>
                        <Typography variant="h6" align="right">PAGADA/PENDIENTE</Typography>
                    </Grid>

                    </Grid>
                    <Divider/>
                    <br/>
                    <br/>
                    <Grid container spacing={2}  className={classes.gridContainer}>
                        <Grid item xs md={6}>
                            <div style={{marginLeft:"20%"}}>
                            <Typography variant="h6" gutterBottom>Seguridad Social</Typography>
                            <Typography>AFP</Typography>
                            <Typography>EPS</Typography>
                            <Typography>ARL</Typography>
                            </div>
                        </Grid>

                        <Grid item xs md={4}>
                        <div style={{marginLeft:"20%"}}>
                        <Typography variant="h6" gutterBottom>Aportes Parafiscales</Typography>
                            <Typography>ICBF</Typography>
                            <Typography>SENA</Typography>
                            <Typography>CCF</Typography>
                        </div>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
            <br/>
            <br/>
        </div>

    );
}