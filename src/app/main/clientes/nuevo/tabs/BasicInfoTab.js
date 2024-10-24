import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import { useFormContext, Controller } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { useState } from 'react';

function NumberFormatCustom(props) {
	const { inputRef, onChange, ...other } = props;
	return (
		<NumberFormat
			{...other}
			type="tel"
			autoComplete="off"
			getInputRef={inputRef}
			onValueChange={values => {
				onChange({
					target: {
						value: values.value
					}
				});
			}}
		/>
	);
}

NumberFormatCustom.propTypes = {
	inputRef: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired
};

function BasicInfoTab(props) {
	const initialStateValues = {
		apellidos: '',
		ci: '',
		direccion: '',
		nombre: '',
		telefono: '',
		telefono2: ''
	};

	const [values, setValues] = useState(initialStateValues);

	const handleInputChange = e => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};

	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;
	// console.log(control, formState);

	return (
		<div>
			<Controller
				name="nombre"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						autoFocus
						className="mt-8 mb-16 "
						error={!!errors.nombre}
						required
						helperText={errors?.nombre?.message}
						label="Nombre"
						id="nombre"
						variant="outlined"
						autoComplete="off"
						fullWidth
						defaultValue=""
						// onChange={handleInputChange}
					/>
				)}
			/>

			<Controller
				name="apellidos"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						autoFocus
						className="mt-8 mb-16 "
						error={!!errors.apellidos}
						required
						helperText={errors?.apellidos?.message}
						label="Apellidos"
						id="apellidos"
						variant="outlined"
						autoComplete="off"
						fullWidth
						defaultValue=""
						// onChange={handleInputChange}
					/>
				)}
			/>

			<Controller
				name="ci"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						autoFocus
						className="mt-8 mb-16 "
						error={!!errors.ci}
						required
						helperText={errors?.ci?.message}
						label="C.I."
						id="ci"
						variant="outlined"
						fullWidth
						autoComplete="off"
						defaultValue=""
						// onChange={handleInputChange}
					/>
				)}
			/>

			<Controller
				name="telefono"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						autoComplete="none"
						className="mt-8 mb-16 "
						error={!!errors.telefono}
						required
						helperText={errors?.telefono?.message}
						label="Telefono 1"
						id="telefono"
						variant="outlined"
						InputProps={{
							autoComplete: 'none',
							inputComponent: NumberFormatCustom
						}}
						fullWidth
						defaultValue=""

						// value={values.telefono}
						// onChange={handleInputChange}
					/>
				)}
			/>

			<Controller
				name="telefono2"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16 "
						// error={!!errors.telefono2}
						// required
						// helperText={errors?.telefono2?.message}
						label="Telefono 2"
						id="telefono2"
						variant="outlined"
						InputProps={{
							autoComplete: 'none',
							inputComponent: NumberFormatCustom
						}}
						fullWidth
						defaultValue=""

						// value={values.telefono2}
						// onChange={handleInputChange}
					/>
				)}
			/>

			<Controller
				name="direccion"
				control={control}
				render={({ field }) => (
					<TextField
						autoFocus
						autoComplete="none"
						{...field}
						className="mt-8 mb-16 "
						error={!!errors.direccion}
						required
						helperText={errors?.direccion?.message}
						label="Direccion"
						id="direccion"
						variant="outlined"
						fullWidth
						defaultValue=""
						// onChange={handleInputChange}
					/>
				)}
			/>
		</div>
	);
}

export default BasicInfoTab;
