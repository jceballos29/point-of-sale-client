import { AppStore } from '@/redux/store';
import { useSelector } from 'react-redux';

export interface DeviceProps {
  openModal: ()  => void
}

const Device = ({ openModal }: DeviceProps) => {

  const { user } = useSelector((store: AppStore) => store.auth)
  const { device } = useSelector((store: AppStore) => store.sales)

  return (
    <div className='w-full'>
    <h4 className='text-sm font-semibold mb-2 text-salte-900 dark:text-slate-100 transition-all duration-200'>Terminales</h4>
    <button
      onClick={() => {
        if (user && user?.devices.length > 1) {
          openModal();
        }
      }}
      className='w-full h-10 bg-slate-50 dark:bg-slate-600  transition-all duration-200 rounded-xl shadow flex items-center justify-center'
    >
      <span className='capitalize font-semibold text-slate-700 dark:text-slate-200 transition-all duration-200'>
        {device?.name}
      </span>
    </button>
  </div>
  )
}

export default Device