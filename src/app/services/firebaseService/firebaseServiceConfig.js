const prodConfig = {
	// apiKey           : "YOUR_API_KEY",
	// authDomain       : "your-app.firebaseapp.com",
	// databaseURL      : "https://your-app.firebaseio.com",
	// projectId        : "your-app",
	// storageBucket    : "your-app.appspot.com",
	// messagingSenderId: "YOUR_MESSAGING_SENDER_ID"
};

const devConfig = {
	// apiKey           : "YOUR_API_KEY",
	// authDomain       : "your-app.firebaseapp.com",
	// databaseURL      : "https://your-app.firebaseio.com",
	// projectId        : "your-app",
	// storageBucket    : "your-app.appspot.com",
	// messagingSenderId: "YOUR_MESSAGING_SENDER_ID"
	apiKey: 'AIzaSyARUCLxj5-AtzjhIBOp6g67JddTt7qBtos',
	authDomain: 'app-cobros-91ea7.firebaseapp.com',
	projectId: 'app-cobros-91ea7',
	storageBucket: 'app-cobros-91ea7.appspot.com',
	messagingSenderId: '230359735923',
	appId: '1:230359735923:web:83a2b155425fa2329b1406'
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
