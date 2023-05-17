import {
	resetSearch,
	setSearch,
} from '@/redux/slices/pos.slice';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { useDispatch } from 'react-redux';

export interface SearchState {
	search: string;
}

const Search: React.FC = () => {
	const [item, setItem] = React.useState<SearchState['search']>('');

	const dispatch = useDispatch();

	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		dispatch(setSearch(item));
	};

	return (
		<form
			onSubmit={onSubmit}
			className='relative w-96 h-10 bg-slate-200 dark:bg-slate-700 dark:text-slate-100 rounded-lg flex items-center pl-3 overflow-hidden shadow transition-all duration-200'
		>
			<MagnifyingGlassIcon className='w-5 h-5 text-slate-900 dark:text-slate-100 mr-2' />
			<input
				type='text'
				name='search'
				className='appearance-none border-none w-full h-full bg-transparent outline-none focus:outline-none focus:border-none focus:ring-0 text-slate-900 dark:text-slate-100 dark:placeholder:text-slate-300 transition-all duration-200'
				placeholder='Buscar producto'
				value={item}
				onChange={(event) => setItem(event.target.value)}
			/>
			<button
				type='button'
				onClick={() => {
					setItem('');
					dispatch(resetSearch());
				}}
				className={`absolute right-0 top-0 bottom-0 flex items-center justify-center w-10 h-full text-slate-900 dark:text-slate-100 ${
					item.length === 0 ? 'translate-x-8' : 'translate-x-0'
				} transition-all duration-200`}
			>
				<XMarkIcon className='w-5 h-5' />
			</button>
		</form>
	);
};

export default Search;
