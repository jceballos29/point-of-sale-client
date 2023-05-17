/* eslint-disable react-hooks/exhaustive-deps */
import { salesAdapter } from '@/adapters';
import { useCallAndLoad } from '@/hooks';
import {
	setDevice,
	setOrder,
	setOrders,
} from '@/redux/slices/sales.slice';
import { AppStore } from '@/redux/store';
import { fetchSales } from '@/services';
import { SaleResponse } from '@/types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Device, Devices, Order, Orders, User } from './components';

export interface SidebarState {
	open: boolean;
	openDeviceModal: boolean;
	openOrderModal: boolean;
}

const Sidebar = () => {
	const { callEndpoint, loading } = useCallAndLoad();
	const { user } = useSelector((store: AppStore) => store.auth);
	const { device } = useSelector((store: AppStore) => store.sales);

	const [openDeviceModal, setOpenDeviceModal] = React.useState<SidebarState['openDeviceModal']>(false);
	const [openOrderModal, setOpenOrderModal] = React.useState<SidebarState['openOrderModal']>(false);

	const dispatch = useDispatch();

	React.useEffect(() => {
		const getSales = async () => {
			try {
				const response = await callEndpoint(
					fetchSales(device?.id as string),
				);
				const sales = salesAdapter(response.data as SaleResponse[]);
				dispatch(setOrders(sales));
				dispatch(setOrder(sales[0]));
			} catch (error) {
				console.log(error);
			}
		};

		if (!device) {
			user?.devices.length === 1
				? dispatch(setDevice(user?.devices[0]))
				: setOpenDeviceModal(true);
		} else {
			getSales();
		}
	}, [device, dispatch, user]);

	return (
		<>
			<Devices
				open={openDeviceModal}
				onClose={() => setOpenDeviceModal(false)}
			/>
			<Order
				open={openOrderModal}
				onClose={() => setOpenOrderModal(false)}
			/>
			<aside className='fixed top-0 left-0 z-20 h-full w-64 p-4 select-none'>
				<div className='relative w-full h-full bg-slate-200 dark:bg-slate-800 rounded-2xl shadow-inner flex flex-col p-2 transition-all duration-200'>
					<Device openModal={() => setOpenDeviceModal(true)} />
					<Orders openModal={() => setOpenOrderModal(true)} loading={loading} />
					<User />
				</div>
			</aside>
		</>
	);
};

export default Sidebar;
