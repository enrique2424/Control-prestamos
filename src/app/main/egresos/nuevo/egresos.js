import React, { useEffect, useState, useRef } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import swal from 'app/shared-components/sweetalert/SweetAlert';
import ListaEgreso from 'app/shared-components/lista-egresos/EgresosComponent';
import CircularProgress from '@material-ui/core/CircularProgress';
import FirebaseService from 'app/services/firebaseService';
import firebase from 'firebase/app';

import cnx from './egresosCnx';

const options = [
	{ value: 'DESAYUNO', label: 'DESAYUNO' },
	{ value: 'ALMUERZO', label: 'ALMUERZO' },
	{ value: 'CENA', label: 'CENA' },
	{ value: 'COMBUSTIBLE', label: 'COMBUSTIBLE' },
	{ value: 'POLICIAS', label: 'POLICIAS' },
	{ value: 'OTROS', label: 'OTROS' }
];
export default function Egresos() {
	const { currentUser } = firebase.auth();

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [cargando, setCargando] = useState(false);

	const [egresos, setEgresos] = useState([]);
	const selectInputRef = useRef();

	const initialState = {
		tipo: null,
		descripcion: '',
		monto: '',
		helperText: 'Campos Requeridos',
		error: false
	};
	const [state, setState] = useState(initialState);
	const { tipo, descripcion, monto } = state;

	const obtenerFechaActual = () => {
		const fecha = new Date();
		const dia = fecha.getDate();
		const mes = fecha.getMonth() + 1;
		const anio = fecha.getFullYear();
		return `${dia}/${mes}/${anio}`;
	};

	const handleChange = event => {
		setState({ ...state, [event.target.name]: event.target.value });
	};

	const handleChangeSelect = event => {
		const { value } = event;
		setState({ ...state, tipo: value });
	};

	const registrarEgreso = async () => {
		console.log('registrar egreso');
		console.log(state);
		if (state.descripcion < 1 || state.monto < 1 || state.tipo === null) {
			setState({ ...state, error: true });
			swal.error('Campos Requeridos');
		} else {
			setState({
				...state,
				error: false
			});
			const confirmar = await swal.success();
			if (confirmar.isConfirmed) {
				setCargando(true);
				guardarEgresos();
			}
		}
	};
	const onClear = () => {
		selectInputRef.current.select.clearValue();
	};
	const guardarEgresos = async () => {
		const res = await cnx.post('egresos', {
			tipo: state.tipo,
			descripcion: state.descripcion,
			monto: state.monto,
			idcobrador: currentUser.uid,
			fecha: obtenerFechaActual()
		});
		console.log(res);
		swal.confirm();
		setCargando(false);
		setState(initialState);
		// onClear();
	};

	const getEgresos = async () => {
		FirebaseService.db
			.collection('egresos')
			.where('idcobrador', '==', currentUser.uid)
			.where('fecha', '==', obtenerFechaActual())
			.onSnapshot(querySnapshot => {
				const docs = [];
				querySnapshot.forEach(doc => {
					console.log(doc.data());
					docs.push({ ...doc.data(), id: doc.id });
				});
				console.log(docs);
				setEgresos(docs);
			});
	};

	useEffect(() => {
		console.log('obtenenado datos...');
		getEgresos();
	}, []);

	return (
		<div className="contenedor">
			<Typography variant="h3" className="font-size-h3" gutterBottom>
				Egresos Cobradores
			</Typography>
			<Grid container justify="center">
				<Grid item xs={12} sm={4} className="mb-2">
					<Select
						// ref={selectInputRef}
						name="tipo"
						placeholder="Seleccione el egreso..."
						options={options}
						onChange={handleChangeSelect}
					/>
				</Grid>
			</Grid>
			<Grid container justify="center">
				<Grid item xs={12} sm={3} className="mb-4">
					<TextField
						id="standard-basic"
						label="Descripcion"
						name="descripcion"
						onChange={handleChange}
						defaultValue={state.descripcion}
						value={state.descripcion}
						helperText={state.error && state.helperText && !state.descripcion}
						error={state.error && !state.descripcion}
					/>
				</Grid>
				<Grid item xs={12} sm={3} className="mb-2">
					<TextField
						id="standard-number"
						label="Monto"
						type="number"
						name="monto"
						defaultValue={state.monto}
						value={state.monto}
						onChange={handleChange}
						InputLabelProps={{
							shrink: true
						}}
						helperText={state.error && state.helperText && !state.monto}
						error={state.error && !state.monto}
					/>
				</Grid>
			</Grid>
			<Grid container justify="center">
				<Grid item xs={12} sm={4} className="mb-4">
					{cargando ? (
						<CircularProgress />
					) : (
						<Button variant="contained" color="primary" onClick={registrarEgreso}>
							Guardar
						</Button>
					)}
				</Grid>
			</Grid>
			<Grid container justify="center">
				<Grid item xs={12} sm={4} className="mb-4">
					<ListaEgreso egresos={egresos} />
				</Grid>
			</Grid>
		</div>
	);
}
