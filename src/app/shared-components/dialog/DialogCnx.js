import FirebaseService from 'app/services/firebaseService';

class Dialog {
	constructor() {
		this.cnx = FirebaseService.init();
		this.db = FirebaseService;
	}

	// eslint-disable-next-line consistent-return
	get = async (doc, id) => {
		if (this.cnx) {
			const res = await this.db.getDocumentID(doc, id);
			return res;
		}
	};
}

const DialogCnx = new Dialog();

export default DialogCnx;
