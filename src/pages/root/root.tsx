import { setUser } from '@/redux/slices/auth.slice';
import { AppStore } from '@/redux/store';
import { me } from '@/services';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLoaderData } from 'react-router-dom';

export const RootLoader = async () => {
	const user = await me();
	return user;
};

const Root = () => {
	const response = useLoaderData();
	const { isAuthenticated } = useSelector(
		(store: AppStore) => store.auth,
	);
	const dispatch = useDispatch();

	React.useEffect(() => {
		if (response) {
			dispatch(setUser(response));
		}
	}, [dispatch, response]);

	return isAuthenticated ? (
		<Navigate to='/point-of-sale' />
	) : (
		<Navigate to='/login' />
	);
};

export default Root;
