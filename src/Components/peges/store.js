// Вариант 1: Default export (если хотите использовать import store from ...)
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import profileReducer from './profileSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    profile: profileReducer
  }
});

export default store; // Явный default export