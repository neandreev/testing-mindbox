import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { store } from "./store";
import Todo from "./App";

test("TodosInput and TodosList are rendered", () => {
  render(
    <Provider store={store}>
      <Todo />
    </Provider>
  );

  const app = screen.getByTestId("app");
  const todosInput = screen.getByTestId("todo-input");
  const todosList = screen.getByTestId("todo-list");

  expect(app).toContainElement(todosInput);
  expect(app).toContainElement(todosList);
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

  //completing both two todos and expecting them to have completion className
  const firstTodoToggle = await screen.findByTestId("toggle-todo-1");
  await user.click(firstTodoToggle);
  expect(await screen.findByTestId("todo-1")).toHaveClass("todo-completed");

  const secondTodoToggle = await screen.findByTestId("toggle-todo-3");
  await user.click(secondTodoToggle);
  expect(await screen.findByTestId("todo-3")).toHaveClass("todo-completed");

  //uncompleting second todo and expecting only first task to be completed
  await user.click(await screen.findByTestId("toggle-todo-3"));

  expect(await screen.findByTestId("todo-1")).toHaveClass("todo-completed");
  expect(await screen.findByTestId("todo-3")).not.toHaveClass("todo-completed");
});

test("Renaming tasks", async () => {
  render(
    <Provider store={store}>
      <Todo />
    </Provider>
  );

  const user = userEvent.setup();

  //renaming first task
  await user.click(await screen.findByTestId("rename-todo-3"));
  await user.clear(await screen.findByTestId("input-todo-3"));
  await user.type(await screen.findByTestId("input-todo-3"), "buy cucumbers");
  await user.keyboard("[Enter]");

  //expecting first task text to be 'buy cucumbers'
  expect(await screen.findByTestId("text-todo-3")).toHaveTextContent(
    "buy cucumbers"
  );

  //trying to rename first task to already existing task
  await user.click(await screen.findByTestId("rename-todo-3"));
  await user.clear(await screen.findByTestId("input-todo-3"));
  await user.type(await screen.findByTestId("input-todo-3"), "buy a banana");
  await user.keyboard("[Enter]");

  //expecting first task not to be renamed and be returned to value before renaming
  expect(await screen.findByTestId("text-todo-3")).not.toHaveTextContent(
    "buy a banana"
  );

  expect(await screen.findByTestId("text-todo-3")).toHaveTextContent(
    "buy cucumbers"
  );

  //trying to rename first task to empty text
  await user.click(await screen.findByTestId("rename-todo-3"));
  await user.clear(await screen.findByTestId("input-todo-3"));
  await user.keyboard("[Enter]");

  //expecting first task not to be renamed and be returned to value before renaming
  expect(await screen.findByTestId("text-todo-3")).toHaveTextContent(
    "buy cucumbers"
  );
});
