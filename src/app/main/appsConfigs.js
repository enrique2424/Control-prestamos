import BuscarConfig from './clientes/buscar/BuscarConfig';
import NuevoConfig from './clientes/nuevo/NuevoConfig';
import PrestamosConfig from './clientes/prestamos/PrestamosConfig';

import BuscarCobradoresConfig from './cobradores/buscar/BuscarConfig';
import NuevoCobradorConfig from './cobradores/nuevo/NuevoConfig';
import SeguimientoConfig from './cobradores/seguimiento/SeguimientoConfig';

import BuscarSupervisorConfig from './supervisores/buscar/BuscarConfig';
import NuevoSupervisorConfig from './supervisores/nuevo/NuevoConfig';

import BuscarAdminClientes from './admin-clientes/buscar/buscarClientesConfig';
import PrestamosdminClientes from './admin-clientes/prestamos/clientesPrestamosConfig';

import EgresosConfig from './egresos/nuevo/egresosConfig';

import ReporteTotalxDiaConfig from './reporte/reporteTotalXdiaConfig';

const appsConfigs = [
	BuscarConfig,
	BuscarCobradoresConfig,
	BuscarSupervisorConfig,
	NuevoConfig,
	NuevoCobradorConfig,
	NuevoSupervisorConfig,
	PrestamosConfig,
	SeguimientoConfig,
	BuscarAdminClientes,
	PrestamosdminClientes,
	EgresosConfig,
	ReporteTotalxDiaConfig
];

export default appsConfigs;
