//Imports
import { createContext, useState } from 'react';

//Creamos el Context
export const HojaDeVidaContext = createContext();

//Provider es donde se encuentran las funciones y el state
const HojaDeVidaContextProvider = (props) => {
	//Crear el state del context
	const [informacionPersonal, guardarInformacionPersonal] = useState({
		nombres: '',
		apellidos: '',
		tipoDocumento: '',
		numeroDocumento: '',
		pais: '',
		departamento: '',
		ciudad: '',
		direccion: '',
		telefono: '',
		correo: '',
	});
	//INICIO  SECCION ----ESTUDIOS REALIZADOS
	const estudioData = [
		{
			id: '',
			nombreTitulo: '',
			entidad: '',
			calificacion: '',
			tiempo: '',
			tipo: '',
		},
	];
	const initialFormState = {
		id: null,
		nombreTitulo: '',
		entidad: '',
		calificacion: '',
		tipo: '',
		tiempo: '',
	};

	const [estudios, setEstudios] = useState(estudioData);

	const [estudioEditar, setEstudioEditar] = useState(initialFormState);

	//INICIO SECCION ---- EXPERIENCIA LABORAL
	const empresaData = [
		{
			id: '',
			nombreEmpresa: '',
			cargoEmpresa: '',
			telefonoEmpresa: '',
			tiempo: '',
			calificacion: '',
			contacto: '',
		},
	];
	const initialFormStateExpLab = {
		id: null,
		nombreEmpresa: '',
		cargoEmpresa: '',
		telefonoEmpresa: '',
		tiempo: '',
		calificacion: '',
		contacto: '',
	};
	const [arrayExperienciaLaboral, setarrayExperienciaLaboral] = useState(
		empresaData
	);
	const [editarReferenciaLaboral, setEditarReferenciaLaboral] = useState(
		initialFormStateExpLab
	);
	return (
		<HojaDeVidaContext.Provider
			value={{
				guardarInformacionPersonal,
				estudios,
				setEstudios,
				estudioEditar,
				setEstudioEditar,
				arrayExperienciaLaboral,
				setarrayExperienciaLaboral,
				editarReferenciaLaboral,
				setEditarReferenciaLaboral,
			}}
		>
			{props.children}
		</HojaDeVidaContext.Provider>
	);
};
export default HojaDeVidaContextProvider;
