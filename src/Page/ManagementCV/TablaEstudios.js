import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { Table, Modal } from 'reactstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

const TablaEstudios = (props) => {
	//console.log(props);

	const eliminar = (estudio) => {
		if (estudio.nombreTitulo === '') {
			props.eliminarEstudio(estudio.id);
		}
	};

	return (
		<Table style={{ width: '100%' }}>
			<thead>
				<tr>
					<th>Titulo</th>
					<th>Entidad</th>
					<th>Calificación</th>
					<th>Tipo</th>
					<th>Tiempo</th>
					<th>Acciones</th>
				</tr>
			</thead>

			<tbody>
				{props.estudios.length > 0 ? (
					props.estudios.map((estudio) => (
						<tr key={estudio.id}>
							<td>{estudio.nombreTitulo}</td>
							<td>{estudio.entidad}</td>
							<td>{estudio.calificacion}</td>
							<td>{estudio.tipo}</td>
							<td>{estudio.tiempo}</td>
							<td>
								<IconButton
									aria-label="editar"
									color="primary"
									onClick={() => {
										props.editRow(estudio);
										props.setModoEditar(true);
									}}
								>
									<EditIcon />
								</IconButton>{' '}
								<IconButton
									aria-label="delete"
									color="secondary"
									onClick={() => {
										props.eliminarEstudio(estudio.id);
										eliminar(estudio);
									}}
								>
									<DeleteIcon />
								</IconButton>
							</td>
						</tr>
					))
				) : (
					<tr>
						<td>Sin estudios registrados</td>
					</tr>
				)}
			</tbody>
		</Table>
	);
};

export default TablaEstudios;
