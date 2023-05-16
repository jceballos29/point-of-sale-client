import { userAdapter } from "@/adapters";
import { LoginRequest, UserResponse } from "@/types";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const login = async (data: LoginRequest) => {
  try {
    sessionStorage.setItem('database', data.database)
    const response = await axios.post(`${data.database}/auth/login`, {
      username: data.username,
      password: data.password,
    });
    sessionStorage.setItem('token', response.data.token);
    return true;
  } catch (error) {
    return false
  }
}

export const me = async () => {
	try {
		const DATABASE = sessionStorage.getItem('database');
		const TOKEN = sessionStorage.getItem('token');

		if (!TOKEN) return null;
		axios.defaults.headers.common[
			'Authorization'
		] = `Bearer ${TOKEN}`;

		const response = await axios.get<UserResponse>(
			`${DATABASE}/auth/me`,
		);
		return userAdapter(response.data);
	} catch (error: unknown) {
		return null;
	}
};

export const logout = () => {
	sessionStorage.removeItem('token');
	sessionStorage.removeItem('database');
	window.location.href = '/'
}