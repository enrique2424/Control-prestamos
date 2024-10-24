import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import _ from '@lodash';
import { saveProduct, removeProduct } from '../store/productSlice';
import db from '../../../services/firebaseService/firebaseService';

function CabezeraNuevo(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { formState, watch, getValues, reset } = methods;
	const { isValid, dirtyFields } = formState;
	const images = watch('images', []);
	const featuredImageId = watch('featuredImageId');
	const name = watch('nombres');
	const theme = useTheme();
	const history = useHistory();

	// async function handleSaveProduct() {
	// 	console.log(getValues());
	// 	const cnx = db.init();
	// 	if (cnx) {
	// 		const res = await db.post('clientes', getValues());
	// 		console.log(res);
	// 		// resetForm();
	// 	} else {
	// 		console.log('error');
	// 	}
	// 	// dispatch(saveProduct(getValues()));
	// }

	// function resetForm() {
	// 	reset({
	// 		nombre: '',
	// 		apellidos: '',
	// 		ci: '',
	// 		telefono: '',
	// 		telefono2: '',
	// 		direccion: '',
	// 		coordenadas: '|',
	// 		coordenadas2: '|'
	// 	});
	// }

	function handleRemoveProduct() {
		// dispatch(removeProduct()).then(() => {
		//     history.push('/apps/e-commerce/products');
		// });
	}

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex flex-col items-start max-w-full min-w-0">
				<motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}>
					<Typography
						className="flex items-center sm:mb-12"
						component={Link}
						role="button"
						to="/inicio"
						color="inherit"
					>
						<Icon className="text-20">{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
						<span className="hidden sm:flex mx-4 font-medium">Clientes</span>
					</Typography>
				</motion.div>

				<div className="flex items-center max-w-full">
					{/* <motion.div
                        className="hidden sm:flex"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, transition: { delay: 0.3 } }}
                    >
                        {images.length > 0 && featuredImageId ? (
                            <img
                                className="w-32 sm:w-48 rounded"
                                src={_.find(images, { id: featuredImageId }).url}
                                alt={name}
                            />
                        ) : (
                            <img
                                className="w-32 sm:w-48 rounded"
                                src="assets/images/ecommerce/product-image-placeholder.png"
                                alt={name}
                            />
                        )}
                    </motion.div> */}
					<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
						<motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
							<Typography className="text-16 sm:text-20 truncate font-semibold">
								{name || 'Nuevo Cliente'}
							</Typography>
							<Typography variant="caption" className="font-medium">
								Clientes Detalle
							</Typography>
						</motion.div>
					</div>
				</div>
			</div>
			<motion.div
				className="flex"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
			>
				{/* <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    onClick={handleRemoveProduct}
                    startIcon={<Icon className="hidden sm:flex">delete</Icon>}
                >
                    Remove
                </Button> */}
				<Button
					className="whitespace-nowrap mx-4"
					variant="contained"
					color="secondary"
					disabled={_.isEmpty(dirtyFields) || !isValid}
					onClick={props.handleSaveProduct}
				>
					Guardar
				</Button>
			</motion.div>
		</div>
	);
}

export default CabezeraNuevo;
