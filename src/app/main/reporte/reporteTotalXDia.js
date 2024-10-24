import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AsyncSelect from 'react-select/async';
import ListaReportexDia from 'app/shared-components/reportes/listaReportexDia';
import cnx from './reporteTotalXDiaCnx';

const ArrayCobradores = [];
const cobradores = async () => {
	ArrayCobradores.length = 0;
	const res = await cnx.get('usuarios', 'rol', 'cobrador');
	console.log(ArrayCobradores);
	console.log(res);
	const valor = res.map(x => ({
		value: x.id,
		label: `${x.nombre} ${x.apellidos}`
	}));
	return valor;
};

const prestamos = async id => {
	// documento, primaryKey, secundaryKey, threeKey, terminoUno, terminoDos, terminoTres
	const res = await cnx.getThree('prestamos', 'idCobrador', 'estado', 'created', id, 'ACTIVO');
	console.log(res);
	return res;
};

export default function ReporteTotalXdia() {
	const [cargando, setCargando] = useState(false);
	const [datos, setDatos] = useState([]);
	const onChange = x => {
		setCargando(true);
		const { label, value } = x;
		console.log(value);
		prestamos(value);
		// clientes(value);
	};
	return (
		<div className="contenedor">
			<Typography variant="h3" className="font-size-h3" gutterBottom>
				Reporte Total por dia Cobradores
			</Typography>

			<Grid container justify="center">
				<Grid item xs={12} sm={4} className="mb-4 zindex3">
					<AsyncSelect
						placeholder="Buscar Cobradores...."
						cacheOptions
						defaultOptions
						loadOptions={cobradores}
						onChange={onChange}
					/>
				</Grid>
				<Grid item xs={12} sm={12} className="mb-4 zindex2">
					<Typography variant="h5" className="font-size-h5" gutterBottom>
						Egresos
					</Typography>
				</Grid>
				<Grid item xs={12} sm={8} className="mb-4">
					<ListaReportexDia />
				</Grid>
				<Grid item xs={12} sm={12} className="mb-4">
					<Typography variant="h5" className="font-size-h5" gutterBottom>
						Ingresos
					</Typography>
				</Grid>
				<Grid item xs={12} sm={8} className="mb-4">
					<ListaReportexDia />
				</Grid>
				<Grid item xs={12} sm={12} className="mb-4">
					<Typography variant="h5" className="font-size-h5" gutterBottom>
						Totales
					</Typography>
				</Grid>
				<Grid item xs={12} sm={8} className="mb-4">
					<ListaReportexDia />
				</Grid>
			</Grid>
		</div>
	);
}
