import i18next from 'i18next';
import { authRoles } from 'app/auth';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import es from './navigation-i18n/es';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);
i18next.addResourceBundle('es', 'navigation', es);

const navigationConfig = [
	{
		id: 'applications',
		title: 'APLICAIONES',
		translate: 'APPLICATIONS',
		type: 'group',
		icon: 'apps',
		children: [
			// {
			// 	id: 'example-component',
			// 	title: 'Example',
			// 	translate: 'EXAMPLE',
			// 	type: 'item',
			// 	icon: 'whatshot',
			// 	url: '/example'
			// }
			{
				id: 'clientes',
				title: 'Clientes',
				translate: 'CLIENTES',
				type: 'collapse',
				auth: authRoles.cobrador,
				icon: 'assignment_ind',
				children: [
					{
						id: 'nuevo-clientes',
						auth: authRoles.cobrador,

						title: 'Nuevo',
						type: 'item',
						url: '/clientes/nuevo'
					},
					{
						id: 'buscar-clientes',
						auth: authRoles.cobrador,

						title: 'Buscar',
						type: 'item',
						url: '/clientes/buscar'
					}
				]
			},
			{
				id: 'cobradores',
				title: 'Cobradores',
				translate: 'USUARIOS',
				type: 'collapse',
				icon: 'two_wheeler',
				auth: authRoles.admin,
				children: [
					{
						id: 'nuevo-cobradores',
						auth: authRoles.admin,

						title: 'Nuevo',
						type: 'item',
						url: '/cobradores/nuevo'
					},
					{
						id: 'buscar-cobradores',
						auth: authRoles.admin,

						title: 'Buscar',
						type: 'item',
						url: '/cobradores/buscar'
					}
				]
			},
			// {
			// 	id: 'supervisores',
			// 	title: 'Supervisores',
			// 	translate: 'SUPERVISORES',
			// 	type: 'collapse',
			// 	auth: authRoles.admin,
			// 	icon: 'how_to_reg',

			// 	children: [
			// 		{
			// 			id: 'nuevo-supervisores',
			// 			auth: authRoles.admin,

			// 			title: 'Nuevo',
			// 			type: 'item',
			// 			url: '/supervisores/nuevo'
			// 		},
			// 		{
			// 			id: 'buscar-supervisores',
			// 			auth: authRoles.admin,

			// 			title: 'Buscar',
			// 			type: 'item',
			// 			url: '/supervisores/buscar'
			// 		}
			// 	]
			// },
			{
				id: 'admin-clientes',
				title: 'Admin-Cliente',
				translate: 'ADMIN CLIENTES',
				type: 'collapse',
				auth: authRoles.admin,
				icon: 'person',

				children: [
					// {
					// 	id: 'nuevo-supervisores',
					// 	title: 'Nuevo',
					// 	type: 'item',
					// 	url: '/supervisores/nuevo'
					// },
					{
						id: 'buscar-admin-cliente',
						auth: authRoles.admin,
						title: 'Buscar',
						type: 'item',
						url: '/admin-clientes/buscar'
					}
				]
			},
			{
				id: 'egresos',
				title: 'EGRESOS',
				translate: 'EGRESOS',
				type: 'item',
				auth: authRoles.cobrador,
				icon: 'attach_money',
				url: '/egresos/nuevo'
			},
			{
				id: 'reportes',
				title: 'Reporte',
				translate: 'REPORTES',
				type: 'collapse',
				auth: authRoles.admin,
				icon: 'assessment',

				children: [
					// {
					// 	id: 'nuevo-supervisores',
					// 	title: 'Nuevo',
					// 	type: 'item',
					// 	url: '/supervisores/nuevo'
					// },
					{
						id: 'reporte-total-dia',
						auth: authRoles.admin,
						title: 'Reporte Total Dia',
						type: 'item',
						url: '/reporte/total-dia'
					}
				]
			}
		]
	}
];

export default navigationConfig;
