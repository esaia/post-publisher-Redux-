import { createSlice, current } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

const Initial_State = JSON.parse(localStorage.getItem("posts")) || [];

const postSlice = createSlice({
  name: "posts",
  initialState: Initial_State,
  reducers: {
    addPost: {
      reducer(state, { payload }) {
        state.push(payload);
      },
      prepare(title, content, userID) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userID,
            date: new Date().toISOString(),
            writable: true,
            reactions: {
              thumbsUP: 0,
              WoW: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },

    reactionAdd(state, { payload }) {
      const { postID, reaction } = payload;

      let mypostchange = current(state).find((post) => post.id === postID);

      return current(state).map((item) => {
        if (item.id === mypostchange.id) {
          const changedItem = {
            ...item,
            reactions: {
              ...item.reactions,
              [reaction]: item.reactions[reaction] + 1,
            },
          };

          return changedItem;
        } else {
          return item;
        }
      });
    },

    deletePost: {
      reducer(state, { payload }) {
        return state.filter((item) => item.id !== payload.id);
      },

      prepare(postID) {
        return {
          payload: {
            id: postID,
          },
        };
      },
    },
  },
});

export const selectAllPosts = (state) => state.posts;

export const { addPost, deletePost, reactionAdd } = postSlice.actions;
export default postSlice.reducer;
