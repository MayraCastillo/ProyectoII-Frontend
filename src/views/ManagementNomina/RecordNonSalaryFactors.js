import React from 'react';
import { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';
import GridItem from '../../components/Grid/GridItem';
import GridContainer from '../../components/Grid/GridContainer';

export default function RecordNonSalaryFactors() {

	return (
		<div>
			<GridContainer style={{textAlign: 'left'}}>
                <GridItem xs={12} sm={12} md={5} style={{marginTop: '20px'}}>
                    <b>Comisiones</b>
                </GridItem>
                <GridItem xs={12} sm={12} md={7}>
                    <TextField
                        fullWidth
                        name="facNoSalC"
                        margin="normal"
                        variant="outlined"
                        size="small"
                        //onChange={handleChangeText}
                        //value={contractDataSelect.facNoSalC}
                    />
                </GridItem>

                <GridItem xs={12} sm={12} md={5} style={{marginTop: '20px'}}>
                    <b>Bonificaciones</b>
                </GridItem>
                <GridItem xs={12} sm={12} md={7}>
                    <TextField
                        fullWidth
                        name="facNoSalB"
                        margin="normal"
                        variant="outlined"
                        size="small"
                        //onChange={handleChangeText}
                        //value={contractDataSelect.facNoSalB}
                    />
                </GridItem>

                <GridItem xs={12} sm={12} md={5} style={{marginTop: '12px'}}>
                    <b>Auxilio Extra Viáticos</b>
                </GridItem>
                <GridItem xs={12} sm={12} md={7}>
                    <TextField
                        fullWidth
                        name="facNoSalAE"
                        margin="normal"
                        variant="outlined"
                        size="small"
                        //onChange={handleChangeText}
                        //value={contractDataSelect.facNoSalAE}
                    />
                </GridItem>

                <GridItem xs={12} sm={12} md={5} style={{marginTop: '20px'}}>
                    <b>Otros Factores</b>
                </GridItem>
                <GridItem xs={12} sm={12} md={7}>
                    <TextField
                        fullWidth
                        name="facNoSalOF"
                        margin="normal"
                        variant="outlined"
                        size="small"
                        //onChange={handleChangeText}
                        //value={contractDataSelect.facNoSalOF}
                    />
                </GridItem>
            </GridContainer>            
        </div>
	);
}
