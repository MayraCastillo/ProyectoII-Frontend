//Imports
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

//Creamos el Context
export const PaisesContext = createContext();

//Provider es donde se encuentran las funciones y el state
const PaisesContextProvider = (props) => {
	//Crear el state del context
	const [paises, setPaises] = useState([]);
	//Pais seleccionado
	const [paisSeleccionado, setPaisSeleccionado] = useState({
		paisId: '',
		nombre: '',
	});
	//Crear el array departamentos segun sea el pais
	const [departamentos, setDepartamentos] = useState([]);
	//Departamento seleccionado
	const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState({
		paisId: '',
		nombre: '',
	});
	//Crear el array municipios segun sea el departamento
	const [municipios, setMunicipios] = useState([]);

	//Limpiar paisesContext
	/*const limpiarPaises = () => {
		console.log('Limpiando');
		setPaises([]);
		setPaisSeleccionado({
			paisId: '',
			nombre: '',
		});
		setDepartamentos([]),
			setDepartamentoSeleccionado({
				paisId: '',
				nombre: '',
			}),
			setMunicipios([]);
	};*/
	//Ejecutamos el llamado a la API
	useEffect(() => {
		const peticionGet = async () => {
			const url = 'http://localhost:8091/listarPaises';
			const paises = await axios.get(url);
			setPaises(paises.data);
		};
		peticionGet();
	}, []);

	return (
		<PaisesContext.Provider
			value={{
				paises,
				setPaisSeleccionado,
				setDepartamentoSeleccionado,
				setMunicipios,
			}}
		>
			{props.children}
		</PaisesContext.Provider>
	);
};
export default PaisesContextProvider;
