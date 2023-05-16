import { salesAdapter } from '@/adapters';
import {
	setDevice,
	setOrder,
	setOrders,
} from '@/redux/slices/sales.slice';
import { AppStore } from '@/redux/store';
import { logout } from '@/services';
import { getSales } from '@/services/sales.service';
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Device, Order } from './components';

export interface SidebarState {
	open: boolean;
	openDeviceModal: boolean;
	openOrderModal: boolean;
}

const Sidebar = () => {
	const { user } = useSelector((store: AppStore) => store.auth);
	const { device, orders, order } = useSelector(
		(store: AppStore) => store.sales,
	);

	const [open, setOpen] = React.useState<SidebarState['open']>(false);
	const [openDeviceModal, setOpenDeviceModal] =
		React.useState<SidebarState['openDeviceModal']>(false);
	const [openOrderModal, setOpenOrderModal] =
		React.useState<SidebarState['openOrderModal']>(false);

	const dispatch = useDispatch();

	React.useEffect(() => {
		const fetchSales = async (data: string) => {
			const response = await getSales(data);
			if (response) {
				const result =  salesAdapter(response)
				dispatch(setOrders(result));
				dispatch(setOrder(result[0]));
			}
		};

		if (!device) {
			user?.devices.length === 1
				? dispatch(setDevice(user?.devices[0]))
				: setOpenDeviceModal(true);
		} else {
			fetchSales(device?.id);
		}
	}, [device, dispatch, user]);

	return (
		<>
			<Device
				open={openDeviceModal}
				onClose={() => setOpenDeviceModal(false)}
			/>
			<Order
				open={openOrderModal}
				onClose={() => setOpenOrderModal(false)}
			/>
			<aside className='fixed top-0 left-0 z-20 h-full w-64 p-4'>
				<div className='relative w-full h-full bg-slate-100 rounded-2xl shadow-inner flex flex-col p-2'>
					<h4 className='text-sm font-semibold mb-2'>
						Terminales
					</h4>
					<button
						onClick={() => {
							if (user && user?.devices.length > 1) {
								setOpenDeviceModal(true);
							}
						}}
						className='w-full h-10 bg-white rounded-xl shadow flex items-center justify-center'
					>
						<span className='capitalize font-semibold'>
							{device?.name}
						</span>
					</button>
					<h4 className='text-sm font-semibold mt-3 mb-2'>
						Ventas en proceso
					</h4>
					<div className='grid grid-cols-2 gap-2'>
						{orders?.map((sale) => (
							<button
								key={sale.id}
								onClick={() => dispatch(setOrder(sale))}
								className={`w-full h-10 ${
									order?.id === sale.id
										? 'bg-slate-600 text-slate-300'
										: 'bg-white text-slate-900'
								} rounded-xl shadow flex items-center justify-center px-4 overflow-hidden text-center`}
							>
								<h4 className='font-medium'>{sale.number}</h4>
							</button>
						))}
						{orders?.length < 10 && (
							<button
								onClick={() => setOpenOrderModal(true)}
								className='w-full h-10 bg-slate-200 text-slate-500 rounded-xl flex items-center justify-center px-4 overflow-hidden text-center'
							>
								<PlusIcon width={24} />
							</button>
						)}
					</div>
					<div className='absolute bottom-0 left-0 w-full p-2 select-none'>
						<div
							className={`w-full ${
								open ? 'h-64' : 'h-14'
							} bg-slate-300 rounded-xl shadow transition-all duration-200`}
						>
							{open ? (
								<div className='w-full h-full flex flex-col items-center justify-between p-4 overflow-hidden z-10'>
									<div className='w-full'>
										<button
											onClick={() => setOpen(false)}
											className='w-full flex items-center justify-end'
										>
											<ChevronDownIcon width={18} />
										</button>
										<div className='w-full flex flex-col items-center'>
											<figure className='w-20 aspect-square rounded-full bg-slate-200 mb-2'></figure>
											<h4 className='text-lg font-semibold leading-none'>
												{user?.name}
											</h4>
											<p className='text-slate-500 leading-none'>
												{user?.email}
											</p>
										</div>
									</div>
									<button
										className='w-full h-8 bg-white rounded-lg shadow flex items-center justify-center px-4 overflow-hidden text-center text-sm'
										onClick={() => {
											logout();
										}}
									>
										Cerrar Sesión
									</button>
								</div>
							) : (
								<div
									onClick={() => {
										setOpen(true);
									}}
									className='w-full flex items-center gap-3 p-2'
								>
									<figure className='w-10 aspect-square rounded-lg bg-slate-200'></figure>
									<h4 className='text-lg font-semibold'>
										{user?.name}
									</h4>
								</div>
							)}
						</div>
					</div>
				</div>
			</aside>
		</>
	);
};

export default Sidebar;
