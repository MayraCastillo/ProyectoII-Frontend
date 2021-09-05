import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import RecordHoursWorked from "./RecordHoursWorked";
import RecordSalaryFactors from "./RecordSalaryFactors";
import RecordNonSalaryFactors from "./RecordNonSalaryFactors";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },

  panel: {
    padding: theme.spacing(0, 4, 3),
    textAlign: 'center',
},
}));

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

export default function PayrollData() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="HORAS LABORALES" {...a11yProps(0)} />
          <Tab label="FACTORES SALARIALES" {...a11yProps(1)} />
          <Tab label="FACTORES NO SALARIALES" {...a11yProps(2)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0} className={classes.panel}>
        <h3 style={{color: '#3F51B5'}}>Horas Laboradas de </h3>
          <div>
            <RecordHoursWorked />
          </div>
      </TabPanel>

      <TabPanel value={value} index={1} className={classes.panel}>
        <h3 style={{color: '#3F51B5'}}>Factores Salariales de </h3>
          <div style={{width: '50%', margin: 'auto'}}>
            <RecordSalaryFactors />
          </div>
      </TabPanel>

      <TabPanel value={value} index={2} className={classes.panel}>
        <h3 style={{color: '#3F51B5'}}>Factores No Salariales de </h3>
          <div style={{width: '50%', margin: 'auto'}}>
            <RecordNonSalaryFactors />
          </div>
      </TabPanel>
    </div>
  );
}