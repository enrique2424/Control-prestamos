import { lazy } from 'react';

const BuscarConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/supervisores/buscar',
			component: lazy(() => import('./Buscar'))
		}
	]
};

export default BuscarConfig;
