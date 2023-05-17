import { axiosInstance } from '@/api';
import { WarehouseResponse } from '@/types';
import { loadAbort } from '@/utils';

export const fetchWarehouses = () => {
  const controller = loadAbort();
  return {
    call: axiosInstance.get<WarehouseResponse[]>(`/warehouses`, {
      signal: controller.signal,
    }),
    controller,
  }
}