import { Routes } from '@/constants';
import { AppStore } from '@/redux/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'


const PrivateRoute = () => {

  const { isAuthenticated } = useSelector(
		(store: AppStore) => store.auth,
	);

  return isAuthenticated ? <Outlet /> : <Navigate to={Routes.ROOT} replace />
}

export default PrivateRoute