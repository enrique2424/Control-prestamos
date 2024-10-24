import { lazy } from 'react';

const BuscarConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/reporte/total-dia',
			component: lazy(() => import('./reporteTotalXDia'))
		}
	]
};

export default BuscarConfig;
