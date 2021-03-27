//Imports
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert'; // Para poder realizar alertas

//Creamos el Context
export const HojaDeVidaContext = createContext();

//Provider es donde se encuentran las funciones y el state
const HojaDeVidaContextProvider = (props) => {
	//Crear el state del context
	const [informacionPersonalContext, guardarInformacionPersonal] = useState({
		nombres: '',
		apellidos: '',
		tipoDocumento: '',
		numeroDocumento: '',
		pais: '',
		departamento: '',
		municipio: '',
		direccion: '',
		telefono: '',
		correo: '',
	});
	const {
		nombres,
		apellidos,
		tipoDocumento,
		numeroDocumento,
		pais,
		departamento,
		ciudad,
		direccion,
		telefono,
		correo,
	} = informacionPersonalContext;

	const obtenerInfo = (e) => {
		guardarInformacionPersonal({
			...informacionPersonalContext,
			[e.target.name]: e.target.value,
		});
	};

	const tipoDocumentoChangeHandler = (e) => {
		guardarInformacionPersonal({
			...informacionPersonalContext,
			tipoDocumento: e.target.value,
		});
	};

	const paisSelecionadoChangeHandler = (e) => {
		guardarInformacionPersonal({
			...informacionPersonalContext,
			pais: e.target.value,
		});
	};

	const departamentoSelecionadoChangeHandler = (e) => {
		guardarInformacionPersonal({
			...informacionPersonalContext,
			departamento: e.target.value,
		});
	};

	const municipioSelecionadoChangeHandler = (e) => {
		guardarInformacionPersonal({
			...informacionPersonalContext,
			municipio: e.target.value,
		});
	};

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
	const [initialFormState, guardarEstudiosRealizados] = useState({
		id: null,
		nombreTitulo: '',
		entidad: '',
		calificacion: '',
		tipo: '',
		tiempo: '',
	});

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

	//SECCION REFERENCIAS PERSONALES/FAMILIARES
	const [
		referencias_Familiares_Context,
		guardarReferenciasFamiliaresRF1,
	] = useState({
		nombresRF1: '',
		apellidosRF1: '',
		telefonoRF1: '',
		parentescoRF1: '',
	});
	const {
		nombresRF1,
		apellidosRF1,
		telefonoRF1,
		parentescoRF1,
	} = referencias_Familiares_Context;

	//RF2
	const [
		referencias_Familiares_rf2_Context,
		guardarReferenciasFamiliaresRF2,
	] = useState({
		nombresRF2: '',
		apellidosRF2: '',
		telefonoRF2: '',
		parentescoRF2: '',
	});
	const {
		nombresRF2,
		apellidosRF2,
		telefonoRF2,
		parentescoRF2,
	} = referencias_Familiares_rf2_Context;

	//REFERENCIAS PERSONALES
	const [
		referencias_Personales_rp1_Context,
		guardarReferenciasPersonales1,
	] = useState({
		nombresRP1: '',
		apellidosRP1: '',
		telefonoRP1: '',
	});
	const {
		nombresRP1,
		apellidosRP1,
		telefonoRP1,
	} = referencias_Personales_rp1_Context;
	//Referencias_Personales_2

	const [
		referencias_Personales_rp2_Context,
		guardarReferenciasPersonales2,
	] = useState({
		nombresRP2: '',
		apellidosRP2: '',
		telefonoRP2: '',
	});
	const {
		nombresRP2,
		apellidosRP2,
		telefonoRP2,
	} = referencias_Personales_rp2_Context;

	//SECCION PAISES-DEPARTAMENTOS-MUNICIPIOS
	//Crear el state del context
	const [paises, setPaises] = useState([]);
	//Pais seleccionado
	const [paisSeleccionadoContext, setPaisSeleccionadoContext] = useState({
		paisId: '',
		nombre: '',
	});
	//Crear el array departamentos segun sea el pais
	const [departamentos, setDepartamentos] = useState([]);
	//Departamento seleccionado
	const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState({
		departamentoId: '',
		nombre: '',
	});
	//Crear el array municipios segun sea el departamento
	const [municipios, setMunicipios] = useState([]);
	const [municipioSeleccionado, setMunicipioSeleccionado] = useState({
		municipioId: '',
		nombre: '',
	});

	//Ejecutamos el llamado a la API para traer los paises
	useEffect(() => {
		const peticionGet = async () => {
			const url = 'http://localhost:8091/listarPaises';
			const paises = await axios.get(url);
			setPaises(paises.data);
		};
		peticionGet();
	}, []);

	useEffect(() => {
		const peticionGetDepartamentos = async () => {
			const url = `http://localhost:8091/listarDepartamentosPorPais/${pais}`;
			const departamentos = await axios.get(url);
			setDepartamentos(departamentos.data);
		};
		peticionGetDepartamentos();

		//setPaisSeleccionadoContext(pais);
	}, [pais]);

	useEffect(() => {
		const peticionGetMunicipios = async () => {
			const url = `http://localhost:8091/listarMunicipiosPorDepartamento/${departamento}`;
			const municipios = await axios.get(url);
			setMunicipios(municipios.data);
		};
		peticionGetMunicipios();
	}, [departamento]);

	//FIN SECCION PAISES-DEPARTAMENTOS-MUNICIPIOS

	return (
		<HojaDeVidaContext.Provider
			value={{
				paisSelecionadoChangeHandler,
				departamentoSelecionadoChangeHandler,
				municipioSelecionadoChangeHandler,
				tipoDocumentoChangeHandler,
				informacionPersonalContext,
				obtenerInfo,

				estudios,
				setEstudios,
				estudioEditar,
				setEstudioEditar,
				arrayExperienciaLaboral,
				setarrayExperienciaLaboral,
				editarReferenciaLaboral,
				setEditarReferenciaLaboral,
				paises,
				paisSeleccionadoContext,
				setPaisSeleccionadoContext,
				departamentos,
				setDepartamentoSeleccionado,
				municipios,
				setMunicipios,
				referencias_Familiares_Context,
				guardarReferenciasFamiliaresRF1,
				referencias_Familiares_rf2_Context,
				guardarReferenciasFamiliaresRF2,
				referencias_Personales_rp1_Context,
				guardarReferenciasPersonales1,
				referencias_Personales_rp2_Context,
				guardarReferenciasPersonales2,
			}}
		>
			{props.children}
		</HojaDeVidaContext.Provider>
	);
};
export default HojaDeVidaContextProvider;
