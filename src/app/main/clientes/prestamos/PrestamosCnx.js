import FirebaseService from 'app/services/firebaseService';

class Prestamos {
	constructor() {
		this.cnx = FirebaseService.init();
		this.db = FirebaseService;
	}

	// eslint-disable-next-line consistent-return
	guardarPrestamos = async (nombre, json) => {
		if (this.cnx) {
			const res = await this.db.postAdd(nombre, json);
			return res;
		}
	};

	// eslint-disable-next-line consistent-return
	guardarCobros = async (nombre, docID, json) => {
		if (this.cnx) {
			const res = await this.db.postSubCollection(nombre, docID, json);
			return res;
		}
	};

	// eslint-disable-next-line consistent-return
	obtenerCobres = async (name, id) => {
		if (this.cnx) {
			const res = await this.db.getDocumentID(name, id);
			return res;
		}
	};

	// eslint-disable-next-line consistent-return
	obtenerPrestamos = async (documento, primaryKey, secundaryKey, terminoUno, terminoDos) => {
		if (this.cnx) {
			const res = await this.db.getTwoQuery(documento, primaryKey, secundaryKey, terminoUno, terminoDos);
			return res;
		}
	};

	// eslint-disable-next-line consistent-return
	getMontos = async (documento, primaryKey, secundaryKey, terminoUno, terminoDos) => {
		if (this.cnx) {
			// metodo para obtener montos para los cobradores
			const res = await this.db.getTwoQuery(documento, primaryKey, secundaryKey, terminoUno, terminoDos);
			console.log(res);
			return res;
		}
	};

	// eslint-disable-next-line consistent-return
	update = async (co, id, ob) => {
		if (this.cnx) {
			const res = await this.db.update(co, id, ob);
			console.log(res);
			return res;
		}
	};
}

const PrestamoCnx = new Prestamos();

export default PrestamoCnx;
