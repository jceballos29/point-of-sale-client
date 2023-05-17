import { axiosInstance } from '@/api';
import { loadAbort } from '@/utils';
import { SaleResponse } from '@/types';

type ItemRequest = {
	product: string;
	quantity: number;
	price: number;
	discount: number;
};

type SaleRequest = {
	device: string;
	party: string;
}

type CompleteSaleRequest = {
	id: string; 
	paymentMethod: string;
}

const controller = loadAbort();

export const fetchSales = (device: string) => {
	return {
		call: axiosInstance.get<SaleResponse[]>(
			`/sales?device=${device}`,
			{
				signal: controller.signal,
			},
		),
		controller
	};
};

export const fetchSale = (id: string) => {
	return {
		call: axiosInstance.get<SaleResponse>(
			`/sales/${id}`,
			{
				signal: controller.signal,
			},
		),
		controller
	};
}

export const startSale = (request: SaleRequest) => {
	return {
		call: axiosInstance.post<SaleResponse>(
			`/sales`,
			request,
			{ signal: controller.signal, }
		),
		controller
	}
}

export const completeSale = (data: CompleteSaleRequest) => {
	return {
		call: axiosInstance.put<SaleResponse>(
			`/sales/${data.id}`,
			{paymentMethod: data.paymentMethod},
			{ signal: controller.signal, }
		),
		controller
	}
}

export const canceledSale = (id: string) => {
	return {
		call: axiosInstance.delete<SaleResponse>(
			`/sales/${id}`,
			{ signal: controller.signal, }
		),
		controller
	}
}

export const addSaleItem = (id: string, item: ItemRequest) => {
	return {
		call: axiosInstance.post<SaleResponse>(
			`/sales/${id}/items`,
			item,
			{ signal: controller.signal, }
		),
		controller
	}
}

export const updateSaleItem = (id: string, itemId: string, item: ItemRequest) => {
	return {
		call: axiosInstance.put<SaleResponse>(
			`/sales/${id}/items/${itemId}`,
			item,
			{ signal: controller.signal, }
		),
		controller
	}
}

export const deleteSaleItem = (id: string, itemId: string) => {
	return {
		call: axiosInstance.delete<SaleResponse>(
			`/sales/${id}/items/${itemId}`,
			{ signal: controller.signal, }
		),
		controller
	}
}