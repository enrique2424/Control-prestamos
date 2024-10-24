import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GoogleMap from 'google-map-react';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import { useState, useEffect, useRef, createRef, useCallback } from 'react';
import Typography from '@material-ui/core/Typography';
// import OrdersStatus from '../OrdersStatus';
import { useSelector } from 'react-redux';
import MapBox from '../../../../shared-components/mapa/Map';

function ShippingTab(props) {
	const { state, setState } = props;
	const methods = useFormContext();
	const { control, formState, getValues, setValue } = methods;
	// console.log(control, formState);

	const { errors } = formState;
	const [map, setMap] = useState('shipping');
	const [map2, setMap2] = useState('shipping2');

	const [valor, setValor] = useState();
	const [valor2, setValor2] = useState();
	const inputEl = useRef();

	// const order = useSelector(({ eCommerceApp }) => eCommerceApp.order);
	const [coordenas, setLatLong] = useState({ longitude: '', latitude: '' });
	const [coordenas2, setLatLong2] = useState({ longitude: '', latitude: '' });

	const change = e => {
		console.log(e.target.value);
		setValor(([e.target.name] = e.target.value));
	};

	const change2 = e => {
		console.log(e.target.value);
		setValor2(([e.target.name] = e.target.value));
	};

	const handleClickOpen = useCallback(() => {
		if (!state) {
			setValue('coordenadas', valor);
			setValue('coordenadas2', valor2);
			console.log(getValues());
		}
	}, [setValue, valor, getValues, valor2, state]);

	useEffect(() => {
		setValor(`${coordenas.latitude} | ${coordenas.longitude}`);
		setValor2(`${coordenas2.latitude} | ${coordenas2.longitude}`);
		handleClickOpen();
	}, [coordenas, handleClickOpen, coordenas2]);

	useEffect(() => {
		if (state) {
			console.log('cambiar');
			setValor('|');
			setValor2('|');
			setLatLong({ longitude: '', latitude: '' });
			setLatLong2({ longitude: '', latitude: '' });
			setState(false);
		}
	}, [state, setState]);

	// useEffect(() => {
	// 	if (formState.isSubmitted === false && formState.isSubmitSuccessful === false) {
	// 		console.log('error1');
	// 		setValor('|');
	// 		setValor2('|');
	// 	} else {
	// 		console.log('error2');
	// 		setValor('|');
	// 		setValor2('|');
	// 	}
	// }, [formState.isSubmitSuccessful, formState.isSubmitted]);

	return (
		<div className="pb-48">
			<div className="mb-24">
				<Accordion
					className="border-0 shadow-0 overflow-hidden"
					expanded={map === 'shipping'}
					onChange={() => setMap(map !== 'shipping' ? 'shipping' : false)}
				>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						classes={{ root: 'border border-solid rounded-16 mb-16' }}
					>
						<Typography className="font-semibold">Ubicacion 1</Typography>
					</AccordionSummary>
					<AccordionDetails className="flex flex-col md:flex-row -mx-8">
						<div className="w-full h-320 rounded-16 overflow-hidden mx-8">
							<MapBox setLatLong={setLatLong} />
						</div>
					</AccordionDetails>
				</Accordion>

				<Controller
					name="coordenadas"
					control={control}
					ref={inputEl}
					render={({ field }) => (
						<TextField
							{...field}
							className="mt-8 mb-16 "
							label="Coordenadas"
							autoFocus
							id="coordenadas"
							variant="outlined"
							fullWidth
							value={valor}
							onChange={e => change(e)}
						/>
					)}
				/>
			</div>

			<div className="mb-24">
				<Accordion
					className="border-0 shadow-0 overflow-hidden"
					expanded={map2 === 'shipping2'}
					onChange={() => setMap2(map2 !== 'shipping2' ? 'shipping2' : false)}
				>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						classes={{ root: 'border border-solid rounded-16 mb-16' }}
					>
						<Typography className="font-semibold">Ubicacion 2</Typography>
					</AccordionSummary>
					<AccordionDetails className="flex flex-col md:flex-row -mx-8">
						<div className="w-full h-320 rounded-16 overflow-hidden mx-8">
							<MapBox setLatLong={setLatLong2} />
						</div>
					</AccordionDetails>
				</Accordion>

				<Controller
					name="coordenadas2"
					control={control}
					ref={inputEl}
					render={({ field }) => (
						<TextField
							{...field}
							className="mt-8 mb-16 "
							label="Coordenadas 2"
							autoFocus
							id="coordenadas2"
							variant="outlined"
							fullWidth
							value={valor2}
							onChange={e => change2(e)}
						/>
					)}
				/>
			</div>
		</div>
	);
}

export default ShippingTab;
