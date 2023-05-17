import { axiosInstance } from '@/api';
import { CategoryResponse } from '@/types';
import { loadAbort } from '@/utils';

export const fetchCategories = () => {
  const controller = loadAbort();
  return {
    call: axiosInstance.get<CategoryResponse[]>(`/categories`, {
      signal: controller.signal,
    }),
    controller,
  }
}