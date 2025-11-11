import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    pendingCount: 0,
  },
  reducers: {
    setPendingCount: (state, action) => {
      state.pendingCount = action.payload;
    },
  },
});

export const { setPendingCount } = orderSlice.actions;

export const fetchPendingOrders = () => {
  return async (dispatch) => {
    try {
      const res = await fetch("http://localhost:5001/orders?status=pending");
      const data = await res.json();
      dispatch(setPendingCount(data.length));
    } catch {
      dispatch(setPendingCount(0));
    }
  };
};

export default orderSlice.reducer;
