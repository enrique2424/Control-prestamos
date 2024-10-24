/* eslint-disable jsx-a11y/no-static-element-interactions */
import Done from '@material-ui/icons/Done';
import Close from '@material-ui/icons/Close';

const fecha = new Date();
const dia = fecha.getDate();
const mes = fecha.getMonth() + 1;
const anio = fecha.getFullYear();
const fechaActual = `${anio}/${mes}/${dia}`;
export default function FechasCobrar(props) {
	const parseFecha = f => {
		const date = new Date(f);

		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}/${month}/${day}`;
	};

	if (
		parseFecha(fechaActual) >= parseFecha(props.fecha) &&
		Number(props.monto) !== props.cuota &&
		props.monto !== ''
	) {
		return (
			// eslint-disable-next-line jsx-a11y/click-events-have-key-events
			<div
				onClick={e => props.guardarCobro(e, props.fecha, props.index)}
				style={{
					marginTop: '10px'
				}}
			>
				<div className="card-cobros">
					<div className="titulo-fecha-cobros close">
						<span>{props.fecha}</span>
					</div>
					<div className="container-fechas">
						<h4>
							<b>{props.index + 1}</b>
						</h4>
						<p>
							{/* <Close /> */}
							{props.monto}
						</p>
					</div>
				</div>
			</div>
		);
	}

	if (
		parseFecha(fechaActual) <= parseFecha(props.fecha) &&
		Number(props.monto) !== props.cuota &&
		props.monto !== ''
	) {
		return (
			// eslint-disable-next-line jsx-a11y/click-events-have-key-events
			<div
				onClick={e => props.guardarCobro(e, props.fecha, props.index)}
				style={{
					marginTop: '10px'
				}}
			>
				<div className="card-cobros">
					<div className="titulo-fecha-cobros close">
						<span>{props.fecha}</span>
					</div>
					<div className="container-fechas">
						<h4>
							<b>{props.index + 1}</b>
						</h4>
						<p>
							{/* <Close /> */}
							{props.monto}
						</p>
					</div>
				</div>
			</div>
		);
	}

	if (parseFecha(fechaActual) >= parseFecha(props.fecha) && props.monto === '') {
		return (
			// eslint-disable-next-line jsx-a11y/click-events-have-key-events
			<div
				onClick={e => props.guardarCobro(e, props.fecha, props.index)}
				style={{
					marginTop: '10px'
				}}
			>
				<div className="card-cobros">
					<div className="titulo-fecha-cobros close">
						<span>{props.fecha}</span>
					</div>
					<div className="container-fechas">
						<h4>
							<b>{props.index + 1}</b>
						</h4>
						<p>
							<Close />
						</p>
					</div>
				</div>
			</div>
		);
	}

	if (parseFecha(fechaActual) <= parseFecha(props.fecha) && props.monto === '') {
		return (
			// eslint-disable-next-line jsx-a11y/click-events-have-key-events
			<div
				onClick={e => props.coboroRapido(e, props.fecha, props.index, props.cuota)}
				style={{
					marginTop: '10px'
				}}
			>
				<div className="card-cobros">
					<div className="titulo-fecha-cobros">
						<span>{props.fecha}</span>
					</div>
					<div className="container-fechas">
						<h4>
							<b>{props.index + 1}</b>
						</h4>
						<p>D</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div
			style={{
				marginTop: '10px'
			}}
		>
			<div className="card-cobros ">
				<div className="titulo-fecha-cobros done">
					<span>{props.fecha}</span>
				</div>
				<div className="container-fechas">
					<h4>
						<b>{props.index + 1}</b>
						{/* <b>{props.monto}</b> */}
					</h4>
					<p>
						<Done />
					</p>
				</div>
			</div>
		</div>
	);
}
