import React, {useMemo, useState} from 'react'

const PayrollContext = React.createContext();

export function PayrollProvider(props){
    const [payroll, setPayroll] = useState(null);

    function prueba(newName){
        setPayroll({name: newName})
    }

    function prueba2(){
        setPayroll({name: "HOLA MUNDO"})
    }

    const value = useMemo(() => {
        return({
            payroll,
            prueba,
            prueba2
        })
    }, [payroll])

    return (<PayrollContext.Provider value={value} {...props} />)
}

export function usePayroll(){
    const context = React.useContext(PayrollContext);
    if(!context){
        throw new Error ('ERROR')
    }
    return context;
}