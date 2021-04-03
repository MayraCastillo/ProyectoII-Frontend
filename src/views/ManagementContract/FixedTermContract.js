import React from 'react';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '20px',
        maxHeight: '510px',
        overflowY: 'scroll',
        border: '1px solid #154c79',
        boxShadow: '2px 2px 10px #666',
    },
}));

export default function CreateContract(props) {
	const styles = useStyles();
	const classes = useStyles(); 
	
    const bodyIntroduction = (
		<p>
            Entre las partes, por un lado <i style={{background: 'lightblue'}}>{props.nameEmployer}</i>, domiciliado en la ciudad  
            de <i style={{background: 'lightblue'}}>{props.addressEmployer}</i>, representante legal de <i style={{background: 'lightblue'}}>{props.nameCompany}</i>, con NIT <i style={{background: 'lightblue'}}>{props.nitCompany}</i>, 
            quien en adelante y para los efectos del presente contrato se denomina como EL EMPLEADOR, 
            y por el otro, <i style={{background: 'lightblue'}}>{props.nameEmployee}</i>, domiciliado en la ciudad de <i style={{background: 'lightblue'}}>{props.addressEmployee}</i>, 
            quien en adelante y para los efectos del presente contrato se denomina como EL TRABAJADOR, 
            ambos mayores de edad, identificados como aparece al pie de las firmas, hemos acordado 
            suscribir este contrato de trabajo, el cual se regirá por las siguientes cláusulas:
        </p>
	);
    
    const bodyClauses = (
		<p>
            <b>Artículo 1</b>. Naturaleza y Objeto. Se trata de un contrato de trabajo a término fijo, 
            en vigencia del cual el EMPLEADOR contrata al TRABAJADOR para que este de forma personal, 
            dirija su capacidad de trabajo en aras de la prestación de servicios y desempeño de las 
            actividades propias del cargo de {props.positionEmployee}, y como contraprestación el 
            EMPLEADOR pagará una remuneración.<br /><br />

            <b>Artículo 2</b>. Obligaciones de las partes

            <ol>
            <li value="1">Del EMPLEADOR</li>
                <ol>
                <li value="a)">Pagar en la forma pactada el monto equivalente a la remuneración.</li>
                <li>Realizar la afiliación y correspondiente aporte a parafiscales.</li>
                <li>Dotar al TRABAJADOR de los elementos de trabajo necesarios para el correcto 
                    desempeño de la gestión contratada.</li>
                <li>Las obligaciones especiales enunciadas en los artículos 56 y 57 del Código 
                    Sustantivo del Trabajo. (para ver de qué tratan estos artículos,   
                    consulte <a href="http://www.suin-juriscol.gov.co/viewDocument.asp?id=1874133" 
                    target="_blank">aquí</a>)</li>
                {props.obligationsEmployer.map((obligation) => (
                    <li> {obligation} </li>
				))}
                </ol>
            <br />

            <li>Del TRABAJADOR</li>
                <ol>
                <li value="a)">Cumplir a cabalidad con el objeto del contrato, en la forma convenida.</li>
                <li>Las obligaciones especiales enunciadas en los artículos 56 y 58 del Código Sustantivo 
                    del Trabajo. (para ver de qué tratan estos artículos,   
                    consulte <a href="http://www.suin-juriscol.gov.co/viewDocument.asp?id=1874133" 
                    target="_blank">aquí</a>)</li>
                {props.obligationsEmployee.map((obligation) => (
                    <li> {obligation} </li>
				))} </ol>
            </ol>
            
            <b>Artículo 3</b>. Lugar de prestación del servicio. El TRABAJADOR prestará sus servicios de forma 
            personal, en {props.addressCompany}; dirección que corresponde al domicilio de la empresa.<br /><br />

            <b>Artículo 4</b>. Jornada de trabajo. La jornada de trabajo será de: {props.scheduleEmployee}.<br /><br />

            <b>Artículo 5</b>. Remuneración. El EMPLEADOR deberá pagar al TRABAJADOR, a título de 
            remuneración por las actividades un monto de ${props.salaryNumEmployee} ({props.salaryStringEmployee} pesos). 
            <br /><br />

            <b>Artículo 6</b>. Forma de pago. La forma de pago del salario señalado en la cláusula 
            anterior, se realizará de forma: {props.paymentPeriodicity}. El pago se hará de la siguiente manera: {props.wayToPay}.
           <br /><br />

            <b>Artículo 7</b>. Duración del contrato. El presente contrato será por el término  
            de {props.contractDuration} dias, prorrogables de forma automática por un término igual 
            al inicialmente pactado.
            <br /><br />

            <b>Artículo 8</b>. Preaviso. La parte que desee terminar el contrato, así deberá notificarlo 
            por escrito dentro de los 30 días anteriores al vencimiento del término de duración.
            <br /><br />

            <b>Artículo 9</b>. Terminación unilateral del contrato. El presente contrato se podrá terminar 
            unilateralmente y sin indemnización alguna, por cualquiera de las partes, siempre y cuando se 
            configure algunas de las situaciones previstas en el artículo 62 del Código Sustantivo del 
            Trabajo o haya incumplimiento grave de alguna cláusula prevista en el contrato de trabajo. 
            Se considera incumplimiento grave el desconocimiento de las obligaciones o prohibiciones 
            previstas en el contrato. 
            <br /><br />

            <b>Artículo 10</b>. Domicilio de las partes. Para todos los efectos legales y convencionales, 
            el domicilio de las partes es: el EMPLEADOR: la ciudad de {props.addressEmployer}, en la 
            dirección {props.directionEmployer}; y el TRABAJADOR, la ciudad de {props.addressEmployee}, en la 
            dirección {props.directionEmployee}.
            <br /><br />

            <b>Artículo 11</b>. Artículo 11. Integridad. El presente contrato, remplaza en su integridad 
            y deja sin efecto cualquier acuerdo de voluntades que sea haya pactado con anterioridad a la 
            suscripción del mismo. 
            <br />

            {props.clauses.map((clause) => (
                <p><b>Cláusula Adicional</b>. {clause}</p>
			))}
        </p>
	);

    const bodyFirms = (
        <div>
            <p>
                En señal de conformidad, las partes suscriben el presente contrato, en dos ejemplares del 
                mismo tenor, el día (especificar la fecha).
            </p>
        
            <GridContainer style={{textAlign: 'Center'}}>
                <GridItem xs={12} sm={12} md={6}>
                    <p>
                        <b>EL EMPLEADOR,</b><br /><br />
                        ___________________________ <br />
                        {props.nameEmployer} <br/>
                        C.C. {props.idEmployer}
                    </p>
                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                    <p>
                        <b>EL TRABAJADOR,</b><br /><br />
                        ___________________________ <br />
                        {props.nameEmployee} <br/>
                        C.C. {props.idEmployee}
                    </p>
                </GridItem>
            </GridContainer>
        </div>
	);


	return (
		<div>
            <Card className={styles.root}>
                <CardContent>
                    <Typography variant="h5" component="h2"> 
                        <b>CONTRATO LABORAL A TÉRMINO FIJO</b>
                    </Typography><br />
                                
                    <Typography variant="body2" component="p" style={{textAlign: 'justify'}}>
                        <b style={{textTransform: 'uppercase'}}>
                            CONTRATO DE TRABAJO ENTRE {props.nameEmployer} Y {props.nameEmployee}
                        </b>
                        <br />
                        {bodyIntroduction}
                        {bodyClauses}
                        {bodyFirms}
                    </Typography>
                </CardContent>
            </Card>
			
        </div>
	);
}
