import DemoContent from '@fuse/core/DemoContent';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	layoutRoot: {}
});

function SimpleFullWidthSample() {
	const classes = useStyles();

	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="p-24">
					<h4>Inicio</h4>
				</div>
			}
			contentToolbar={
				<div className="px-24">
					<h4>Bienvenido</h4>
				</div>
			}
			content={
				<div className="p-24">
					<h4>Administración potente y profesional para aplicaciones</h4>
					<br />
					{/* <DemoContent /> */}
				</div>
			}
		/>
	);
}

export default SimpleFullWidthSample;
