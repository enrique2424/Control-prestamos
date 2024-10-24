/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import EditIcon from '@material-ui/icons/Edit';
import Visibility from '@material-ui/icons/Visibility';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import Tooltip from '@material-ui/core/Tooltip';

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
	const [rows, setRows] = React.useState([]);

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
			field: 'nombre',
			headerName: 'NOMBRE',
			width: 300,
			editable: false
		},
		{
			field: 'apellidos',
			headerName: 'APELLIDOS',
			width: 200,
			editable: false
		},
		{
			field: 'telefono',
			headerName: 'TELEFONO',
			width: 200,
			editable: false
		},
		{
			field: 'coordenadas',
			hide: true
		},
		{
			field: 'coordenadas2',
			hide: true
		},
		{
			field: 'idusuario',
			hide: true
		},
		{
			field: 'id',
			hide: true
		},
		{
			field: 'ci',
			headerName: 'CI',
			width: 130,
			editable: false
		}
	];

	const filaSeleccionada = (e, accion) => {
		if (accion === 1) {
			console.log('add', e.row);
			props.history.push({
				pathname: '/admin-clientes/prestamos',
				state: e.row
			});
		} else {
			console.log('edit', e.row);
			// props.history.push({
			// 	pathname: '/transparencia',
			// 	state: e.row
			// });
		}
		// console.log(JSON.stringify(e.row, null, 4));
	};

	React.useEffect(() => {
		const llenarRows = () => {
			const row = [];
			// eslint-disable-next-line no-plusplus
			for (let index = 0; index < props.datos.length; index++) {
				const x = props.datos[index];
				const {
					apellidos,
					ci,
					coordenadas,
					coordenadas2,
					created,
					direccion,
					id,
					idusuario,
					nombre,
					telefono,
					telefono2,
					updated
				} = x;
				row.push({
					apellidos,
					ci,
					coordenadas,
					coordenadas2,
					created,
					direccion,
					id,
					idusuario,
					nombre,
					telefono,
					telefono2,
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
		</div>
	);
}

export default withRouter(DataTable);
