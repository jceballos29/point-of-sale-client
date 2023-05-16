import { setDevice } from '@/redux/slices/sales.slice';
import { AppStore } from '@/redux/store';
import { Dialog, Transition } from '@headlessui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export interface DeviceProps {
	open: boolean;
	onClose: () => void;
}

const Device = ({ open, onClose }: DeviceProps) => {

  const { user } = useSelector((store: AppStore) => store.auth)

  const dispatch = useDispatch()

	const handlerClose = (device) => {
    dispatch(setDevice(device))
		onClose();
	};

	return (
		<Transition appear show={open} as={React.Fragment}>
			<Dialog as='div' className='relative z-30' onClose={() => null}>
				<Transition.Child
					as={React.Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className='fixed inset-0 bg-black bg-opacity-25' />
				</Transition.Child>
				<div className='fixed inset-0 overflow-y-auto'>
					<div className='flex min-h-full items-center justify-center p-4 text-center'>
						<Transition.Child
							as={React.Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'
						>
							<Dialog.Panel className='w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-900'
                >
                  Selecciona una terminal
                </Dialog.Title>
                <div className='w-full flex flex-wrap mt-4'>
                  {
                    user?.devices?.map((device) => (
                      <div key={device.id} className='w-1/2 p-2'>
                        <button
                          className='w-full h-16 bg-gray-200 rounded-lg flex items-center justify-center'
                          onClick={() => {
                            handlerClose(device)
                          }}
                        >
                          <span className='capitalize font-semibold text-slate-800' >{device.name}</span>
                        </button>
                      </div>
                    ))
                  }
                </div>
              </Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default Device;
