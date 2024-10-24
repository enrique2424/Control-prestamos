import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import db from '../../../services/firebaseService/firebaseService';

export const getOrders = createAsyncThunk('eCommerceApp/orders/getOrders', async () => {
	const response = await axios.get('/api/e-commerce-app/orders');
	const data = await response.data;
	console.log('getorders', data);
	return data;
});

// eslint-disable-next-line consistent-return
export const getClientes = async () => {
	const cnx = db.init();
	if (cnx) {
		const res = await db.getAll('clientes');
		console.log(res);
		return res;
	}
};

// eslint-disable-next-line consistent-return
export const getClientesID = async (documento, key, termino) => {
	const cnx = db.init();
	if (cnx) {
		const res = await db.getIdFb(documento, key, termino);
		console.log(res);
		return res;
	}
};

export const removeOrders = createAsyncThunk(
	'eCommerceApp/orders/removeOrders',
	async (orderIds, { dispatch, getState }) => {
		await axios.post('/api/e-commerce-app/remove-orders', { orderIds });

		return orderIds;
	}
);

const ordersAdapter = createEntityAdapter({});

export const { selectAll: selectOrders, selectById: selectOrderById } = ordersAdapter.getSelectors(
	state => state.eCommerceApp.orders
);

const ordersSlice = createSlice({
	name: 'eCommerceApp/orders',
	initialState: ordersAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setOrdersSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getOrders.fulfilled]: ordersAdapter.setAll,
		// [getClientes.fulfilled]: ordersAdapter.setAll,
		[removeOrders.fulfilled]: (state, action) => ordersAdapter.removeMany(state, action.payload)
	}
});

export const { setOrdersSearchText } = ordersSlice.actions;

export default ordersSlice.reducer;
