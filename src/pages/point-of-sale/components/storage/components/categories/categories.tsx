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
				<h3 className='text-slate-900 dark:text-slate-100 text-2xl font-bold transition-all duration-200'>
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
									? 'bg-slate-300 dark:bg-slate-500'
									: 'bg-slate-200 dark:bg-slate-700'
							} rounded-lg flex flex-col items-start justify-center px-4  select-none cursor-pointer hover:shadow transition-all duration-200`}
						>
							<h3 className='text-lg text-slate-900 dark:text-slate-100 font-bold capitalize transition-all duration-200'>
								{category.name}
							</h3>
							<p className='text-slate-500 dark:text-slate-400 text-sm capitalize font-light leading-none transition-all duration-200'>
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
