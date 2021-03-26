import React from 'react';
import { Table } from 'reactstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

const TablaExperienciaLaboral = (props) => {
	return (
		<Table>
			<thead>
				<tr>
					<th>Nombre de la Empresa</th>
					<th>Teléfono</th>
					<th>Contacto</th>
					<th>Cargo</th>
					<th>Tiempo</th>
					<th>Calificación</th>
					<th>Acciones</th>
				</tr>
			</thead>

			<tbody>
				{props.arrayExperienciaLaboral.length > 0 ? (
					props.arrayExperienciaLaboral.map((experienciaLaboral) => (
						<tr key={experienciaLaboral.id}>
							<td>{experienciaLaboral.nombreEmpresa}</td>
							<td>{experienciaLaboral.telefonoEmpresa}</td>
							<td>{experienciaLaboral.contacto}</td>
							<td>{experienciaLaboral.cargoEmpresa}</td>
							<td>{experienciaLaboral.tiempo}</td>
							<td>{experienciaLaboral.calificacion}</td>
							<td>
								<IconButton
									aria-label="editar"
									color="primary"
									onClick={() => {
										props.editRow(experienciaLaboral);
										props.setModoEditar(true);
									}}
								>
									<EditIcon />
								</IconButton>{' '}
								<IconButton
									aria-label="delete"
									color="secondary"
									onClick={() => {
										props.eliminarExperienciaLaboral(experienciaLaboral.id);
									}}
								>
									<DeleteIcon />
								</IconButton>
							</td>
						</tr>
					))
				) : (
					<tr>
						<td>Sin experiencia Laboral registrada</td>
					</tr>
				)}
			</tbody>
		</Table>
	);
};

export default TablaExperienciaLaboral;
