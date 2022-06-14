import { Provider } from "react-redux";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

test("Adding and removing todos", async () => {
  render(
    <Provider store={store}>
      <Todo />
    </Provider>
  );

  const user = userEvent.setup();

  //adding first todo
  await user.type(screen.getByTestId("todo-input"), "buy a banana");
  await user.click(screen.getByTestId("add-todo-button"));
  const firstTodo = await screen.findByText(/buy a banana/i);
  expect(screen.getByTestId("app")).toContainElement(firstTodo);

  //adding second todo
  await user.type(screen.getByTestId("todo-input"), "buy an onion");
  await user.click(screen.getByTestId("add-todo-button"));
  const secondTodo = await screen.findByText(/buy an onion/i);
  expect(screen.getByTestId("app")).toContainElement(secondTodo);

  //expecting two todos in list
  expect(screen.getByRole("list").childNodes.length).toEqual(2);

  //removing second todo
  const [, removeSecondTask] = await screen.findAllByTestId("remove-todo");
  await user.click(removeSecondTask);

  //expecting one todo in list
  expect(screen.getByRole("list").childNodes.length).toEqual(1);
  expect(screen.queryByText(/buy an onion/i)).toBeNull();
  expect(screen.getByTestId("app")).toContainElement(
    screen.queryByText(/buy a banana/i)
  );

  //adding second todo
  await user.type(screen.getByTestId("todo-input"), "buy an orange");
  await user.click(screen.getByTestId("add-todo-button"));
  const thirdTodo = await screen.findByText(/buy an orange/i);
  expect(screen.getByTestId("app")).toContainElement(thirdTodo);

  //expecting two todos in list
  expect(screen.getByRole("list").childNodes.length).toEqual(2);
});

test("Completing and uncompleting tasks", async () => {
  render(
    <Provider store={store}>
      <Todo />
    </Provider>
  );

  const user = userEvent.setup();

  //completing both two todos
  const [firstTodo, secondTodo] = screen.queryAllByTestId('todo');
  await user.click(firstTodo);
  await user.click(secondTodo);
  expect(firstTodo).toHaveClass('todo-completed');
  expect(secondTodo).toHaveClass('todo-completed');

  //uncompleting second todo
  await user.click(secondTodo);
  expect(firstTodo).toHaveClass('todo-completed');
  expect(secondTodo).not.toHaveClass('todo-completed');
});
