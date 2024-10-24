import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%'
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		flexBasis: '33.33%',
		flexShrink: 0
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary
	}
}));

const cobrosXdia = 0;
const arrayCobros = [];
const arrayEgresos = [];

export default function ControlledAccordions({ id, cnx }) {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);
	const [prestamos, setPrestamos] = React.useState([]);
	const [egresos, setEgresos] = React.useState([]);
	// const [cobros, setCobros] = React.useState([]);

	const handleChange = panel => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const mostrarIngresos = () => {
		let total = 0;
		const fecha = new Date().toLocaleDateString().split('/').reverse().join('/');
		for (let index = 0; index < arrayCobros.length; index += 1) {
			const x = arrayCobros[index];
			console.log('x', x, fecha);
			// eslint-disable-next-line no-restricted-syntax
			for (const i of x) {
				if (i.fecha === fecha) {
					total += Number(i.monto);
				}
			}
		}

		return total;
	};

	const mostarEgresos = () => {
		let total = 0;
		// const fecha = new Date().toLocaleDateString().split('/').reverse().join('/');
		for (let index = 0; index < arrayEgresos.length; index += 1) {
			const x = arrayEgresos[index];
			console.log('egresos............', x);
			// eslint-disable-next-line no-restricted-syntax
			for (const i of x) {
				if (i.fecha === obtenerFechaActual()) {
					total += Number(i.monto);
				}
			}
		}

		return total;
	};

	const obtenerFechaActual = () => {
		const fecha = new Date();
		const dia = fecha.getDate();
		const mes = fecha.getMonth() + 1;
		const anio = fecha.getFullYear();
		return `${dia}/${mes}/${anio}`;
	};

	const obtenerFechaActual2 = () => {
		const fecha = new Date();
		const dia = fecha.getDate();
		const mes = fecha.getMonth() + 1;
		const anio = fecha.getFullYear();
		return `${anio}/${mes}/${dia}`;
	};

	React.useEffect(() => {
		const obtenerPrestamosActivos = async () => {
			const res = await cnx.getPrestamos('prestamos', 'idCobrador', 'estado', id, 'ACTIVO');
			console.log('prestamo', res);
			setPrestamos(res);
		};
		obtenerPrestamosActivos();
	}, []);

	React.useEffect(() => {
		arrayEgresos.length = 0;
		const obtenerEgresos = async () => {
			const res = await cnx.getPrestamos('egresos', 'idcobrador', 'fecha', id, obtenerFechaActual());
			console.log('egresos', res);
			if (res.length > 0) {
				setEgresos(res);
				arrayEgresos.push(res);
			} else {
				setEgresos([]);
			}
		};
		obtenerEgresos();
	}, []);

	// eslint-disable-next-line consistent-return
	React.useEffect(() => {
		if (prestamos.length > 0) {
			const ids = prestamos.map(x => x.id);
			console.log('ids', ids);

			const obtenerCobros = async idPrestamo => {
				arrayCobros.length = 0;
				const res = await cnx.getDocumentID('cobros', idPrestamo);
				const array = Object.keys(res).map(key => res[key]);
				console.log('array', array);
				arrayCobros.push(array);
			};
			for (let index = 0; index < ids.length; index += 1) {
				const x = ids[index];
				obtenerCobros(x);
			}
		}
	}, [prestamos]);

	console.log('id acordion', id);

	return (
		<div className={classes.root}>
			<Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
					<Typography className={classes.heading}>Ingresos </Typography>
					<Typography className={classes.secondaryHeading}>Ingresos Por dia</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						{arrayCobros.length > 0
							? arrayCobros.map(x => (
									<div>
										{x.map(y => (
											<div>
												{y.fecha === obtenerFechaActual2() ? (
													<>
														<span className={classes.heading}> Detalle </span> :{' '}
														<Typography className={classes.secondaryHeading}>
															Fecha y Hora: {y.fecha}
															{' - '}
															{y.hora}
														</Typography>
														<Typography className={classes.secondaryHeading}>
															Observacion : {y.observacion}
														</Typography>
														<Typography className={classes.secondaryHeading}>
															Monto : {y.monto}
														</Typography>
														<hr />
													</>
												) : null}
											</div>
										))}
									</div>
							  ))
							: ''}
						{arrayCobros.length > 0 ? `TOTAL INGRESO : ${mostrarIngresos()}` : 'NO HAY REGISTRO'}
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
					<Typography className={classes.heading}>Egresos</Typography>
					<Typography className={classes.secondaryHeading}>Egresos por dia</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<div>
						{arrayEgresos.length > 0
							? arrayEgresos.map(x => (
									<div>
										{x.map(y => (
											<div>
												<span className={classes.heading}> Detalle </span> :{' '}
												<Typography className={classes.secondaryHeading}>
													Tipo : {y.tipo}
												</Typography>
												<Typography className={classes.secondaryHeading}>
													Fecha y Hora: {y.fecha}
													{' - '}
													{new Date(y.created.seconds * 1000).toLocaleTimeString()}
												</Typography>
												<Typography className={classes.secondaryHeading}>
													Monto : {y.monto}
												</Typography>
												<hr />
											</div>
										))}
									</div>
							  ))
							: ''}
						{arrayEgresos.length > 0 ? `TOTAL EGRESOS : ${mostarEgresos()}` : 'NO HAY REGISTROS'}
					</div>
				</AccordionDetails>
			</Accordion>
		</div>
	);
}
