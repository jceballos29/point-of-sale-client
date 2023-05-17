import { HomeIcon } from '@heroicons/react/24/solid';

const Home = () => {

  
  const handlerGoToHome = () => {
    const HOME = import.meta.env.VITE_TRYTON_URL;
    window.location.href = HOME;
  }

	return (
		<button
			type='button'
      onClick={() => handlerGoToHome()}  
			className='w-10 h-10 bg-slate-200 dark:bg-slate-700 dark:text-slate-100 rounded-lg flex items-center justify-center shadow transition-all duration-200'
		>
			<HomeIcon className='w-5 h-5 text-slate-900 dark:text-slate-100 transition-all duration-200' />
		</button>
	);
};

export default Home;
