import "./App.less";
import TodosActions from "./components/TodosActions";
import TodosHeader from "./components/TodosHeader";
import TodosInput from "./components/TodosInput";
import TodosList from "./components/TodosList";

const Todo = () => (
  <div data-testid='app' className='app'>
    <div style={{ maxWidth: "470px" }}>
      <TodosHeader />
      <TodosInput />
      <TodosList />
      <TodosActions />
    </div>
  </div>
);

export default Todo;
