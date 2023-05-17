import { axiosInstance } from '@/api';
import { ProductResponse } from '@/types';
import { loadAbort } from '@/utils';

export const fetchProducts = () => {
  const controller = loadAbort();
  return {
    call: axiosInstance.get<ProductResponse[]>(`/products`, {
      signal: controller.signal,
    }),
    controller,
  }
}