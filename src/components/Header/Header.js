import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Avatar from "../Avatar/Avatar"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles({

    backgroundHeader:{
        background: '#154c79',
        width: '100%',
        boxShadow: '2px 2px 2px 4px rgba(0, 0, 0, 0.1)',
    },

    containerHeader :{
        width: '100%',
        height: '65px',
        display: 'flex',
        //justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        //overflow: 'hidden',
    },

    titulo: {
        marginLeft: '95px',
        float: 'left',
        fontSize: '30px',
        //fontFamily: 'cursive',
    },
      
    avatar: {
        //marginLeft: '60%',
        marginRight: '20px',
        float: 'right',
    },

});

export default function Header() {
  
    const classes = useStyles();

    return (
        <header >
            <div className={classes.backgroundHeader}>
                <div className={classes.containerHeader}>
                    <div className={classes.titulo}>
                        MiPymes Gestión de Nómina
                    </div>
                    <div className={classes.avatar}>
                        <AccountCircleIcon style={{ fontSize: 40 }} />
                    </div>
                </div>
            </div>
        </header>
    )
}