import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  title: "",
  editTitle: "",
  addModal: false,
  editModal: false,
  delModal: false,
  idx: null,
};

export const slice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    handleChange(state, action) {
      const { name, value, id } = action.payload;
      if (id) {
        state.idx = id;
        state.editTitle = state.list.find((elem) => elem.id === id).title;
      }
      state[name] = value;
    },
    addTodo(state) {
      state.list.push({
        id: new Date().getTime(),
        title: state.title,
        completed: false,
      });
      state.addModal = false;
      state.title = "";
    },

    deleteTodo(state) {
      state.list = state.list.filter((elem) => elem.id !== state.idx);
      state.delModal = false;
    },
    editTodo(state) {
      let todo = state.list.find((elem) => elem.id === state.idx);
      todo.title = state.editTitle;
      state.editModal = false;
    },
    completedTodo(state, action) {
      const { id, value } = action.payload;
      let todo = state.list.find((elem) => elem.id === id);
      todo.completed = value;
    },
  },
});

export const { handleChange, deleteTodo, addTodo, completedTodo, editTodo } =
  slice.actions;

export default slice.reducer;
