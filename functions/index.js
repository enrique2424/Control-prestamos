const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.historialatrasos = functions.firestore.document('/cobros/{cobrosId}').onUpdate(async (change, context) => {
	console.log('entro a historialatrasos');
	// console.log(snap);
	const cobrosId = context.params.cobrosId;
	console.log(cobrosId);
	const newValue = change.after.data();
	const key = Object.keys(newValue)[0];
	console.log(newValue[key].monto);
	const oldValue = change.before.data();
	const nuevoMonto = newValue[key].monto;
	const montoAnterior = oldValue[key].monto;
	const monto = Number(nuevoMonto) + montoAnterior;
	const cuota = newValue[key].cuota;
	const firestore = admin.firestore();

	let json = {
		[key]: {
			monto: monto,
			cuota: cuota
		}
	};
	if (Number(monto) < Number(cuota)) {
		console.log('monto', monto);
		console.log('cuota', cuota);
		console.log('monto es menor a cuota');
		const res = await firestore
			.collection(`historialatrasos`)
			.doc(`${cobrosId}`)
			.set({ ...json });
		return res;
	} else {
		console.log('monot es mayor o igual que cuota');
		return 0;
	}
	// console.log(oldValue);
	// console.log(Object.keys(oldValue)[0]);

	// const monto = change.after.data().monto;
	// const cuota = change.after.data().cuota;
	// let json = {};
	// json.monot = monto;
	// json.cuota = cuota;
	// if (Number(monto) < Number(cuota)) {
	// 	console.log('entro a if');
	// 	const firestore = admin.firestore();
	// 	const postHistorial = async () => {
	// 		const res = await firestore
	// 			.collection(`historialatrasos`)
	// 			.doc(`${cobrosId}`)
	// 			.set({ ...json }, { merge: true });
	// 	};
	// 	return postHistorial();
	// return firestore.collection('historialatrasos').doc(cobrosId).set(
	// 	{
	// 		monto,
	// 		cuota,
	// 		created: new Date(),
	// 		updated: new Date()
	// 	},
	// 	{ merge: true }
	// );
	// }
});
