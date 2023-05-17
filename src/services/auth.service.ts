import { axiosInstance } from '@/api';
import { LoginRequest, User, LoginResponse } from '@/types';
import { loadAbort } from '@/utils';

export const login = (data: LoginRequest) => {
  const controller = loadAbort();
	return {
		call: axiosInstance.post<LoginResponse>(`/auth/login`, data, {
			signal: controller.signal,
		}),
    controller,
	};
};

export const me = () => {
  const controller = loadAbort();
  return {
    call: axiosInstance.get<User>(`/auth/me`, {
      signal: controller.signal,
    }),
    controller,
  }
}