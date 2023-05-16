import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { getPos } from '@/services';
import { Category, Party, Product } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories, setParties, setProducts } from '@/redux/slices/pos.slice';
import { Order, Sidebar, Storage } from './components';
import { AppStore } from '@/redux/store';
import { Loader } from '@/components';

type LoaderData = {
	products: Product[];
	categories: Category[];
	parties: Party[]
};

export const PointOfSaleLoader = async () => {
	return await getPos()
};

const PointOfSale = () => {
	const pos = useLoaderData() as LoaderData
	const {  isAuthenticated } = useSelector(
		(store: AppStore) => store.auth,
	);

	const dispatch = useDispatch();

	React.useEffect(() => {
		if (isAuthenticated) {
			dispatch(setProducts(pos.products));
			dispatch(setCategories(pos.categories));
			dispatch(setParties(pos.parties))
		} else {
			window.location.href = '/'
		}
	}, [dispatch, pos, isAuthenticated]);

	return isAuthenticated ? (
		<main className='w-full h-screen max-h-screen  overflow-hidden scrollbar-hide'>
			<div className='w-full h-full flex'>
				<Sidebar />
				<Storage />
				<Order />
			</div>
		</main>
	) : (
		<Loader />
	)
};

export default PointOfSale;
