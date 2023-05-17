/* eslint-disable no-mixed-spaces-and-tabs */
import axios, { AxiosInstance } from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;
const DATABASE = sessionStorage.getItem('database');
const TOKEN = sessionStorage.getItem('token');

export const axiosInstance: AxiosInstance = TOKEN
	? axios.create({
			baseURL: `${BASE_URL}/${DATABASE}`,
			headers: {
				Authorization: `Bearer ${TOKEN}`,
				'Content-Type': 'application/json',
			},
	  })
	: axios.create({
			baseURL: `${BASE_URL}/${DATABASE}`,
	  });
