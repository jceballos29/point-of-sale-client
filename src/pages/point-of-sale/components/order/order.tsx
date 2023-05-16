import { setOrder, setOrders } from '@/redux/slices/sales.slice';
import { AppStore } from '@/redux/store';
import {
	canceledSale,
	completeSale,
	getSales,
} from '@/services/sales.service';
import { Sale } from '@/types';
import { formatCurrency } from '@/utils';
import {
	BanknotesIcon,
	QrCodeIcon,
	TrashIcon,
} from '@heroicons/react/24/solid';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from './components';
import { openModal } from '@/redux/slices/modal.slice';
import { salesAdapter } from '@/adapters';

export interface OrderState {
	sale: Sale | null;
	payment: string;
	completing: boolean;
	deleting: boolean;
}

const Order = () => {
	const { order, device } = useSelector(
		(store: AppStore) => store.sales,
	);
	const { parties, products } = useSelector(
		(store: AppStore) => store.pos,
	);
	const { user } = useSelector((store: AppStore) => store.auth);

	const [payment, setPayment] =
		React.useState<OrderState['payment']>('cash');
	const [completing, setCompleting] =
		React.useState<OrderState['completing']>(false);
	const [deleting, setDeleting] =
		React.useState<OrderState['deleting']>(false);

	const dispatch = useDispatch();

	const canceledOrder = async () => {
		try {
			setDeleting(true);
			const response = await canceledSale(order?.id as string);
			if (response === 200) {
				const orders = await getSales(device?.id as string);
				if (orders) {
					const result = salesAdapter(orders)
					dispatch(setOrders(result));
					dispatch(setOrder(result[0]));
				}
			}
		} catch (error) {
			console.log(error);
		} finally {
			setDeleting(false);
		}
	};

	const completeOrder = async () => {
		try {
			setCompleting(true);
			const response = await completeSale(
				order?.id as string,
				payment,
			);
			if (response === 200) {
				const orders = await getSales(device?.id as string);
				if (orders) {
					const result = salesAdapter(orders)
					dispatch(setOrders(result));
					dispatch(setOrder(result[0]));
				}
			}
		} catch (error) {
			console.log(error);
		} finally {
			setCompleting(false);
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
				<div className='w-full h-full bg-slate-200 rounded-2xl shadow-inner p-2 flex items-center justify-center'>
					{order ? (
						<div className='relative w-full h-full flex flex-col'>
							<div className='absolute top-0 left-0 w-full flex items-center bg-white p-2 shadow rounded-xl'>
								<div className='w-full relative flex flex-col items-start justify-center'>
									<h2 className='text-3xl text-slate-900 font-bold'>
										Venta{' '}
										<span className='text-slate-800'>
											{order.number}
										</span>
									</h2>
									{user?.role === 'admin' && (
										<p className='text-slate-400 text-xs capitalize pl-1'>
											<span className='font-medium'>Vendedor:</span>{' '}
											<span className='italic'>
												{order.user?.name}
											</span>
										</p>
									)}
									<p className='text-slate-400 text-xs capitalize pl-1'>
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
									disabled={deleting || completing}
									onClick={async () => await canceledOrder()}
									className='text-red-600 w-20 aspect-square flex items-center justify-center'
								>
									{deleting ? (
										<div className='w-8 aspect-square border-4 border-red-600 border-t-white rounded-full animate-spin' />
									) : (
										<TrashIcon width={32} />
									)}
								</button>
							</div>
							<div
								className={`w-full h-full ${
									user?.role === 'admin' ? 'mt-[92px]' : 'mt-[76px]'
								} mb-64 pb-2 overflow-y-auto scrollbar-hide`}
							>
								{order?.items?.map((item) => (
									<button
										disabled={completing || deleting}
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
										className='w-full h-14 bg-slate-300 rounded-xl shadow flex items-center px-4 mb-2 select-none'
									>
										<span className='w-3/5 capitalize truncate font-medium text-left'>
											{
												products.find(
													(product) => product.id === item.product,
												)?.name
											}
										</span>
										<span className='w-1/5 text-sm text-center'>
											{item.quantity}
										</span>
										<span className='w-1/5 text-sm text-slate-700 font-semibold text-right'>
											{formatCurrency(item.price * item.quantity)}
										</span>
									</button>
								))}
							</div>
							<div className='absolute bottom-0 left-0 w-full flex flex-col gap-2 p-2 bg-slate-300 rounded-xl shadow'>
								<div className='divide-y divide-dashed divide-slate-400'>
									<div className='pb-1'>
										<p className='text-sm w-full flex justify-between text-slate-500'>
											Subtotal:{' '}
											<span className='font-medium'>
												{formatCurrency(
													order.items
														.map((item) => item.quantity * item.price)
														.reduce((sum, value) => sum + value, 0),
												)}
											</span>
										</p>
										<p className='text-sm w-full flex justify-between text-slate-500'>
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
									<h3 className='text-2xl pt-1 font-bold w-full flex justify-between'>
										Total{' '}
										<span className='font-black'>
											{formatCurrency(order.total)}
										</span>
									</h3>
								</div>
								<div className='w-full flex flex-col gap-2'>
									<div className='w-full'>
										<h4 className='text-sm text-slate-500 mb-1 font-semibold'>
											Método de pago
										</h4>
										<div className='w-full flex gap-2'>
											<button
												disabled={completing || deleting}
												onClick={() => setPayment('cash')}
												className={`flex-1 h-14 border-2 border-white shadow rounded-lg flex flex-col items-center justify-center ${
													payment === 'cash'
														? 'bg-white text-slate-900'
														: 'text-slate-500'
												} transition-all duration-200`}
											>
												<BanknotesIcon width={24} />
											</button>
											<button
												disabled={completing || deleting}
												onClick={() => setPayment('transfer')}
												className={`flex-1 h-14 border-2 border-white shadow rounded-lg flex flex-col items-center justify-center ${
													payment === 'transfer'
														? 'bg-white text-slate-900'
														: 'text-slate-500'
												} transition-all duration-200`}
											>
												<QrCodeIcon width={24} />
											</button>
										</div>
									</div>
									<button
										disabled={completing || deleting}
										onClick={async () => await completeOrder()}
										className='w-full h-14 flex items-center justify-center bg-white shadow rounded-lg'
									>
										{completing ? (
											<>
												<span className='flex w-5 h-5 items-center justify-center border-4 border-slate-900 border-l-transparent rounded-full mr-4 animate-spin' />
												<span>Pagando...</span>
											</>
										) : (
											<span className='text-slate-900 font-semibold'>
												Pagar
											</span>
										)}
									</button>
								</div>
							</div>
						</div>
					) : (
						<div className='w-3/4 flex flex-col'>
							<h4 className='text-2xl text-center font-bold'>Selecciona o inicia una nueva venta</h4>
						</div>
					)}
				</div>
			</aside>
		</>
	);
};

export default Order;
