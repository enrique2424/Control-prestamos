import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
	root: {
		bottom: '56px',
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2)
		}
	}
}));

export default function CustomizedSnackbars({ openToast, handleCloseToast }) {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Snackbar
				className="toast"
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				open={openToast}
				autoHideDuration={1000}
				onClose={handleCloseToast}
			>
				<Alert onClose={handleCloseToast} severity="success">
					Registrado Exitosamente...!
				</Alert>
			</Snackbar>
		</div>
	);
}
