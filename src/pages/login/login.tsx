import { Warehouse } from '@/types';
import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { getWarehouses, login } from '@/services';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from './schemas';
import * as yup from 'yup';

type LoaderData = {
	warehouses: Warehouse[];
};

type FormData = yup.InferType<typeof loginSchema>;

export interface LoginState {
	busy: boolean;
}

export const LoginLoader = async () => {
	const warehouses: Warehouse[] = (await getWarehouses()) || [];

	return {
		warehouses,
	};
};

const Login = () => {
	const { warehouses } = useLoaderData() as LoaderData;

	const [busy, setBusy] = React.useState<LoginState['busy']>(false);

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(loginSchema),
	});

	const onSubmit = async (data: FormData) => {
		setBusy(true);
		const response = await login({
			database: data.database,
			username: data.username,
			password: data.password,
		});
		setBusy(false);
		if (response) {
			navigate('/');
		} else {
			alert('Usuario o contraseña incorrectos');
		}
	};

	return (
		<main className='w-full h-screen overflow-hidden flex flex-col gap-6 items-center justify-center bg-slate-50'>
			<h2 className='text-3xl font-bold'>One Cluster</h2>
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
						disabled={busy}
						className='w-full h-14 flex items-center justify-center border border-transparent rounded-md shadow-sm font-medium text-white bg-slate-500 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500'
					>
						{busy ? (
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
			<p className='text-xs text-slate-400'>
				&copy; One Cluster - 2023
			</p>
		</main>
	);
};

export default Login;
