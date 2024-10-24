import { lazy } from 'react';

const NuevoConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: '/supervisores/nuevo',
            component: lazy(() => import('./Nuevo'))
        }
    ]
};

export default NuevoConfig;
