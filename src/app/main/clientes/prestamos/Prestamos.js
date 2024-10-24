import React, { Component, useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase/app';

import cnx from './PrestamosCnx';

import GenerarPrestamos from './GenerarPrestamos';

function Prestamos(props) {
	const { currentUser } = firebase.auth();
	const { state } = props.location;
	const [idCobrador, setIdCobrador] = useState(state.idusuario);
	const [idCliente, setidCliente] = useState(state.id);
	const [userMonto, setUserMonto] = useState(null);
	const [prestamos, setPrestamos] = useState(false);
	const [bloquear, setBloquear] = useState(false);
	const [prestamosDatos, setPrestamosDatos] = useState(null);

	const mostrarPrestamos = () => {
		console.log('click');
		setPrestamos(true);
	};

	const cobrarPrestamos = () => {
		console.log('click');
		props.history.push({
			pathname: '/clientes/cobrar',
			state: prestamosDatos // your data array of objects
		});
	};

	useEffect(() => {
		const obtenerPrestamos = async () => {
			const res = await cnx.obtenerPrestamos('prestamos', 'idCliente', 'estado', idCliente, 'ACTIVO');
			console.log('prestamo obteneido', res);
			if (res.length > 0) {
				setBloquear(true);
				setPrestamosDatos(res[0]);
			} else {
				setBloquear(false);
			}
		};
		obtenerPrestamos();
	}, [idCliente, bloquear]);

	useEffect(() => {
		console.log(state);
		// if (sessionStorage.getItem('user')) {
		// const json = JSON.parse(sessionStorage.getItem('user'));
		const obtenerMonto = async () => {
			const res = await cnx.getMontos('monto-cobradores', 'idcobrador', 'estado', currentUser.uid, 'AC');
			console.log(res[0]);
			if (res[0] !== undefined) setUserMonto(res[0]);
			// };
		};
		obtenerMonto();
	}, []);

	return (
		<div className="contenedor">
			<Typography variant="h4" gutterBottom>
				Prestamos
			</Typography>
			{/* <Typography variant="subtitle1" gutterBottom>
				Monto Disponible : {userMonto === null ? '0' : userMonto.monto}
			</Typography> */}
			<Typography variant="subtitle1" gutterBottom>
				Cliente : <br /> {state.nombre} {state.apellidos}
			</Typography>
			<Typography variant="subtitle1" gutterBottom>
				Prestamo : {prestamosDatos === null ? '0' : prestamosDatos.prestamo}
			</Typography>
			<hr />
			<div className="principal formulario">
				{userMonto === null ? (
					'No puede generar prestamos hasta que el admin le asigne un monto'
				) : (
					<>
						<Button
							disabled={bloquear}
							className="field"
							variant="contained"
							color="primary"
							onClick={mostrarPrestamos}
						>
							Generar Prestamo
						</Button>
						<Button
							disabled={!bloquear}
							className="field"
							variant="contained"
							color="primary"
							onClick={cobrarPrestamos}
						>
							Cobrar
						</Button>
					</>
				)}
			</div>
			<div className="mb-4" />
			{prestamos ? (
				<GenerarPrestamos
					idCobrador={idCobrador}
					idCliente={idCliente}
					setBloquear={setBloquear}
					setPrestamos={setPrestamos}
				/>
			) : (
				''
			)}
		</div>
	);
}

export default withRouter(Prestamos);
