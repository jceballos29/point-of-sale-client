import { setOrder } from '@/redux/slices/sales.slice';
import { AppStore } from '@/redux/store';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';

export interface OrdersProps {
	openModal: () => void;
	loading: boolean;
}

const Orders = ({ openModal, loading }: OrdersProps) => {
	const { order, orders } = useSelector(
		(store: AppStore) => store.sales,
	);

	const dispatch = useDispatch();

	return (
		<div className='w-full'>
			<h4 className='text-sm font-semibold mt-3 mb-2 dark:text-slate-100 transition-all duration-200'>
				Ventas en proceso
			</h4>
			{loading ? (
				<div className='w-8 aspect-square border-4 mx-auto mt-3 rounded-full border-slate-400 border-t-slate-200 dark:border-slate-600 dark:border-t-slate-800 animate-spin' />
			) : (
				<div className='grid grid-cols-2 gap-2'>
					{orders?.map((sale) => (
						<button
							key={sale.id}
							onClick={() => dispatch(setOrder(sale))}
							className={`w-full h-10 ${
								order?.id === sale.id
									? 'bg-slate-600 text-slate-300 dark:bg-slate-400 dark:text-slate-700'
									: 'bg-slate-50 text-slate-900 dark:bg-slate-600 dark:text-slate-200'
							} rounded-xl shadow flex items-center justify-center px-4 overflow-hidden text-center transition-all duration-200`}
						>
							<h4 className='font-medium'>{sale.number}</h4>
						</button>
					))}
					{orders?.length < 10 && (
						<button
							onClick={() => openModal()}
							className='w-full h-10 bg-slate-300 text-slate-500 dark:bg-slate-700 dark:text-slate-400 transition-all duration-200 rounded-xl flex items-center justify-center px-4 overflow-hidden text-center'
						>
							<PlusIcon width={24} />
						</button>
					)}
				</div>
			)}
		</div>
	);
};

export default Orders;
