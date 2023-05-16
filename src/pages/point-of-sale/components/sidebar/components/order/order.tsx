import { salesAdapter } from '@/adapters';
import { setOrder, setOrders } from '@/redux/slices/sales.slice';
import { AppStore } from '@/redux/store';
import { createSale, getSales } from '@/services/sales.service';
import { Party } from '@/types';
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
	const { parties } = useSelector((store: AppStore) => store.pos);
	const { device } = useSelector((store: AppStore) => store.sales);

	const dispatch = useDispatch();

	const [busy, setBusy] = React.useState<OrderState['busy']>(false);
	const [selected, setSelected] = React.useState<
		OrderState['selected']
	>({
		id: '',
		name: '',
	});

	const handlerClose = () => {
		setSelected({
			id: '',
			name: '',
		});
		onClose();
	};

	const createNewOrder = async () => {
		try {
			setBusy(true);
			const response = await createSale(
				device?.id as string,
				selected.id,
			);
      const orders = await getSales(device?.id as string)
      dispatch(setOrders(salesAdapter(orders)));
			if (response) {
				dispatch(setOrder(response));
				handlerClose();
			}
		} catch (error) {
			console.log(error);
		} finally {
			setBusy(false);
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
					<div className='fixed inset-0 bg-black bg-opacity-25' />
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
							<Dialog.Panel className='w-full max-w-sm transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
								<Dialog.Title
									as='h3'
									className='text-lg font-medium leading-6 text-gray-900'
								>
									Nueva venta
								</Dialog.Title>
								<div className='w-full flex flex-wrap mt-4'>
									<Listbox value={selected} onChange={setSelected}>
										<div className='w-full relative mt-1'>
											<Listbox.Button className='relative w-full border cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
												<span className='block truncate capitalize'>
													{selected.name || 'Selecciona un cliente'}
												</span>
												<span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
													<ChevronUpDownIcon
														className='h-5 w-5 text-gray-400'
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
												<Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
													{parties.map((person, personIdx) => (
														<Listbox.Option
															key={personIdx}
															className={({ active }) =>
																`relative cursor-default select-none py-2 pl-10 pr-4 ${
																	active
																		? 'bg-slate-100 text-slate-900'
																		: 'text-gray-900'
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
																		<span className='absolute inset-y-0 left-0 flex items-center pl-3 text-slate-600'>
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
										disabled={!selected.id || busy}
										onClick={() => createNewOrder()}
										className={`w-full flex items-center justify-center h-10 mt-4 ${
											selected.id
												? 'bg-slate-600 text-slate-100'
												: 'bg-slate-200 text-slate-300'
										} rounded-lg`}
									>
										{busy ? (
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
