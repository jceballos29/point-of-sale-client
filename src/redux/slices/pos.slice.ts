import { Category, Party, Product } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

export interface PosState {
  products: Product[];
  categories: Category[];
  parties: Party[];
  category: Category | null;
  searchedProducts:  Product[];
  search: string;
}

const initialState: PosState = {
  products: [],
  categories: [],
  parties: [],
  category: null,
  searchedProducts: [],
  search: ''
};

const posSlice = createSlice({
  name: 'pos',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.searchedProducts = action.payload
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setParties: (state, action) => {
      state.parties = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    resetCategory: (state) => {
      state.category = initialState.category;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    resetSearch: (state) => {
      state.search = initialState.search;
    },
    setSearchedProducts: (state, action) => {
      state.searchedProducts = action.payload;
    },
    resetSearchedProducts: (state) => {
      state.searchedProducts = state.products;
    }
  }
});

export const { 
  setProducts,
  setCategories,
  setParties,
  setCategory,
  resetCategory,
  resetSearch,
  setSearch,
  setSearchedProducts,
  resetSearchedProducts
 } = posSlice.actions;

export default posSlice.reducer;