import { Routes } from '@/constants'
import { resetAuth } from '@/redux/slices/auth.slice'
import { resetModal } from '@/redux/slices/modal.slice'
import { resetPos } from '@/redux/slices/pos.slice'
import { resetSales } from '@/redux/slices/sales.slice'
import { AppStore } from '@/redux/store'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export interface UserState {
  open: boolean
}

const User = () => {

  const { user } = useSelector((store: AppStore) => store.auth)

  const [open, setOpen] = React.useState<UserState['open']>(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = () => {
		sessionStorage.removeItem('token');
		sessionStorage.removeItem('database');
    sessionStorage.removeItem('dark');
    dispatch(resetModal())
    dispatch(resetPos());
    dispatch(resetSales());
		dispatch(resetAuth());
    navigate(Routes.ROOT);
	};

  return (
    <div className='absolute bottom-0 left-0 w-full p-2 select-none'>
    <div
      className={`w-full ${
        open ? 'h-64' : 'h-14'
      } bg-slate-300 dark:bg-slate-600 rounded-xl shadow transition-all duration-200`}
    >
      {open ? (
        <div className='w-full h-full flex flex-col items-center justify-between p-4 overflow-hidden z-10'>
          <div className='w-full'>
            <button
              onClick={() => setOpen(false)}
              className='w-full flex items-center justify-end'
            >
              <ChevronDownIcon width={18} />
            </button>
            <div className='w-full flex flex-col items-center'>
              <figure className='w-20 aspect-square rounded-full bg-slate-200 dark:bg-slate-400 transition-all duration-200 mb-2'></figure>
              <h4 className='text-lg font-semibold leading-none text-slate-900 dark:text-slate-200 transition-all duration-200'>
                {user?.name}
              </h4>
              <p className='text-slate-500 dark:text-slate-400 transition-all duration-200 leading-none'>
                {user?.email}
              </p>
            </div>
          </div>
          <button
            className='w-full h-8 font-medium bg-slate-50 text-slate-900 dark:bg-slate-800 dark:text-slate-100 transition-all duration-200 rounded-lg shadow flex items-center justify-center px-4 overflow-hidden text-center text-sm'
            onClick={() => {
              logout();
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <div
          onClick={() => {
            setOpen(true);
          }}
          className='w-full flex items-center gap-3 p-2'
        >
          <figure className='w-10 aspect-square rounded-lg bg-slate-200 dark:bg-slate-400 transition-all duration-200'></figure>
          <h4 className='text-lg font-semibold text-slate-900 dark:text-slate-200 transition-all duration-200'>
            {user?.name}
          </h4>
        </div>
      )}
    </div>
  </div>
  )
}

export default User