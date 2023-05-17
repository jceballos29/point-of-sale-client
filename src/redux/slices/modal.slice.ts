import { Item } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

export interface ModalState {
  isOpen: boolean;
  type: 'add' | 'edit',
  id: string | null;
  item: Item | null
}

const initialState: ModalState = {
  isOpen: false,
  type: 'add',
  id: null,
  item: null
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.id = action.payload.id;
      state.item = action.payload.item;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = initialState.type;
      state.id = initialState.id;
      state.item = initialState.item;
    },
    resetModal: (state) => {
      state.isOpen = initialState.isOpen;
      state.type = initialState.type;
      state.id = initialState.id;
      state.item = initialState.item;
    }
  }
});

export const { openModal, closeModal, resetModal } = modalSlice.actions;

export default modalSlice.reducer;