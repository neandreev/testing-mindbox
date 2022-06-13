import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./store";
import Todo from "./App";

test("TodoInput and TodoList are rendered", () => {
  render(
    <Provider store={store}>
      <Todo />
    </Provider>
  );

  const app = screen.getByTestId("app");
  const todoInput = screen.getByTestId("todo-input");
  const todoList = screen.getByTestId("todo-list");

  expect(app).toContainElement(todoInput);
  expect(app).toContainElement(todoList);
});
