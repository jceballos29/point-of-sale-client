import {
	productsAdapter,
	saleAdapter,
	salesAdapter,
} from '@/adapters';
import { useCallAndLoad } from '@/hooks';
import { closeModal } from '@/redux/slices/modal.slice';
import { setProducts } from '@/redux/slices/pos.slice';
import { setOrder, setOrders } from '@/redux/slices/sales.slice';
import { AppStore } from '@/redux/store';
import { fetchProducts } from '@/services';
import {
	addSaleItem,
	deleteSaleItem,
	fetchSale,
	fetchSales,
	updateSaleItem
} from '@/services';
import { ProductResponse, Product as ProductType, SaleResponse } from '@/types';
import { formatCurrency } from '@/utils';
import { Dialog, Transition } from '@headlessui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export interface ProductState {
	product: ProductType | undefined;
	quantity: number;
	discount: number;
	tab: 'quantity' | 'discount';
	pad: string;
	action: 'add' | 'edit' | 'delete' | ''
}

const btnValues = [
	[7, 8, 9, 'C'],
	[4, 5, 6, 'CE'],
	[1, 2, 3, '%'],
	['.', 0, 'OK'],
];

const Product = () => {
	const { callEndpoint, loading } = useCallAndLoad();
	const { isOpen, id, type, item } = useSelector((store: AppStore) => store.modal);
	const { products, categories } = useSelector((store: AppStore) => store.pos);
	const { order, device } = useSelector((store: AppStore) => store.sales);

	const [product, setProduct] = React.useState<ProductState['product']>();
	const [quantity, setQuantity] = React.useState<ProductState['quantity']>(1);
	const [discount, setDiscount] = React.useState<ProductState['discount']>(0);
	const [tab, setTab] = React.useState<ProductState['tab']>('quantity');
	const [pad, setPad] = React.useState<ProductState['pad']>('');
	const [action, setAction] = React.useState<ProductState['action']>('');

	const dispatch = useDispatch();

	const handlerPad = (value: string) => {
		if (value === 'OK') {
			if (tab === 'quantity') {
				const res = Number(pad);
				setQuantity(res);
			} else {
				setDiscount(Number(pad));
			}
			setPad('');
		} else if (value === 'C') {
			setPad('');
		} else if (value === 'CE') {
			setPad(pad.length === 1 ? '' : pad.slice(0, pad.length - 1));
		} else if (value === '%') {
			setTab('discount');
		} else if (value === '.') {
			if (!pad.includes('.')) {
				setPad(pad + value);
			}
		} else {
			if (pad === '0') {
				setPad(value);
			} else {
				setPad(pad + value);
			}
		}
	};

	const restartPos = async () => {
		const products = await callEndpoint(fetchProducts())
		const sale = await callEndpoint(fetchSale(order?.id as string))
		const orders = await callEndpoint(fetchSales(device?.id as string))
		dispatch(setProducts(productsAdapter(products.data as ProductResponse[])));
		dispatch(setOrders(salesAdapter(orders.data as SaleResponse[])));
		dispatch(setOrder(saleAdapter(sale.data as SaleResponse)));
	}

	const handlerAddItem = async () => {
		try {
			setAction('add')
			const data = {
				product: product?.id as string,
				quantity,
				price: product?.list_price as number,
				discount,
			};
			const response = await callEndpoint(addSaleItem(order?.id as string, data))
			if (response.status === 201) {
				await restartPos()
				dispatch(closeModal());
			}
		} catch (error) {
			console.log(error);
		} finally {
			setAction('')
		}
	};

	const handlerEditItem = async () => {
		try {
			setAction('edit')
			const data = {
				product: product?.id as string,
				quantity,
				price: product?.list_price as number,
				discount,
			};
			const response = await callEndpoint(updateSaleItem(order?.id as string, item?.id as string, data))
			if (response.status === 200) {
				await restartPos()
				dispatch(closeModal());
			}
		} catch (error) {
			console.log(error);
		} finally {
			setAction('')
		}
	}

	const handlerDeleteItem = async () => {
		try {
			setAction('delete')
			const response = await callEndpoint(deleteSaleItem(order?.id as string, item?.id as string));
			if (response.status === 200) {
				await restartPos()
				dispatch(closeModal());
			}
		} catch (error) {
			console.log(error);
		} finally {
			setAction('')
		}
	}

	React.useEffect(() => {
		if (isOpen) {
			const product = products.find(
				(product: ProductType) => product.id === id,
			);
			setProduct(product);

			setTab('quantity');
			setPad('');
			if (type == 'edit') {
				setDiscount(item?.discount as number);
				setQuantity(item?.quantity as number);
			} else {
				setDiscount(0);
				setQuantity(1);
			}
		}
	}, [isOpen, id, products, type, item]);

	return (
		<Transition appear show={isOpen} as={React.Fragment}>
			<Dialog
				as='div'
				className='relative z-30'
				onClose={() => {
					dispatch(closeModal());
				}}
			>
				<Transition.Child
					as={React.Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className='fixed inset-0 bg-black bg-opacity-40' />
				</Transition.Child>
				<div className='fixed inset-0 overflow-y-auto'>
					<div className='flex min-h-full items-center justify-center p-4 text-center'>
						<Transition.Child
							as={React.Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'
						>
							<Dialog.Panel className='w-full max-w-lg h-[486px] transform overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-600  text-left align-middle shadow-xl transition-all duration-200 flex select-none'>
								<div className='relative w-2/5 h-full rounded-r-2xl shadow-lg'>
									<figure className='relative w-full aspect-square bg-slate-600 rounded-t-2xl overflow-hidden'>
										<div className='absolute top-0 left-0 w-full h-full bg-gradient-to-t from-slate-900/60 to-transparent' />
										<img
											src={product?.image}
											alt={product?.name}
											className='object-cover w-full h-full'
										/>
									</figure>
									<div className='z-10 absolute w-full h-[312px] bottom-0 bg-slate-200 dark:bg-slate-800 transition-all duration-200 rounded-2xl flex flex-col justify-between shadow-md p-4'>
										<div className='w-full flex-grow flex flex-col justify-between mb-4'>
											<div className='text-center'>
												<p className='text-slate-500 dark:text-slate-400 transition-all duration-200 text-xs uppercase font-normal mb-1 flex justify-center items-center gap-1'>
													{product?.categories.map(
														(category: string) => (
															<span key={category}>
																{
																	categories.find(
																		(c) => c.id === category,
																	)?.name
																}
															</span>
														),
													)}
												</p>
												<h2 className='text-xl font-semibold text-slate-900 dark:text-slate-100 transition-all duration-200 capitalize text-center leading-none mb-2'>
													{product?.name}
												</h2>
												<p className='text-slate-600 dark:text-slate-300 transition-all duration-200 text-sm capitalize font-bold leading-none'>
													{formatCurrency(product?.list_price || 0)}
												</p>
											</div>

											<div className='w-full'>
												<div className='mb-6'>
													<p className='text-slate-600 dark:text-slate-300 transition-all duration-200 text-sm capitalize font-semibold text-center flex justify-between items-center'>
														Cantidad
														<span className='font-light italic'>
															{quantity}
														</span>
													</p>
													<p className='text-slate-600 dark:text-slate-300 transition-all duration-200 text-sm capitalize font-semibold text-center flex justify-between items-center'>
														Descuento
														<span className='font-light italic'>
															{formatCurrency(discount)}
														</span>
													</p>
												</div>
												<h3 className='w-full flex justify-between font-extrabold text-slate-950 dark:text-slate-200 transition-all duration-200'>
													Subtotal
													<span className='font-semibold'>
														{formatCurrency(
															(product?.list_price || 0) * quantity -
																discount,
														)}
													</span>
												</h3>
											</div>
										</div>
										<div className='w-full flex flex-col gap-4'>
											{type == 'add' ? (
												<button
													type='button'
													disabled={loading}
													className={`w-full flex items-center justify-center h-10 ${
														!loading
															? 'bg-slate-600 text-slate-100 transition-all duration-200'
															: 'bg-slate-400 text-slate-300 transition-all duration-200'
													} rounded-lg`}
													onClick={async () => {
														await handlerAddItem();
													}}
												>
													{loading && action === 'add' ? (
														<>
															<span className='flex w-5 h-5 items-center justify-center border-4 border-white border-l-transparent rounded-full mr-4 animate-spin' />
															<span>Agregando...</span>
														</>
													) : (
														<span>Agregar</span>
													)}
												</button>
											) : (
												<div>
													<button
														type='button'
														disabled={loading}
														className={`w-full flex items-center justify-center h-8 ${
															!loading
																? 'bg-slate-600 text-slate-100'
																: 'bg-slate-200 text-slate-300'
														} rounded-lg mb-2`}
														onClick={async () => {
															await handlerEditItem();
														}}
													>
														{loading && action === 'edit' ? (
															<>
																<span className='flex w-5 h-5 items-center justify-center border-4 border-white border-l-transparent rounded-full mr-4 animate-spin' />
																<span>Editando...</span>
															</>
														) : (
															<span>Editar</span>
														)}
													</button>
													<button
														type='button'
														disabled={loading}
														className={`w-full flex items-center justify-center h-8 ${
															!loading
																? 'bg-red-600 text-red-100'
																: 'bg-red-200 text-red-300'
														} rounded-lg`}
														onClick={async () => {
															await handlerDeleteItem();
														}}
													>
														{loading && action === 'delete' ? (
															<>
																<span className='flex w-5 h-5 items-center justify-center border-4 border-white border-l-transparent rounded-full mr-4 animate-spin' />
																<span>Eliminando...</span>
															</>
														) : (
															<span>Eliminar</span>
														)}
													</button>
												</div>
											)}
										</div>
									</div>
								</div>
								<div className='w-3/5 h-full p-4'>
									<div className='w-full h-full rounded-xl overflow-hidden flex flex-col'>
										<ul className='flex '>
											<li>
												<button
													type='button'
													className={`${
														tab === 'quantity' ? 'bg-slate-200 dark:bg-slate-400' : ''
													} px-3 py-2 rounded-t-xl outline-none focus:outline-none transition duration-200 ease-in-out `}
													onClick={() => {
														setTab('quantity');
													}}
												>
													<span
														className={`font-semibold ${
															tab === 'quantity'
																? 'text-slate-600 dark:text-slate-800'
																: 'text-slate-900 dark:text-slate-300'
														} transition-all duration-200 ease-in-out `}
													>
														Cantidad
													</span>
												</button>
											</li>

											<li>
												<button
													type='button'
													className={`${
														tab === 'discount' ? 'bg-slate-200 dark:bg-slate-400' : ''
													} px-3 py-2 rounded-t-xl outline-none focus:outline-none transition-all duration-200 ease-in-out`}
													onClick={() => {
														setTab('discount');
													}}
												>
													<span
														className={`font-semibold ${
															tab === 'discount'
																? 'text-slate-600 dark:text-slate-800'
																: 'text-slate-900 dark:text-slate-300'
														} transition-all duration-200 ease-in-out`}
													>
														Descuento
													</span>
												</button>
											</li>
										</ul>
										<div
											className={`flex-grow w-full bg-slate-200 dark:bg-slate-400 transition-all duration-200 rounded-tr-xl p-3 ${
												tab === 'discount' ? 'rounded-tl-xl' : ''
											} transition-all duration-200 ease-in-out flex flex-col gap-4`}
										>
											<p className='w-full h-5 flex justify-end text-xs items-center italic text-slate-500 leading-none transition-all duration-200 ease-in-out'></p>
											<div className='w-full h-20 rounded-lg bg-slate-50 dark:bg-slate-300 flex justify-end p-4 items-center text-3xl transition-all duration-200'>
												{pad
													? pad
													: tab === 'quantity'
													? quantity
													: discount}
											</div>
											<div className='flex-grow w-full grid grid-cols-4 gap-3'>
												{btnValues.flat().map((item, index) => (
													<button
														key={index}
														type='button'
														className={`w-full  flex justify-center items-center rounded-lg  ${
															item === 'C'
																? 'bg-slate-300 text-slate-900 dark:bg-slate-500 dark:text-slate-100'
																: item === 'OK'
																? 'bg-green-400 text-green-800 dark:bg-green-600 dark:text-green-100'
																: 'bg-slate-50 text-slate-900 dark:bg-slate-300 dark:text-slate-950'
														} text-lg font-semibold ${
															(item === '.' || item === '%') &&
															tab === 'quantity'
																? 'opacity-50 cursor-not-allowed'
																: ''
														} ${
															item === 'OK' ? 'col-span-2' : ''
														} transition-all duration-200 ease-in-out`}
														disabled={
															(item === '.' || item === '%') &&
															tab === 'quantity'
														}
														onClick={() => {
															handlerPad(item.toString());
														}}
													>
														{item}
													</button>
												))}
											</div>
										</div>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default Product;
