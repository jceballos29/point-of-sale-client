import { saleAdapter } from '@/adapters';
import axios, { AxiosError } from 'axios';

type ItemRequest = {
	product: string;
	quantity: number;
	price: number;
	discount: number;
};

export const getSales = async (device: string) => {
	try {
		const BASE_URL = import.meta.env.VITE_API_URL;
		const DATABASE = sessionStorage.getItem('database');
		const TOKEN = sessionStorage.getItem('token');

		if (!TOKEN) return null;

		const URL = `${BASE_URL}/${DATABASE}`;

		const instance = axios.create({
			baseURL: URL,
			headers: {
				Authorization: `Bearer ${TOKEN}`,
			},
		});

		const response = await instance.get(`/sales?device=${device}`);

		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError: AxiosError = error;
			if (axiosError.response?.status === 404) {
				// handle 404 errors
			}
		} else {
			// handle other errors
		}
	}
};

export const getSaleById = async (id: string) => {
	const BASE_URL = import.meta.env.VITE_API_URL;
	const DATABASE = sessionStorage.getItem('database');
	const TOKEN = sessionStorage.getItem('token');

	if (!TOKEN) return null;

	const URL = `${BASE_URL}/${DATABASE}`;

	const instance = axios.create({
		baseURL: URL,
		headers: {
			Authorization: `Bearer ${TOKEN}`,
		},
	});

	const response = await instance.get(`/sales/${id}`);

	return response.data;
};

export const createSale = async (device: string, party: string) => {
	const BASE_URL = import.meta.env.VITE_API_URL;
	const DATABASE = sessionStorage.getItem('database');
	const TOKEN = sessionStorage.getItem('token');

	if (!TOKEN) return null;

	const URL = `${BASE_URL}/${DATABASE}`;

	const instance = axios.create({
		baseURL: URL,
		headers: {
			Authorization: `Bearer ${TOKEN}`,
		},
	});

	const response = await instance.post(`/sales`, { device, party });

	return saleAdapter(response.data);
};

export const canceledSale = async (id: string) => {
	const BASE_URL = import.meta.env.VITE_API_URL;
	const DATABASE = sessionStorage.getItem('database');
	const TOKEN = sessionStorage.getItem('token');

	if (!TOKEN) return null;

	const URL = `${BASE_URL}/${DATABASE}`;

	const instance = axios.create({
		baseURL: URL,
		headers: {
			Authorization: `Bearer ${TOKEN}`,
		},
	});

	const response = await instance.delete(`/sales/${id}`);

	return response.status;
};

export const completeSale = async (
	id: string,
	paymentMethod: string,
) => {
	const BASE_URL = import.meta.env.VITE_API_URL;
	const DATABASE = sessionStorage.getItem('database');
	const TOKEN = sessionStorage.getItem('token');

	if (!TOKEN) return null;

	const URL = `${BASE_URL}/${DATABASE}`;

	const instance = axios.create({
		baseURL: URL,
		headers: {
			Authorization: `Bearer ${TOKEN}`,
		},
	});

	const response = await instance.put(`/sales/${id}`, {
		paymentMethod,
	});

	return response.status;
};

export const addItem = async (id: string, item: ItemRequest) => {
	const BASE_URL = import.meta.env.VITE_API_URL;
	const DATABASE = sessionStorage.getItem('database');
	const TOKEN = sessionStorage.getItem('token');

	if (!TOKEN) return null;

	const URL = `${BASE_URL}/${DATABASE}`;

	const instance = axios.create({
		baseURL: URL,
		headers: {
			Authorization: `Bearer ${TOKEN}`,
		},
	});

	const response = await instance.post(`/sales/${id}/items`, item);

	return response.status;
};

export const updateItem = async (
	id: string,
	itemId: string,
	item: ItemRequest,
) => {
	const BASE_URL = import.meta.env.VITE_API_URL;
	const DATABASE = sessionStorage.getItem('database');
	const TOKEN = sessionStorage.getItem('token');

	if (!TOKEN) return null;

	const URL = `${BASE_URL}/${DATABASE}`;

	const instance = axios.create({
		baseURL: URL,
		headers: {
			Authorization: `Bearer ${TOKEN}`,
		},
	});

	const response = await instance.put(
		`/sales/${id}/items/${itemId}`,
		item,
	);

	return response.status;
};

export const deleteItem = async (id: string, itemId: string) => {
	const BASE_URL = import.meta.env.VITE_API_URL;
	const DATABASE = sessionStorage.getItem('database');
	const TOKEN = sessionStorage.getItem('token');

	if (!TOKEN) return null;

	const URL = `${BASE_URL}/${DATABASE}`;

	const instance = axios.create({
		baseURL: URL,
		headers: {
			Authorization: `Bearer ${TOKEN}`,
		},
	});

	const response = await instance.delete(
		`/sales/${id}/items/${itemId}`,
	);

	return response.status;
};
