/* eslint-disable jsx-a11y/click-events-have-key-events */
export default function Fechas(props) {
	const formatearFecha = formato => {
		const meses = [
			'enero',
			'febrero',
			'marzo',
			'abril',
			'mayo',
			'junio',
			'julio',
			'agosto',
			'septiembre',
			'octubre',
			'noviembre',
			'diciembre'
		];
		// Creamos array con los días de la semana
		const diasSemana = ['Domingo', 'Lunes', 'martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
		// Creamos el objeto fecha instanciándolo con la clase Date
		const f = new Date(formato);
		// Construimos el formato de salida
		// console.log(`${diasSemana[f.getDay()]}, ${f.getDate()} de ${meses[f.getMonth()]} de ${f.getUTCFullYear()}`);
		return {
			diaNumero: f.getDate(),
			dia: diasSemana[f.getDay()],
			mes: meses[f.getMonth()],
			año: f.getUTCFullYear()
		};
	};
	return (
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions
		<>
			{props.monto === '' ? (
				// eslint-disable-next-line jsx-a11y/no-static-element-interactions
				<div className="calendar" onClick={e => props.guardarCobro(e, props.fecha, props.index)}>
					<div className="month background">{formatearFecha(props.fecha).mes}</div>
					<div className="day">{formatearFecha(props.fecha).dia}</div>
					<div className="date">
						{formatearFecha(props.fecha).diaNumero}
						<span className="date-after">{props.index + 1}</span>
						<p className="monto">cancelado : 0</p>
					</div>
					<div className="time background">COBRAR : {props.cuota}</div>
				</div>
			) : (
				// eslint-disable-next-line jsx-a11y/no-static-element-interactions
				<div className="calendar">
					<div
						className={props.monto === props.cuota.toString() ? 'month background-2' : 'month background-3'}
					>
						{formatearFecha(props.fecha).mes}
					</div>
					<div className="day">{formatearFecha(props.fecha).dia}</div>
					<div className="date">
						{formatearFecha(props.fecha).diaNumero}
						<span className="date-after">{props.index + 1}</span>
						<p className="monto">cancelado : {props.monto}</p>
					</div>
					<div className={props.monto === props.cuota.toString() ? 'time background-2' : 'time background-3'}>
						COBRAR : {props.cuota}
					</div>
				</div>
			)}
		</>
	);
}
