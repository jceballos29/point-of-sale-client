import { Sale, SaleResponse, Item, ItemResponse } from "@/types";

export const salesAdapter = (response: SaleResponse[]) => {

  if (response.length === 0) return []

  const result: Sale[] = response.map((sale: SaleResponse) => {
    return {
      id: sale._id,
      number: sale.number,
      date: sale.date,
      user: {
        id: sale.user._id,
        name: sale.user.name,
      },
      items: itemsAdapter(sale.items),
      total: sale.total,
      party: sale.party,
      status: sale.status,
      paymentMethod: sale.paymentMethod, 
  }
  });

  return result;
}

export const saleAdapter = (response: SaleResponse) => {
  const result: Sale = {
    id: response._id,
    number: response.number,
    date: response.date,
    user: {
      id: response.user._id,
      name: response.user.name,
    },
    items: itemsAdapter(response.items),
    total: response.total,
    party: response.party,
    status: response.status,
    paymentMethod: response.paymentMethod,
  };

  return result;
}

export const itemAdapter = (response: ItemResponse) => {
  const result: Item = {
    id: response._id,
    product: response.product,
    quantity: response.quantity,
    price: response.price,
    discount: response.discount
  };

  return result;
}

export const itemsAdapter = (response: ItemResponse[]) => {
  const result: Item[] = response.map((item: ItemResponse) => {
    return {
      id: item._id,
      product: item.product,
      quantity: item.quantity,
      price: item.price,
      discount: item.discount
    };
  });

  return result;
}