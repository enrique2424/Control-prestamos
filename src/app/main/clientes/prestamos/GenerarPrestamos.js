import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SweetAlert2 from 'app/shared-components/sweetalert/SweetAlert';
import FuseLoading from '@fuse/core/FuseLoading';
import cnx from './PrestamosCnx';

const useStyles = makeStyles(theme => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '25ch'
		}
	}
}));

const fechas = [];

export default function GenerarPrestamos({ idCobrador, idCliente, setBloquear, setPrestamos }) {
	console.log('generar', idCobrador, idCliente, setBloquear, setPrestamos);
	const classes = useStyles();
	const [porcentaje, setPorcentaje] = React.useState(20);
	const [monto, setMonto] = React.useState('');
	const [poraplicado, setPorAplicado] = React.useState(0);
	const [montocobrar, setMontoCobrar] = React.useState(0);
	const [cuota, setCuota] = React.useState(0);
	const [open, setOpen] = React.useState(false);
	const [dias, setDias] = React.useState('24');
	const [fechafin, setFechaFin] = React.useState(null);
	const [fechainicio, setFechaInicio] = React.useState(null);
	const [cargando, setCargando] = React.useState(false);

	const handleChange = event => {
		setPorcentaje(event.target.value);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const montoChange = e => {
		console.log(e.target.value);

		setMonto(e.target.value);
	};

	const diasChange = e => {
		setDias(e.target.value);
	};

	const guardarPrestamo = async () => {
		setCargando(true);
		const validar = validarCampos();
		if (validar) {
			console.log('guardando...');
			const res = await SweetAlert2.success();
			if (res.isConfirmed) {
				const respuesta = await cnx.guardarPrestamos('prestamos', returnJson());
				console.log(returnJson());
				console.log(respuesta.id);
				// console.log(generarFechas());
				const generarCobros = await cnx.guardarCobros('cobros', respuesta.id, generarFechas());
				console.log(generarCobros);
				SweetAlert2.confirm();
			} else {
				setCargando(false);
			}
			setCargando(true);
			setPrestamos(false);
			setBloquear(true);
			// console.log(returnJson());
		} else {
			SweetAlert2.error('Complete los campos');
		}
	};

	const generarFechas = () => {
		const startDate = new Date();
		console.log(startDate);
		let endDate = '';
		const noOfDaysToAdd = Number(dias);
		let count = 0;
		while (count < noOfDaysToAdd) {
			endDate = new Date(startDate.setDate(startDate.getDate() + 1));

			if (endDate.getDay() !== 0) {
				console.log(new Date(endDate).toLocaleDateString().split('/').reverse().join('/'));
				fechas.push({
					fecha: new Date(endDate).toLocaleDateString().split('/').reverse().join('/'),
					hora: '00:00:00',
					observacion: '',
					monto: '',
					cuota
				});
				count += 1;
			}
		}

		return fechas;
	};

	const validarCampos = () => {
		if (monto === '' || monto === '0' || dias === '' || dias === '0') {
			return false;
		}
		return true;
	};

	const returnJson = () => {
		return {
			idCobrador,
			idCliente,
			prestamo: monto,
			porcentaje,
			dias,
			poraplicado,
			montocobrar,
			cuota,
			fechainicio,
			fechafin,
			fechaActual: new Date().toString(),
			estado: 'ACTIVO'
		};
	};

	React.useEffect(() => {
		let bolean = true;
		const startDate = new Date();
		console.log('dia de inico', startDate);
		let endDate = '';
		const noOfDaysToAdd = Number(dias);
		let count = 0;
		while (count < noOfDaysToAdd) {
			endDate = new Date(startDate.setDate(startDate.getDate() + 1));

			if (endDate.getDay() !== 0) {
				if (bolean) {
					setFechaInicio(endDate.toLocaleDateString().split('/').reverse().join('/'));
					bolean = false;
				}
				console.log('dias habiles', endDate);
				count += 1;
			}
		}
		console.log('ultimo dia', endDate);
		if (endDate !== '') setFechaFin(endDate.toLocaleDateString().split('/').reverse().join('/'));
	}, [dias]);

	React.useEffect(() => {
		const calcularMonto = () => {
			const total = (porcentaje / 100) * Number(monto);
			const montoAcobrar = Number(monto) + Number(total);
			console.log(montoAcobrar);
			const cuotaXdia = Number(montoAcobrar) / Number(dias);
			console.log('porcentaje', total);
			setMontoCobrar(Number(montoAcobrar));
			setPorAplicado(Number(total));
			setCuota(Number(cuotaXdia));
		};
		calcularMonto();
	}, [monto, porcentaje, dias]);

	return (
		<div>
			{cargando ? (
				<FuseLoading />
			) : (
				<Grid container justify="center">
					<Grid item xs={12} sm={4}>
						<TextField
							id="standard-number"
							label="Monto"
							type="number"
							className="field"
							InputLabelProps={{
								shrink: true
							}}
							value={monto}
							onChange={montoChange}
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<InputLabel id="demo-controlled-open-select-label" className="field">
							Porcentaje
						</InputLabel>
						<Select
							labelId="demo-controlled-open-select-label"
							id="demo-controlled-open-select"
							open={open}
							onClose={handleClose}
							onOpen={handleOpen}
							value={porcentaje}
							onChange={handleChange}
						>
							{/* <MenuItem value="">
					<em>None</em>
				</MenuItem> */}
							<MenuItem value={10}>10%</MenuItem>
							<MenuItem value={15}>15%</MenuItem>
							<MenuItem value={20}>20%</MenuItem>
						</Select>
					</Grid>

					<Grid item xs={12} sm={4}>
						<TextField
							id="standard-number"
							label="Dias"
							type="number"
							className="field"
							InputLabelProps={{
								shrink: true
							}}
							value={dias}
							onChange={diasChange}
						/>
					</Grid>
					<Grid item xs={12} sm={4} className="mt-4">
						<Typography variant="subtitle1" gutterBottom>
							Porcentaje : {poraplicado}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={4} className="mt-4">
						<Typography variant="subtitle1" gutterBottom>
							Monto A cobrar : {montocobrar}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={4} className="mt-4">
						<Typography variant="subtitle1" gutterBottom>
							Cuota : {cuota} x {dias} dias
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6} className="mt-4">
						<Typography variant="subtitle1" gutterBottom>
							Fecha Inicial : {fechainicio}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6} className="mt-4">
						<Typography variant="subtitle1" gutterBottom>
							Fecha Fin : {fechafin}
						</Typography>
					</Grid>

					<Grid item xs={12} sm={12} className="mt-4">
						<Button variant="contained" color="primary" onClick={guardarPrestamo}>
							Guardar Prestamo
						</Button>
					</Grid>
				</Grid>
			)}
		</div>
	);
}
