/* eslint-disable react-hooks/exhaustive-deps */
import { warehouseAdapter } from '@/adapters';
import { Loader } from '@/components';
import { useCallAndLoad } from '@/hooks';
import { fetchWarehouses } from '@/services';
import { Warehouse, WarehouseResponse } from '@/types';
import React from 'react';
import { Form } from './components';

export interface LoginState {
	busy: boolean;
	warehouses: Warehouse[];
}

const Login = () => {
	const { callEndpoint, loading } = useCallAndLoad();

	const [warehouses, setWarehouses] = React.useState<
		LoginState['warehouses']
	>([]);

	React.useEffect(() => {
		const getWarehouses = async () => {
			try {
				const { data } = await callEndpoint(fetchWarehouses());
				setWarehouses(warehouseAdapter(data as WarehouseResponse[]));
			} catch (error) {
				console.log(error);
			}
		};

		getWarehouses();
	}, []);

	return loading ? (
		<Loader />
	) : (
		<main className='w-full h-screen overflow-hidden flex flex-col gap-6 items-center justify-center bg-slate-50'>
			<h2 className='text-3xl font-bold'>One Cluster</h2>
			<Form warehouses={warehouses} />
			<p className='text-xs text-slate-400'>
				&copy; One Cluster - 2023
			</p>
		</main>
	);
};

export default Login;
