import FirebaseService from 'app/services/firebaseService';

class ClientesPrestamos {
	constructor() {
		this.cnx = FirebaseService.init();
		this.db = FirebaseService;
	}

	// eslint-disable-next-line consistent-return
	// guardarPrestamos = async (nombre, json) => {
	// 	if (this.cnx) {
	// 		const res = await this.db.postAdd(nombre, json);
	// 		return res;
	// 	}
	// };

	// eslint-disable-next-line consistent-return
	// guardarCobros = async (nombre, docID, json) => {
	// 	if (this.cnx) {
	// 		const res = await this.db.postSubCollection(nombre, docID, json);
	// 		return res;
	// 	}
	// };

	// eslint-disable-next-line consistent-return
	get = async (doc, key, ter) => {
		if (this.cnx) {
			const res = await this.db.getUser(doc, key, ter);
			return res;
		}
	};

	// eslint-disable-next-line consistent-return
	// obtenerPrestamos = async (documento, primaryKey, secundaryKey, terminoUno, terminoDos) => {
	// 	if (this.cnx) {
	// 		const res = await this.db.getTwoQuery(documento, primaryKey, secundaryKey, terminoUno, terminoDos);
	// 		return res;
	// 	}
	// };

	// eslint-disable-next-line consistent-return
	// getMontos = async (documento, primaryKey, secundaryKey, terminoUno, terminoDos) => {
	// 	if (this.cnx) {
	// 		// metodo para obtener montos para los cobradores
	// 		const res = await this.db.getTwoQuery(documento, primaryKey, secundaryKey, terminoUno, terminoDos);
	// 		console.log(res);
	// 		return res;
	// 	}
	// };

	// eslint-disable-next-line consistent-return
	// update = async (co, id, ob) => {
	// 	if (this.cnx) {
	// 		const res = await this.db.update(co, id, ob);
	// 		console.log(res);
	// 		return res;
	// 	}
	// };
}

const ClientesPrestamosCnx = new ClientesPrestamos();

export default ClientesPrestamosCnx;
