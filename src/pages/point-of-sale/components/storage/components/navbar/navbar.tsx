import React from 'react';
import { FullScreen, Home, Search, Theme } from './components';

export interface NavbarState {
	search: string;
}

const Navbar: React.FC = () => {

	return (
		<div className='w-full flex items-center justify-between'>
			<Search />
			<div className='flex items-center gap-2'>
				<Home />
				<FullScreen />
				<Theme />
			</div>
		</div>
	);
};

export default Navbar;
