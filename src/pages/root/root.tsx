/* eslint-disable react-hooks/exhaustive-deps */
import { userAdapter } from '@/adapters';
import { Loader } from '@/components';
import { Routes } from '@/constants';
import { useCallAndLoad } from '@/hooks';
import { setUser } from '@/redux/slices/auth.slice';
import { AppStore } from '@/redux/store';
import { me } from '@/services';
import { UserResponse } from '@/types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const RootLoader = async () => {
	const user = await me();
	return user;
};

const Root = () => {
	const { callEndpoint } = useCallAndLoad();
	const { isAuthenticated } = useSelector((store: AppStore) => store.auth)
	
	const dispatch = useDispatch();
	const navigate = useNavigate()

	React.useEffect(() => {
		
		const session = async () => {

			if (isAuthenticated) {
				navigate(Routes.POINT_OF_SALE)
			} else {
				const token = sessionStorage.getItem('token')
				if (token) {
					try {
						const response = await callEndpoint(me())
						dispatch(setUser(userAdapter(response.data as UserResponse)))
						navigate(Routes.POINT_OF_SALE)
					} catch (error) {
						navigate(Routes.LOGIN)
					}
				}  else {
					navigate(Routes.LOGIN)
				}
			}

		}

		session()

	},[])

	return <Loader />
};

export default Root;
