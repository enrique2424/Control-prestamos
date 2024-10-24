import { lazy } from 'react';

const NuevoConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/clientes/prestamos',
			component: lazy(() => import('./Prestamos'))
		},
		{
			path: '/clientes/cobrar',
			component: lazy(() => import('./CobrarPrestamos'))
		}
	]
};

export default NuevoConfig;
