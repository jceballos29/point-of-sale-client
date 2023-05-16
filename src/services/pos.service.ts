import axios, { AxiosError } from 'axios';
import { categoriesAdapter, partiesAdapter, productsAdapter } from '@/adapters';


export const getPos = async () => {
  try {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const DATABASE = sessionStorage.getItem('database');
    const TOKEN = sessionStorage.getItem('token');

    if (!TOKEN) return null;

    const URL = `${BASE_URL}/${DATABASE}`

    const instance = axios.create({
      baseURL: URL,
      headers: {
        'Authorization': `Bearer ${TOKEN}`
      }
    })

    const responses = await axios.all([
      instance.get('/categories'),
      instance.get('/parties'),
      instance.get('/products'),
    ])

    const categories = responses[0].data
    const parties = responses[1].data
    const products = responses[2].data

    return {
      categories: categoriesAdapter(categories),
      parties: partiesAdapter(parties),
      products: productsAdapter(products)
    }
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

export const getProducts = async () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const DATABASE = sessionStorage.getItem('database');
  const TOKEN = sessionStorage.getItem('token');

  if (!TOKEN) return null;

  const URL = `${BASE_URL}/${DATABASE}`

  const instance = axios.create({
    baseURL: URL,
    headers: {
      'Authorization': `Bearer ${TOKEN}`
    }
  })

  const response = await instance.get('/products')

  return response.data
}