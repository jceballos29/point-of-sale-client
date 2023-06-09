import { Device, Sale, Sales } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

export interface SalesState {
	device: Device | null;
	orders: Sales[] 
	order: Sale | null
}

const initialState: SalesState = {
	device:	null,
	orders: [],
	order: null
};

const salesSlice = createSlice({
	name: 'sales',
	initialState,
	reducers: {
		setDevice: (state, action) => {
			state.device = action.payload;
		},
		setOrders: (state, action) => {
			state.orders = action.payload;
		},
		setOrder: (state, action) => {
			state.order = action.payload;
		},
		resetSales: (state) => {
			state.orders = initialState.orders;
			state.order = initialState.order;
			state.device = initialState.device;
		}
	},
});

export const { setDevice, setOrders, setOrder, resetSales } = salesSlice.actions;

export default salesSlice.reducer;
