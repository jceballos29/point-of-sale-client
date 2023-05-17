import React from 'react';

const Footer: React.FC = () => {

	const COMPANY = import.meta.env.VITE_COMPANY

	return (
		<div className='w-full flex justify-center items-center'>
			<p className='text-xs text-slate-400 dark:text-slate-600 transition-all duration-200'>
				&copy; <span>{COMPANY}</span> - One Cluster 2023
			</p>
		</div>
	);
};

export default Footer;
