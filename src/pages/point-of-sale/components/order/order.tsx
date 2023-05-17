import { salesAdapter } from '@/adapters';
import { useCallAndLoad } from '@/hooks';
import { openModal } from '@/redux/slices/modal.slice';
import { setOrder, setOrders } from '@/redux/slices/sales.slice';
import { AppStore } from '@/redux/store';
import {
	canceledSale,
	completeSale,
	fetchSales,
} from '@/services';
import { Sale, SaleResponse } from '@/types';
import { formatCurrency } from '@/utils';
import {
	BanknotesIcon,
	QrCodeIcon,
	TrashIcon,
} from '@heroicons/react/24/solid';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from './components';
import { Roles } from '@/constants';

export interface OrderState {
	sale: Sale | null;
	payment: string;
	action: 'complete' | 'delete' | undefined;
}

const Order = () => {
	const { callEndpoint, loading } = useCallAndLoad();
	const { order, device } = useSelector(
		(store: AppStore) => store.sales,
	);
	const { parties, products } = useSelector(
		(store: AppStore) => store.pos,
	);
	const { user } = useSelector((store: AppStore) => store.auth);

	const [payment, setPayment] =
		React.useState<OrderState['payment']>('cash');
	const [action, setAction] =
		React.useState<OrderState['action']>(undefined);

	const dispatch = useDispatch();

	const handlerCompleteSale = async () => {
		try {
			setAction('complete');
			const response = await callEndpoint(
				completeSale({
					id: order?.id as string,
					paymentMethod: payment as string,
				}),
			);
			if (response.status === 200) {
				const orders = await callEndpoint(
					fetchSales(device?.id as string),
				);
				if (orders) {
					const result = salesAdapter(orders.data as SaleResponse[]);
					dispatch(setOrders(result));
					dispatch(setOrder(result[0]));
				}
			}
		} catch (error) {
			console.log(error);
		} finally {
			setAction(undefined);
		}
	};

	const handlerCancelSale = async () => {
		try {
			setAction('delete');
			const response = await callEndpoint(
				canceledSale(order?.id as string),
			);
			if (response.status === 200) {
				const orders = await callEndpoint(
					fetchSales(device?.id as string),
				);
				if (orders) {
					const result = salesAdapter(orders.data as SaleResponse[]);
					dispatch(setOrders(result));
					dispatch(setOrder(result[0]));
				}
			}
		} catch (error) {
			console.log(error);
		} finally {
			setAction(undefined);
		}
	};

	React.useEffect(() => {
		if (order) {
			setPayment(order?.paymentMethod);
		}
	}, [order]);

	return (
		<>
			<Product />
			<aside className='fixed top-0 right-0 z-10 h-full w-96 p-4'>
				<div className='w-full h-full bg-slate-200 dark:bg-slate-900 transition-all duration-200 rounded-2xl shadow-inner p-2 flex items-center justify-center'>
					{order ? (
						<div className='relative w-full h-full flex flex-col'>
							<div className='absolute top-0 left-0 w-full flex items-center bg-slate-50 dark:bg-slate-500 transition-all duration-200 p-2 shadow rounded-xl'>
								<div className='w-full relative flex flex-col items-start justify-center'>
									<h2 className='text-3xl text-slate-900 dark:text-slate-100 transition-all duration-200 font-bold'>
										Venta{' '}
										<span className='text-slate-800 dark:text-slate-300 transition-all duration-200'>
											{order.number}
										</span>
									</h2>
									{user?.role === Roles.ADMIN && (
										<p className='text-slate-400 dark:text-slate-300 transition-all duration-200 text-xs capitalize pl-1'>
											<span className='font-medium'>Vendedor:</span>{' '}
											<span className='italic'>
												{order.user?.name}
											</span>
										</p>
									)}
									<p className='text-slate-400 dark:text-slate-300 transition-all duration-200 text-xs capitalize pl-1'>
										<span className='font-medium'>Cliente:</span>{' '}
										<span className='italic'>
											{
												parties.find(
													(party) => party.id === order.party,
												)?.name
											}
										</span>
									</p>
								</div>
								<button
									disabled={loading}
									onClick={async () => await handlerCancelSale()}
									className='text-red-600 dark:text-slate-900 transition-all duration-200 w-20 aspect-square flex items-center justify-center'
								>
									{loading && action === 'delete' ? (
										<div className='w-8 aspect-square border-4 border-red-600 dark:border-slate-900 border-t-white dark:border-t-slate-600 rounded-full animate-spin transition-all duration-200' />
									) : (
										<TrashIcon width={32} />
									)}
								</button>
							</div>
							<div
								className='w-full h-full mt-24 mb-64 pb-2 overflow-y-auto scrollbar-hide transition-all duration-200'
							>
								{order?.items?.map((item) => (
									<button
										disabled={loading}
										onClick={() => {
											dispatch(
												openModal({
													type: 'edit',
													id: item.product,
													item: item,
												}),
											);
										}}
										key={item.id}
										className='w-full h-14 bg-slate-300 dark:bg-slate-700 transition-all duration-200 rounded-xl shadow flex items-center px-4 mb-2 select-none'
									>
										<span className='w-3/5 capitalize truncate font-medium text-left text-slate-950 dark:text-slate-300 transition-all duration-200'>
											{
												products.find(
													(product) => product.id === item.product,
												)?.name
											}
										</span>
										<span className='w-1/5 text-sm text-center text-slate-950 dark:text-slate-300 transition-all duration-200'>
											{item.quantity}
										</span>
										<span className='w-1/5 text-sm text-slate-700 dark:text-slate-200 transition-all duration-200 font-semibold text-right'>
											{formatCurrency(item.price * item.quantity)}
										</span>
									</button>
								))}
							</div>
							<div className='absolute bottom-0 left-0 w-full flex flex-col gap-2 p-2 bg-slate-300 dark:bg-slate-700 transition-all duration-200 rounded-xl shadow'>
								<div className='divide-y divide-dashed divide-slate-400 dark:divide-slate-500 transition-all duration-200'>
									<div className='pb-1'>
										<p className='text-sm w-full flex justify-between text-slate-500 dark:text-slate-400 transition-all duration-200'>
											Subtotal:{' '}
											<span className='font-medium'>
												{formatCurrency(
													order.items
														.map((item) => item.quantity * item.price)
														.reduce((sum, value) => sum + value, 0),
												)}
											</span>
										</p>
										<p className='text-sm w-full flex justify-between text-slate-500 dark:text-slate-400 transition-all duration-200'>
											Descuento:{' '}
											<span className='font-medium'>
												{formatCurrency(
													order.items
														.map((item) => item.discount)
														.reduce((sum, value) => sum + value, 0),
												)}
											</span>
										</p>
									</div>
									<h3 className='text-2xl pt-1 font-bold w-full flex justify-between text-salte-950 dark:text-slate-100 transition-all duration-200'>
										Total{' '}
										<span className='font-black'>
											{formatCurrency(order.total)}
										</span>
									</h3>
								</div>
								<div className='w-full flex flex-col gap-2'>
									<div className='w-full'>
										<h4 className='text-sm text-slate-500 dark:text-slate-300 transition-all duration-200 mb-1 font-semibold'>
											Método de pago
										</h4>
										<div className='w-full flex gap-2'>
											<button
												disabled={loading}
												onClick={() => setPayment('cash')}
												className={`flex-1 h-14 border-2 border-slate-50 dark:border-slate-300 shadow rounded-lg flex flex-col items-center justify-center transition-all duration-200 ${
													payment === 'cash'
														? 'bg-slate-50 text-slate-900 dark:bg-slate-300 transition-all duration-200'
														: 'text-slate-500 dark:text-slate-900 transition-all duration-200'
												} transition-all duration-200`}
											>
												<BanknotesIcon width={24} />
											</button>
											<button
												disabled={loading}
												onClick={() => setPayment('transfer')}
												className={`flex-1 h-14 border-2 border-slate-50 dark:border-slate-300 shadow rounded-lg flex flex-col items-center justify-center transition-all duration-200 ${
													payment === 'transfer'
														? 'bg-slate-50 text-slate-900 dark:bg-slate-300 transition-all duration-200'
														: 'text-slate-500 dark:text-slate-900 transition-all duration-200'
												} transition-all duration-200`}
											>
												<QrCodeIcon width={24} />
											</button>
										</div>
									</div>
									<button
										disabled={loading}
										onClick={async () => await handlerCompleteSale()}
										className='w-full h-14 flex items-center justify-center bg-slate-50 dark:bg-slate-300 text-slate-900 dark:text-slate-700 shadow rounded-lg transfer'
									>
										{loading && action === 'complete' ? (
											<>
												<span className='flex w-5 h-5 items-center justify-center border-4 border-slate-900 dark:border-slate-700 transfer border-l-transparent dark:border-t-slate-500 rounded-full mr-4 animate-spin' />
												<span>Pagando...</span>
											</>
										) : (
											<span className='text-slate-900 dark:text-slate-700 transition-all duration-200 font-semibold'>
												Pagar
											</span>
										)}
									</button>
								</div>
							</div>
						</div>
					) : (
						<div className='w-3/4 flex flex-col'>
							<h4 className='text-2xl text-center font-bold text-slate-950 dark:text-slate-100 transition-all duration-200'>
								Selecciona o inicia una nueva venta
							</h4>
						</div>
					)}
				</div>
			</aside>
		</>
	);
};

export default Order;
