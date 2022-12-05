import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./posts/postsSlice";
import usersSlice from "./users/usersSlice";

export const store = configureStore({
  reducer: {
    posts: postSlice,
    users: usersSlice,
  },
});
