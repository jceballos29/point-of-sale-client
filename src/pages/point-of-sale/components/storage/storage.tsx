import React from 'react';
import { Categories, Footer, Navbar, Products } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { AppStore } from '@/redux/store';
import { setSearchedProducts } from '@/redux/slices/pos.slice';

const Storage: React.FC = () => {
	const { products, searchedProducts, category, search } =
		useSelector((store: AppStore) => store.pos);
	const dispatch = useDispatch();

	React.useEffect(() => {
		let items = products;

		if (category) {
			items = items.filter((item) =>
				item.categories.includes(category.id),
			);
		}

		if (search) {
			items = items.filter((item) =>
				item.name
					.toLowerCase()
					.replace(/\s+/g, '')
					.includes(search.toLowerCase().replace(/\s+/g, '')),
			);
		}

		dispatch(setSearchedProducts(items));
	}, [products, category, search, dispatch]);

	return (
		<section className='pl-64 pr-96 w-full max-h-full h-full overflow-hidden'>
			<div className='w-full h-full max-h-full flex flex-col justify-between overflow-hidden py-4'>
				<Navbar />
				<Categories />
				<Products products={searchedProducts} />
				<Footer />
			</div>
		</section>
	);
};

export default Storage;
