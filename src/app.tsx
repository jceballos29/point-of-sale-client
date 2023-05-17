import { Routes as AppRoutes } from '@/constants';
import {
	BrowserRouter,
	Route,
	Routes
} from 'react-router-dom';
import { Login, PointOfSale, Root } from './pages';
import { PrivateRoute } from './guards';

export default function App() {

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
