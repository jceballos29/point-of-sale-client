const Loader = () => {
	return (
		<div className='w-full h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950'>
			<span className='w-3 h-3 block relative text-slate-700 dark:text-slate-200 box-border rounded-full my-4 mx-auto animate-loader'></span>
			<h2 className='text-slate-900 dark:text-slate-100 text-3xl font-extrabold'>
				One Cluster
			</h2>
		</div>
	);
};

export default Loader;
