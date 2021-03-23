//Imports
import { createContext, useState } from 'react';

//Creamos el Context
export const InformacionPersonalContext = createContext();

//Provider es donde se encuentran las funciones y el state
const InformacionPersonalProvider = (props) => {
	//Crear el state del context
	const [informacionPersonal, guardarInformacionPersonal] = useState(null);

	return (
		<InformacionPersonalContext.Provider
			value={{
				informacionPersonal,
			}}
		>
			{props.children}
		</InformacionPersonalContext.Provider>
	);
};
export default InformacionPersonalProvider;
