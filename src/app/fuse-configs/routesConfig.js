import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import ExampleConfig from 'app/main/example/ExampleConfig';
import appsConfigs from 'app/main/appsConfigs';
import LoginConfig from 'app/login/LoginConfig';

const routeConfigs = [...appsConfigs, ExampleConfig, LoginConfig];

const routes = [
	// if you want to make whole app auth protected by default change defaultAuth for example:
	// ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
	// The individual route configs which has auth option won't be overridden.
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin', 'cobrador']),
	{
		path: '/',
		component: () => <Redirect to="/inicio" />
	}
];

export default routes;
