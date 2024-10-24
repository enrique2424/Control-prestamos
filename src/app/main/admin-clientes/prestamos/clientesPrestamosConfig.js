import { lazy } from 'react';

const BuscarConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/admin-clientes/prestamos',
			component: lazy(() => import('./clientes-prestamos'))
		}
	]
};

export default BuscarConfig;
