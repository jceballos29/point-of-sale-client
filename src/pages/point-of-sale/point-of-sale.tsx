/* eslint-disable react-hooks/exhaustive-deps */
import {
	categoriesAdapter,
	partiesAdapter,
	productsAdapter,
} from '@/adapters';
import { Loader } from '@/components';
import { useCallAndLoad } from '@/hooks';
import {
	setCategories,
	setParties,
	setProducts,
} from '@/redux/slices/pos.slice';
import {
	fetchCategories,
	fetchParties,
	fetchProducts,
} from '@/services';
import {
	CategoryResponse,
	PartyResponse,
	ProductResponse
} from '@/types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Order, Sidebar, Storage } from './components';
// import { Storage } from './components';

const PointOfSale = () => {
	const { callEndpoint, loading } = useCallAndLoad();

	const dispatch = useDispatch();

	React.useEffect(() => {
		const getPos = async () => {
			try {
				const productsResponse = await callEndpoint(fetchProducts());
				const categories = await callEndpoint(fetchCategories());
				const parties = await callEndpoint(fetchParties());
				dispatch(
					setProducts(
						productsAdapter(
							productsResponse.data as ProductResponse[],
						),
					),
				);
				dispatch(
					setCategories(
						categoriesAdapter(categories.data as CategoryResponse[]),
					),
				);
				dispatch(
					setParties(partiesAdapter(parties.data as PartyResponse[])),
				);
			} catch (error) {
				console.log(error);
			}
		};

		getPos();
	}, []);

	return loading ? (
		<Loader />
	) : (
		<main className='w-full h-screen max-h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden scrollbar-hide transition-all duration-200'>
			<div className='w-full h-full flex'>
				<Sidebar />
				<Storage />
				<Order />
			</div>
		</main>
	);
};

export default PointOfSale;
