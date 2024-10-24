import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import AsyncSelect from 'react-select/async';
import CircularProgress from '@material-ui/core/CircularProgress';
import DataGrid from 'app/shared-components/DataGrid/DataGrid';
import cnx from './buscarClienteCnx';

// const filterColors = (inputValue: string) => {
//   return colourOptions.filter((i) =>
//     i.label.toLowerCase().includes(inputValue.toLowerCase())
//   );
// };

// const promiseOptions = (inputValue: string) =>
//   new Promise<ColourOption[]>((resolve) => {
//     setTimeout(() => {
//       resolve(filterColors(inputValue));
//     }, 1000);
//   });

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing.unit * 2,
		textAlign: 'center',
		color: theme.palette.text.secondary
	}
}));

const options = [];

const cobradores = async () => {
	const res = await cnx.get('usuarios', 'rol', 'cobrador');
	console.log(res);
	const valor = res.map(x => ({
		value: x.id,
		label: `${x.nombre} ${x.apellidos}`
	}));
	return valor;
};

export default function BuscarClientes(props) {
	const [cargando, setCargando] = useState(false);
	const [datos, setDatos] = useState([]);

	const classes = useStyles();
	// useEffect(() => {
	// 	const cobradores = async () => {
	// 		const res = await cnx.obtenerCobradores('usuarios', 'rol', 'cobrador');
	// 		console.log(res);
	// 		const valor = res.map(x => ({
	// 			value: x.id,
	// 			label: `${x.nombre} ${x.apellidos}`
	// 		}));
	// 		return valor;
	// 	};
	// 	cobradores();
	// }, []);

	const clientes = async id => {
		const res = await cnx.get('clientes', 'idusuario', id);
		console.log('clientes', res);
		setDatos(res);
		setCargando(false);
	};

	const onChange = x => {
		setCargando(true);
		const { label, value } = x;
		console.log(value);
		clientes(value);
	};
	return (
		<div className="contenedor">
			<Typography variant="h3" className="font-size-h3" gutterBottom>
				Seguimiento Clientes
			</Typography>
			<Grid container justify="center">
				<Grid item xs={12} sm={4} className="mb-4">
					<AsyncSelect
						placeholder="Buscar Cobradores...."
						cacheOptions
						defaultOptions
						loadOptions={cobradores}
						onChange={onChange}
					/>
				</Grid>
				<Grid item xs={12} sm={12}>
					{cargando ? <CircularProgress /> : <DataGrid datos={datos} />}
				</Grid>
			</Grid>
		</div>
	);
}
