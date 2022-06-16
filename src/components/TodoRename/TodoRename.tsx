import { FC } from "react";

import { EditOutlined } from "@ant-design/icons";

import { TodoI } from "../../types";

interface TodoRenamePropsI {
  todo: TodoI;
  onClick: () => void;
}

const TodoRename: FC<TodoRenamePropsI> = ({ todo, onClick }) => {
  return !todo.isCompleted ? (
    <EditOutlined data-testid={`rename-todo-${todo.id}`} onClick={onClick} />
  ) : null;
};

export { TodoRename };
