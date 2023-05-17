import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import React from 'react'

export interface ThemeState {
  dark: boolean
}

const Theme = () => {

  const [dark, setDark] = React.useState<ThemeState['dark']>(false);

  const handleTheme = () => {
		if (dark) {
			document.documentElement.classList.remove('dark');
			sessionStorage.removeItem('dark');
		} else {
			document.documentElement.classList.add('dark');
			sessionStorage.setItem('dark', 'true');
		}
		setDark(!dark);
	};

  React.useEffect(() => {
    const isDark = sessionStorage.getItem('dark');
    if (isDark) {
      document.documentElement.classList.add('dark');
      setDark(true);
    }
  },[])

  return (
    <button 
      type='button'
      onClick={() => handleTheme()}
      className='w-10 h-10 bg-slate-200 dark:bg-slate-700 dark:text-slate-100 rounded-lg flex items-center justify-center shadow transition-all duration-200'>
      {dark ? (
        <SunIcon className='w-5 h-5 text-slate-900 dark:text-slate-100 transition-all duration-200' />
      ) : (
        <MoonIcon className='w-5 h-5 text-slate-900 dark:text-slate-100 transition-all duration-200' />
      )}
    </button>
  )
}

export default Theme