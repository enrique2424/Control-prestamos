import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import _ from '@lodash';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { resetProduct, newProduct, getProduct } from '../store/productSlice';
import reducer from '../store';
import ProductHeader from './cabezeraNuevo';
import BasicInfoTab from './tabs/BasicInfoTab';
import ShippingTab from './tabs/ShippingTab';
import db from '../../../services/firebaseService/firebaseService';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	nombre: yup.string().required('Ingrese el nombre de cliente').min(3, 'El nombre debe contener al menos 3 carteres'),
	apellidos: yup.string().required('Ingrese los apillidos del cliente').min(3, 'debe ingresar al menos 3 carteres'),
	perfil: yup.string().required('Ingrese el nombre de perfil').min(3, 'debe ingresar al menos 3 carteres'),
	correo: yup.string().required('Ingrese un correo valido').min(3, 'debe ingresar al menos 3 carteres'),
	contraseña: yup.string().required('Ingrese una contraseña valida').min(6, 'debe ingresar al menos 6 carteres'),
	rol: yup.string().required('Ingrese un rol'),
	ci: yup.string().required('Ingrese el ci del cliente').min(3, 'debe ingresar al menos 3 carteres'),
	telefono: yup.string().required('Ingrese el telefono del cliente').min(7, 'debe ingresar 7 numero'),
	direccion: yup.string().required('Ingrese la direccion del cliente').min(7, 'debe ingresar 5 caracteres')
});

function Product(props) {
	const MySwal = withReactContent(Swal);
	const dispatch = useDispatch();
	const product = useSelector(({ eCommerceApp }) => eCommerceApp.product);

	const routeParams = useParams();
	const [tabValue, setTabValue] = useState(0);
	const [state, setState] = useState(false);
	const [cargando, setCargando] = useState(false);
	const [noProduct, setNoProduct] = useState(false);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});
	const { reset, watch, control, onChange, formState, getValues, setValue } = methods;
	const form = watch();

	async function handleSaveProduct() {
		setCargando(true);
		console.log(getValues());
		if (getValues().telefono2 === undefined) setValue('telefono2', 0);

		const cnx = db.init();
		if (cnx) {
			// const res = await db.post('cobradores', getValues());
			const res = await db.createUserAuth(
				getValues().correo.trim(),
				getValues().contraseña.trim(),
				getValues(),
				'usuarios',
				getValues().perfil.trim()
			);
			console.log(res);
			setState(true);
			resetForm();
			setCargando(false);
			return MySwal.fire({
				icon: 'success',
				title: <p>Guardado Exitosamente</p>
			});
		}
		console.log('error');
		setCargando(false);
		return null;
	}

	function resetForm() {
		reset({
			correo: '',
			contraseña: '',
			perfil: '',
			nombre: '',
			apellidos: '',
			ci: '',
			telefono: '',
			telefono2: '',
			direccion: '',
			coordenadas: '|',
			coordenadas2: '|'
		});
	}

	useDeepCompareEffect(() => {
		function updateProductState() {
			const { productId } = routeParams;

			if (productId === 'new') {
				dispatch(newProduct());
			} else {
				dispatch(getProduct(routeParams)).then(action => {
					if (!action.payload) {
						setNoProduct(true);
					}
				});
			}
		}

		updateProductState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if (!product) {
			return;
		}

		reset(product);
	}, [product, reset]);

	useEffect(() => {
		return () => {
			dispatch(resetProduct());
			setNoProduct(false);
		};
	}, [dispatch]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				classes={{
					toolbar: 'p-0',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
				}}
				header={<ProductHeader handleSaveProduct={handleSaveProduct} />}
				contentToolbar={
					<Tabs
						value={tabValue}
						onChange={handleTabChange}
						indicatorColor="primary"
						textColor="primary"
						variant="scrollable"
						scrollButtons="auto"
						classes={{ root: 'w-full h-64' }}
					>
						<Tab className="h-64" label="Informacion" />
						<Tab className="h-64" label="Ubicaciones" />
					</Tabs>
				}
				content={
					<div className="p-16 sm:p-24 max-w-2xl">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							{cargando ? <FuseLoading /> : <BasicInfoTab />}
						</div>
						<div className={tabValue !== 1 ? 'hidden' : ''}>
							{cargando ? <FuseLoading /> : <ShippingTab state={state} setState={setState} />}
						</div>
					</div>
				}
			/>
		</FormProvider>
	);
}

export default withReducer('eCommerceApp', reducer)(Product);
