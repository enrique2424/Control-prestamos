/* eslint-disable jsx-a11y/no-static-element-interactions */
import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import EditIcon from '@material-ui/icons/Edit';
import Visibility from '@material-ui/icons/Visibility';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from 'app/shared-components/dialog/DialogPrestamos';
import { withRouter } from 'react-router-dom';

// id, titulo, fecha_inicio, fecha_fin, estado

// const rows = [
//     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

function DataTable(props) {
	const [open, setOpen] = React.useState(false);
	const [rows, setRows] = React.useState([]);
	const [datos, setDatos] = React.useState([]);

	const handleClose = () => {
		setOpen(false);
	};

	const columns = [
		{
			field: 'add',
			headerName: 'add',
			sortable: false,
			width: 50,
			disableClickEventBubbling: true,
			renderCell: params => {
				return (
					// eslint-disable-next-line jsx-a11y/no-static-element-interactions
					// eslint-disable-next-line jsx-a11y/click-events-have-key-events
					<div onClick={() => filaSeleccionada(params, 1)}>
						<Tooltip title="Items" arrow>
							<Visibility />
						</Tooltip>
					</div>
				);
			}
		},
		// {
		// 	field: 'edit',
		// 	headerName: 'edit',
		// 	sortable: false,
		// 	width: 30,
		// 	disableClickEventBubbling: true,
		// 	renderCell: params => {
		// 		return (
		// 			<div onClick={() => filaSeleccionada(params, 2)}>
		// 				<Tooltip title="Editar" arrow>
		// 					<EditIcon />
		// 				</Tooltip>
		// 			</div>
		// 		);
		// 	}
		// },

		{ field: 'id', headerName: 'ID', width: 100 },
		{
			field: 'prestamo',
			headerName: 'PRESTAMO',
			width: 150,
			editable: false
		},
		{
			field: 'porcentaje',
			headerName: 'PORCENTAJE',
			width: 150,
			editable: false
		},
		{
			field: 'cuota',
			headerName: 'CUOTA',
			width: 150,
			editable: false
		},
		{
			field: 'dias',
			headerName: 'DIAS',
			width: 150,
			editable: false
		},
		{
			field: 'fechafin',
			hide: true
		},
		{
			field: 'fechafin',
			hide: true
		},
		{
			field: 'hora',
			hide: true
		},
		{
			field: 'idCobrador',
			hide: true
		},
		{
			field: 'idCliente',
			hide: true
		},
		{
			field: 'estado',
			headerName: 'ESTADO',
			width: 150,
			editable: false
		}
	];

	const filaSeleccionada = (e, accion) => {
		if (accion === 1) {
			console.log('add', e.row);
			setOpen(true);
			setDatos(e.row);
			// props.history.push({
			// 	pathname: '/admin-clientes/prestamos',
			// 	state: e.row
			// });
		}
		console.log('edit', e.row);
		// props.history.push({
		// 	pathname: '/transparencia',
		// 	state: e.row
		// });

		// console.log(JSON.stringify(e.row, null, 4));
	};

	React.useEffect(() => {
		const llenarRows = () => {
			const row = [];
			// eslint-disable-next-line no-plusplus
			for (let index = 0; index < props.datos.length; index++) {
				const x = props.datos[index];
				const {
					cuota,
					dias,
					estado,
					fechaActual,
					fechafin,
					fechainicio,
					id,
					idCliente,
					idCobrador,
					montocobrar,
					poraplicado,
					porcentaje,
					prestamo,
					created,
					updated
				} = x;
				row.push({
					cuota,
					dias,
					estado,
					fechaActual,
					fechafin,
					fechainicio,
					id,
					idCliente,
					idCobrador,
					montocobrar,
					poraplicado,
					porcentaje,
					prestamo,
					hora: new Date(created.seconds * 1000).toLocaleTimeString(),
					updated
				});
			}

			setRows(row);
		};
		llenarRows();
	}, [props.datos]);

	return (
		<div style={{ height: 400, width: '100%' }}>
			{rows.length > 0 ? (
				<DataGrid
					rows={rows}
					columns={columns}
					pageSize={5}
					checkboxSelection={false}
					disableSelectionOnClick
				/>
			) : (
				<DataGrid rows={[]} columns={columns} pageSize={5} checkboxSelection={false} disableSelectionOnClick />
			)}
			<Dialog open={open} handleClose={handleClose} datos={datos} />;
		</div>
	);
}

export default withRouter(DataTable);
