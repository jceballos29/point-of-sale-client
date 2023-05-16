import { MoonIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { FullScreenButton, Search } from './components';

export interface NavbarState {
	search: string;
}

const Navbar: React.FC = () => {

	return (
		<div className='w-full flex items-center justify-between'>
			<Search />
			<div className='flex items-center gap-2'>
				<FullScreenButton />
				<button className='w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center shadow'>
					<MoonIcon className='w-5 h-5 text-slate-900' />
				</button>
			</div>
		</div>
	);
};

export default Navbar;
