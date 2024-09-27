import { configureStore } from '@reduxjs/toolkit';
import successfulPaymentSlice from './slices/successfulPaymentSlice';

export default configureStore({
  reducer: {
    successfulPayment: successfulPaymentSlice,
  }
});
