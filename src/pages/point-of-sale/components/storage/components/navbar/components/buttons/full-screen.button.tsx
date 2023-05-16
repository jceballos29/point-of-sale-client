import {
	ArrowsPointingOutIcon,
	ArrowsPointingInIcon,
} from '@heroicons/react/24/solid';
import React from 'react';

export interface FullScreenButtonState {
	fullScreen: boolean;
}

const FullScreenButton: React.FC = () => {
	const [fullScreen, setFullScreen] =
		React.useState<FullScreenButtonState['fullScreen']>(false);

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
			className='w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center shadow'
		>
			{fullScreen ? (
				<ArrowsPointingInIcon className='w-5 h-5 text-slate-900' />
			) : (
				<ArrowsPointingOutIcon className='w-5 h-5 text-slate-900' />
			)}
		</button>
	);
};

export default FullScreenButton;
