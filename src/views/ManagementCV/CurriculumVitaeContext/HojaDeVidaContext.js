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
		municipio,
		direccion,
		telefono,
		correo,
	} = informacionPersonalContext;

	const obtenerInfo = (e) => {
		if (e.target.name == 'telefono') {
			if (e.target.value.toString().length < 11) {
				guardarInformacionPersonal({
					...informacionPersonalContext,
					[e.target.name]: e.target.value,
				});
			}
		} else {
			guardarInformacionPersonal({
				...informacionPersonalContext,
				[e.target.name]: e.target.value,
			});
		}
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

	const obtenerInfoRefFamiliaresRF1 = (e) => {
		if (e.target.name == 'telefonoRF1') {
			if (e.target.value.toString().length < 11) {
				guardarReferenciasFamiliaresRF1({
					...referencias_Familiares_Context,
					[e.target.name]: e.target.value,
				});
			}
		} else {
			guardarReferenciasFamiliaresRF1({
				...referencias_Familiares_Context,
				[e.target.name]: e.target.value,
			});
		}
		/* 
		guardarReferenciasFamiliaresRF1({
			...referencias_Familiares_Context,
			[e.target.name]: e.target.value,
		});
		*/
	};

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
	const obtenerInfoRefFamiliaresRF2 = (e) => {
		//console.log(e.target.name, e.target.value);
		if (e.target.name == 'telefonoRF2') {
			if (e.target.value.toString().length < 11) {
				guardarReferenciasFamiliaresRF2({
					...referencias_Familiares_rf2_Context,
					[e.target.name]: e.target.value,
				});
			}
		} else {
			guardarReferenciasFamiliaresRF2({
				...referencias_Familiares_rf2_Context,
				[e.target.name]: e.target.value,
			});
		}
		/* 
		guardarReferenciasFamiliaresRF2({
			...referencias_Familiares_rf2_Context,
			[e.target.name]: e.target.value,
		});*/
	};

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
	const obtenerInfoRefPersonales1 = (e) => {
		//console.log(e.target.name, e.target.value);
		if (e.target.name == 'telefonoRP1') {
			if (e.target.value.toString().length < 11) {
				guardarReferenciasPersonales1({
					...referencias_Personales_rp1_Context,
					[e.target.name]: e.target.value,
				});
			}
		} else {
			guardarReferenciasPersonales1({
				...referencias_Personales_rp1_Context,
				[e.target.name]: e.target.value,
			});
		} /*
		guardarReferenciasPersonales1({
			...referencias_Personales_rp1_Context,
			[e.target.name]: e.target.value,
		});
		 */
	};
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

	const obtenerInfoRefPersonales2 = (e) => {
		//console.log(e.target.name, e.target.value);
		if (e.target.name == 'telefonoRP2') {
			if (e.target.value.toString().length < 11) {
				guardarReferenciasPersonales2({
					...referencias_Personales_rp2_Context,
					[e.target.name]: e.target.value,
				});
			}
		} else {
			guardarReferenciasPersonales2({
				...referencias_Personales_rp2_Context,
				[e.target.name]: e.target.value,
			});
		} /*
		guardarReferenciasPersonales2({
			...referencias_Personales_rp2_Context,
			[e.target.name]: e.target.value,
		});
		*/
	};

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
	function validarCorreo(correo) {
		var expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
		var esValido = expReg.test(correo);

		return esValido;
	}

	function validarTelefono(telefono) {
		console.log('VERIFICANDO TELEFONO...');
		const expReg = /[3]\d{9}/;
		const esValido = expReg.test(telefono);

		return esValido;
	}
	function validarDocumento(documento) {
		const expReg = /\d/;
		const esValido = expReg.test(documento);

		return esValido;
	}

	const guardarHV = () => {
		if (informacionPersonalContext.nombres == '') {
			swal({
				title: 'Campo vacío en la pestaña: INFORMACIÓN PERSONAL',
				text: 'El nombre no puede estar vacío',
				icon: 'warning',
				button: 'Aceptar',
				timer: '3000',
			});

			return;
		}
		if (informacionPersonalContext.apellidos == '') {
			swal({
				title: 'Campo vacío en la pestaña: INFORMACIÓN PERSONAL',
				text: 'Los apellidos no pueder estar vacios',
				icon: 'warning',
				button: 'Aceptar',
				timer: '3000',
			});
			return;
		}
		if (informacionPersonalContext.tipoDocumento == '') {
			swal({
				title: 'Campo vacío en la pestaña: INFORMACIÓN PERSONAL',
				text: 'Debes elegir un tipo de Documento',
				icon: 'warning',
				button: 'Aceptar',
				timer: '3000',
			});

			return;
		}
		if (!validarDocumento(informacionPersonalContext.numeroDocumento)) {
			swal({
				title: 'Documento incorrecto en la pestaña: INFORMACIÓN PERSONAL',
				text: 'Asegurese de ingresar bien el Documento',
				icon: 'warning',
				button: 'Aceptar',
				timer: '3000',
			});
			return;
		}
		if (informacionPersonalContext.pais == '') {
			swal({
				title: 'Campo vacío en la pestaña: INFORMACIÓN PERSONAL',
				text: 'Debes elegir un tipo país',
				icon: 'warning',
				button: 'Aceptar',
				timer: '3000',
			});

			return;
		}
		if (informacionPersonalContext.departamento == '') {
			swal({
				title: 'Campo vacío en la pestaña: INFORMACIÓN PERSONAL',
				text: 'Debes elegir un tipo departamento',
				icon: 'warning',
				button: 'Aceptar',
				timer: '3000',
			});

			return;
		}
		if (informacionPersonalContext.municipio == '') {
			swal({
				title: 'Campo vacío en la pestaña: INFORMACIÓN PERSONAL',
				text: 'Debes elegir un tipo município',
				icon: 'warning',
				button: 'Aceptar',
				timer: '3000',
			});

			return;
		}
		if (informacionPersonalContext.direccion == '') {
			swal({
				title: 'Campo vacío en la pestaña: INFORMACIÓN PERSONAL',
				text: 'Debes ingresar una dirección',
				icon: 'warning',
				button: 'Aceptar',
				timer: '3000',
			});

			return;
		}

		if (!validarTelefono(informacionPersonalContext.telefono)) {
			swal({
				title: 'Teléfono incorrecto en la pestaña: INFORMACIÓN PERSONAL',
				text:
					'Asegurese de ingresar bien el teléfono y con el formato requerido',
				icon: 'warning',
				button: 'Aceptar',
				timer: '3000',
			});
			return;
		}

		if (!validarCorreo(informacionPersonalContext.correo)) {
			swal({
				title: 'Correo incorrecto en la pestaña: INFORMACIÓN PERSONAL',
				text: 'Asegurese de ingresar bien el correo',
				icon: 'warning',
				button: 'Aceptar',
				timer: '3000',
			});
			return;
		}

		if (estudios.length == 0) {
			swal({
				title: 'Campo vacío en la pestaña: ESTUDIOS REALIZADOS',
				text: 'Debes ingresar al menos un estudio',
				icon: 'warning',
				button: 'Aceptar',
				timer: '3000',
			});

			return;
		}
		if (arrayExperienciaLaboral.length == 0) {
			swal({
				title: 'Campo vacío en la pestaña: EXPERIENCIA LABORAL',
				text: 'Debes ingresar al menos un estudio',
				icon: 'warning',
				button: 'Aceptar',
				timer: '3000',
			});

			return;
		}

		if (referencias_Familiares_Context.nombresRF1 == '') {
			swal({
				title: 'Campo vacío en la pestaña: REFERENCIAS/Referencias Familiares',
				text: 'El campo nombres es obligatorio',
				icon: 'warning',
				button: 'Aceptar',
				timer: '3000',
			});

			return;
		}
		if (referencias_Familiares_Context.apellidosRF1 == '') {
			swal({
				title: 'Campo vacío en la pestaña: REFERENCIAS/Referencias Familiares',
				text: 'El campo apellidos es obligatorio',
				icon: 'warning',
				button: 'Aceptar',
				timer: '3000',
			});

			return;
		}
		if (referencias_Familiares_Context.telefonoRF1 == '') {
			swal({
				title: 'Campo vacío en la pestaña: REFERENCIAS/Referencias Familiares',
				text: 'El campo teléfono es obligatorio',
				icon: 'warning',
				button: 'Aceptar',
				timer: '3000',
			});

			return;
		}
		if (!validarTelefono(referencias_Familiares_Context.telefonoRF1)) {
			swal({
				title:
					'Teléfono incorrecto en la pestaña: REFERENCIA/REFERENCIA PERSONAL',
				text:
					'Asegurese de ingresar bien el teléfono y con el formato requerido',
				icon: 'warning',
				button: 'Aceptar',
				timer: '3000',
			});
			return;
		}

		if (referencias_Familiares_Context.parentescoRF1 == '') {
			swal({
				title: 'Campo vacío en la pestaña: REFERENCIAS/Referencias Familiares',
				text: 'El campo parentesco es obligatorio',
				icon: 'warning',
				button: 'Aceptar',
				timer: '3000',
			});

			return;
		}

		if (
			referencias_Familiares_Context.nombresRF1.toLocaleLowerCase() ==
				referencias_Familiares_rf2_Context.nombresRF2.toLocaleLowerCase() &&
			referencias_Familiares_Context.apellidosRF1.toLocaleLowerCase() ==
				referencias_Familiares_rf2_Context.apellidosRF2.toLocaleLowerCase()
		) {
			swal({
				title: 'REFERENCIAS/Referencias Familiares',
				text: 'Referencias Familiares Repetidas',
				icon: 'warning',
				button: 'Aceptar',
				timer: '3000',
			});

			return;
		}
		if (referencias_Personales_rp1_Context.nombresRP1 == '') {
			swal({
				title: 'Campo vacío en la pestaña: REFERENCIAS/Referencias Personales',
				text: 'El campo nombres es obligatorio',
				icon: 'warning',
				button: 'Aceptar',
				timer: '3000',
			});

			return;
		}
		if (referencias_Personales_rp1_Context.apellidosRP1 == '') {
			swal({
				title: 'Campo vacío en la pestaña: REFERENCIAS/Referencias Personales',
				text: 'El campo apellidos es obligatorio',
				icon: 'warning',
				button: 'Aceptar',
				timer: '3000',
			});

			return;
		}
		if (referencias_Personales_rp1_Context.telefonoRP1 == '') {
			swal({
				title: 'Campo vacío en la pestaña: REFERENCIAS/Referencias Personales',
				text: 'El campo teléfono es obligatorio',
				icon: 'warning',
				button: 'Aceptar',
				timer: '3000',
			});

			return;
		}
		if (!validarTelefono(referencias_Personales_rp1_Context.telefonoRP1)) {
			swal({
				title:
					'Teléfono incorrecto en la pestaña: REFERENCIA/REFERENCIA PERSONAL',
				text:
					'Asegurese de ingresar bien el teléfono y con el formato requerido',
				icon: 'warning',
				button: 'Aceptar',
				timer: '3000',
			});
			return;
		}
		let response;

		var authOptions = {
			method: 'POST',
			url: 'http://localhost:8092/hojas-vida',
			data: {
				nitEmpresa: '1',
				estadoPersona: 'PROSPECTO',
				numeroDocumento: informacionPersonalContext.numeroDocumento,
				tipoDocumento: informacionPersonalContext.tipoDocumento,
				nombres: informacionPersonalContext.nombres,
				apellidos: informacionPersonalContext.apellidos,
				telefono: informacionPersonalContext.telefono,
				correo: informacionPersonalContext.correo,
				municipioId: informacionPersonalContext.municipio,
				direccion: informacionPersonalContext.direccion,
				calificacion: '8.0',
				referenciasFamiliares: [
					{
						nombres: referencias_Familiares_Context.nombresRF1,
						apellidos: referencias_Familiares_Context.apellidosRF1,
						telefono: referencias_Familiares_Context.telefonoRF1,
						parentesco: referencias_Familiares_Context.parentescoRF1,
					},
					{
						nombres: referencias_Familiares_rf2_Context.nombresRF2,
						apellidos: referencias_Familiares_rf2_Context.apellidosRF2,
						telefono: referencias_Familiares_rf2_Context.telefonoRF2,
						parentesco: referencias_Familiares_rf2_Context.parentescoRF2,
					},
				],

				referenciasPersonales: [
					{
						nombres: referencias_Personales_rp1_Context.nombresRP1,
						apellidos: referencias_Personales_rp1_Context.apellidosRP1,
						telefono: referencias_Personales_rp1_Context.telefonoRP1,
					},
					{
						nombres: referencias_Personales_rp2_Context.nombresRP2,
						apellidos: referencias_Personales_rp2_Context.apellidosRP2,
						telefono: referencias_Personales_rp2_Context.telefonoRP2,
					},
				],
				experienciasLaborales: arrayExperienciaLaboral,
				estudios: estudios,
			},
			json: true,
		};
		console.log(authOptions);
		axios(authOptions)
			.then(function (response) {
				swal({
					title: 'Hoja de Vida registrada',
					text: 'La hoja de vida ha sido registrada con éxito',
					icon: 'success',
					button: 'Aceptar',
					timer: '3000',
				}).then((result) => {
					if (result) {
						window.location.href = '/listar_hojas_de_vida';
					}
				});
				window.location.href = '/listar_hojas_de_vida';
			})
			.catch(function (error) {
				swal({
					title: 'Hoja de Vida Cancelada',
					text: 'Ocurrió un error al crear la hoja de vida',
					icon: 'error',
					button: 'Aceptar',
					timer: '3000',
				});

				console.log(error);
			});

		//console.log(authOptions);
	};

	return (
		<HojaDeVidaContext.Provider
			value={{
				paisSelecionadoChangeHandler,
				departamentoSelecionadoChangeHandler,
				municipioSelecionadoChangeHandler,
				tipoDocumentoChangeHandler,
				informacionPersonalContext,
				guardarInformacionPersonal,
				obtenerInfo,
				validarTelefono,
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
				obtenerInfoRefFamiliaresRF1,
				obtenerInfoRefFamiliaresRF2,
				obtenerInfoRefPersonales1,
				obtenerInfoRefPersonales2,
				guardarHV,
			}}
		>
			{props.children}
		</HojaDeVidaContext.Provider>
	);
};
export default HojaDeVidaContextProvider;
