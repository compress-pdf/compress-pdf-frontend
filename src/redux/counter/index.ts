import { createSlice } from '@reduxjs/toolkit';

const initialState = { count: 0 };

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    update: (state, action) => {
      return action.payload;
    },
    reset: () => {
      return initialState;
    },
  },
});

export default counterSlice.reducer;
export const { update, reset } = counterSlice.actions;
