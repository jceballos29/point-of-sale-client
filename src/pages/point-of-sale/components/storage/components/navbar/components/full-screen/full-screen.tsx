import { ArrowsPointingInIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/solid';
import React from 'react'

export interface FullScreenState {
  full: boolean
}

const FullScreen = () => {

  const [fullScreen, setFullScreen] = React.useState<FullScreenState['full']>(false);

  const handleFullScreen = () => {
		if (fullScreen) {
			document.exitFullscreen();
			setFullScreen(false);
		} else {
			document.documentElement.requestFullscreen();
			setFullScreen(true);
		}
	};

  React.useEffect(() => {
		const handlerFullScreenChange = () => {
			setFullScreen(!!document.fullscreenElement)
		}

		document.addEventListener('fullscreenchange', handlerFullScreenChange);

		return () => {
			document.removeEventListener(
				'fullscreenchange',
				handlerFullScreenChange
			);
		}
	},[])

  return (
    <button
			type='button'
			onClick={() => handleFullScreen()}
			className='w-10 h-10 bg-slate-200 dark:bg-slate-700 dark:text-slate-100 rounded-lg flex items-center justify-center shadow transition-all duration-200'
		>
			{fullScreen ? (
				<ArrowsPointingInIcon className='w-5 h-5 text-slate-900 dark:text-slate-100 transition-all duration-200' />
			) : (
				<ArrowsPointingOutIcon className='w-5 h-5 text-slate-900 dark:text-slate-100 transition-all duration-200' />
			)}
		</button>
  )
}

export default FullScreen