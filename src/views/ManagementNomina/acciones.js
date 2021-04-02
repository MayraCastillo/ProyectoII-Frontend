import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CrearNomina from './crear_nomina';
import Horas from './planilla';
import Nomina from './info_nomina';
import Factores from './factores_salariales';
import Extras from './recargos';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor:'#ffffff',
    marginTop:'0px',
    marginRight:'0px'
  },
  container:{
      marginRight:'10%'
  }
}));

export default function Acciones(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" align="center" className={classes.container}>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered  variant="fullWidth">
          <Tab label="Horas Laborales" {...a11yProps(0)} align="center"/>
          <Tab label="Factores Salariales y No Salariales" {...a11yProps(1)}  className={classes.container} align="center"/>
          <Tab label="Detalles de la Nómina" {...a11yProps(2)}  align="center"/>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} align="center" className={classes.container}>
      <Extras emp={props}/>
      </TabPanel>
      <TabPanel value={value} index={1} align="center" className={classes.container}>
      <Factores/>
      </TabPanel>
      <TabPanel value={value} index={2} align="center" className={classes.container}>
      <Nomina/>
      </TabPanel>
    </div>
  );
}
