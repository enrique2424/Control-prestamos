import { lazy } from 'react';

const NuevoConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/cobradores/nuevo',
			component: lazy(() => import('./Nuevo'))
		}
	]
};

export default NuevoConfig;
