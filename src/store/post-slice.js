import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: [],
  filter: ""
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    editPost: (state, { payload }) => {
      let item = state.post.find((x) => x.id === payload.id);
      item.title = payload.title;
    },
    getPostSuccess: (state, { payload }) => {
      state.post = payload;
    },
    getPostFailure: (state) => {
      state.post = [];
    },
    searchPost: (state, { payload }) => {
      console.log("Post Initial", state);
      if (payload.value) {
        state.post = state.post.filter((item) => {
          if (item.title.toLowerCase().includes(payload.value)) {
            return item;
          }
          return item;
        });
      }
    }
  }
});

export const postActions = postSlice.actions;

export default postSlice;

export const {
  editPost,
  getPostSuccess,
  searchPost,
  setFilter,
  getPostFailure
} = postSlice.actions;

export function fetchPost() {
  return async (dispatch) => {
    try {
      const response = await fetch("http://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
      dispatch(getPostSuccess(data));
    } catch (error) {
      dispatch(getPostFailure());
    }
  };
}
