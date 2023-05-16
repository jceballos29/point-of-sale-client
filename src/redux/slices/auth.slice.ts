import { User } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    resetAuth: (state) => {
      state.user = initialState.user;
      state.isAuthenticated = initialState.isAuthenticated;
    }
  }
});

export const { setUser, resetAuth } = authSlice.actions;

export default authSlice.reducer;
