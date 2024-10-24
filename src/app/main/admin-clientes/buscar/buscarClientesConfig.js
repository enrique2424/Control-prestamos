import { lazy } from 'react';

const BuscarConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/admin-clientes/buscar',
			component: lazy(() => import('./buscar-clientes'))
		}
	]
};

export default BuscarConfig;
