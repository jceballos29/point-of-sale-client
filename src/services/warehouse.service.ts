import axios, { AxiosError } from 'axios';
import { WarehouseResponse } from '@/types';
import { warehouseAdapter } from '@/adapters';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const getWarehouses = async () => {
  try {
    const DATABASE = sessionStorage.getItem('database');
    const response = await axios.get<WarehouseResponse[]>(`${DATABASE}/warehouses`);
    return warehouseAdapter(response.data);
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
}