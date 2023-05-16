import { User, UserResponse } from '@/types';
import { deviceAdapter } from './device.adapter';

export const userAdapter = (response: UserResponse) => {
	const result: User = {
		id: response._id,
		name: response.name,
		username: response.username,
		email: response.email,
		role: response.role,
		devices: deviceAdapter(response.devices),
	};

	return result;
};
