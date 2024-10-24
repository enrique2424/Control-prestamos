import { lazy } from 'react';

const BuscarConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/cobradores/buscar',
			component: lazy(() => import('./Buscar'))
		}
	]
};

export default BuscarConfig;
