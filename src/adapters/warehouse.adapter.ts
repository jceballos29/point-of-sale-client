import { Warehouse, WarehouseResponse } from "@/types";

export const warehouseAdapter = (response: WarehouseResponse[]) => {
  const result: Warehouse[] = response.map(
    (warehouse: WarehouseResponse) => {
      return {
        id: warehouse._id,
        name: warehouse.name,
      };
    },
  );

  return result;
}