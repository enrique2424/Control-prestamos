/* eslint-disable array-callback-return */
import { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default function DialogComponent({ info, openMonto, handleCloseMonto, cerrarMonto }) {
	console.log(info);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<div>
			<Dialog
				fullScreen={fullScreen}
				open={openMonto}
				onClose={handleCloseMonto}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">{info.titulo}</DialogTitle>
				<DialogContent>
					<DialogContentText>{info.descripcion}</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleCloseMonto} color="primary">
						Salir
					</Button>

					<Button onClick={cerrarMonto} color="primary" autoFocus>
						Confirmar
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
