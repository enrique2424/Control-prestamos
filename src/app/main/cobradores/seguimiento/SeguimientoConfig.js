import { lazy } from 'react';

const NuevoConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/cobradores/seguimiento',
			component: lazy(() => import('./Seguimiento'))
		}
	]
};

export default NuevoConfig;
