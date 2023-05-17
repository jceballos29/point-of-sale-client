import { saleAdapter, salesAdapter } from '@/adapters';
import { useCallAndLoad } from '@/hooks';
import { setOrder, setOrders } from '@/redux/slices/sales.slice';
import { AppStore } from '@/redux/store';
import { fetchSales, startSale } from '@/services';
import { Party, SaleResponse } from '@/types';
import { Dialog, Listbox, Transition } from '@headlessui/react';
import {
	CheckIcon,
	ChevronUpDownIcon,
} from '@heroicons/react/24/solid';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export interface OrderProps {
	open: boolean;
	onClose: () => void;
}

export interface OrderState {
	selected: Party;
	busy: boolean;
}

const Order = ({ open, onClose }: OrderProps) => {
	const { callEndpoint, loading } = useCallAndLoad();
	const { parties } = useSelector((store: AppStore) => store.pos);
	const { device } = useSelector((store: AppStore) => store.sales);

	const dispatch = useDispatch();

	const [selected, setSelected] = React.useState<OrderState['selected']>({ id: '', name: '' });

	const handlerClose = () => {
		setSelected({ id: '', name: '' });
		onClose();
	};

	const createSale = async () => {
		try {
			const response = await callEndpoint(
				startSale({
					device: device?.id as string,
					party: selected.id,
				}),
			);
			const ordersResponse = await callEndpoint(
				fetchSales(device?.id as string),
			);
			dispatch(
				setOrders(
					salesAdapter(ordersResponse.data as SaleResponse[]),
				),
			);
			dispatch(setOrder(saleAdapter(response.data as SaleResponse)))
			handlerClose()
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Transition appear show={open} as={React.Fragment}>
			<Dialog
				as='div'
				className='relative z-30'
				onClose={handlerClose}
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
							<Dialog.Panel className='w-full max-w-sm transform rounded-2xl bg-slate-50 dark:bg-slate-600 transition-all duration-200 p-6 text-left align-middle shadow-xl'>
								<Dialog.Title
									as='h3'
									className='text-lg font-medium leading-6 text-slate-900 dark:text-slate-100 transition-all duration-200'
								>
									Nueva venta
								</Dialog.Title>
								<div className='w-full flex flex-wrap mt-4'>
									<Listbox value={selected} onChange={setSelected}>
										<div className='w-full relative mt-1'>
											<Listbox.Button className='relative w-full border text-slate-900 dark:text-slate-800 border-slate-50 dark:border-slate-400 cursor-default rounded-lg bg-slate-50 dark:bg-slate-400 transition-all duration-200 py-2 pl-3 pr-10 text-left shadow focus:outline-none focus-visible:border-none focus-visible:ring-2 focus-visible:ring-none focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-none sm:text-sm'>
												<span className='block truncate capitalize'>
													{selected.name || 'Selecciona un cliente'}
												</span>
												<span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
													<ChevronUpDownIcon
														className='h-5 w-5 text-slate-400 dark:text-slate-800 transition-all duration-200'
														aria-hidden='true'
													/>
												</span>
											</Listbox.Button>
											<Transition
												as={React.Fragment}
												leave='transition ease-in duration-100'
												leaveFrom='opacity-100'
												leaveTo='opacity-0'
											>
												<Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-50 dark:bg-slate-400 py-1 text-base shadow-lg ring-1 ring-slate-950 transition-all duration-200 ring-opacity-5 focus:outline-none sm:text-sm'>
													{parties.map((person, personIdx) => (
														<Listbox.Option
															key={personIdx}
															className={({ active }) =>
																`relative cursor-default select-none py-2 pl-10 pr-4 ${
																	active
																		? 'bg-slate-100 text-slate-900 dark:bg-slate-300 font-medium dark:text-slate-950 transition-all duration-200'
																		: 'text-slate-900'
																}`
															}
															value={person}
														>
															{({ selected }) => (
																<>
																	<span
																		className={`block truncate capitalize ${
																			selected
																				? 'font-medium'
																				: 'font-normal'
																		}`}
																	>
																		{person.name}
																	</span>
																	{selected ? (
																		<span className='absolute inset-y-0 left-0 flex items-center pl-3 text-slate-600  transition-all duration-200'>
																			<CheckIcon
																				className='h-5 w-5'
																				aria-hidden='true'
																			/>
																		</span>
																	) : null}
																</>
															)}
														</Listbox.Option>
													))}
												</Listbox.Options>
											</Transition>
										</div>
									</Listbox>

									<button
										disabled={!selected.id || loading}
										onClick={async () => await createSale()}
										className={`w-full flex items-center justify-center h-10 mt-4 ${
											selected.id
												? 'bg-slate-600 text-slate-100 dark:bg-slate-800 transition-all duration-200'
												: 'bg-slate-200 text-slate-300 dark:bg-slate-700 transition-all duration-200'
										} rounded-lg`}
									>
										{loading ? (
											<>
												{' '}
												<span className='flex w-5 h-5 items-center justify-center border-4 border-white border-l-transparent rounded-full mr-4 animate-spin' />
												<span>Iniciando...</span>
											</>
										) : (
											<span>Iniciar venta</span>
										)}
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default Order;
