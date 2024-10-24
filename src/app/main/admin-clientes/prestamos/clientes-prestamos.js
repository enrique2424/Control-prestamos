import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import DataGrid from 'app/shared-components/DataGrid/DataGridPrestamos';

import cnx from './clientePrestamosCnx';

let nom;
let ape;
let tel;

export default function ClientesPrestamos(props) {
	const [cargando, setCargando] = useState(true);
	const [datos, setDatos] = useState([]);

	const { state } = props.location;

	useEffect(() => {
		console.log(state);
		const { id, nombre, apellidos, telefono } = state;
		nom = nombre;
		ape = apellidos;
		tel = telefono;
		const obtenerPrestamos = async () => {
			const res = await cnx.get('prestamos', 'idCliente', id);
			console.log(res);
			setDatos(res);
			setCargando(false);
		};
		obtenerPrestamos();
	}, []);

	return (
		<div className="contenedor">
			<Typography variant="h3" className="font-size-h3" gutterBottom>
				Historial de Prestamos Clientes
			</Typography>
			<Typography variant="h6" gutterBottom>
				Nombre : {nom} {ape}
			</Typography>
			<Typography variant="h6" className="mb-4" gutterBottom>
				Tel: {tel}
			</Typography>
			<Grid container justify="center">
				<Grid item xs={12} sm={12}>
					{cargando ? <CircularProgress /> : <DataGrid datos={datos} />}
				</Grid>
			</Grid>
		</div>
	);
}
