import { userAdapter } from '@/adapters';
import { Routes } from '@/constants';
import { useCallAndLoad } from '@/hooks';
import { setUser } from '@/redux/slices/auth.slice';
import { login } from '@/services';
import { LoginResponse, Warehouse } from '@/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { loginSchema } from '../../schemas';

export interface FormProps {
  warehouses: Warehouse[]
}

type FormData = yup.InferType<typeof loginSchema>;

const Form = ({ warehouses }: FormProps) => {

  const { callEndpoint, loading } = useCallAndLoad();

  const dispatch = useDispatch()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(loginSchema),
	});

	const onSubmit = async (data: FormData) => {
		try {
      const { database, ...request } = data;
      sessionStorage.setItem('database', database)
      const response = await callEndpoint(login(request))
      const { token, user } = response.data as LoginResponse
      sessionStorage.setItem('token', token)
      dispatch(setUser(userAdapter(user)))
      window.location.href = Routes.ROOT
    } catch (error) {
      console.log(error)
    }
	};

  return (
    <form
    onSubmit={handleSubmit(onSubmit)}
    className='w-full max-w-sm p-8 pt-12 bg-white rounded-2xl shadow-md'
  >
    <h3 className='text-2xl font-bold mb-12'>Iniciar sesión</h3>
    <div className='mb-4'>
      <label
        htmlFor='warehouse'
        className='flex items-center justify-between text-sm font-bold text-slate-700'
      >
        Database
        {errors.database && (
          <span className='text-xs text-red-500 ml-1'>
            {errors.database.message}
          </span>
        )}
      </label>
      <select
        {...register('database')}
        className='mt-1 focus:ring-slate-500 focus:border-slate-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md capitalize'
        placeholder='Selecciona una base de datos'
      >
        <option value=''>Selecciona una base de datos</option>
        {warehouses.map((warehouse) => (
          <option
            className='capitalize'
            key={warehouse.id}
            value={warehouse.name}
          >
            {warehouse.name}
          </option>
        ))}
      </select>
    </div>
    <div className='mb-4'>
      <label
        htmlFor='warehouse'
        className='flex items-center justify-between text-sm font-bold text-slate-700'
      >
        Usuario
        {errors.username && (
          <span className='text-xs text-red-500 ml-1'>
            {errors.username.message}
          </span>
        )}
      </label>
      <input
        type='text'
        {...register('username')}
        className='mt-1 focus:ring-slate-500 focus:border-slate-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md'
      />
    </div>
    <div className='mb-12'>
      <label
        htmlFor='warehouse'
        className='flex items-center justify-between text-sm font-bold text-slate-700'
      >
        Contraseña
        {errors.password && (
          <span className='text-xs text-red-500 ml-1'>
            {errors.password.message}
          </span>
        )}
      </label>
      <input
        type='password'
        {...register('password')}
        className='mt-1 focus:ring-slate-500 focus:border-slate-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md'
      />
    </div>
    <div>
      <button
        type='submit'
        disabled={loading}
        className='w-full h-14 flex items-center justify-center border border-transparent rounded-md shadow-sm font-medium text-white bg-slate-500 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500'
      >
        {loading ? (
          <>
            {' '}
            <span className='flex w-5 h-5 items-center justify-center border-4 border-white border-l-transparent rounded-full mr-4 animate-spin' />
            <span>Iniciando...</span>
          </>
        ) : (
          <span>Iniciar sesión</span>
        )}
      </button>
    </div>
  </form>
  )
}

export default Form