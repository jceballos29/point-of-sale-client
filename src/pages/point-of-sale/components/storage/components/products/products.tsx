import React from 'react';
import { Grid } from 'swiper';
import 'swiper/css';
import 'swiper/css/grid';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Product } from '../../../../../../types';
import { useDispatch, useSelector } from 'react-redux';
import { AppStore } from '@/redux/store';
import { formatCurrency } from '@/utils';
import { openModal } from '@/redux/slices/modal.slice';

export interface ProductsProps {
	products: Product[];
}

const Products: React.FC<ProductsProps> = ({ products }) => {
	const { categories } = useSelector(
		(store: AppStore) => store.pos,
	);

	const dispatch = useDispatch();

	return (
		<div className='w-full'>
			<h3 className='text-slate-900 text-2xl font-bold mb-4'>
				Productos
			</h3>
			<div className='w-full h-[512px]'>
				<Swiper
					spaceBetween={8}
					slidesPerView={4}
					slidesPerGroup={4}
					grid={{ rows: 4, fill: 'row' }}
					modules={[Grid]}
				>
					{products?.map((product: Product) => (
						<SwiperSlide key={product.id}>
							<div
								onClick={() => {
									dispatch(
										openModal({
											type: 'add',
											id: product.id,
											item: null
										}),
									);
								}}
								className='relative overflow-hidden h-32 bg-slate-200 rounded-lg flex flex-col items-start justify-center pl-28 pr-4  select-none cursor-pointer hover:shadow transition duration-150'
							>
								<div className='absolute h-36 aspect-square bg-slate-400 rounded-full -left-16' />
								<figure className='absolute w-24 aspect-square bg-slate-600 rounded-full left-2'>
									<img
										src={product.image}
										alt={product.name}
										className='object-cover w-full h-full rounded-full'
									/>
								</figure>
								<p className='text-slate-500 text-xs uppercase font-normal'>
									{product.categories.map((category: string) => (
										<span key={category} className='mr-1'>
											{
												categories.find((c) => c.id === category)
													?.name
											}
										</span>
									))}
								</p>
								<h3 className='text-base leading-none text-slate-900 font-bold capitalize mb-1'>
									{product.name}
								</h3>
								<p className='text-slate-600 text-sm capitalize font-medium'>
									{formatCurrency(product.list_price)}
								</p>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

export default Products;
