import { Routes as AppRoutes } from '@/constants';
import {
	BrowserRouter,
	Route,
	Routes
} from 'react-router-dom';
import { Login, PointOfSale, Root } from './pages';
import { PrivateRoute } from './guards';
import React from 'react';

export default function App() {

	const COMPANY = import.meta.env.VITE_COMPANY

	React.useEffect(() => {
		document.title = COMPANY
	},[COMPANY])

	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Root />} />
				<Route element={<PrivateRoute/>}>
					<Route path={AppRoutes.POINT_OF_SALE} element={<PointOfSale />} />
				</Route>
				<Route path={AppRoutes.LOGIN} element={<Login />} />
			</Routes>
		</BrowserRouter>
	);
}
