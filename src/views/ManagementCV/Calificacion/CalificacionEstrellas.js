import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const CalificacionEstrellas = ({
	calificacion,
	obtenerInfoEstudiosRealizados,
}) => {
	//const [calificacion, setCalificacion] = useState(null);
	const [hover, setHover] = useState(null);

	return (
		<div>
			{[...Array(5)].map((star, i) => {
				const calificacionValue = i + 1;
				return (
					<label>
						<input
							type="radio"
							style={{ display: 'none' }}
							value={calificacionValue}
							name={'calificacion'}
							onClick={(e) => {
								obtenerInfoEstudiosRealizados(e);
							}}
						/>
						<FaStar
							color={
								calificacionValue <= (hover || calificacion)
									? '#ffc107'
									: '#424242'
							}
							onMouseEnter={() => setHover(calificacionValue)}
							onMouseLeave={() => setHover(null)}
						/>
					</label>
				);
			})}
		</div>
	);
};

export default CalificacionEstrellas;
