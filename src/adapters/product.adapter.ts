import { Product, ProductResponse } from "../types";

export const productsAdapter = ( response: ProductResponse[] ) => {
  const result: Product[] = response.map( ( product: ProductResponse ) => {
    return {
      id: product._id,
      name: product.name,
      code: product.code,
      image: product.image || undefined,
      list_price: product.list_price,
      quantity: product.quantity,
      categories: product.categories,
    };
  } );

  return result;
}