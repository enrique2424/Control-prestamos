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

export default function DialogComponent({ info, open, handleClose, monto, guardarMonto, mostraBtn, historial }) {
	console.log(info);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	const mostarHistoria = () => {
		console.log('click');
		console.log(historial);
		return (
			<span>
				{historial.map((x, i) => {
					return x.estado === 'AC' ? (
						<span className="monto-actual font-monto" key={i}>
							Monto : Bs {x.monto} <br /> Fecha de Prestamo :{' '}
							{new Date(x.created.seconds * 1000).toISOString().slice(0, 10)}
							<br />
						</span>
					) : (
						<span className="font-monto" key={i}>
							Monto : Bs {x.monto} <br /> Fecha de Prestamo :{' '}
							{new Date(x.created.seconds * 1000).toISOString().slice(0, 10)}
							<br />
						</span>
					);
				})}
			</span>
		);
	};
	return (
		<div>
			<Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
				<DialogTitle id="responsive-dialog-title">{info.titulo}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{mostraBtn ? (
							<>
								{info.descirpcion} {monto} ?
							</>
						) : (
							mostarHistoria()
						)}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					{mostraBtn ? (
						<>
							<Button autoFocus onClick={handleClose} color="primary">
								Salir
							</Button>

							<Button onClick={guardarMonto} color="primary" autoFocus>
								Agregar
							</Button>
						</>
					) : (
						<Button autoFocus onClick={handleClose} color="primary">
							Salir
						</Button>
					)}
				</DialogActions>
			</Dialog>
		</div>
	);
}
