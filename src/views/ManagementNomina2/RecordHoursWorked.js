import React from 'react';
import { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';
import GridItem from '../../components/Grid/GridItem';
import GridContainer from '../../components/Grid/GridContainer';

export default function RecordHoursWorked() {

	return (
		<div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={4} style={{marginTop: '10px'}}>
                    <b>Horas Laborales</b>
                    <TextField
                        fullWidth
                        name="workingHours"
                    	margin="normal"
                        label="Horas Laborales"
                        variant="outlined"
                        size="small"
                        //onChange={handleChangeText}
                        //value={contractDataSelect.workingHours}
                    />
                </GridItem>

                <GridItem xs={12} sm={12} md={4} style={{marginTop: '10px'}}>
                    <b>Horas Extras</b>
              	  	<TextField
                	    fullWidth
                	    name="extraHoursDO"
    	                margin="normal"
                        label="Diurno Ordinario"
                        variant="outlined"
                        size="small"
                        //onChange={handleChangeText}
                        //value={contractDataSelect.extraHoursDO}
                    />
                    <TextField
                    	fullWidth
                        name="extraHoursNO"
                        margin="normal"
                        label="Nocturno Ordinario"
                        variant="outlined"
                        size="small"
                        //onChange={handleChangeText}
                        //value={contractDataSelect.extraHoursNO}
                    />
                    <TextField
                        fullWidth
                        name="extraHoursDDF"
                        margin="normal"
                        label="Diurno Dom. y Fest."
                    	variant="outlined"
                        size="small"
                        //onChange={handleChangeText}
                        //value={contractDataSelect.extraHoursDDF}
                    />
                    <TextField
                        fullWidth
                        name="extraHoursNDF"
                        margin="normal"
                        label="Nocturno Dom. y Fest."
                        variant="outlined"
                        size="small"
                        //onChange={handleChangeText}
                        //value={contractDataSelect.extraHoursNDF}
                    />
                </GridItem>

                <GridItem xs={12} sm={12} md={4} style={{marginTop: '10px'}}>
                    <b>Recargos</b>
                    <TextField
                        fullWidth
                        name="surchargesNO"
                        margin="normal"
                        label="Nocturno Ordinario"
                        variant="outlined"
                        size="small"
                        //onChange={handleChangeText}
                        //value={contractDataSelect.surchargesNO}
                    />
                    <TextField
                        fullWidth
                        name="surchargesDDF"
                        margin="normal"
                        label="Diurno Dom. y Fest."
                        variant="outlined"
                        size="small"
                        //onChange={handleChangeText}
                        //value={contractDataSelect.surchargesDDF}
                    />
                    <TextField
                        fullWidth
                        name="surchargesNDF"
                        margin="normal"
                        label="Nocturno Dom. y Fest."
                        variant="outlined"
                        size="small"
                        //onChange={handleChangeText}
                        //value={contractDataSelect.surchargesNDF}
                    />
                </GridItem>
            </GridContainer>
        </div>
	);
}
