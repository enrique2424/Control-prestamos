import FirebaseService from 'app/services/firebaseService';

class Seguimiento {
	constructor() {
		this.cnx = FirebaseService.init();
		this.db = FirebaseService;
	}

	// eslint-disable-next-line consistent-return
	guardarMonto = async (nombre, json) => {
		if (this.cnx) {
			const res = await this.db.post(nombre, json);
			return res;
		}
	};

	// eslint-disable-next-line consistent-return
	getMontos = async (nombre, key, termino) => {
		if (this.cnx) {
			// metodo para obtener montos para los cobradores
			const res = await this.db.getId(nombre, key, termino);
			console.log(res);
			return res;
		}
	};

	// eslint-disable-next-line consistent-return
	getDocumentID = async (name, id) => {
		if (this.cnx) {
			// metodo para obtener montos para los cobradores
			const res = await this.db.getDocumentID(name, id);
			console.log(res);
			return res;
		}
	};

	// eslint-disable-next-line consistent-return
	getPrestamos = async (documento, primaryKey, secundaryKey, terminoUno, terminoDos) => {
		if (this.cnx) {
			// metodo para obtener montos para los cobradores
			const res = await this.db.getTwoQuery(documento, primaryKey, secundaryKey, terminoUno, terminoDos);
			console.log(res);
			return res;
		}
	};

	// eslint-disable-next-line consistent-return
	updateMontos = async (co, id, ob) => {
		if (this.cnx) {
			const res = await this.db.update(co, id, ob);
			console.log(res);
			return res;
		}
	};
}

const SegCnx = new Seguimiento();

export default SegCnx;
