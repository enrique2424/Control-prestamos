import FirebaseService from 'app/services/firebaseService';

class Supervisores {
	constructor() {
		this.cnx = FirebaseService.init();
		this.db = FirebaseService;
	}

	// eslint-disable-next-line consistent-return
	guardarUser = async (nom, con, obj) => {
		if (this.cnx) {
			const res = await this.db.createUserAuth(nom.trim(), con.trim(), obj, 'cobradores');
			return res;
		}
	};
}

const SupCnx = new Supervisores();

export default SupCnx;
