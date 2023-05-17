import { axiosInstance } from '@/api';
import { PartyResponse } from '@/types';
import { loadAbort } from '@/utils';

export const fetchParties = () => {
  const controller = loadAbort();
  return {
    call: axiosInstance.get<PartyResponse[]>(`/parties`, {
      signal: controller.signal,
    }),
    controller,
  }
}