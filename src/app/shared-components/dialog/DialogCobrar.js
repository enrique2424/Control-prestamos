import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default function DialogCobrar({ open, handleClose, valores, cobrarCutoa, posicion }) {
	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">Cobrar</DialogTitle>
				<DialogContent className="contenido-dialogo">
					{valores !== undefined ? (
						<>
							<TextField
								id="standard-basic"
								name="monto"
								label="monto"
								className="mb-2"
								autoComplete="off"
								value={valores.monto}
								onChange={e => cobrarCutoa(e, posicion)}
							/>
							<TextField
								autoComplete="off"
								id="outlined-multiline-static"
								label="Observaciones"
								multiline
								rows={4}
								name="observacion"
								variant="outlined"
								value={valores.observacion}
								onChange={e => cobrarCutoa(e, posicion)}
							/>
						</>
					) : (
						''
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cerrar
					</Button>
					{/* <Button onClick={handleClose} color="primary" autoFocus>
						Agregar
					</Button> */}
				</DialogActions>
			</Dialog>
		</div>
	);
}
