import _uniqueId from "lodash/uniqueId";
import _find from "lodash/find";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TodoI } from "../../types";

const initialState: {
  todos: TodoI[];
} = {
  todos: [],
};

const counterSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo = {
        id: _uniqueId(),
        text: action.payload,
        isCompleted: false,
      };
      state.todos.push(newTodo);
    },
    toggleTodoCompletion: (state, action: PayloadAction<string>) => {
      const todoToUpdate = _find(state.todos, { id: action.payload });
      if (!todoToUpdate) return state;
      todoToUpdate.isCompleted = !todoToUpdate.isCompleted;
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      const newTodosState = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      state.todos = newTodosState;
    },
  },
});

export const { addTodo, toggleTodoCompletion, removeTodo } =
  counterSlice.actions;
export default counterSlice.reducer;
