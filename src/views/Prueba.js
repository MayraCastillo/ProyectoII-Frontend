import React from 'react';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';

export const CounterApp = ({ value = 10 }) => {
    const [counter, setCounter] = useState(value);

    const handleUp = () => setCounter((counterPref) => counterPref + 1);
    const handleDown = () => setCounter((counterPref) => counterPref - 1);
    const handleReset = () => setCounter(value);

    return (
        <>
            <h1>Counter App</h1>
            <div>
                <h2>{counter}</h2>
                <div>
                    <button onClick={handleUp}>+1</button>
                    <button onClick={handleReset}>Reset</button>
                    <button onClick={handleDown}>-1</button>
                </div>
            </div>
        </>
    );
};

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
				<CounterApp value="{100}" />	
        </div>
	);
}