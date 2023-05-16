import { AppStore } from '@/redux/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'


const PrivateRoute = () => {

  const { isAuthenticated } = useSelector(
		(store: AppStore) => store.auth,
	);

  return isAuthenticated ? <Outlet /> : <Navigate to='/login' replace />
}

export default PrivateRoute