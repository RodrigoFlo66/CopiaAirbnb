import { createSlice } from '@reduxjs/toolkit';

const successfulPaymentSlice = createSlice({
  name: 'successfulPayment',
  initialState: false, // Valor inicial
  reducers: {
    setSuccessfulPayment: (state, action) => {
      return action.payload; // Cambia el valor successfulPayment
    },
  },
});

export const { setSuccessfulPayment } = successfulPaymentSlice.actions;
export default successfulPaymentSlice.reducer;
