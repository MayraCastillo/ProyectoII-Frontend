import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
        root: {
            marginRight:"40px",
            align: "center",
            background: '#ffffff',
            borderWidth: 2,
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
            backgroundColor: '#EDE7F6'
        },
        head: {
            backgroundColor: "#3949ab",
            color: theme.palette.common.white,
        }

    }));



export default function Terceros(){
    const classes = useStyles();
//    const listadoTerceros = props;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const [state, setState] = React.useState({
        terceros: []
    });

    const cargarTerceros = async() => {
        await axios.get('https://localhost:8091/listarTerceros')
                .then((response) => {
                    setState({terceros: response.data});
                })
                .catch((error) => {
                    console.log(error);
                })
    };


    React.useEffect(() => {
        cargarTerceros();
    }, []
            );


    return (
            <div className={classes.root}>  

                <TableContainer className={classes.container}>  
                    <Table stickyHeader className={classes.table} size="medium">
                        <TableHead>
                            <TableRow>
                                <TableCell  className={classes.head} align="center">
                                    <Typography variant="h5" gutterBottom align ="center">
                                        Id
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" className={classes.head} >
                                    <Typography variant="h5" gutterBottom align ="center">
                                        Nombre
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" className={classes.head} >
                                    <Typography variant="h5" gutterBottom align ="center">
                                        Dirección
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" className={classes.head} >
                                    <Typography variant="h5" gutterBottom align ="center">
                                        Teléfono
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" className={classes.head} >
                                    <Typography variant="h5" gutterBottom align ="center">
                                        Ciudad
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" className={classes.head} >
                                    <Typography variant="h5" gutterBottom align ="center">
                                        Tipo
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" className={classes.head} >
                                    <Typography variant="h5" gutterBottom align ="center">
                                        Sigla
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" className={classes.head} >
                                    <Typography variant="h5" gutterBottom align ="center">
                                        Correo
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {state.terceros.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    return (
                                <TableRow hover  tabIndex={-1} key={row.id}>
                
                                    <TableCell align="center">
                                        <Typography variant="h6" gutterBottom align ="center">
                                            {row.terceroId}
                                        </Typography>
                                    </TableCell>
                
                                    <TableCell align="center">
                                        <Typography variant="h6" gutterBottom align ="center">
                                            {row.nombre}
                                        </Typography>
                                    </TableCell>
                
                                    <TableCell align="center">
                                        <Typography variant="h6" gutterBottom align ="center">
                                            {row.direccion}
                                        </Typography>
                                    </TableCell>
                
                                    <TableCell align="center">
                                        <Typography variant="h6" gutterBottom align ="center">
                                            {row.telefono}
                                        </Typography>
                                    </TableCell>
                
                                    <TableCell align="center">
                                        <Typography variant="h6" gutterBottom align ="center">
                                            {row.municipio.nombre}
                                        </Typography>
                                    </TableCell>
                
                                    <TableCell align="center">
                                        <Typography variant="h6" gutterBottom align ="center">
                                            {row.tipoTercero.nombre}
                                        </Typography>
                                    </TableCell>
                
                                    <TableCell align="center">
                                        <Typography variant="h6" gutterBottom align ="center">
                                            {row.tipoTercero.abrevicion}
                                        </Typography>
                                    </TableCell>
                
                                    <TableCell align="center">
                                        <Typography variant="h6" gutterBottom align ="center">
                                            {row.correo}
                                        </Typography>
                                    </TableCell>
                
                                </TableRow>
                                            );
                                })}
            
            
            
            
            
                        </TableBody>
                    </Table>
                </TableContainer> 
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, state.terceros.length]}
                    component="div"
                    count={state.terceros.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
            </div>
            );
}