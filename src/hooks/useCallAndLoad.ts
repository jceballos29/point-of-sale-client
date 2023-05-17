/* eslint-disable react-hooks/exhaustive-deps */
import { AxiosResponse } from "axios";
import { useState } from 'react';
import { AxiosCall } from "@/types";

const useCallAndLoad = () => {
  const [loading, setLoading] = useState(false);
  let controller: AbortController;

  const callEndpoint = async <T>(axiosCall: AxiosCall<T>) => {
    if (axiosCall.controller) controller = axiosCall.controller;
    setLoading(true);
    let result = {} as AxiosResponse<unknown>;
    try {
      result = await axiosCall.call;
    } catch (error: unknown) {
      setLoading(false);
      throw error;
    }
    setLoading(false);
    return result;
  };

  const cancelEndpoint = () => {
    setLoading(false);
    if (controller) controller.abort();
  };

  return { loading, callEndpoint, cancelEndpoint };
};

export default useCallAndLoad;