import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import cnx from './Supervisores';

export default function CreacionDeUsuario() {
	const [email, setEmail] = useState();
	const [contraseña, setContraseña] = useState();
	const [tel, setTel] = useState();

	const guardarCuenta = async () => {
		console.log(email, contraseña, tel);
		const res = cnx.guardarUser(email, contraseña, { tel });
		console.log(res);
		console.log('guardado exitosamente');
	};

	return (
		<div className="contenedor principal">
			<TextField
				className="field"
				id="standard-basic"
				label="correo"
				onChange={e => setEmail(e.target.value)}
				autoComplete="off"
			/>
			<TextField
				className="field"
				id="standard-basic"
				onChange={e => setContraseña(e.target.value)}
				label="contraseña"
				autoComplete="off"
			/>
			<TextField
				className="field"
				id="standard-basic"
				onChange={e => setTel(e.target.value)}
				label="telefono"
				autoComplete="off"
			/>
			<Button onClick={guardarCuenta} className="field" color="primary" variant="contained">
				Guardar Cuenta
			</Button>
		</div>
	);
}
