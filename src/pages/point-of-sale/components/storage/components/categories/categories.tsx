import React from 'react';
import { Category } from '../../../../../../types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid } from 'swiper';
import 'swiper/css';
import 'swiper/css/grid';
import { AppStore } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import {
	resetCategory,
	setCategory,
} from '@/redux/slices/pos.slice';

const Categories: React.FC = () => {
	const { categories, category: selectedCategory } = useSelector(
		(store: AppStore) => store.pos,
	);

	const dispatch = useDispatch();

	return (
		<div className='w-full'>
			<div className='w-full flex justify-between items-center mb-4'>
				<h3 className='text-slate-900 text-2xl font-bold'>
					Categorías
				</h3>
			</div>
			<Swiper
				spaceBetween={8}
				slidesPerView={4}
				slidesPerGroup={4}
				grid={{ rows: 2, fill: 'row' }}
				modules={[Grid]}
			>
				{categories.map((category: Category) => (
					<SwiperSlide key={category.id}>
						<div
							onClick={() => {
								selectedCategory?.id === category.id
									? dispatch(resetCategory())
									: dispatch(setCategory(category));
							}}
							className={`h-16 ${
								selectedCategory?.id === category.id
									? 'bg-slate-300'
									: 'bg-slate-200'
							} rounded-lg flex flex-col items-start justify-center px-4  select-none cursor-pointer hover:shadow transition duration-150`}
						>
							<h3 className='text-lg text-slate-900 font-bold capitalize'>
								{category.name}
							</h3>
							<p className='text-slate-500 text-sm capitalize font-light leading-none'>
								{category.products}{' '}
								{category.products > 1 ? 'products' : 'product'}
							</p>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default Categories;
