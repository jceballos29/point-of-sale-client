import { AxiosResponse } from 'axios';

export type AxiosCall<T> = {
  call: Promise<AxiosResponse<T>>;
	controller: AbortController;
}

export type ProductResponse = {
  _id: string,
  name: string,
  code: string,
  image: string | null,
  list_price: number,
  quantity: number,
  categories: string[],
  createdAt: string,
  updatedAt: string
}

export type CategoryResponse = {
  _id: string,
  name: string,
  products: string[]
  createdAt: string,
  updatedAt: string
}

export type WarehouseResponse = {
  _id: string,
  name: string,
  createdAt: string,
  updatedAt: string
}

export type UserResponse = {
  _id: string,
  name: string,
  name: string,
  password?: string,
  username: string,
  email: string,
  role: string,
  devices: DeviceResponse[],
  createdAt: string,
  updatedAt: string
}

export type DeviceResponse = {
  _id: string,
  name: string,
  createdAt: string,
  updatedAt: string
}

export type PartyResponse = {
  _id: string,
  name: string,
}

export type SaleResponse = {
  _id: string,
  number: number,
  user: UserResponse,
  device: string,
  party: string,
  date: string,
  status: string,
  paymentMethod: string,
  items: ItemResponse[],
  total: number,
  createdAt: string,
  updatedAt: string
}

export type ItemResponse = {
  _id: string,
  product: string,
  quantity: number,
  price: number,
  discount: number,
  createdAt: string,
  updatedAt: string
}

export type Product = {
  id: string,
  name: string,
  code: string,
  image: string | undefined,
  list_price: number,
  quantity: number,
  categories: string[],
}

export type Category = {
  id: string,
  name: string,
  products: number
}

export type Warehouse = {
  id: string,
  name: string,
}

export type User = {
  id: string,
  name: string,
  username: string,
  email: string,
  role: string,
  devices: Device[]
}

export type Device = {
  id: string,
  name: string,
}

export type LoginRequest = {
  username: string,
  password: string,
}

export type LoginResponse = {
  token: string,
  user: UserResponse
}

export type Party = {
  id: string,
  name: string,
}

export type Sales = {
  id: string,
  number: number,
}

export type Sale = {
  id: string,
  user: {
    id: string,
    name: string,
  },
  number: number,
  party: string,
  date: string,
  status: string,
  paymentMethod: string,
  items: Item[],
  total: number,
}

export type Item = {
  id: string,
  product: string,
  quantity: number,
  price: number,
  discount: number,
}