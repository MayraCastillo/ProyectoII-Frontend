/// <reference types="cypress"/>
import { render } from '@testing-library/react';

//Nos permite describir todas las pruebas de hojas de vida
describe('<HojaDeVidaContext/>', () => {
	it('<HojaDeVidaContext/> -- Verificar Campos vacíos -- [Nombres]', () => {
		cy.visit('/');
		//Probar el titulo
		cy.contains('GESTION HOJA DE VIDA');
		cy.get('[data-cy=tab-estudios-realizados]').click();
		cy.get('[data-cy=tab-experiencia-laboral]').click();
		cy.get('[data-cy=tab-referencias]').click();
		cy.get('[data-cy=btn-guardar-hv]').click();
		cy.get('[data-cy=tab-informacion-personal]').pause().click();
		cy.get('[data-cy=input-informacion-personal-nombres]').type('Alexander');
		cy.get('[data-cy=tab-referencias]').click();
		cy.get('[data-cy=btn-guardar-hv]').click();
		cy.get('[data-cy=tab-informacion-personal]').click();
	});
	it('<HojaDeVidaContext/> -- Verificar Campos vacíos -- [Apellidos]', () => {
		cy.visit('/');
		//Probar el titulo
		cy.contains('GESTION HOJA DE VIDA');

		cy.get('[data-cy=input-informacion-personal-nombres]').type('Alexander');
		cy.get('[data-cy=tab-referencias]').click();
		cy.get('[data-cy=btn-guardar-hv]').click();
		cy.get('[data-cy=tab-informacion-personal]').click();
		cy.get('[data-cy=input-informacion-personal-apellidos]').type('Lopez');
	});

	it('<HojaDeVidaContext/> -- Verificar Campos vacíos -- [Tipo Documento]', () => {
		cy.visit('/');
		//Probar el titulo
		cy.contains('GESTION HOJA DE VIDA');

		cy.get('[data-cy=input-informacion-personal-nombres]').type('Alexander');
		cy.get('[data-cy=input-informacion-personal-apellidos]').type('Lopez');
		cy.get('[data-cy=tab-referencias]').click();
		cy.get('[data-cy=btn-guardar-hv]').click();
		cy.get('[data-cy=tab-informacion-personal]').click();
		cy.get('[data-cy=input-informacion-personal-tipoDoc]')
			.select('Cédula Ciudadanía')
			.should('have.value', 'CEDULA');
	});
	it('<HojaDeVidaContext/> -- Verificar Campos vacíos -- [Numero Documento]', () => {
		cy.visit('/');
		//Probar el titulo
		cy.contains('GESTION HOJA DE VIDA');

		cy.get('[data-cy=input-informacion-personal-nombres]').type('Alexander');
		cy.get('[data-cy=input-informacion-personal-apellidos]').type('Lopez');
		cy.get('[data-cy=input-informacion-personal-tipoDoc]')
			.select('Cédula Ciudadanía')
			.should('have.value', 'CEDULA');
		cy.get('[data-cy=tab-referencias]').click();
		cy.get('[data-cy=btn-guardar-hv]').click();
		cy.get('[data-cy=tab-informacion-personal]').click();
		cy.get('[data-cy=input-informacion-personal-numDocumento]').type(
			'1061753965'
		);
		cy.get('[data-cy=tab-referencias]').click();
		cy.get('[data-cy=btn-guardar-hv]').click();
	});

	it('<HojaDeVidaContext/> -- Verificar Duplicado -- [Numero Documento]', () => {
		cy.visit('/');
		//Probar el titulo
		cy.contains('GESTION HOJA DE VIDA');

		cy.get('[data-cy=input-informacion-personal-nombres]').type('Alexander');
		cy.get('[data-cy=input-informacion-personal-apellidos]').type('Lopez');
		cy.get('[data-cy=input-informacion-personal-tipoDoc]')
			.select('Cédula Ciudadanía')
			.should('have.value', 'CEDULA');

		cy.get('[data-cy=input-informacion-personal-numDocumento]').type('1');

		cy.get('[data-cy=input-informacion-personal-numDocumento]')
			.pause()
			.clear()
			.type('165898658');
	});

	it('<HojaDeVidaContext/> -- Verificar Campos vacíos -- [País]', () => {
		cy.visit('/');
		cy.get('[data-cy=input-informacion-personal-nombres]').type('Alexander');
		cy.get('[data-cy=input-informacion-personal-apellidos]').type('Lopez');
		cy.get('[data-cy=input-informacion-personal-tipoDoc]')
			.select('Cédula Ciudadanía')
			.should('have.value', 'CEDULA');
		cy.get('[data-cy=input-informacion-personal-numDocumento]').type(
			'1061753965'
		);
		cy.get('[data-cy=tab-referencias]').click();
		cy.get('[data-cy=btn-guardar-hv]').click();
		cy.get('[data-cy=tab-informacion-personal]').click();
		cy.get('[data-cy="input-informacion-personal-pais"]')
			.select('Colombia')
			.should('have.value', '1');
		cy.get('[data-cy=tab-referencias]').click();
		cy.get('[data-cy=btn-guardar-hv]').click();
	});
	it('<HojaDeVidaContext/> -- Verificar Campos vacíos -- [Departamento]', () => {
		cy.visit('/');
		cy.get('[data-cy=input-informacion-personal-nombres]').type('Alexander');
		cy.get('[data-cy=input-informacion-personal-apellidos]').type('Lopez');
		cy.get('[data-cy=input-informacion-personal-tipoDoc]')
			.select('Cédula Ciudadanía')
			.should('have.value', 'CEDULA');
		cy.get('[data-cy=input-informacion-personal-numDocumento]').type(
			'1061753965'
		);

		cy.get('[data-cy="input-informacion-personal-pais"]')
			.select('Colombia')
			.should('have.value', '1');
		cy.get('[data-cy=tab-referencias]').click();
		cy.get('[data-cy=btn-guardar-hv]').click();
		cy.get('[data-cy=tab-informacion-personal]').click();
		cy.get('[data-cy="input-informacion-personal-departamento"]')
			.select('Cauca')
			.should('have.value', '8');
		cy.get('[data-cy=tab-referencias]').click();
		cy.get('[data-cy=btn-guardar-hv]').click();
	});

	it('<HojaDeVidaContext/> -- Verificar Campos vacíos -- [Município]', () => {
		cy.visit('/');
		cy.get('[data-cy=input-informacion-personal-nombres]').type('Alexander');
		cy.get('[data-cy=input-informacion-personal-apellidos]').type('Lopez');
		cy.get('[data-cy=input-informacion-personal-tipoDoc]')
			.select('Cédula Ciudadanía')
			.should('have.value', 'CEDULA');
		cy.get('[data-cy=input-informacion-personal-numDocumento]').type(
			'1061753965'
		);
		cy.get('[data-cy="input-informacion-personal-pais"]')
			.select('Colombia')
			.should('have.value', '1');

		cy.get('[data-cy="input-informacion-personal-departamento"]')
			.select('Cauca')
			.should('have.value', '8');
		cy.get('[data-cy=tab-referencias]').click();
		cy.get('[data-cy=btn-guardar-hv]').click();

		cy.get('[data-cy=tab-informacion-personal]').click();
		cy.get('[data-cy="input-informacion-personal-municipio"]')
			.select('POPAYAN')
			.should('have.value', '381');
		cy.get('[data-cy=tab-referencias]').click();
		cy.get('[data-cy=btn-guardar-hv]').click();
	});

	it('<HojaDeVidaContext/> -- Verificar Campos vacíos -- [Dirección]', () => {
		cy.visit('/');
		cy.get('[data-cy=input-informacion-personal-nombres]').type('Alexander');
		cy.get('[data-cy=input-informacion-personal-apellidos]').type('Lopez');
		cy.get('[data-cy=input-informacion-personal-tipoDoc]')
			.select('Cédula Ciudadanía')
			.should('have.value', 'CEDULA');
		cy.get('[data-cy=input-informacion-personal-numDocumento]').type(
			'1061753965'
		);
		cy.get('[data-cy="input-informacion-personal-pais"]')
			.select('Colombia')
			.should('have.value', '1');

		cy.get('[data-cy="input-informacion-personal-departamento"]')
			.select('Cauca')
			.should('have.value', '8');
		cy.get('[data-cy=tab-informacion-personal]').click();
		cy.get('[data-cy="input-informacion-personal-municipio"]')
			.select('POPAYAN')
			.should('have.value', '381');
		cy.get('[data-cy=tab-referencias]').click();
		cy.get('[data-cy=btn-guardar-hv]').click();
		cy.get('[data-cy=tab-informacion-personal]').click();
		cy.get('[data-cy=input-informacion-personal-direccion]').type('Calle 5');
		cy.get('[data-cy=tab-referencias]').click();
		cy.get('[data-cy=btn-guardar-hv]').click();
	});

	it('<HojaDeVidaContext/> -- Verificar Campos vacíos -- [Teléfono]', () => {
		cy.visit('/');
		cy.get('[data-cy=input-informacion-personal-nombres]').type('Alexander');
		cy.get('[data-cy=input-informacion-personal-apellidos]').type('Lopez');
		cy.get('[data-cy=input-informacion-personal-tipoDoc]')
			.select('Cédula Ciudadanía')
			.should('have.value', 'CEDULA');
		cy.get('[data-cy=input-informacion-personal-numDocumento]').type(
			'1061753965'
		);
		cy.get('[data-cy="input-informacion-personal-pais"]')
			.select('Colombia')
			.should('have.value', '1');

		cy.get('[data-cy="input-informacion-personal-departamento"]')
			.select('Cauca')
			.should('have.value', '8');
		cy.get('[data-cy=tab-informacion-personal]').click();
		cy.get('[data-cy="input-informacion-personal-municipio"]')
			.select('POPAYAN')
			.should('have.value', '381');
		cy.get('[data-cy=input-informacion-personal-direccion]').type('Calle 5');
		cy.get('[data-cy=tab-referencias]').click();
		cy.get('[data-cy=btn-guardar-hv]').click();
		cy.get('[data-cy=tab-informacion-personal]').click();
		cy.get('[data-cy=input-informacion-personal-telefono]').type('3226273554');
		cy.get('[data-cy=tab-referencias]').click();
		cy.get('[data-cy=btn-guardar-hv]').click();
	});

	it('<HojaDeVidaContext/> -- Verificar integridad del campo -- [Teléfono negativo]', () => {
		cy.visit('/');
		cy.get('[data-cy=input-informacion-personal-nombres]').type('Alexander');
		cy.get('[data-cy=input-informacion-personal-apellidos]').type('Lopez');
		cy.get('[data-cy=input-informacion-personal-tipoDoc]')
			.select('Cédula Ciudadanía')
			.should('have.value', 'CEDULA');
		cy.get('[data-cy=input-informacion-personal-numDocumento]').type(
			'1061753965'
		);
		cy.get('[data-cy="input-informacion-personal-pais"]')
			.select('Colombia')
			.should('have.value', '1');

		cy.get('[data-cy="input-informacion-personal-departamento"]')
			.select('Cauca')
			.should('have.value', '8');
		cy.get('[data-cy=tab-informacion-personal]').click();
		cy.get('[data-cy="input-informacion-personal-municipio"]')
			.select('POPAYAN')
			.should('have.value', '381');
		cy.get('[data-cy=input-informacion-personal-direccion]').type('Calle 5');

		cy.get('[data-cy=input-informacion-personal-telefono]').type('-3226273554');
		cy.get('[data-cy=tab-referencias]').click();
		cy.get('[data-cy=btn-guardar-hv]').click();

		cy.get('[data-cy=tab-informacion-personal]').click();
		cy.get('[data-cy=input-informacion-personal-telefono]')
			.clear()
			.type('3226273554');
	});

	it('<HojaDeVidaContext/> -- Verificar integridad del campo -- [Teléfono Formato Incorrecto]', () => {
		cy.visit('/');
		cy.get('[data-cy=input-informacion-personal-nombres]').type('Alexander');
		cy.get('[data-cy=input-informacion-personal-apellidos]').type('Lopez');
		cy.get('[data-cy=input-informacion-personal-tipoDoc]')
			.select('Cédula Ciudadanía')
			.should('have.value', 'CEDULA');
		cy.get('[data-cy=input-informacion-personal-numDocumento]').type(
			'1061753965'
		);
		cy.get('[data-cy="input-informacion-personal-pais"]')
			.select('Colombia')
			.should('have.value', '1');

		cy.get('[data-cy="input-informacion-personal-departamento"]')
			.select('Cauca')
			.should('have.value', '8');
		cy.get('[data-cy=tab-informacion-personal]').click();
		cy.get('[data-cy="input-informacion-personal-municipio"]')
			.select('POPAYAN')
			.should('have.value', '381');
		cy.get('[data-cy=input-informacion-personal-direccion]').type('Calle 5');

		cy.get('[data-cy=input-informacion-personal-telefono]').type('6273554');
		cy.get('[data-cy=tab-referencias]').click();
		cy.get('[data-cy=btn-guardar-hv]').click();

		cy.get('[data-cy=tab-informacion-personal]').click();
		cy.get('[data-cy=input-informacion-personal-telefono]')
			.clear()
			.type('3226273554');
	});

	it('<HojaDeVidaContext/> -- Verificar campos vacíos -- [correo electrónico]', () => {
		cy.visit('/');
		cy.get('[data-cy=input-informacion-personal-nombres]').type('Alexander');
		cy.get('[data-cy=input-informacion-personal-apellidos]').type('Lopez');
		cy.get('[data-cy=input-informacion-personal-tipoDoc]')
			.select('Cédula Ciudadanía')
			.should('have.value', 'CEDULA');
		cy.get('[data-cy=input-informacion-personal-numDocumento]').type(
			'1061753965'
		);
		cy.get('[data-cy="input-informacion-personal-pais"]')
			.select('Colombia')
			.should('have.value', '1');

		cy.get('[data-cy="input-informacion-personal-departamento"]')
			.select('Cauca')
			.should('have.value', '8');
		cy.get('[data-cy=tab-informacion-personal]').click();
		cy.get('[data-cy="input-informacion-personal-municipio"]')
			.select('POPAYAN')
			.should('have.value', '381');
		cy.get('[data-cy=input-informacion-personal-direccion]').type('Calle 5');
		cy.get('[data-cy=input-informacion-personal-telefono]').type('3226256898');

		cy.get('[data-cy=tab-referencias]').click();
		cy.get('[data-cy=btn-guardar-hv]').click();
		cy.get('[data-cy=tab-informacion-personal]').click();
		cy.get('[data-cy=input-informacion-personal-correo]').type(
			'alex@gmail.com'
		);
		cy.get('[data-cy=tab-referencias]').click();
		cy.get('[data-cy=btn-guardar-hv]').click();
	});

	/*
	it('<HojaDeVidaContext/> -- Verificar campos vacíos -- [Estudios Realizados]', () => {
		cy.visit('/');
		cy.get('[data-cy=input-informacion-personal-nombres]').type('Alexander');
		cy.get('[data-cy=input-informacion-personal-apellidos]').type('Lopez');
		cy.get('[data-cy=input-informacion-personal-tipoDoc]')
			.select('Cédula Ciudadanía')
			.should('have.value', 'CEDULA');
		cy.get('[data-cy=input-informacion-personal-numDocumento]').type(
			'1061753965'
		);
		cy.get('[data-cy="input-informacion-personal-pais"]')
			.select('Colombia')
			.should('have.value', '1');

		cy.get('[data-cy="input-informacion-personal-departamento"]')
			.select('Cauca')
			.should('have.value', '8');
		cy.get('[data-cy=tab-informacion-personal]').click();
		cy.get('[data-cy="input-informacion-personal-municipio"]')
			.select('POPAYAN')
			.should('have.value', '381');
		cy.get('[data-cy=input-informacion-personal-direccion]').type('Calle 5');
		cy.get('[data-cy=input-informacion-personal-telefono]').type('3226256898');

		cy.get('[data-cy=input-informacion-personal-correo]').type(
			'alex@gmail.com'
		);

		cy.get('[data-cy="tab-estudios-realizados"').click();
		cy.get('[data-cy=tab-referencias]').click();
		cy.get('[data-cy=btn-guardar-hv]').click();

		cy.get('[data-cy="tab-estudios-realizados"').click();
		cy.get('[data-cy="btn-estudios-realizados"').click();

		cy.get('[data-cy=input-estudios-realizados-titulo]').type('Ingeniería');
		cy.get('[data-cy=input-estudios-realizados-institucion]').type(
			'Universidad Del Cauca'
		);
		cy.get('[data-cy=input-estudios-realizados-tipo]').type('Profesional');
		cy.get('[data-cy=input-estudios-realizados-tiempo]').type('5 años');
		cy.get('[data-cy=input-estudios-realizados-calificacion]').check('3');

		render();
	});
	/* 
	it('<HojaDeVidaContext/> -- Verificar Formulario', () => {
		cy.visit('/');

		//Probar el titulo
		cy.contains('GESTION HOJA DE VIDA');
		//Formulario
		cy.get('[data-cy=input-informacion-personal-nombres]').type('Alexander');
		cy.get('[data-cy=input-informacion-personal-apellidos]').type('Lopez');
		cy.get('[data-cy=input-informacion-personal-tipoDoc]')
			.select('Cédula Ciudadanía')
			.should('have.value', 'CEDULA');
		cy.get('[data-cy=input-informacion-personal-numDocumento]').type('1');
		cy.get('[data-cy=input-informacion-personal-direccion]').type('Calle 5');
		cy.get('[data-cy=input-informacion-personal-numDocumento]')
			.clear()
			.type('1061');

		cy.get('[data-cy="input-informacion-personal-pais"]')
			.select('Colombia')
			.should('have.value', '1');
		cy.get('[data-cy="input-informacion-personal-departamento"]')
			.select('Cauca')
			.should('have.value', '8');
		cy.get('[data-cy="input-informacion-personal-municipio"]')
			.select('POPAYAN')
			.should('have.value', '381');
		cy.get('[data-cy=input-informacion-personal-direccion]').type('Calle 5');
		cy.get('[data-cy=input-informacion-personal-telefono]').type('322627');
		cy.get('[data-cy=input-informacion-personal-correo]').type(
			'alex@gmail.com'
		);

		/*			
		cy.get('[data-cy=tab-estudios-realizados]').click();
		//cy.get('[data-cy=btn-estudios-realizados]').click();
		cy.get('[data-cy=tab-experiencia-laboral]').click();
		cy.get('[data-cy=tab-referencias]').click();
		//cy.get('[data-cy=btn-estudios-realizados]').click();
		cy.get('[data-cy=btn-guardar-hv]').click();

	
	});
	*/
});
