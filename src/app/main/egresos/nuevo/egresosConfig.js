import { lazy } from 'react';

const BuscarConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/egresos/nuevo',
			component: lazy(() => import('./egresos'))
		}
	]
};

export default BuscarConfig;
