/* eslint-disable no-plusplus */
import React from 'react';
import Button from '@material-ui/core/Button';
import Done from '@material-ui/icons/Done';
import Close from '@material-ui/icons/Close';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { set } from 'date-fns';
import cnx from './DialogCnx';

export default function DialogPrestamos(props) {
	const { datos } = props;
	const [cuotaV, setCuotaV] = React.useState(datos.cuota);
	const [diasV, setDiasV] = React.useState(datos.dias);
	const [estadoV, setEstadoV] = React.useState(datos.estado);
	const [fechaActualV, setFechaActualV] = React.useState(datos.fechaActual);
	const [fechafinV, setFechafinV] = React.useState(datos.fechafin);
	const [fechainicioV, setFechainicioV] = React.useState(datos.fechainicio);
	const [idV, setIdV] = React.useState(datos.id);
	const [idClienteV, setIdClienteV] = React.useState(datos.idCliente);
	const [idCobradorV, setIdCobradorV] = React.useState(datos.idCobrador);
	const [montocobrarV, setMontocobrarV] = React.useState(datos.montocobrar);
	const [poraplicadoV, setPoraplicadoV] = React.useState(datos.poraplicado);
	const [porcentajeV, setPorcentajeV] = React.useState(datos.porcentaje);
	const [prestamoV, setPrestamoV] = React.useState(datos.prestamo);
	const [horaV, setHorasV] = React.useState(datos.hora);

	const [inicial, setInicial] = React.useState([]);
	const [pagado, setPagado] = React.useState([]);

	React.useEffect(() => {
		console.log('datos', datos);
		const {
			cuota,
			dias,
			estado,
			fechaActual,
			fechafin,
			fechainicio,
			id,
			idCliente,
			idCobrador,
			montocobrar,
			poraplicado,
			porcentaje,
			prestamo,
			hora
		} = datos;

		setCuotaV(cuota);
		setDiasV(dias);
		setEstadoV(estado);
		setFechaActualV(fechaActual);
		setFechafinV(fechafin);
		setFechainicioV(fechainicio);
		setIdV(id);
		setIdClienteV(idCliente);
		setIdCobradorV(idCobrador);
		setMontocobrarV(montocobrar);
		setPoraplicadoV(poraplicado);
		setPorcentajeV(porcentaje);
		setPrestamoV(prestamo);
		setHorasV(hora);
	}, [datos]);

	React.useEffect(() => {
		if (idV) {
			const obtenerCobros = async () => {
				let pago = 0;
				const res = await cnx.get('cobros', idV);
				const array = Object.keys(res).map(key => res[key]);
				setInicial(array);
				console.log('array', array);
				for (let index = 0; index < array.length; index += 1) {
					const x = array[index];
					if (x.monto !== '') {
						console.log('x', x.monto);
						setPagado((pago += Number(x.monto)));
					}
				}
			};
			obtenerCobros();
		}
	}, [idV]);

	return (
		<div>
			<Dialog
				open={props.open}
				onClose={props.handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">Detalle del credito</DialogTitle>
				<DialogContent>
					<Grid container justify="center">
						<Grid item xs={12} sm={6}>
							<span className="span-negrita">Fecha y Hora</span> :{' '}
							{fechaActualV === undefined
								? 'cargando...'
								: `${new Date(fechaActualV).toLocaleDateString()} - ${horaV}`}
						</Grid>
						<Grid item xs={12} sm={6}>
							<span className="span-negrita">MontoXCobrar</span> :{' '}
							{montocobrarV === undefined ? 'cargando...' : montocobrarV}
						</Grid>
						<Grid item xs={12} sm={6}>
							<span className="span-negrita">Dias</span>: {diasV === undefined ? 'cargando...' : diasV}
						</Grid>
						<Grid item xs={12} sm={6}>
							<span className="span-negrita">Cuota</span> :{cuotaV === undefined ? 'cargando...' : cuotaV}
						</Grid>
						<Grid item xs={12} sm={6}>
							<span className="span-negrita">Prestamo</span>:
							{prestamoV === undefined ? 'cargando...' : prestamoV}
						</Grid>
						<Grid item xs={12} sm={6}>
							<span className="span-negrita">Pagado</span>:{pagado === undefined ? 'cargando...' : pagado}
						</Grid>
						<Grid item xs={12} sm={6}>
							<span className="span-negrita">Restante</span>:{' '}
							{montocobrarV === undefined ? 'cargando...' : Number(montocobrarV) - Number(pagado)}
						</Grid>
						<Grid item xs={12} sm={6}>
							<span className="span-negrita">% Aplicado</span>:{' '}
							{poraplicadoV === undefined ? 'cargando...' : poraplicadoV}
						</Grid>
					</Grid>
					<br />
					<div className="card-fechas">
						{inicial.length > 0 ? (
							inicial.map((x, index) => {
								return (
									<div key={index} className="card">
										<div className="titulo-fecha">
											<span>{x.fecha}</span>
										</div>
										<div className="container-fechas">
											<h4>
												<b>{++index}</b>
											</h4>
											<p>{x.monto === '' ? <Close /> : <Done />}</p>
										</div>
									</div>
								);
							})
						) : (
							<div>cargando...</div>
						)}
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={props.handleClose} color="primary">
						Aceptar
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
