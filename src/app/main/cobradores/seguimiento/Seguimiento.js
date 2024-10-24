import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import DialogComponent from 'app/shared-components/dialog/Dialog';
import DialogComponentC from 'app/shared-components/dialog/DialogCerrar';
import Acordion from 'app/shared-components/acordion/Acordion';
import ToastComponent from 'app/shared-components/toast/Toast';
import Conexion from './SeguimientoCnx';

export default function FormPropsTextFields(props) {
	const { state } = props.location;

	const initialState = {
		idcobrador: state.id,
		monto: 0,
		estado: 'AC'
	};

	const initalInfo = {
		titulo: 'Desea Agregar un Monto?',
		descirpcion: 'Usted va agregar el monto de : '
	};

	const [json, setJson] = useState(initialState);
	const [info, setInfo] = useState(initalInfo);
	const [historial, setHistorial] = useState([]);

	const [open, setOpen] = useState(false);
	const [openToast, setOpenToast] = useState(false);
	const [openCerrar, setOpenCerrar] = useState(false);
	const [mostraBtn, setMostraBtn] = useState(false);
	const [btn, setBtn] = useState(true);
	const [btnCerrar, setBtnCerrar] = useState(true);
	const [monto, setMonto] = useState('');

	const handleInputChange = e => {
		e.preventDefault();
		const { name, value } = e.target;
		setMonto(value);
		setJson({ ...json, monto: value });

		console.log(monto.length);
		console.log(value.length);
		if (value.length >= 2) {
			setBtn(false);
		} else {
			setBtn(true);
		}
	};

	const guardarMonto = async () => {
		console.log(monto);
		setOpen(false);
		const res = await Conexion.guardarMonto('monto-cobradores', json);
		console.log(res);
		setOpenToast(true);
		console.log('guardando...');
		console.log(json);
		setMostraBtn(false);
		setMonto('');
		setBtn(true);
		setBtnCerrar(true);
		obtenerHistorial();
	};

	const handleClickOpen = () => {
		setInfo(initalInfo);
		console.log('click');
		setOpen(true);
		setMostraBtn(true);
	};

	const handleClose = () => {
		setOpen(false);
		setMostraBtn(false);
	};

	const handleCloseToast = () => {
		setOpenToast(false);
	};

	const mostrarHistorial = async () => {
		console.log('click');
		setInfo({
			titulo: 'Historial',
			item: ''
		});
		setOpen(true);
	};

	const obtenerHistorial = async () => {
		const res = await Conexion.getMontos('monto-cobradores', 'idcobrador', state.id);
		console.log(res);
		setHistorial(res);
		console.log(montoActivo(res));
		const valor = montoActivo(res);
		if (!valor) {
			setBtnCerrar(false);
		}
		// console.log(historial.filter(x => x.estado === 'AC'));
	};

	const montoActivo = item => {
		// eslint-disable-next-line no-plusplus
		for (let index = 0; index < item.length; index++) {
			const x = item[index];
			if (x.estado === 'AC') return true;
		}
		return false;
	};

	const cerrarCaja = async () => {
		setInfo({
			titulo: 'Cerrar Caja',
			descripcion: 'Esta seguro de cerrar ?'
		});
		setOpenCerrar(true);
	};

	// eslint-disable-next-line consistent-return
	const obtenerIdMontoActual = () => {
		// eslint-disable-next-line no-plusplus
		for (let index = 0; index < historial.length; index++) {
			const x = historial[index];
			if (x.estado === 'AC') return x.id;
		}
	};

	useEffect(() => {
		obtenerHistorial();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleCloseMonto = () => {
		setOpenCerrar(false);
		setInfo(initalInfo);
	};

	const cerrarMonto = async () => {
		console.log('click');
		setOpenCerrar(false);
		const id = obtenerIdMontoActual();
		await Conexion.updateMontos('monto-cobradores', id, { estado: 'IN' });
		setBtnCerrar(false);
		obtenerHistorial();
	};

	return (
		<div className="contenedor">
			<Typography variant="h3" className="font-size-h3" gutterBottom>
				Seguimietno Cobradores
			</Typography>
			<Divider light />
			{/* <form className="formulario" noValidate autoComplete="off"> */}
			<div className="principal">
				<TextField
					disabled={btnCerrar}
					name="monto"
					id="monto"
					label="Monto"
					type="number"
					className="field"
					InputLabelProps={{
						shrink: true
					}}
					value={monto}
					onChange={handleInputChange}
				/>

				<Button disabled={btn} variant="contained" color="primary" className="field" onClick={handleClickOpen}>
					Asignar Monto
				</Button>

				<Button variant="contained" color="primary" className="field" onClick={mostrarHistorial}>
					Ver Historial de monto
				</Button>

				<Button
					disabled={!btnCerrar}
					variant="contained"
					color="primary"
					className="field"
					onClick={cerrarCaja}
				>
					Cerrar Caja
				</Button>
			</div>
			<div className="info-cobrador">
				<Typography variant="subtitle2" gutterBottom className="font-size-info-cobrador">
					Nombre : {state.nombre} {state.apellidos}
				</Typography>

				<Typography variant="subtitle2" gutterBottom className="font-size-info-cobrador">
					Telefono : {state.telefono}
				</Typography>

				<Typography variant="subtitle2" gutterBottom className="font-size-info-cobrador">
					{historial.filter(x => x.estado === 'AC').length > 0
						? historial.filter(x => x.estado === 'AC').map(x => `Monto Actual: ${x.monto}`)
						: 'Monto Actual: 0'}
					{/* {historial.filter(x => x.estado === 'AC').length > 0 ? '' : `Monto Actual: 0`} */}
				</Typography>
			</div>
			{/* </form> */}
			<DialogComponent
				info={info}
				open={open}
				handleClose={handleClose}
				monto={monto}
				guardarMonto={guardarMonto}
				mostraBtn={mostraBtn}
				historial={historial}
			/>
			<DialogComponentC
				info={info}
				openMonto={openCerrar}
				handleCloseMonto={handleCloseMonto}
				cerrarMonto={cerrarMonto}
			/>
			<ToastComponent openToast={openToast} handleCloseToast={handleCloseToast} />
			<Acordion id={state.id} cnx={Conexion} />
		</div>
	);
}
