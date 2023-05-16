import { configureStore } from '@reduxjs/toolkit';

import posReducer, { PosState } from './slices/pos.slice';
import modalReducer, { ModalState } from './slices/modal.slice';
import authReducer, { AuthState } from './slices/auth.slice';
import salesReducer, { SalesState } from './slices/sales.slice';

export interface AppStore {
	pos: PosState;
	modal: ModalState;
	auth: AuthState;
	sales: SalesState;
}

export const store = configureStore({
	reducer: {
		pos: posReducer,
		modal: modalReducer,
		auth: authReducer,
		sales: salesReducer,
	},
});

export default store;
