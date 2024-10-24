/* eslint import/no-extraneous-dependencies: off*/
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import config from './firebaseServiceConfig';

class FirebaseService {
	constructor() {
		this.db;
		this.time = firebase.firestore.FieldValue.serverTimestamp();
		this.auth;
	}

	getTimeSpan = () => {
		const event = new Date();
		const expirationDate = firebase.firestore.Timestamp.fromDate(event);
		return expirationDate;
	};

	init = () => {
		if (Object.entries(config).length === 0 && config.constructor === Object) {
			if (process.env.NODE_ENV === 'development') {
				console.warn(
					'Missing Firebase Configuration at src/app/services/firebaseService/firebaseServiceConfig.js'
				);
			}
			// success(false);
			return false;
		}

		if (firebase.apps.length) {
			return true;
		}
		firebase.initializeApp(config);
		this.db = firebase.firestore();
		this.auth = firebase.auth();
		return true;
		// success(true);
	};

	post = async (name, json) => {
		if (!firebase.apps.length) {
			return false;
		}
		const res = await this.db
			.collection(`${name}`)
			.doc()
			.set({
				...json,
				created: this.time,
				updated: this.time,
				serverDate: new Date(firebase.firestore.Timestamp.now().seconds * 1000).toLocaleDateString(),
				serverHours: new Date(firebase.firestore.Timestamp.now().seconds * 1000).toLocaleTimeString()
			});
		return res;
	};

	postAdd = async (name, json) => {
		if (!firebase.apps.length) {
			return false;
		}
		const res = await this.db.collection(`${name}`).add({
			...json,
			created: this.time,
			updated: this.time,
			serverDate: new Date(firebase.firestore.Timestamp.now().seconds * 1000).toLocaleDateString(),
			serverHours: new Date(firebase.firestore.Timestamp.now().seconds * 1000).toLocaleTimeString()
		});
		return res;
	};

	postSubCollection = async (name, docID, json) => {
		if (!firebase.apps.length) {
			return false;
		}
		const res = await this.db
			.collection(`${name}`)
			.doc(`${docID}`)
			.set({ ...json });
		return res;
	};

	get = async name => {
		if (!firebase.apps.length) {
			return false;
		}
		const docs = [];
		await this.db.collection(`${name}`).onSnapshot(querySnapshot => {
			querySnapshot.forEach(doc => {
				docs.push({ ...doc.data(), id: doc.id });
			});
		});
		console.log(docs);
		return docs;
	};

	getAll = async name => {
		if (!firebase.apps.length) {
			return false;
		}
		const snapshot = await this.db.collection(`${name}`).get();
		return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
	};

	getDocumentID = async (name, id) => {
		if (!firebase.apps.length) {
			return false;
		}
		const snapshot = await this.db.collection(`${name}`).doc(id).get();
		return snapshot.data();
	};

	getUser = async (documento, key, termino) => {
		if (!firebase.apps.length) {
			return false;
		}
		const snapshot = await this.db.collection(documento).where(`${key}`, '==', termino).get();
		return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
	};

	getId = async (documento, key, termino) => {
		if (!firebase.apps.length) {
			return false;
		}
		const snapshot = await this.db
			.collection(documento)
			.where(`${key}`, '==', termino)
			.orderBy('created', 'desc')
			.get();
		return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
	};

	getTwoQuery = async (documento, primaryKey, secundaryKey, terminoUno, terminoDos) => {
		if (!firebase.apps.length) {
			return false;
		}
		const snapshot = await this.db
			.collection(documento)
			.where(`${primaryKey}`, '==', terminoUno)
			.where(`${secundaryKey}`, '==', terminoDos)
			.orderBy('created', 'desc')
			.get();
		return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
	};

	getThreeQuery = async (documento, primaryKey, secundaryKey, threeKey, terminoUno, terminoDos, terminoTres) => {
		if (!firebase.apps.length) {
			return false;
		}
		const snapshot = await this.db
			.collection(documento)
			.where(`${primaryKey}`, '==', terminoUno)
			.where(`${secundaryKey}`, '==', terminoDos)
			// .where(`${threeKey}`, '==', terminoTres)
			.orderBy('created', 'desc')
			// .startAfter()
			.get();
		return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
	};

	getIdFb = async (documento, key, termino) => {
		if (!firebase.apps.length) {
			return false;
		}
		const snapshot = await this.db.collection(documento).where(`${key}`, '==', termino).get();
		return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
	};

	update = async (coleccion, id, objeto) => {
		if (!firebase.apps.length) {
			return false;
		}
		const res = await this.db.collection(coleccion).doc(id).update(objeto);
		return res;
	};

	// insertData = objetc => {
	// 	if (!firebase.apps.length) {
	// 		return false;
	// 	}
	// 	return new Promise((resolve, reject) => {
	// 		const cliente = this.db.collection('clientes').doc().set(objetc);
	// 		resolve(cliente);
	// 	});
	// };

	getUserData = async userId => {
		if (!firebase.apps.length) {
			return false;
		}
		const snapshot = await this.db.collection('usuarios').doc(userId).get();
		// console.log(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		return snapshot;
	};

	// updateUserData = user => {
	// 	if (!firebase.apps.length) {
	// 		return false;
	// 	}
	// 	return this.db.ref(`clientes/${user.uid}`).set(user);
	// };

	onAuthStateChanged = callback => {
		if (!this.auth) {
			return;
		}
		this.auth.onAuthStateChanged(callback);
	};

	signOut = async () => {
		if (!this.auth) {
			return;
		}
		const signOut = await this.auth.signOut();

		// sessionStorage.clear();

		console.log(signOut);
	};

	createUserAuth = async (email, password, obj, coleccion, perfil) => {
		if (!this.auth) {
			return false;
		}
		const auth = await this.auth.createUserWithEmailAndPassword(email, password);
		const user = firebase.auth().currentUser;
		user.updateProfile({
			displayName: perfil
		});
		const res = await this.db.collection(coleccion).doc(auth.user.uid).set(obj);
		return res;
	};

	getUserIdFb = () => {
		if (!this.auth) {
			return false;
		}

		const user = firebase.auth().currentUser;
		if (user) {
			return user.uid;
		}
		return false;
	};
}

const instance = new FirebaseService();

export default instance;
