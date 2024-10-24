import FuseScrollbars from '@fuse/core/FuseScrollbars';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import OrdersStatus from './OrdersStatus';
import { selectOrders, getOrders, getClientes, getClientesID } from '../store/ordersSlice';
import OrdersTableHead from './OrdersTableHead';
import db from '../../../services/firebaseService/firebaseService';

function OrdersTable(props) {
	const dispatch = useDispatch();
	const user = useSelector(({ auth }) => auth.user);
	// const orders = useSelector(selectOrders);
	const [orders, setOrdes] = useState([]);
	const searchText = useSelector(({ eCommerceApp }) => eCommerceApp.orders.searchText);
	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(orders);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	async function getData() {
		const res = await getClientes();
		setOrdes(res);
		setLoading(false);
	}

	async function getDataId() {
		let res;
		const rol = user.role.toString();
		const idusuario = db.getUserIdFb();
		if (rol === 'admin') res = await getClientes();
		else res = await getClientesID('clientes', 'idusuario', idusuario);
		setOrdes(res);
		setLoading(false);
	}

	useEffect(() => {
		// dispatch(getOrders()).then(() => setLoading(false));
		console.log('clientes', getDataId());
		getDataId();
	}, []);

	useEffect(() => {
		if (searchText.length !== 0) {
			setData(FuseUtils.filterArrayByString(orders, searchText));
			setPage(0);
		} else {
			setData(orders);
		}
	}, [orders, searchText]);

	function handleRequestSort(event, property) {
		const id = property;
		let direction = 'desc';

		if (order.id === property && order.direction === 'desc') {
			direction = 'asc';
		}

		setOrder({
			direction,
			id
		});
	}

	function handleSelectAllClick(event) {
		if (event.target.checked) {
			setSelected(data.map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleClick(item) {
		props.history.push({
			pathname: '/clientes/prestamos',
			state: item // your data array of objects
		});
		// props.history.push(`/clientes/prestamos`);
		console.log(item);
	}

	function handleCheck(event, id) {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		setSelected(newSelected);
	}

	function handleChangePage(event, value) {
		setPage(value);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}

	if (loading) {
		return <FuseLoading />;
	}

	if (data.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					¡No hay Clientes!
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<OrdersTableHead
						selectedOrderIds={selected}
						order={order}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={data.length}
						onMenuItemClick={handleDeselect}
					/>

					{/* apellidos: "Gaspar triberio"
ci: "3644654"
coordenadas: "-17.790410651133236 | -63.18562575683509"
coordenadas2: "-17.81002388824992 | -63.18459578857338"
direccion: "b/ guapilo"
id: "AWfJDXYB0YYWTDXTD42i"
nombre: "Jhon"
telefono: "773568977"
telefono2: "0" */}

					<TableBody>
						{_.orderBy(
							data,
							[
								o => {
									switch (order.id) {
										case 'id': {
											return o.id.split(0, 5);
										}
										case 'nombre': {
											return o.nombre;
										}
										case 'apellidos': {
											return o.telefono;
										}
										case 'status': {
											return 'Shipped';
										}
										default: {
											return o[order.id];
										}
									}
								}
							],
							[order.direction]
						)
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map(n => {
								console.log('n', n);
								const isSelected = selected.indexOf(n.id) !== -1;
								return (
									<TableRow
										className="h-72 cursor-pointer"
										hover
										role="checkbox"
										aria-checked={isSelected}
										tabIndex={-1}
										key={n.id}
										selected={isSelected}
										onClick={event => handleClick(n)}
									>
										<TableCell className="w-40 md:w-64 text-center" padding="none">
											<Checkbox
												checked={isSelected}
												onClick={event => event.stopPropagation()}
												onChange={event => handleCheck(event, n.id)}
											/>
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.id.slice(0, 5)}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{`${n.nombre} ${n.apellidos}`}
										</TableCell>

										<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
											{n.direccion}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" align="left">
											{/* <span>$</span> */}
											{n.ci}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.telefono}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											<OrdersStatus name="Activo" />
										</TableCell>

										{/* <TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.ci}
										</TableCell> */}
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</FuseScrollbars>

			<TablePagination
				className="flex-shrink-0 border-t-1"
				component="div"
				count={data.length}
				rowsPerPage={rowsPerPage}
				page={page}
				backIconButtonProps={{
					'aria-label': 'Previous Page'
				}}
				nextIconButtonProps={{
					'aria-label': 'Next Page'
				}}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</div>
	);
}

export default withRouter(OrdersTable);
