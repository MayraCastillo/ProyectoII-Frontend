import React from 'react';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';

// core components
import GridItem from '../../components/Grid/GridItem';
import GridContainer from '../../components/Grid/GridContainer';


const useStyles = makeStyles((theme) => ({
    root: {
       	marginTop:"100px",
		width: '90%',
		margin: 'auto',
		textAlign: 'center',
    },

    contractOption: {
        //marginTop:"100px",
        height: '50%',
        //margin: 'auto',
        //textAlign: 'center',
    },

    contractContent: {
        //marginTop:"100px",
        height: '100%',
        //margin: 'auto',
        //textAlign: 'center',
    },

	buttonCancel: {
		color: 'white',
		backgroundColor: "rgb(220,53,69)",
	},

	modal: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	},
	iconos: {
		cursor: 'pointer',
	},

	inputMaterial: {
		width: '100%',
	},
}));

//const baseUrl = `http://localhost:8093/parametros`;

export default function ContractForm() {
	const styles = useStyles();
	const classes = useStyles();
	const [data, setData] = useState([]);

    const [indice, setIndice] = useState(0); 

	return (
		<div >
			<Card style={{padding: '20px'}}>
                        <CardContent>
                            <Typography variant="h5" component="h2"> 
                                <b>CONTRATO LABORAL A TÉRMINO FIJO</b>
                            </Typography><br />

                            <Typography id="message" variant="body2" component="p">
                                
                            </Typography><br />

                            <p> {indice} </p>

                            <TextField
                                required
                                name="nameEmployer"
                                size="small"
                                style={{width: '60%'}}
                                variant="outlined"
                                onChange={(e) => setNameParameter(e.target.value)}
                            /><br /><br />

                            <div>
                                <Button 
                                    variant="contained"
                                    color="primary"
                                    //startIcon={<AddCircleIcon />}
                                    style={{marginRight:"18px", width: '110px'}}
                                    //onClick={addParameterPOST}
                                    onClick={() => changeIndex("Volver")}
                                >Volver
                                </Button>

                                <Button
                                    //className={styles.buttonCancel} 
                                    variant="contained"
                                    color="primary"
                                    style={{width: '110px'}}
                                    //startIcon={<CancelIcon />}
                                    //onClick={() => abrirCerrarModalCreate()}
                                    onClick={() => changeIndex("Siguiente")}
                                >Siguiente
                                </Button>
                            </div><br />

                            <Typography variant="body2" component="p" color="textSecondary">
                                Empleador: Quien contrata. 
                                Tiene la obligación de remunerar al trabajador por sus servicios. 
                                Tiene la facultad de dar órdenes.
                            </Typography>
                        </CardContent>
                    </Card>
        </div>
	);
}
