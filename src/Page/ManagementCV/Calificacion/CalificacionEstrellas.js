import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const CalificacionEstrellas = () => {
	const [calificacion, setCalificacion] = useState(null);
	const [hover, setHover] = useState(null);
	return (
		<div>
			{[...Array(5)].map((star, i) => {
				const calificacionValor = i + 1;
				return (
					<label>
						<input
							type="radio"
							id="rating"
							style={{ display: 'none' }}
							value={calificacionValor}
							onClick={() => setCalificacion(calificacionValor)}
						/>
						<FaStar
							color={
								calificacionValor <= (hover || calificacion)
									? '#ffc107'
									: '#424242'
							}
							onMouseEnter={() => setHover(calificacionValor)}
							onMouseLeave={() => setHover(null)}
						/>
					</label>
				);
			})}
		</div>
	);
};

export default CalificacionEstrellas;
