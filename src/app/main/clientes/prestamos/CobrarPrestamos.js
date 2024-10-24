import { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Fechas from 'app/shared-components/fechas/Fechas';
import FuseLoading from '@fuse/core/FuseLoading';
import DialogCobrar from 'app/shared-components/dialog/DialogCobrar';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import swal from 'app/shared-components/sweetalert/SweetAlert';
import Grid from '@material-ui/core/Grid';
import FechasCobrar from 'app/shared-components/fechas/FechasCobrar';
import TextField from '@material-ui/core/TextField';

import cnx from './PrestamosCnx';

function CobrarPrestamos(props) {
	const [cargando, setCargando] = useState(true);
	const [open, setOpen] = useState(false);
	const [inicial, setInicial] = useState([]);
	const [fechas, setFechas] = useState([]);
	const [posicion, setPosicion] = useState(null);
	const [pagado, setPagado] = useState(0);
	const [monto, setMonto] = useState(0);
	const { state } = props.location;

	const handleClose = () => {
		setOpen(false);
	};

	const obtenerHora = () => {
		const fecha = new Date();
		const hora = fecha.getHours();
		const minutos = fecha.getMinutes();
		const segundos = fecha.getSeconds();
		return `${hora}:${minutos}:${segundos}`;
	};

	const guardarCobro = async (e, fecha, index) => {
		console.log('click', e);
		console.log('fecha', fecha);
		console.log('index', index);
		setPosicion(index);
		setOpen(true);
	};

	const coboroRapido = async (e, fecha, i, cuota) => {
		console.log('click', e);
		console.log('fecha', fecha);
		console.log('index', i);
		setPosicion(i);
		const list = [...inicial];
		list[i].monto = cuota;
		list[i].hora = obtenerHora();
		setInicial(list);
		setMonto(cuota);
	};

	const cobrarCutoa = (e, i) => {
		console.log(e.target.value);
		console.log(i);
		const { name, value } = e.target;
		const list = [...inicial];
		list[i][name] = value;
		list[i].hora = obtenerHora();
		setInicial(list);
	};

	const cambiarMonto = e => {
		const { name, value } = e.target;
		const list = [...inicial];
		list[posicion][name] = value;
		list[posicion].hora = obtenerHora();
		setInicial(list);
		setMonto(value);
	};

	const actualizarCobros = async () => {
		console.log('click');
		console.log(state);
		const confirmar = await swal.success();
		if (confirmar.isConfirmed) {
			setCargando(true);
			if (cambiarEstado()) {
				console.log('cambiar estado');
				const estado = await cnx.update('prestamos', state.id, { estado: 'PAGADO' });
			}
			const obj = Object.fromEntries(inicial.map((item, i) => [i, { ...item }]));
			console.log(obj);
			const res = await cnx.update('cobros', state.id, obj);
			swal.confirm();
			props.history.goBack();
			// console.log(res);
		}
	};

	const cambiarEstado = () => {
		// eslint-disable-next-line no-restricted-syntax
		for (const x of inicial) {
			if (x.monto === '' || Number(x.monto) !== x.cuota) return false;
		}
		return true;
	};

	useEffect(() => {
		const obtenerCobros = async () => {
			let pago = 0;
			const res = await cnx.obtenerCobres('cobros', state.id);
			const array = Object.keys(res).map(key => res[key]);
			setInicial(array);
			setCargando(false);
			for (let index = 0; index < array.length; index += 1) {
				const x = array[index];
				if (x.monto !== '') {
					setPagado((pago += Number(x.monto)));
				}
			}
		};
		obtenerCobros();
	}, []);

	useEffect(() => {
		const f = [];
		console.log(state);
		// setInicial(state.fechaActual);
		const startDate = new Date(state.fechaActual);
		console.log(startDate);
		let endDate = '';
		const noOfDaysToAdd = Number(state.dias);
		let count = 0;
		while (count < noOfDaysToAdd) {
			endDate = new Date(startDate.setDate(startDate.getDate() + 1));

			if (endDate.getDay() !== 0) {
				console.log(new Date(endDate).toLocaleDateString().split('/').reverse().join('/'));
				f.push(new Date(endDate).toLocaleDateString().split('/').reverse().join('/'));
				count += 1;
			}
		}
		setFechas(f);
	}, []);

	return (
		<div className="contenedor">
			<Typography variant="h4" gutterBottom>
				Cobros
			</Typography>
			<Grid container justify="center">
				<Grid item xs={12} sm={6}>
					<span className="span-negrita">Fecha y Hora</span> : {`${state.serverDate} - ${state.serverHours}`}
				</Grid>
				<Grid item xs={12} sm={6}>
					<span className="span-negrita">Fecha Fin</span> : {state.fechafin}
				</Grid>

				<Grid item xs={12} sm={6}>
					<span className="span-negrita">Dias</span> : {state.dias}
				</Grid>
				<Grid item xs={12} sm={6}>
					<span className="span-negrita">Prestamo</span> : {state.prestamo}
				</Grid>
				<Grid item xs={12} sm={6}>
					<span className="span-negrita">MonotXCobrar</span> : {state.montocobrar}
				</Grid>
				<Grid item xs={12} sm={6}>
					<span className="span-negrita">Pagado</span> : {pagado}
				</Grid>
				<Grid item xs={12} sm={6}>
					<span className="span-negrita">Restante</span> : {Number(state.montocobrar) - Number(pagado)}
				</Grid>
				<Grid item xs={12} sm={6}>
					<span className="span-negrita">% Aplicado</span> : {state.poraplicado}
				</Grid>
				<Grid item xs={12} sm={6}>
					<span className="span-negrita">Interes</span> : {state.porcentaje} %
				</Grid>
				<Grid item xs={12} sm={6}>
					<span className="span-negrita">Cuota</span> : {state.cuota}
				</Grid>
			</Grid>
			<Grid container justify="center">
				<Grid item xs={12} sm={4}>
					<TextField
						id="standard-basic"
						name="monto"
						label="monto"
						className="mb-2"
						autoComplete="off"
						value={monto}
						onChange={e => cambiarMonto(e)}
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Button variant="contained" color="primary" onClick={actualizarCobros}>
						Guardar
					</Button>
				</Grid>
			</Grid>
			{/* <Grid container justify="flex-start">
				<Grid item xs={12} sm={4}>
					<Grid item xs={12} sm={4}>
						<Typography variant="h6" gutterBottom>
							Prestamo : {state.prestamo}
						</Typography>
						<Typography variant="h6" gutterBottom>
							MontoXCobrar : {state.montocobrar}
						</Typography>
						<Typography variant="h6" gutterBottom>
							pagado : {pagado}
						</Typography>
						<Typography variant="h6" gutterBottom>
							Restante : {Number(state.montocobrar) - Number(pagado)}
						</Typography>
					</Grid>
				</Grid>
				<br />
				<Grid item xs={12} sm={4}>
					<Button variant="contained" color="primary" onClick={actualizarCobros}>
						Guardar
					</Button>
				</Grid>
			</Grid> */}

			<div className="grid-container-fechas">
				{/* {cargando ? <FuseLoading /> : ''} */}
				{!cargando ? (
					inicial.map((x, i) => (
						<FechasCobrar
							key={i}
							index={i}
							fecha={x.fecha}
							cuota={x.cuota}
							guardarCobro={guardarCobro}
							valores={inicial[i]}
							monto={x.monto}
							coboroRapido={coboroRapido}
						/>
					))
				) : (
					<FuseLoading />
				)}
				{/* {!cargando ? (
					inicial.map((x, i) => (
						<Fechas
							key={i}
							index={i}
							fecha={x.fecha}
							cuota={x.cuota}
							guardarCobro={guardarCobro}
							valores={inicial[i]}
							monto={x.monto}
						/>
					))
				) : (
					<FuseLoading />
				)} */}
			</div>
			{inicial.length > 0 ? (
				<DialogCobrar
					handleClose={handleClose}
					open={open}
					valores={inicial[posicion]}
					posicion={posicion}
					cobrarCutoa={cobrarCutoa}
				/>
			) : (
				''
			)}
		</div>
	);
}

export default withRouter(CobrarPrestamos);
