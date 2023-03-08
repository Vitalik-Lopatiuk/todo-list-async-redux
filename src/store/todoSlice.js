import { createSlice } from "@reduxjs/toolkit";
const SliceTodo = createSlice({
  name: "todos",
  initialState: {
    todos: [],
  },
  reducers: {
    pushArray(state, action) {
      state.todos.push({
        id: Date.now(),
        title: action.payload.handleInput,
        status: false,
      });
    },

    removeArray(state, action) {
      state.todos = state.todos.filter((item) => item.id !== action.payload.id);
    },

    toggleComplete(state, action) {
        const toggledStatus = state.todos.find(item => item.id === action.payload.id)
        toggledStatus.status = !toggledStatus.status 
    },
  },
});

export const { pushArray, removeArray, toggleComplete } = SliceTodo.actions;
export default SliceTodo.reducer;
