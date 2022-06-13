import "./App.css";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function Todo() {
  return (
    <div data-testid="app" className='App'>
      <TodoInput />
      <TodoList />
    </div>
  );
}

export default Todo;
