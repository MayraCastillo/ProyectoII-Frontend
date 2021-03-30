import React from 'react';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';

export default function Prueba() {

    const [idNewEmployee, setIdNewEmployee] = useState(''); 

	return (
		<div style={{marginTop: '155px'}}>
            <TextField
				required
				variant="outlined"
				label="ID del nuevo Empleado"
				onChange={(e) => setIdNewEmployee(e.target.value)}
			/>
            <br />
            <Button
                    onClick={() => localStorage.setItem('idNewEmployee', idNewEmployee)}
					href="/registrar_empleado"
				>
					Confirmar
				</Button>

				<h3>PROBANDO</h3>
				
        </div>
	);
}
