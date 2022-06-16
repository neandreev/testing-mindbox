import { FC } from "react";

import { BorderOutlined, CheckSquareOutlined } from "@ant-design/icons";

import { useAppDispatch } from "../../store/hooks";
import { toggleTodo } from "../../store/slices/todos";
import { TodoI } from "../../types";

interface ToogleTaskPropsI {
  todo: TodoI;
}

const TodoToggle: FC<ToogleTaskPropsI> = ({ todo }) => {
  const dispatch = useAppDispatch();

  const handleToggleTodo = () => {
    dispatch(toggleTodo(todo.id));
  };

  return !todo.isCompleted ? (
    <BorderOutlined
      data-testid={`toggle-todo-${todo.id}`}
      onClick={handleToggleTodo}
    />
  ) : (
    <CheckSquareOutlined
      data-testid={`toggle-todo-${todo.id}`}
      onClick={handleToggleTodo}
    />
  );
};

export { TodoToggle };
