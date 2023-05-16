import {
	createBrowserRouter,
	RouterProvider,
} from 'react-router-dom';
import { Login, PointOfSale, Root } from './pages';
import { PointOfSaleLoader } from './pages/point-of-sale/point-of-sale';
import { LoginLoader } from './pages/login/login';
import { RootLoader } from './pages/root/root';
import { Loader } from './components';

const router = createBrowserRouter([
	{
		path: '',
		children: [
			{
				path: '/',
				index: true,
				element: <Root />,
				loader: RootLoader
			},
			{
				path: '/point-of-sale',
				element: <PointOfSale />,
				loader: PointOfSaleLoader
			},
			{
				path: '/login',
				element: <Login />,
				loader: LoginLoader
			}
		]
	}
]);

if (import.meta.hot) {
	import.meta.hot.dispose(() => router.dispose());
}

export default function App() {
	return (
		<RouterProvider
			router={router}
			fallbackElement={<Loader />}
		/>
	);
}
