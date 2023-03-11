import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTodo = createAsyncThunk(
  "todo/fetchTodo",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );
      if (!response.ok) {
        throw new Error("Error Server");
  
      } else {
        const data = await response.json();
        return data;
      }

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodoFetch = createAsyncThunk(
  "todo/deleteTodo",
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Server Error");
      } else {
        dispatch(removeArray({ id }));
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleTodoFetch = createAsyncThunk(
  "todo/toggleTodoFetch",

  async function (id, { rejectWithValue, dispatch, getState }) {
    try {
      const todo = getState().todo.todos.find((item) => item.id === id);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: !todo.status,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Server Error ");
      } else {
        dispatch(toggleComplete({ id }));
      }

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const pushTodoFetch = createAsyncThunk(
  "todo/pushTodo",
  async function (handleInput, { rejectWithValue, dispatch }) {
    try {
      const todo = {
        id: Date.now(),
        title: handleInput,
        status: false,
      };
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(todo),
        }
      );
      if (!response.ok) {
        throw new Error("Error push data");
      } else {
        dispatch(pushArray(todo));
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

const SliceTodo = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    status: null,
    error: null,
  },
  reducers: {
    pushArray(state, action) {
      state.todos.push(action.payload);
    },

    removeArray(state, action) {
      state.todos = state.todos.filter((item) => item.id !== action.payload.id);
    },

    toggleComplete(state, action) {
      const toggledStatus = state.todos.find(
        (item) => item.id === action.payload.id
      );
      toggledStatus.status = !toggledStatus.status;
    },
  },
  extraReducers: {
    [fetchTodo.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchTodo.fulfilled]: (state, action) => {
      state.status = "resolve";
      state.todos = action.payload;
    },
    [fetchTodo.rejected]: setError,
    [deleteTodoFetch]: setError,
    [toggleTodoFetch]: setError,
    [pushTodoFetch]: setError,
  },
});

const { pushArray, removeArray, toggleComplete } = SliceTodo.actions;
export default SliceTodo.reducer;
