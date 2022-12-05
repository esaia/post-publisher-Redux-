import { createSlice } from "@reduxjs/toolkit";

const Initial_state = [
  { id: 1, name: "Jhon doe" },
  { id: 2, name: "brouke ludwig" },
  { id: 3, name: "jack jonson" },
];

const userSlice = createSlice({
  name: "user",
  initialState: Initial_state,
  reducers: {},
});

export const selectAllUsers = (state) => state.users;
export default userSlice.reducer;
